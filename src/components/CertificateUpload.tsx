// components/CertificateUpload.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CertificateUpload() {
  const [certificate, setCertificate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/verify-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ certificatePem: certificate }),
      });

      const data = await response.json();

      if (!response.ok || !data.valid) {
        throw new Error(data.reason || 'Invalid certificate');
      }

      // Store verification in session and redirect to exam
      sessionStorage.setItem('certificateVerified', 'true');
      sessionStorage.setItem('studentId', data.studentId);
      router.push('/exam');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Your Certificate</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="certificate" className="block text-sm font-medium mb-2">
            Paste your certificate (PEM format):
          </label>
          <textarea
            id="certificate"
            rows={10}
            className="w-full px-3 py-2 border rounded-md"
            value={certificate}
            onChange={(e) => setCertificate(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isLoading ? 'Verifying...' : 'Access Exam'}
        </button>
      </form>
    </div>
  );
}