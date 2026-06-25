import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendShipmentCreatedEmail } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();
    
    const { items, ...shipmentData } = data;

    // Convert string dates to Date objects where present
    const dateFields = ['dispatchDate', 'estimatedDeparture', 'estimatedArrival', 'actualDelivery'];
    dateFields.forEach(field => {
      if (shipmentData[field]) {
        shipmentData[field] = new Date(shipmentData[field]);
      } else {
        shipmentData[field] = null;
      }
    });

    // Parse floats and ints
    const numberFields = ['totalWeight', 'totalVolume', 'packageCount', 'customsValue', 'volumetricWeight'];
    numberFields.forEach(field => {
      if (shipmentData[field]) {
        shipmentData[field] = Number(shipmentData[field]);
      }
    });

    // Parse booleans for service checkboxes
    const booleanFields = ['servicePackaging', 'serviceCargo', 'serviceWorldwide', 'serviceDoorToDoor', 'serviceOther'];
    booleanFields.forEach(field => {
      shipmentData[field] = shipmentData[field] === true || shipmentData[field] === 'true' || shipmentData[field] === 'on';
    });

    // Create shipment with nested items
    const shipment = await prisma.shipment.create({
      data: {
        ...shipmentData,
        status: 'Processing',
        items: items && items.length > 0 ? {
          create: items.map(item => ({
            description: item.description,
            quantity: Number(item.quantity || 1),
            weight: item.weight ? Number(item.weight) : null,
            length: item.length ? Number(item.length) : null,
            width: item.width ? Number(item.width) : null,
            height: item.height ? Number(item.height) : null,
            hsCode: item.hsCode || null,
            value: item.value ? Number(item.value) : null,
          }))
        } : undefined
      },
    });

    // Initial update checkpoint
    await prisma.shipmentUpdate.create({
      data: {
        location: shipmentData.originPort || shipmentData.senderCity || 'Origin Sorting Facility',
        status: 'Processing',
        description: 'Shipment data received and processing initiated.',
        shipmentId: shipment.id,
      },
    });

    // Retrieve shipment with nested items
    const fullShipment = await prisma.shipment.findUnique({
      where: { id: shipment.id },
      include: { items: true }
    });

    // Fire email asynchronously
    sendShipmentCreatedEmail(fullShipment);

    return NextResponse.json({ success: true, shipment }, { status: 201 });
  } catch (error) {
    console.error('Error creating shipment:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingNumber = searchParams.get('trackingNumber');

    if (trackingNumber) {
      const shipment = await prisma.shipment.findUnique({
        where: { trackingNumber },
        include: { 
          updates: { orderBy: { timestamp: 'desc' } },
          items: true 
        }
      });
      if (!shipment) return NextResponse.json({ success: false, error: 'Not Found' }, { status: 404 });
      return NextResponse.json({ success: true, shipment }, { status: 200 });
    }

    const shipments = await prisma.shipment.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, shipments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching shipments:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
