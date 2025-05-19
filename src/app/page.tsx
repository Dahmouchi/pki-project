"use client"
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Certificate Portal</title>
        <meta name="description" content="Generate or validate your exam certificates" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Exam Certificate Portal
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Generate your exam access certificate or validate an existing one
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Generate Certificate Card */}
            <div 
              onClick={() => router.push('/generate')}
              className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
            >
              <div className="p-8">
                <div className="w-20 h-20 bg-indigo-100 group-hover:bg-indigo-200 rounded-full flex items-center justify-center mb-6 mx-auto transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Generate Certificate</h2>
                <p className="text-gray-600 mb-6">Create your personalized exam access certificate</p>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300">
                  Get Started
                </button>
              </div>
            </div>

            {/* Validate Certificate Card */}
            <div 
              onClick={() => router.push('/validate')}
              className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
            >
              <div className="p-8">
                <div className="w-20 h-20 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center mb-6 mx-auto transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Validate Certificate</h2>
                <p className="text-gray-600 mb-6">Verify the authenticity of an existing certificate</p>
                <button className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300">
                  Validate Now
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 text-sm text-gray-500">
            <p>Need help? Contact our support team</p>
          </div>
        </div>
      </div>
    </>
  );
}