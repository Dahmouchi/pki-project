/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  // Read from environment variables
  const caCert = process.env.CA_CERT;
  const caPrivateKey = process.env.CA_PRIVATE_KEY;
  const caPublicKey = process.env.CA_PUBLIC_KEY;

  if (!caCert || !caPrivateKey || !caPublicKey) {
    return NextResponse.json(
      { error: 'Certificate authority not properly configured' },
      { status: 500 }
    );
  }

  const { name, studentId, action, certificate } = await request.json();

  if (action === 'generate') {
    const certData = {
      name,
      studentId,
      issuedAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    };

    const sign = crypto.createSign('SHA256');
    sign.update(JSON.stringify(certData));
    const signature = sign.sign(caPrivateKey, 'base64');

    return NextResponse.json({
      certificate: {
        data: certData,
        signature,
        caPublicKey
      }
    });
  } 
  else if (action === 'validate') {
    try {
      const { data, signature } = certificate;
      const verify = crypto.createVerify('SHA256');
      verify.update(JSON.stringify(data));
      const isValid = verify.verify(caPublicKey, signature, 'base64');

      if (!isValid) {
        return NextResponse.json({ valid: false, error: 'Invalid signature' }, { status: 400 });
      }

      if (new Date(data.expiresAt) < new Date()) {
        return NextResponse.json({ valid: false, error: 'Certificate expired' }, { status: 400 });
      }

      return NextResponse.json({ valid: true, student: data });
    } catch (error) {
      return NextResponse.json({ valid: false, error: 'Invalid certificate' }, { status: 400 });
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}