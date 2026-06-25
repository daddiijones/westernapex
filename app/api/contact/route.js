import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

export async function POST(request) {
  try {
    const { name, email, company, phone, service, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Map service code to readable labels
    const serviceLabels = {
      air: 'Air Freight',
      ocean: 'Ocean Freight',
      road: 'Road & Rail',
      customs: 'Customs Brokerage',
      warehouse: 'Warehousing & 3PL',
      consulting: 'Supply Chain Consulting',
    };
    const serviceLabel = serviceLabels[service] || 'General Logistics Inquiry';

    // Create transport from environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
      port: parseInt(process.env.SMTP_PORT || "2525"),
      auth: {
        user: process.env.SMTP_USER || "125fc52da35a45",
        pass: process.env.SMTP_PASS || "982adb369f2d47"
      }
    });

    const adminEmail = process.env.ADMIN_EMAIL || "admin@westernapex.online";

    // Build solid, beautiful HTML template matching corporate identity
    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Logistics Inquiry</title>
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
    .title {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 24px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 12px;
    }
    .grid {
      width: 100%;
      margin-bottom: 24px;
      border-collapse: collapse;
    }
    .grid td {
      padding: 10px 0;
      vertical-align: top;
      font-size: 14px;
    }
    .grid td.label {
      color: #64748b;
      font-weight: 600;
      width: 140px;
    }
    .grid td.value {
      color: #0f172a;
      font-weight: 700;
    }
    .message-box {
      background-color: #f8fafc;
      border-left: 4px solid #ef4444;
      border-radius: 4px;
      padding: 20px;
      margin-top: 16px;
      font-size: 14px;
      line-height: 1.6;
      color: #334155;
      font-style: italic;
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
        <div class="title">New Logistics Inquiry / Quote Request</div>
        
        <table class="grid">
          <tr>
            <td class="label">Full Name:</td>
            <td class="value">${name}</td>
          </tr>
          <tr>
            <td class="label">Email Address:</td>
            <td class="value"><a href="mailto:${email}" style="color: #ef4444; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td class="label">Phone Number:</td>
            <td class="value">${phone || 'Not Provided'}</td>
          </tr>
          <tr>
            <td class="label">Company Name:</td>
            <td class="value">${company || 'Not Provided'}</td>
          </tr>
          <tr>
            <td class="label">Service Interest:</td>
            <td class="value" style="color: #ef4444;">${serviceLabel}</td>
          </tr>
        </table>
        
        <div style="font-size: 14px; font-weight: 600; color: #64748b; margin-top: 24px;">Message Details:</div>
        <div class="message-box">
          "${message.replace(/\n/g, '<br>')}"
        </div>
      </div>
      <div class="footer">
        This inquiry was sent from the contact form on <a href="https://westernapex.online">WesternApex Portal</a>.<br>
        &copy; ${new Date().getFullYear()} WesternApex Logistics. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Send the mail
    await transporter.sendMail({
      from: `"WesternApex Portal" <no-reply@westernapex.online>`,
      to: adminEmail,
      subject: `[Logistics Inquiry] ${serviceLabel} - ${name}`,
      text: `New Inquiry from ${name} (${email}): ${message}`,
      html: htmlTemplate,
      attachments: [{
        filename: 'logo.png',
        path: path.join(process.cwd(), 'public/logo.png'),
        cid: 'logo'
      }]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mail sending error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send your inquiry. Please try again later.' }, { status: 500 });
  }
}
