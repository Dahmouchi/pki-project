// scripts/setupCA.ts
import forge from 'node-forge';
import fs from 'fs';
import path from 'path';

// Generate CA key pair
const keys = forge.pki.rsa.generateKeyPair(2048);

// Create CA certificate
const cert = forge.pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 10);

// CA subject
cert.setSubject([
  { name: 'commonName', value: 'Exam System CA' },
  { name: 'organizationName', value: 'Exam System' },
  { name: 'countryName', value: 'MA' },
]);

// CA issuer (self-signed)
cert.setIssuer(cert.subject.attributes);

// Extensions
cert.setExtensions([
  { name: 'basicConstraints', cA: true },
  { name: 'keyUsage', keyCertSign: true, digitalSignature: true, keyEncipherment: true },
]);

// Sign the CA certificate with its own private key
cert.sign(keys.privateKey, forge.md.sha256.create());

// Save CA files
const caPrivatePem = forge.pki.privateKeyToPem(keys.privateKey);
const caPublicPem = forge.pki.publicKeyToPem(keys.publicKey);
const caCertPem = forge.pki.certificateToPem(cert);

const outputDir = path.join(process.cwd());
fs.writeFileSync(path.join(outputDir, 'ca-private.pem'), caPrivatePem);
fs.writeFileSync(path.join(outputDir, 'ca-public.pem'), caPublicPem);
fs.writeFileSync(path.join(outputDir, 'ca-cert.pem'), caCertPem);

console.log('CA setup complete! Files saved to project root:');
console.log('- ca-private.pem (keep this secure!)');
console.log('- ca-public.pem');
console.log('- ca-cert.pem');