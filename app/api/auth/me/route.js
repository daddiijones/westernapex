import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'westernapex-super-secret-key-2026';

export async function GET(request) {
  try {
    const token = request.cookies.get('westernapex_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Not authenticated.' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    return NextResponse.json({
      success: true,
      admin: { id: decoded.id, email: decoded.email, name: decoded.name, role: decoded.role },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid or expired token.' }, { status: 401 });
  }
}
