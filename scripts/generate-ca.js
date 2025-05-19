// generateCA.js
import fs from 'fs';
import forge from 'node-forge';
import path from 'path'

console.log('Generating Certificate Authority keys...');

// Generate CA key pair (2048-bit RSA)
const keys = forge.pki.rsa.generateKeyPair(2048);

// Create CA certificate
const cert = forge.pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 10); // 10 year validity

// Set CA subject (your organization details)
cert.setSubject([
  { name: 'commonName', value: 'Exam System CA' },
  { name: 'organizationName', value: 'Exam System' },
  { name: 'countryName', value: 'MA' },
  { name: 'stateOrProvinceName', value: 'Béni Mellal' },
  { name: 'localityName', value: 'Béni Mellal' },
]);

// The CA is self-signed
cert.setIssuer(cert.subject.attributes);

// Set extensions
cert.setExtensions([
  { 
    name: 'basicConstraints',
    cA: true,
    critical: true
  },
  {
    name: 'keyUsage',
    keyCertSign: true,
    digitalSignature: true,
    nonRepudiation: true,
    keyEncipherment: true,
    dataEncipherment: true,
    critical: true
  },
  {
    name: 'subjectKeyIdentifier'
  }
]);

// Sign the certificate with the CA's private key
cert.sign(keys.privateKey, forge.md.sha256.create());

// Convert to PEM format
const caPrivateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
const caPublicKeyPem = forge.pki.publicKeyToPem(keys.publicKey);
const caCertPem = forge.pki.certificateToPem(cert);

// Create directory if it doesn't exist
const outputDir = path.join(__dirname, 'certs');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Save files
fs.writeFileSync(path.join(outputDir, 'ca-private.pem'), caPrivateKeyPem);
fs.writeFileSync(path.join(outputDir, 'ca-public.pem'), caPublicKeyPem);
fs.writeFileSync(path.join(outputDir, 'ca-cert.pem'), caCertPem);

console.log('CA files generated successfully in certs/ directory:');
console.log('- ca-private.pem (TOP SECRET - KEEP THIS SAFE)');
console.log('- ca-public.pem');
console.log('- ca-cert.pem');
console.log('\nWARNING: The CA private key should be protected at all costs!');