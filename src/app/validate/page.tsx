/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UploadIcon, Loader2 } from "lucide-react";

export default function CertificateValidator() {
  const [certificate, setCertificate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCertificate(content);
    };
    reader.readAsText(file);
  };

  const handleValidateCertificate = async () => {
    if (!certificate) {
      setError("Please upload or paste a certificate");
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
          action: 'validate',
          certificate: JSON.parse(certificate)
        }),
      });

      const data = await response.json();
      if (data.valid) {
        sessionStorage.setItem('certValidated', 'true');
        sessionStorage.setItem('studentInfo', JSON.stringify(data.student));
        router.push('/exam');
      } else {
        setError(data.error || "Certificate validation failed");
      }
    } catch (err) {
      setError("Invalid certificate format");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Validate Certificate
          </CardTitle>
          <CardDescription className="text-gray-600">
            Upload or paste your certificate to access the exam
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-700">Upload Certificate</Label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon className="w-8 h-8 mb-3 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">TXT file only</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".txt"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">OR</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700">Paste Certificate</Label>
              <textarea
                className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
                placeholder="Paste your certificate content here..."
                rows={6}
              />
            </div>
          </div>
          
          {error && (
            <Alert variant="destructive" className="border-red-200">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col gap-3">
          <Button 
            onClick={handleValidateCertificate}
            disabled={loading || !certificate}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Validating...
              </>
            ) : "Validate & Enter Exam"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push('/generate')}
            className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-50"
          >
            Generate New Certificate
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}