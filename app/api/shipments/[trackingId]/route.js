import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  try {
    const { trackingId } = await params;
    const data = await request.json();
    const { items, ...shipmentData } = data;

    const existing = await prisma.shipment.findUnique({ where: { trackingNumber: trackingId } });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Shipment not found' }, { status: 404 });
    }

    // Tracking number is the lookup key — never overwrite it from the form payload
    delete shipmentData.trackingNumber;

    const dateFields = ['dispatchDate', 'estimatedDeparture', 'estimatedArrival', 'actualDelivery'];
    dateFields.forEach(field => {
      if (shipmentData[field]) {
        shipmentData[field] = new Date(shipmentData[field]);
      } else if (field in shipmentData) {
        shipmentData[field] = null;
      }
    });

    const numberFields = ['totalWeight', 'totalVolume', 'packageCount', 'customsValue', 'volumetricWeight'];
    numberFields.forEach(field => {
      if (shipmentData[field] !== undefined) {
        shipmentData[field] = shipmentData[field] === '' ? null : Number(shipmentData[field]);
      }
    });

    const booleanFields = ['servicePackaging', 'serviceCargo', 'serviceWorldwide', 'serviceDoorToDoor', 'serviceOther'];
    booleanFields.forEach(field => {
      if (field in shipmentData) {
        shipmentData[field] = shipmentData[field] === true || shipmentData[field] === 'true' || shipmentData[field] === 'on';
      }
    });

    const shipment = await prisma.shipment.update({
      where: { trackingNumber: trackingId },
      data: {
        ...shipmentData,
        items: items ? {
          deleteMany: {},
          create: items.map(item => ({
            description: item.description,
            quantity: Number(item.quantity || 1),
            weight: item.weight ? Number(item.weight) : null,
            length: item.length ? Number(item.length) : null,
            width: item.width ? Number(item.width) : null,
            height: item.height ? Number(item.height) : null,
            hsCode: item.hsCode || null,
            value: item.value ? Number(item.value) : null,
          })),
        } : undefined,
      },
      include: { items: true, updates: { orderBy: { timestamp: 'desc' } } },
    });

    return NextResponse.json({ success: true, shipment }, { status: 200 });
  } catch (error) {
    console.error('Error updating shipment:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { trackingId } = await params;

    const existing = await prisma.shipment.findUnique({ where: { trackingNumber: trackingId } });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Shipment not found' }, { status: 404 });
    }

    await prisma.shipment.delete({ where: { trackingNumber: trackingId } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting shipment:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
