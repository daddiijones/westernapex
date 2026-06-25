const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const path = require('path');
const nodemailer = require('nodemailer');

const prisma = new PrismaClient();

const smtpPort = parseInt(process.env.SMTP_PORT || "2525");

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER || "125fc52da35a45",
    pass: process.env.SMTP_PASS || "982adb369f2d47"
  },
  tls: {
    rejectUnauthorized: false
  }
});

async function sendSeedEmail(shipment) {
  const { receiverEmail, trackingNumber, receiverName, items } = shipment;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shipment Registered & Waybill Receipt</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #334155;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f8fafc;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #0f172a, #04060e);
      padding: 32px;
      text-align: center;
      border-bottom: 3px solid #ef4444;
    }
    .logo {
      display: inline-block;
      padding: 8px 16px;
      background: linear-gradient(135deg, #ef4444, #f97316);
      border-radius: 8px;
      font-weight: 900;
      color: #ffffff;
      font-size: 18px;
      letter-spacing: -0.05em;
      text-decoration: none;
    }
    .logo-text {
      color: #ffffff;
      font-size: 20px;
      font-weight: bold;
      margin-left: 8px;
      vertical-align: middle;
      letter-spacing: -0.02em;
    }
    .content {
      padding: 32px;
    }
    .title {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 12px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 12px;
    }
    .barcode-panel {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      margin-bottom: 24px;
    }
    .grid-2 {
      width: 100%;
      margin-bottom: 24px;
    }
    .grid-2 td {
      width: 50%;
      vertical-align: top;
      padding: 0 10px 0 0;
    }
    .card {
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      height: 100%;
      box-sizing: border-box;
    }
    .card-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748b;
      letter-spacing: 0.08em;
      margin-bottom: 8px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 4px;
    }
    .card-content {
      font-size: 13px;
      line-height: 1.5;
      color: #334155;
    }
    .table-title {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 8px;
      margin-top: 24px;
    }
    .manifest-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 13px;
    }
    .manifest-table th {
      background-color: #f8fafc;
      border-bottom: 2px solid #cbd5e1;
      color: #475569;
      font-weight: 600;
      padding: 8px 12px;
      text-align: left;
    }
    .manifest-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 10px 12px;
      color: #334155;
    }
    .footer {
      background-color: #f1f5f9;
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }
    .footer a {
      color: #ef4444;
      text-decoration: none;
      font-weight: 600;
    }
    .btn {
      display: inline-block;
      padding: 12px 28px;
      background: linear-gradient(135deg, #ef4444, #f97316);
      color: #ffffff !important;
      font-weight: 700;
      font-size: 14px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header" style="text-align: center; padding: 24px;">
        <img src="cid:logo" alt="WesternApex SHIPMENT SOLUTIONS" style="height: 60px; width: auto; display: inline-block; vertical-align: middle;" />
      </div>
      <div class="content">
        ${shipment.stampDuty && shipment.stampDuty !== 'Exempt' ? `
        <div style="text-align: right; margin-bottom: -35px; margin-top: 0px; position: relative; z-index: 10;">
          <div style="display: inline-block; border: 4px double #ef4444; color: #ef4444; font-family: 'Courier New', monospace; font-size: 14px; font-weight: bold; text-transform: uppercase; padding: 6px 12px; transform: rotate(-10deg); border-radius: 4px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            STAMP DUTY (${shipment.stampDuty})
          </div>
        </div>
        ` : ''}
        <div class="title">Waybill Shipment Receipt</div>
        <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-top: 0; margin-bottom: 20px;">
          Hello ${receiverName},<br>
          We are pleased to inform you that your cargo shipment has been successfully registered under the master waybill below. Please find the detailed shipment receipt.
        </p>

        <!-- Barcode Panel -->
        <div class="barcode-panel">
          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.08em; display: block; margin-bottom: 8px;">Master Waybill Tracking Number</span>
          <img src="https://bwipjs-api.metafloor.com/?bcid=code128&text=${trackingNumber}&scale=2&height=10" alt="Barcode" style="display: inline-block; max-width: 100%; height: auto;" />
          <div style="font-family: monospace; font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 6px; letter-spacing: 0.1em;">${trackingNumber}</div>
        </div>

        <!-- Address Cards -->
        <table class="grid-2">
          <tr>
            <td>
              <div class="card">
                <div class="card-title">Consignor (Sender)</div>
                <div class="card-content">
                  <strong>${shipment.senderName}</strong><br>
                  ${shipment.senderCompany ? `${shipment.senderCompany}<br>` : ''}
                  ${shipment.senderAddress}<br>
                  ${shipment.senderCity}, ${shipment.senderState} ${shipment.senderZip}<br>
                  <strong style="color: #ef4444;">${shipment.senderCountry}</strong>
                </div>
              </div>
            </td>
            <td>
              <div class="card">
                <div class="card-title">Consignee (Receiver)</div>
                <div class="card-content">
                  <strong>${shipment.receiverName}</strong><br>
                  ${shipment.receiverCompany ? `${shipment.receiverCompany}<br>` : ''}
                  ${shipment.receiverAddress}<br>
                  ${shipment.receiverCity}, ${shipment.receiverState} ${shipment.receiverZip}<br>
                  <strong style="color: #ef4444;">${shipment.receiverCountry}</strong>
                </div>
              </div>
            </td>
          </tr>
        </table>

        <!-- Waybill Specs & Security Matrix -->
        <table style="width: 100%; margin-bottom: 24px; border-collapse: collapse;">
          <tr>
            <td style="width: 50%; vertical-align: top; padding-right: 10px;">
              <div class="card" style="padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; box-sizing: border-box; height: 100%;">
                <div class="card-title" style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.08em; margin-bottom: 8px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">SERVICES CHOSEN</div>
                <table style="width: 100%; font-size: 12px; border-collapse: collapse; line-height: 1.7;">
                  <tr><td style="color: ${shipment.servicePackaging ? '#ef4444' : '#94a3b8'};">${shipment.servicePackaging ? '&#9745;' : '&#9744;'} Packaging & Storage</td></tr>
                  <tr><td style="color: ${shipment.serviceCargo ? '#ef4444' : '#94a3b8'};">${shipment.serviceCargo ? '&#9745;' : '&#9744;'} Cargo</td></tr>
                  <tr><td style="color: ${shipment.serviceWorldwide ? '#ef4444' : '#94a3b8'};">${shipment.serviceWorldwide ? '&#9745;' : '&#9744;'} Worldwide Transport</td></tr>
                  <tr><td style="color: ${shipment.serviceDoorToDoor ? '#ef4444' : '#94a3b8'};">${shipment.serviceDoorToDoor ? '&#9745;' : '&#9744;'} Door-to-Door Delivery</td></tr>
                  <tr><td style="color: ${shipment.serviceOther ? '#ef4444' : '#94a3b8'};">${shipment.serviceOther ? '&#9745;' : '&#9744;'} Other Services</td></tr>
                </table>
              </div>
            </td>
            <td style="width: 50%; vertical-align: top; padding-left: 10px;">
              <div class="card" style="padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; box-sizing: border-box; height: 100%;">
                <div class="card-title" style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.08em; margin-bottom: 8px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">SECURITY CHECKER</div>
                <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 4px 0; color: #64748b; font-size: 11px;">COMMUNITY CODE:</td>
                    <td style="padding: 4px 0; font-weight: 700; text-align: right; color: #0f172a;">${shipment.harmonizedCode || 'No'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #64748b; font-size: 11px;">SENDER VAT:</td>
                    <td style="padding: 4px 0; font-weight: 700; text-align: right; color: #0f172a;">${shipment.senderVat || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #64748b; font-size: 11px;">RECEIVER VAT:</td>
                    <td style="padding: 4px 0; font-weight: 700; text-align: right; color: #0f172a;">${shipment.receiverVat || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #64748b; font-size: 11px;">EXPORT TYPE:</td>
                    <td style="padding: 4px 0; font-weight: 700; text-align: right; color: #ef4444;">${shipment.typeOfExport || 'Permanent'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #64748b; font-size: 11px;">TAX PAYER:</td>
                    <td style="padding: 4px 0; font-weight: 700; text-align: right; color: #0f172a;">${shipment.dutiesPaymentTerms || 'Receiver'}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>

        <!-- Waybill parameters and Routing details -->
        <div class="card" style="margin-bottom: 24px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
          <div class="card-title" style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.08em; margin-bottom: 8px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">WAYBILL PARAMETERS & ROUTING</div>
          <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Shipping Method:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #0f172a; text-align: right;">${shipment.shippingMethod} (${shipment.carrierName || 'N/A'})</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Vessel/Flight Number:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #ef4444; text-align: right;">${shipment.vesselFlightNumber || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Routing:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #0f172a; text-align: right;">${shipment.originPort || shipment.senderCity} &rarr; ${shipment.destinationPort || shipment.receiverCity}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Total Weight:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #0f172a; text-align: right;">${shipment.totalWeight ? `${shipment.totalWeight} KG` : 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Volumetric Weight:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #ef4444; text-align: right;">${shipment.volumetricWeight ? `${shipment.volumetricWeight} KG` : 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">X-Ray Scan Result:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #10b981; text-align: right;">${shipment.xrayScanResult || 'Negative'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Service Charge:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #0f172a; text-align: right;">${shipment.serviceCharge || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Payment Status:</td>
              <td style="padding: 6px 0; font-weight: 700; color: ${shipment.paymentStatus === 'Paid' ? '#10b981' : '#f59e0b'}; text-align: right;">${shipment.paymentStatus || 'Pending'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">To Be Picked Up By:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #0f172a; text-align: right;">${shipment.toBePickedUpBy || shipment.receiverName}</td>
            </tr>
          </table>
        </div>

        <!-- Customs Note Box -->
        ${shipment.paymentStatus !== 'Paid' ? `
        <div style="background-color: #fef2f2; border: 1px dashed #fca5a5; border-radius: 8px; padding: 14px; margin-bottom: 24px; text-align: center; color: #ef4444; font-size: 12px; font-weight: bold; letter-spacing: 0.05em;">
          ⚠️ CUSTOM DUTIES AND CLEARANCE FEES MUST BE PAID BEFORE DELIVERY
        </div>
        ` : ''}

        <!-- Authorized Signature -->
        ${shipment.authorizedSignature ? `
        <div style="text-align: right; margin-bottom: 24px;">
          <div style="display: inline-block; text-align: center;">
            <div style="font-family: 'Brush Script MT', 'Segoe Script', cursive; font-size: 30px; color: #0f172a; line-height: 1;">
              ${shipment.authorizedSignature}
            </div>
            <div style="border-top: 1px solid #94a3b8; margin-top: 8px; padding-top: 6px; min-width: 220px;">
              <span style="font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #64748b;">Authorized Signature</span>
            </div>
          </div>
        </div>
        ` : ''}

        <!-- Manifest Table -->
        ${items && items.length > 0 ? `
          <div class="table-title">Cargo Manifest Details</div>
          <table class="manifest-table">
            <thead>
              <tr>
                <th>Description</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: center;">HS Code</th>
                <th style="text-align: right;">Declared Value</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td style="font-weight: 600;">${item.description}</td>
                  <td style="text-align: center;">${item.quantity}</td>
                  <td style="text-align: center;">${item.hsCode || '-'}</td>
                  <td style="text-align: right; font-weight: 600; color: #ef4444;">${item.value ? `${item.value.toLocaleString()} ${shipment.currency || 'USD'}` : '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : ''}

        <div style="text-align: center; margin: 32px 0 8px;">
          <a href="https://westernapex.online/track/${trackingNumber}" class="btn">Track Shipment Live</a>
        </div>
      </div>
      <div class="footer">
        This receipt acts as an official booking confirmation.<br>
        &copy; ${new Date().getFullYear()} WesternApex Logistics. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>
`;

  console.log(`Sending Waybill email for ${trackingNumber} to Mailtrap...`);
  const info = await transport.sendMail({
    from: `"WesternApex Logistics" <${process.env.EMAIL_FROM || 'support@westernapex.online'}>`,
    to: receiverEmail,
    subject: `Shipment Created: Tracking #${trackingNumber}`,
    html: htmlContent,
    attachments: [{
      filename: 'logo.png',
      path: path.join(__dirname, '../public/logo.png'),
      cid: 'logo'
    }]
  });
  console.log(`Success! Waybill email sent with ID: ${info.messageId}`);
}

async function main() {
  // ── SEED ADMIN ──
  const hashedPassword = await bcrypt.hash('Admin@2026!', 12);
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@westernapex.online' },
    update: {},
    create: {
      email: 'admin@westernapex.online',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'superadmin',
    },
  });
  console.log('✅ Admin seeded:', admin.email);

  // ── SEED SAMPLE SHIPMENTS ──
  // Clear existing shipments to ensure they are recreated with the new fields
  await prisma.shipment.deleteMany({});
  
  const shipment1 = await prisma.shipment.create({
      data: {
        trackingNumber: 'AWB-88012345',
        referenceNumber: 'INV-2026-0042',

        // Sender
        senderName: 'James Carter',
        senderCompany: 'Carter Electronics Ltd.',
        senderEmail: 'james@carterelectronics.com',
        senderPhone: '+1 212 555 0147',
        senderAddress: '350 Fifth Avenue, Suite 4100',
        senderCity: 'New York',
        senderState: 'NY',
        senderZip: '10118',
        senderCountry: 'United States',

        // Receiver
        receiverName: 'Aisha Okonkwo',
        receiverCompany: 'Lagos Tech Distribution',
        receiverEmail: 'aisha@lagostechdist.com',
        receiverPhone: '+234 801 234 5678',
        receiverAddress: '15 Admiralty Way, Lekki Phase 1',
        receiverCity: 'Lagos',
        receiverState: 'Lagos',
        receiverZip: '106104',
        receiverCountry: 'Nigeria',

        // Routing
        originPort: 'JFK International Airport',
        destinationPort: 'Murtala Muhammed Intl Airport (LOS)',
        carrierName: 'Emirates SkyCargo',
        vesselFlightNumber: 'EK 235',
        shippingMethod: 'Air Freight Priority',
        incoterms: 'CIF - Cost, Insurance, Freight',

        // Freight
        totalWeight: 285.5,
        totalVolume: 3.2,
        packageCount: 4,
        packagePicture: '/shipment-sample.png',

        // Customs / Financial
        customsValue: 47500.00,
        currency: 'USD',
        customsStatus: 'Cleared',

        // Dates
        dispatchDate: new Date('2026-06-20T08:00:00Z'),
        estimatedDeparture: new Date('2026-06-20T14:30:00Z'),
        estimatedArrival: new Date('2026-06-22T06:00:00Z'),

        // Status
        status: 'In Transit',

        // Custom Waybill Specs
        paymentStatus: 'Paid',
        stampDuty: 'Paid',
        volumetricWeight: 285.5,
        xrayScanResult: 'Non-Harmful Content (Negative)',
        serviceCharge: '12,400 USD',
        harmonizedCode: 'Yes',
        senderVat: 'VAT-US-10294',
        receiverVat: 'VAT-NG-88301',
        typeOfExport: 'Permanent',
        dutiesPaymentTerms: 'Sender',
        toBePickedUpBy: 'Aisha Okonkwo',
        authorizedSignature: 'James Carter',

        // Services Checklist
        servicePackaging: false,
        serviceCargo: true,
        serviceWorldwide: true,
        serviceDoorToDoor: true,
        serviceOther: false,

        // Cargo Manifest Items
        items: {
          create: [
            {
              description: 'Industrial Server Rack Units (42U)',
              quantity: 2,
              weight: 180.0,
              length: 120,
              width: 60,
              height: 200,
              hsCode: '8471.50',
              value: 28000.00,
            },
            {
              description: 'High-Performance GPU Modules (NVIDIA A100)',
              quantity: 12,
              weight: 48.0,
              length: 30,
              width: 20,
              height: 5,
              hsCode: '8473.30',
              value: 15000.00,
            },
            {
              description: 'Network Switch & Cabling Kit',
              quantity: 4,
              weight: 32.5,
              length: 50,
              width: 40,
              height: 15,
              hsCode: '8517.62',
              value: 3500.00,
            },
            {
              description: 'UPS Battery Backup Systems',
              quantity: 2,
              weight: 25.0,
              length: 40,
              width: 30,
              height: 20,
              hsCode: '8507.20',
              value: 1000.00,
            },
          ],
        },

        // Tracking Event Log
        updates: {
          create: [
            {
              location: 'New York, United States',
              status: 'Picked Up',
              description: 'Cargo collected from shipper premises by WesternApex ground courier. All 4 packages inspected and sealed.',
              timestamp: new Date('2026-06-20T08:30:00Z'),
            },
            {
              location: 'JFK Cargo Terminal 4, New York',
              status: 'At Origin Hub',
              description: 'Shipment received at JFK air cargo facility. Security screening and customs export declaration completed.',
              timestamp: new Date('2026-06-20T11:00:00Z'),
            },
            {
              location: 'JFK International Airport, New York',
              status: 'Departed',
              description: 'Cargo loaded onto Emirates SkyCargo flight EK 235. Estimated flight duration: 10h 45m via Dubai.',
              timestamp: new Date('2026-06-20T14:30:00Z'),
            },
            {
              location: 'Dubai International Airport (DXB)',
              status: 'In Transit - Layover',
              description: 'Arrived at Dubai cargo hub for scheduled layover and connection to Lagos-bound flight EK 783.',
              timestamp: new Date('2026-06-21T02:15:00Z'),
            },
            {
              location: 'Airborne - Over Central Africa',
              status: 'In Transit',
              description: 'Cargo departed Dubai on connecting flight EK 783. Currently over Saharan airspace. ETA Lagos: 06:00 UTC.',
              timestamp: new Date('2026-06-21T18:00:00Z'),
            },
          ],
        },
      },
      include: {
        items: true,
      }
    });
    console.log('✅ Sample shipment AWB-88012345 seeded');
    try {
      await sendSeedEmail(shipment1);
    } catch (err) {
      console.error(`⚠️  Email failed for ${shipment1.trackingNumber}: ${err.message}`);
    }

  const shipment2 = await prisma.shipment.create({
      data: {
        trackingNumber: 'HSCD0304132',
        referenceNumber: 'AWB-HSCD0304132',

        // Sender
        senderName: 'Ju-won Kim Michael',
        senderCompany: 'HoboSwift Deliveries Co.',
        senderEmail: 'juwon@hoboswift.com',
        senderPhone: '+1 619 555 0199',
        senderAddress: '235 market St (at 2nd Ave)',
        senderCity: 'San Diego',
        senderState: 'CA',
        senderZip: '92101',
        senderCountry: 'United States',

        // Receiver
        receiverName: 'Sophia binti Anuar',
        receiverCompany: 'Personal cargo',
        receiverEmail: 'Sophiaanuar73@gmail.com',
        receiverPhone: '+60 12 345 6789',
        receiverAddress: '10, Jalan Warisan Mulia 4/3. Kota Warisan.',
        receiverCity: 'Sepang',
        receiverState: 'Selangor',
        receiverZip: '43900',
        receiverCountry: 'Malaysia',

        // Routing
        originPort: 'United States',
        destinationPort: 'Malaysia',
        carrierName: 'HoboSwift Central Delivery',
        vesselFlightNumber: 'HS-8092',
        shippingMethod: 'Air Freight',
        incoterms: 'DDP',

        // Freight
        totalWeight: 45.0,
        totalVolume: 0.5,
        packageCount: 1,
        packagePicture: null,

        // Customs / Financial
        customsValue: 5000.00,
        currency: 'USD',
        customsStatus: 'Cleared',

        // Dates
        dispatchDate: new Date('2026-05-25T08:00:00Z'),
        estimatedDeparture: new Date('2026-05-25T12:00:00Z'),
        estimatedArrival: new Date('2026-05-27T18:00:00Z'),

        // Status
        status: 'In Transit',

        // Custom Waybill Specs
        paymentStatus: 'Paid',
        stampDuty: 'Paid',
        volumetricWeight: 45.0,
        xrayScanResult: 'Non-Harmful Content (Negative)',
        serviceCharge: '5,000 dollars which is equivalent to 4,600 EUR',
        harmonizedCode: 'Yes',
        senderVat: 'VAT-999-Sender',
        receiverVat: 'VAT-888-Receiver',
        typeOfExport: 'Permanent',
        dutiesPaymentTerms: 'Receiver',
        toBePickedUpBy: 'Sophia binti Anuar',
        authorizedSignature: 'Ju-won Kim Michael',

        // Services Checklist
        servicePackaging: true,
        serviceCargo: true,
        serviceWorldwide: false,
        serviceDoorToDoor: false,
        serviceOther: false,

        // Cargo Manifest Items
        items: {
          create: [
            {
              description: 'Package and luggage containing personal belongings',
              quantity: 1,
              weight: 45.0,
              length: 60,
              width: 50,
              height: 40,
              hsCode: '9905.00',
              value: 5000.00,
            },
          ],
        },

        // Tracking Event Log
        updates: {
          create: [
            {
              location: 'San Diego, United States',
              status: 'Picked Up',
              description: 'Waybill generated and shipment collected for international transit.',
              timestamp: new Date('2026-05-25T08:30:00Z'),
            },
            {
              location: 'San Diego Hub, CA',
              status: 'Processing',
              description: 'Security scan negative. Customs cleared for air transport.',
              timestamp: new Date('2026-05-25T11:45:00Z'),
            },
          ],
        },
      },
      include: {
        items: true,
      }
    });
    console.log('✅ Sample shipment HSCD0304132 seeded');
    console.log('   → Track it at: http://localhost:3000/track/HSCD0304132');
    try {
      await sendSeedEmail(shipment2);
    } catch (err) {
      console.error(`⚠️  Email failed for ${shipment2.trackingNumber}: ${err.message}`);
    }

  const shipment3 = await prisma.shipment.create({
      data: {
        trackingNumber: 'WAX-CUSTOMS-9921',
        referenceNumber: 'INV-2026-0091',

        // Sender
        senderName: 'Marco Bellini',
        senderCompany: 'Bellini Fine Imports S.p.A.',
        senderEmail: 'marco@belliniimports.it',
        senderPhone: '+39 02 5550 1987',
        senderAddress: 'Via Torino 45',
        senderCity: 'Milan',
        senderState: 'MI',
        senderZip: '20123',
        senderCountry: 'Italy',

        // Receiver
        receiverName: 'David Whitfield',
        receiverCompany: 'Whitfield & Co. Trading',
        receiverEmail: 'david@whitfieldtrading.co.uk',
        receiverPhone: '+44 20 7946 0958',
        receiverAddress: '22 Bishopsgate',
        receiverCity: 'London',
        receiverState: 'Greater London',
        receiverZip: 'EC2N 4AJ',
        receiverCountry: 'United Kingdom',

        // Routing
        originPort: 'Milan Malpensa Airport (MXP)',
        destinationPort: 'London Heathrow Airport (LHR)',
        carrierName: 'Alitalia Cargo',
        vesselFlightNumber: 'AZ-1284',
        shippingMethod: 'Air Freight Express',
        incoterms: 'DDP - Delivered Duty Paid',

        // Freight
        totalWeight: 112.0,
        totalVolume: 1.4,
        packageCount: 3,
        packagePicture: null,

        // Customs / Financial
        customsValue: 18500.00,
        currency: 'EUR',
        customsStatus: 'Cleared',

        // Dates
        dispatchDate: new Date('2026-06-23T07:00:00Z'),
        estimatedDeparture: new Date('2026-06-23T13:00:00Z'),
        estimatedArrival: new Date('2026-06-24T09:00:00Z'),

        // Status
        status: 'In Transit',

        // Custom Waybill Specs — duties fully settled so no outstanding-payment warning
        paymentStatus: 'Paid',
        stampDuty: 'Paid',
        volumetricWeight: 118.5,
        xrayScanResult: 'Non-Harmful Content (Negative)',
        serviceCharge: '950 EUR',
        harmonizedCode: 'Yes',
        senderVat: 'IT-VAT-04471203',
        receiverVat: 'GB-VAT-887621144',
        typeOfExport: 'Permanent',
        dutiesPaymentTerms: 'Sender',
        toBePickedUpBy: 'David Whitfield',
        authorizedSignature: 'Marco Bellini',

        // Services Checklist
        servicePackaging: true,
        serviceCargo: true,
        serviceWorldwide: true,
        serviceDoorToDoor: true,
        serviceOther: false,

        // Cargo Manifest Items
        items: {
          create: [
            {
              description: 'Hand-Crafted Leather Furniture Set',
              quantity: 2,
              weight: 65.0,
              length: 180,
              width: 90,
              height: 85,
              hsCode: '9403.30',
              value: 12000.00,
            },
            {
              description: 'Murano Glass Decorative Pieces',
              quantity: 8,
              weight: 22.0,
              length: 40,
              width: 40,
              height: 50,
              hsCode: '7013.10',
              value: 6500.00,
            },
          ],
        },

        // Tracking Event Log
        updates: {
          create: [
            {
              location: 'Milan, Italy',
              status: 'Picked Up',
              description: 'Cargo collected from consignor warehouse. Customs duties and stamp duty pre-paid by sender.',
              timestamp: new Date('2026-06-23T07:30:00Z'),
            },
            {
              location: 'Milan Malpensa Cargo Terminal',
              status: 'At Origin Hub',
              description: 'Export declaration filed and cleared. Duties settled in full — no further payment due at destination.',
              timestamp: new Date('2026-06-23T10:00:00Z'),
            },
            {
              location: 'Milan Malpensa Airport (MXP)',
              status: 'Departed',
              description: 'Cargo loaded onto Alitalia Cargo flight AZ-1284, bound for London Heathrow.',
              timestamp: new Date('2026-06-23T13:00:00Z'),
            },
          ],
        },
      },
      include: {
        items: true,
      }
    });
    console.log('✅ Sample shipment WAX-CUSTOMS-9921 seeded (duties pre-paid)');
    console.log('   → Track it at: http://localhost:3000/track/WAX-CUSTOMS-9921');
    try {
      await sendSeedEmail(shipment3);
    } catch (err) {
      console.error(`⚠️  Email failed for ${shipment3.trackingNumber}: ${err.message}`);
    }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
