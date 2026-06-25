import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendShipmentUpdateEmail } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request, { params }) {
  try {
    const { trackingId } = await params;
    const data = await request.json();
    const { location, status, description } = data;

    // Verify shipment exists
    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber: trackingId }
    });

    if (!shipment) {
      return NextResponse.json({ success: false, error: 'Shipment not found' }, { status: 404 });
    }

    // Add update
    const update = await prisma.shipmentUpdate.create({
      data: {
        location,
        status,
        description,
        shipmentId: shipment.id,
      },
    });

    // Update main shipment status
    await prisma.shipment.update({
      where: { trackingNumber: trackingId },
      data: { status, updatedAt: new Date() }
    });

    // Send the update email asynchronously
    sendShipmentUpdateEmail(
      shipment.receiverEmail,
      trackingId,
      shipment.receiverName,
      location,
      status,
      description
    );

    return NextResponse.json({ success: true, update }, { status: 201 });
  } catch (error) {
    console.error('Error adding shipment update:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
