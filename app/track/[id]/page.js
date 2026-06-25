import { headers } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import TrackShipmentClient from './TrackShipmentClient';

const prisma = new PrismaClient();

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  if (!id || id === 'search') {
    return {
      title: 'Track Shipment | WesternApex Logistics',
      description: 'Enter your master tracking waybill number to view real-time shipping status.',
    };
  }

  const shipment = await prisma.shipment.findUnique({
    where: { trackingNumber: id },
  });

  if (!shipment) {
    return {
      title: 'Shipment Not Found | WesternApex Logistics',
      description: 'We could not find a shipment matching this waybill number.',
    };
  }

  // Get host from headers to build absolute URLs for WhatsApp Open Graph tags
  const headersList = await headers();
  const host = headersList.get('host') || 'westernapex.online';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;

  const title = `Shipment ${shipment.trackingNumber} | WesternApex`;
  const description = `Status: ${shipment.status}. Origin: ${shipment.senderCity}, ${shipment.senderCountry} → Destination: ${shipment.receiverCity}, ${shipment.receiverCountry}.`;
  
  // Dynamic Open Graph image using packagePicture url, falls back to brand hero image
  const imageUrl = shipment.packagePicture 
    ? `${domain}${shipment.packagePicture}` 
    : `${domain}/shipping_hero_bg_1782343600195.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: `Package photo for waybill ${shipment.trackingNumber}`,
        },
      ],
      type: 'website',
    },
  };
}

export default async function TrackShipmentPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  let shipment = null;
  if (id && id !== 'search') {
    const dbShipment = await prisma.shipment.findUnique({
      where: { trackingNumber: id },
      include: {
        updates: { orderBy: { timestamp: 'desc' } },
        items: true,
      },
    });

    if (dbShipment) {
      // Serialize database objects safely for client component transmission
      shipment = {
        ...dbShipment,
        dispatchDate: dbShipment.dispatchDate ? dbShipment.dispatchDate.toISOString() : null,
        estimatedDeparture: dbShipment.estimatedDeparture ? dbShipment.estimatedDeparture.toISOString() : null,
        estimatedArrival: dbShipment.estimatedArrival ? dbShipment.estimatedArrival.toISOString() : null,
        actualDelivery: dbShipment.actualDelivery ? dbShipment.actualDelivery.toISOString() : null,
        createdAt: dbShipment.createdAt.toISOString(),
        updatedAt: dbShipment.updatedAt.toISOString(),
        updates: dbShipment.updates.map(u => ({
          ...u,
          timestamp: u.timestamp.toISOString(),
        })),
        items: dbShipment.items.map(i => ({
          ...i,
        })),
      };
    }
  }

  return (
    <TrackShipmentClient initialShipment={shipment} trackingId={id} />
  );
}
