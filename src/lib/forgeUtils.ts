// lib/forgeUtils.ts
import forge from 'node-forge';

export function generateKeyPair(): Promise<forge.pki.rsa.KeyPair> {
  return new Promise((resolve, reject) => {
    forge.pki.rsa.generateKeyPair({ bits: 2048, workers: 2 }, (err, keypair) => {
      if (err) reject(err);
      resolve(keypair);
    });
  });
}

export function publicKeyToPem(publicKey: forge.pki.PublicKey): string {
  return forge.pki.publicKeyToPem(publicKey);
}

export function privateKeyToPem(privateKey: forge.pki.PrivateKey): string {
  return forge.pki.privateKeyToPem(privateKey);
}