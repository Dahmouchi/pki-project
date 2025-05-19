// scripts/generate-ca.ts
import fs from 'fs';
import path from 'path';
import forge from 'node-forge';

const pki = forge.pki;

function generateCA() {
  const keys = pki.rsa.generateKeyPair(2048);
  const cert = pki.createCertificate();

  cert.publicKey = keys.publicKey;
  cert.serialNumber = '01';
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 10); // Valid 10 years

  cert.setSubject([
    { name: 'commonName', value: 'Exam System CA' },
    { name: 'organizationName', value: 'Exam System' },
  ]);
  cert.setIssuer(cert.subject.attributes); // Self-signed

  cert.setExtensions([
    { name: 'basicConstraints', cA: true },
    { name: 'keyUsage', keyCertSign: true, digitalSignature: true, cRLSign: true },
    { name: 'subjectKeyIdentifier' },
  ]);

  cert.sign(keys.privateKey, forge.md.sha256.create());

  // PEM encoding
  const privateKeyPem = pki.privateKeyToPem(keys.privateKey);
  const publicKeyPem = pki.publicKeyToPem(keys.publicKey);
  const certPem = pki.certificateToPem(cert);

  const outDir = path.join(process.cwd());
  fs.writeFileSync(path.join(outDir, 'ca-private.pem'), privateKeyPem);
  fs.writeFileSync(path.join(outDir, 'ca-public.pem'), publicKeyPem);
  fs.writeFileSync(path.join(outDir, 'ca-cert.pem'), certPem);

  console.log('✅ CA generated: ca-private.pem, ca-public.pem, ca-cert.pem');
}

generateCA();
