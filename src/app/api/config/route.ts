import { NextRequest, NextResponse } from 'next/server';


export function GET(req: NextRequest) {
  return NextResponse.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
}