/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DownloadIcon, Loader2 } from "lucide-react";

export default function CertificateGenerator() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [certificate, setCertificate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleGenerateCertificate = async () => {
    if (!name || !studentId) {
      setError("Please enter both name and student ID");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generate',
          name,
          studentId
        }),
      });

      const data = await response.json();
      setCertificate(JSON.stringify(data.certificate));
      setSuccess(true);
      setError("");
    } catch (err) {
      setError("Failed to generate certificate");
    } finally {
      setLoading(false);
    }
  };

  const downloadCertificate = () => {
    const element = document.createElement("a");
    const file = new Blob([certificate], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `certificate_${studentId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Generate Exam Certificate
          </CardTitle>
          <CardDescription className="text-gray-600">
            Create your personalized exam access certificate
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!success ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="focus-visible:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-gray-700">Student ID</Label>
                <Input
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="123456"
                  className="focus-visible:ring-indigo-500"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Certificate generated successfully!
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-700">Your Certificate</Label>
                <div className="relative">
                  <textarea
                    className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    value={certificate}
                    readOnly
                    rows={6}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Save this certificate or download it for exam access
                </p>
              </div>
            </div>
          )}
          
          {error && (
            <Alert variant="destructive" className="border-red-200">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col gap-3">
          {!success ? (
            <Button 
              onClick={handleGenerateCertificate}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : "Generate Certificate"}
            </Button>
          ) : (
            <>
              <Button 
                onClick={downloadCertificate}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download Certificate
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/validate')}
                className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-50"
              >
                Validate Certificate
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}