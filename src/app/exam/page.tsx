/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Check, CheckCheck, CheckCircle, CircleGauge, Clock, Download, Flag, Percent, User, X } from "lucide-react";

export default function CryptographyExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const [isValidated, setIsValidated] = useState(false);

const [studentData, setStudentData] = useState<any>();

useEffect(() => {
  // Check for certificate validation in session storage
  const certValidated = sessionStorage.getItem('certValidated');
  const studentInfo = sessionStorage.getItem('studentInfo');
  
  if (!certValidated) {
    router.push('/validate');
  } else {
    setIsValidated(true);
    
    if (studentInfo) {
      try {
        const parsedInfo = JSON.parse(studentInfo);
        setStudentData(parsedInfo);
      } catch (error) {
        console.error('Error parsing student info:', error);
      }
    }
  }
}, [router]);

  if (!isValidated) {
    return null; // or a loading spinner
  }
  // Cryptography exam questions
const questions = [
  {
    question: "Which of the following is a symmetric encryption algorithm?",
    options: [
      "A) RSA",
      "B) ECC",
      "C) AES",
      "D) DSA"
    ],
    correctAnswer: "C) AES",
    explanation: "AES (Advanced Encryption Standard) is a symmetric encryption algorithm that uses the same key for both encryption and decryption. RSA, ECC, and DSA are asymmetric algorithms used for different purposes like key exchange and digital signatures.",
    image: "https://www.trentonsystems.com/hs-fs/hubfs/symmetric%20cryptography%20process.jpg?width=1503&name=symmetric%20cryptography%20process.jpg"
  },
  {
    question: "What is the main purpose of a cryptographic hash function?",
    options: [
      "A) Encrypt data for secure transmission",
      "B) Generate a fixed-size output from variable-size input",
      "C) Create digital signatures",
      "D) Exchange secret keys over public channels"
    ],
    correctAnswer: "B) Generate a fixed-size output from variable-size input",
    explanation: "Cryptographic hash functions take input of any size and produce a fixed-size output (hash). While hashes are used in digital signatures and other security applications, their core purpose is creating fixed-length digests of data.",
    image: "https://positiwise.com/blog/wp-content/uploads/2023/08/hash-function.png"
  },
  {
    question: "Which protocol uses both symmetric and asymmetric cryptography?",
    options: [
      "A) RSA",
      "B) SHA-256",
      "C) SSL/TLS",
      "D) MD5"
    ],
    correctAnswer: "C) SSL/TLS",
    explanation: "SSL/TLS uses asymmetric cryptography for authentication and key exchange, then switches to symmetric cryptography for the actual data encryption. This combines the benefits of both: the security of asymmetric and the performance of symmetric crypto.",
    image: "https://www.clickssl.net/wp-content/uploads/2019/12/symmetric-encryption-vs-asymmetric-encryption.jpg"
  },
  {
    question: "What is the main vulnerability that Diffie-Hellman key exchange addresses?",
    options: [
      "A) Man-in-the-middle attacks",
      "B) Key distribution problem",
      "C) Brute force attacks",
      "D) Side-channel attacks"
    ],
    correctAnswer: "B) Key distribution problem",
    explanation: "Diffie-Hellman solves the key distribution problem by allowing two parties to establish a shared secret over an insecure channel. While it doesn't inherently prevent MITM attacks (which require authentication), it eliminates the need to distribute secret keys in advance.",
    image: "https://higherlogicdownload.s3.amazonaws.com/IMWUC/UploadedImages/92757287-d116-4157-b004-c2a0aba1b048/Understanding-the-Diffie-Hellman-Key-Exchange.png"
  },
  {
    question: "Which of these is NOT a property of secure cryptographic hash functions?",
    options: [
      "A) Pre-image resistance",
      "B) Collision resistance",
      "C) Avalanche effect",
      "D) Reversibility"
    ],
    correctAnswer: "D) Reversibility",
    explanation: "Secure hash functions are designed to be one-way functions, meaning they should be computationally infeasible to reverse. Pre-image resistance, collision resistance, and avalanche effect (small input changes causing large output changes) are all desirable properties.",
    image: "https://positiwise.com/blog/wp-content/uploads/2023/08/hash-function.png"
  }
];
  const handleAnswerSelect = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
 const finish = () => {
    sessionStorage.removeItem("studentInfo")
    sessionStorage.removeItem("certValidated")
    router.push("/")

  };
  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setIsSubmitted(true);
  };
  const progressValue = ((currentQuestion + 1) / questions.length) * 100;

  if (isSubmitted) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Student Info Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Exam Results</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-gray-700">{studentData.name}</p>
                <p className="text-sm text-gray-500">Student ID: {studentData.studentId}</p>
              </div>
            </div>
          </div>
          <div className="bg-indigo-50 px-4 py-3 rounded-lg">
            <p className="text-sm text-gray-600">Course</p>
            <p className="font-semibold text-indigo-700">Cryptography 101</p>
            <div className="flex items-center gap-2 mt-1">
              <CalendarDays className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Score Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-sm text-gray-500">Score</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <CircleGauge className="w-5 h-5 text-indigo-600" />
              <p className="text-3xl font-bold text-gray-800">
                {score}<span className="text-lg text-gray-500">/{questions.length}</span>
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-sm text-gray-500">Percentage</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Percent className="w-5 h-5 text-indigo-600" />
              <p className="text-3xl font-bold text-gray-800">
                {Math.round((score / questions.length) * 100)}%
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-sm text-gray-500">Time Taken</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <p className="text-3xl font-bold text-gray-800">24:35</p>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Question Breakdown</h2>
            <p className="text-gray-500 text-sm">Review your answers and explanations</p>
          </div>
          
          <div className="divide-y">
            {questions.map((q, index) => (
              <div key={index} className="p-6">
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${answers[index] === q.correctAnswer ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {answers[index] === q.correctAnswer ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-gray-800">{q.question}</p>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className={`p-3 rounded-lg ${answers[index] === q.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                        <p className="text-sm font-medium text-gray-500">Your answer</p>
                        <p className={`mt-1 font-medium ${answers[index] === q.correctAnswer ? 'text-green-700' : 'text-red-700'}`}>
                          {answers[index] || "Not answered"}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-sm font-medium text-gray-500">Correct answer</p>
                        <p className="mt-1 font-medium text-blue-700">{q.correctAnswer}</p>
                      </div>
                    </div>
                    {q.explanation && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm font-medium text-gray-500">Explanation</p>
                        <p className="mt-1 text-sm text-gray-700">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-6 border-t flex justify-end gap-2">
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Download Results
            </Button>
            <Button className="gap-2" onClick={finish}>
            <CheckCheck className="w-4 h-4" />
              Finish exam
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
    <div className="max-w-4xl mx-auto">
      {/* Student Info Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cryptography Exam</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium text-gray-700">FullName: {studentData.name}</p>
              <p className="text-sm text-gray-500">Student ID: {studentData.studentId}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-indigo-50 px-4 py-3 rounded-lg">
            <p className="text-sm text-gray-600">Time Remaining</p>
            <p className="font-semibold text-indigo-700 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              45:22
            </p>
          </div>
          <div className="bg-indigo-50 px-4 py-3 rounded-lg">
            <p className="text-sm text-gray-600">Question</p>
            <p className="font-semibold text-indigo-700">
              {currentQuestion + 1}<span className="text-gray-500">/{questions.length}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Exam Content */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Progress bar */}
        <div className="h-2 bg-gray-100 w-full">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300" 
            style={{ width: `${progressValue}%` }}
          ></div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="space-y-8">
            {/* Question */}
            <div>
              <h3 className="text-xl font-medium text-gray-800">
                {questions[currentQuestion].question}
              </h3>
              {questions[currentQuestion].image && (
                <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={questions[currentQuestion].image} 
                    alt="Question illustration" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
            
            {/* Options */}
            <RadioGroup 
              value={answers[currentQuestion] || ""}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${answers[currentQuestion] === option ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50'}`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${answers[currentQuestion] === option ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'}`}>
                      {answers[currentQuestion] === option && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <Label htmlFor={`option-${index}`} className="text-gray-700 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
            
            {/* Navigation */}
            <div className="flex flex-col-reverse md:flex-row justify-between gap-3 pt-4">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    // Mark for review functionality
                  }}
                  className="gap-2"
                >
                  <Flag className="w-4 h-4" />
                  Flag for Review
                </Button>
              </div>
              
              {currentQuestion < questions.length - 1 ? (
                <Button onClick={handleNext} className="gap-2">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="gap-2 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4" />
                  Submit Exam
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Question Navigation Grid */}
      <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-medium text-gray-800 mb-4">Question Navigation</h3>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-full aspect-square rounded-md flex items-center justify-center text-sm font-medium transition-all ${currentQuestion === index ? 'bg-indigo-600 text-white' : answers[index] ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}
