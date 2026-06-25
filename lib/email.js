import nodemailer from 'nodemailer';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const smtpPort = parseInt(process.env.SMTP_PORT || "2525");

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER || process.env.MAILTRAP_USER || "125fc52da35a45",
    pass: process.env.SMTP_PASS || process.env.MAILTRAP_PASS || "982adb369f2d47"
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendShipmentCreatedEmail = async (shipment) => {
  try {
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

    const info = await transport.sendMail({
      from: `"WesternApex Logistics" <${process.env.EMAIL_FROM || 'support@westernapex.online'}>`,
      to: receiverEmail,
      subject: `Shipment Created: Tracking #${trackingNumber}`,
      html: htmlContent,
      attachments: [{
        filename: 'logo.png',
        path: path.join(process.cwd(), 'public/logo.png'),
        cid: 'logo'
      }]
    });
    console.log("Created message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending created email:", error);
  }
};

export const sendShipmentUpdateEmail = async (receiverEmail, trackingNumber, receiverName, location, status, description) => {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber }
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cargo Update - WesternApex</title>
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
      padding: 40px;
    }
    .welcome-text {
      font-size: 16px;
      line-height: 1.6;
      color: #334155;
      margin-bottom: 24px;
    }
    .status-panel {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 24px;
      margin: 24px 0;
    }
    .status-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748b;
      letter-spacing: 0.08em;
      margin-bottom: 6px;
    }
    .status-value {
      font-size: 20px;
      font-weight: 900;
      color: #ef4444;
      margin-bottom: 16px;
    }
    .grid {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
      border-top: 1px solid #f1f5f9;
      padding-top: 16px;
    }
    .grid td {
      padding: 8px 0;
      font-size: 14px;
      vertical-align: top;
    }
    .grid td.label {
      color: #64748b;
      font-weight: 600;
      width: 120px;
    }
    .grid td.value {
      color: #0f172a;
      font-weight: 700;
    }
    .description-box {
      font-size: 14px;
      line-height: 1.5;
      color: #475569;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 3px solid #ef4444;
      padding: 14px;
      border-radius: 4px;
      margin-top: 8px;
      font-style: italic;
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
      text-align: center;
      margin-top: 12px;
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
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header" style="text-align: center; padding: 24px;">
        <img src="cid:logo" alt="WesternApex SHIPMENT SOLUTIONS" style="height: 60px; width: auto; display: inline-block; vertical-align: middle;" />
      </div>
      <div class="content">
        ${shipment && shipment.stampDuty && shipment.stampDuty !== 'Exempt' ? `
        <div style="text-align: right; margin-bottom: -35px; margin-top: 0px; position: relative; z-index: 10;">
          <div style="display: inline-block; border: 4px double #ef4444; color: #ef4444; font-family: 'Courier New', monospace; font-size: 14px; font-weight: bold; text-transform: uppercase; padding: 6px 12px; transform: rotate(-10deg); border-radius: 4px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            STAMP DUTY (${shipment.stampDuty})
          </div>
        </div>
        ` : ''}
        <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 16px;">New Cargo Transit Update</h2>
        <p class="welcome-text">Hello ${receiverName},</p>
        <p class="welcome-text">There is a new update regarding your registered package in transit.</p>
        
        <div class="status-panel">
          <div class="status-title">Current Status</div>
          <div class="status-value">${status}</div>
          
          <table class="grid">
            <tr>
              <td class="label">Waybill #:</td>
              <td class="value">${trackingNumber}</td>
            </tr>
            <tr>
              <td class="label">Location:</td>
              <td class="value">${location}</td>
            </tr>
            ${shipment ? `
            <tr>
              <td class="label">Volumetric Wt:</td>
              <td class="value">${shipment.volumetricWeight ? `${shipment.volumetricWeight} KG` : 'N/A'}</td>
            </tr>
            <tr>
              <td class="label">X-Ray Scan:</td>
              <td class="value">${shipment.xrayScanResult || 'Negative'}</td>
            </tr>
            <tr>
              <td class="label">Payment Status:</td>
              <td class="value" style="color: ${shipment.paymentStatus === 'Paid' ? '#10b981' : '#f59e0b'}; font-weight: bold;">${shipment.paymentStatus || 'Pending'}</td>
            </tr>
            ` : ''}
          </table>
          
          ${description ? `
            <div style="font-size: 12px; font-weight: 600; color: #64748b; margin-top: 16px;">Checkpoint Details:</div>
            <div class="description-box">"${description}"</div>
          ` : ''}
        </div>
        
        <!-- Customs Note Box -->
        ${!shipment || shipment.paymentStatus !== 'Paid' ? `
        <div style="background-color: #fef2f2; border: 1px dashed #fca5a5; border-radius: 8px; padding: 14px; margin-bottom: 24px; text-align: center; color: #ef4444; font-size: 12px; font-weight: bold; letter-spacing: 0.05em;">
          ⚠️ CUSTOM DUTIES AND CLEARANCE FEES MUST BE PAID BEFORE DELIVERY
        </div>
        ` : ''}
        
        <div style="text-align: center; margin: 32px 0 16px;">
          <a href="https://westernapex.online/track/${trackingNumber}" class="btn">View Live Tracking History</a>
        </div>
      </div>
      <div class="footer">
        This is an automated notification. Please do not reply directly to this message.<br>
        &copy; ${new Date().getFullYear()} WesternApex Logistics. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>
    `;

    const info = await transport.sendMail({
      from: `"WesternApex Logistics" <${process.env.EMAIL_FROM || 'support@westernapex.online'}>`,
      to: receiverEmail,
      subject: `Shipment Update: Tracking #${trackingNumber}`,
      html: htmlContent,
      attachments: [{
        filename: 'logo.png',
        path: path.join(process.cwd(), 'public/logo.png'),
        cid: 'logo'
      }]
    });
    console.log("Update message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending update email:", error);
  }
};
