/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ExamQuestions.tsx
'use client';
import { useEffect, useState } from 'react';

export default function ExamQuestions() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const studentId = sessionStorage.getItem('studentId');
        const response = await fetch('/api/exam-questions', {
          headers: {
            'X-Student-ID': studentId || '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }

        const data = await response.json();
        setQuestions(data.questions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load questions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (isLoading) return <div>Loading questions...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      {questions.map((question:any, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Question {index + 1}</h3>
          <p className="mb-3">{question.text}</p>
          {question.options && (
            <ul className="space-y-2">
              {question.options.map((option:any, i:any) => (
                <li key={i} className="flex items-center">
                  <input
                    type={question.multiple ? 'checkbox' : 'radio'}
                    id={`q${index}-o${i}`}
                    name={`question-${index}`}
                    className="mr-2"
                  />
                  <label htmlFor={`q${index}-o${i}`}>{option}</label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <button className="mt-4 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700">
        Submit Exam
      </button>
    </div>
  );
}