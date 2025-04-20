import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface ExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  code: string;
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({
  isOpen,
  onClose,
  timeComplexity,
  spaceComplexity,
  explanation,
  code,
}) => {
  const [geminiResponse, setGeminiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const askGemini = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.REACT_APP_GEMINI_API_KEY,
      });

      const prompt = `Please explain what ${timeComplexity} time complexity and ${spaceComplexity} space complexity mean for this code:\n\n${code}\n\nFocus on making it very easy to understand for beginners. Use analogies if helpful.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });

      const text = response.text ?? '';
      setGeminiResponse(text);
    } catch (error) {
      console.error('Error getting Gemini response:', error);
      setGeminiResponse(
        'Sorry, I had trouble getting an explanation from Gemini. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Complexity Explanation
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Time Complexity: {timeComplexity}
            </h3>
            <div className="bg-gray-50 dark:bg-neutral-700 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">
                What this means:
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {timeComplexity === 'O(1)' &&
                  'This algorithm takes constant time regardless of input size.'}
                {timeComplexity === 'O(log n)' &&
                  "This algorithm's time increases logarithmically with input size, typical in divide-and-conquer algorithms."}
                {timeComplexity === 'O(n)' &&
                  "This algorithm's time increases linearly with input size."}
                {timeComplexity === 'O(n log n)' &&
                  'This algorithm combines linear and logarithmic growth, common in efficient sorting algorithms.'}
                {timeComplexity === 'O(n²)' &&
                  "This algorithm's time increases quadratically with input size, often seen in nested loops."}
                {timeComplexity === 'O(2ⁿ)' &&
                  "This algorithm's time doubles with each additional input element, typical in recursive solutions without memoization."}
                {timeComplexity === 'O(n!)' &&
                  "This algorithm's time grows factorially, often seen in permutation problems."}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
              Space Complexity: {spaceComplexity}
            </h3>
            <div className="bg-gray-50 dark:bg-neutral-700 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">
                What this means:
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {spaceComplexity === 'O(1)' &&
                  'This algorithm uses a constant amount of extra space regardless of input size.'}
                {spaceComplexity === 'O(log n)' &&
                  "This algorithm's space usage grows logarithmically, often due to recursive call stack in divide-and-conquer algorithms."}
                {spaceComplexity === 'O(n)' &&
                  "This algorithm's space usage grows linearly with input size."}
                {spaceComplexity === 'O(n log n)' &&
                  'This algorithm combines linear and logarithmic space growth.'}
                {spaceComplexity === 'O(n²)' &&
                  "This algorithm's space usage grows quadratically with input size."}
                {spaceComplexity === 'O(2ⁿ)' &&
                  "This algorithm's space usage doubles with each additional input element."}
                {spaceComplexity === 'O(n!)' &&
                  "This algorithm's space usage grows factorially with input size."}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">
              Detailed Explanation
            </h3>
            <div className="bg-gray-50 dark:bg-neutral-700 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">{explanation}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Code
            </h3>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm text-gray-100">{code}</code>
            </pre>
          </div>

          <div>
            <button
              onClick={askGemini}
              disabled={isLoading}
              className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold rounded-md transition-colors"
            >
              {isLoading
                ? 'Getting Simple Explanation...'
                : 'Get Simple Explanation from Gemini'}
            </button>

            {geminiResponse && (
              <div className="mt-4 bg-gray-50 dark:bg-neutral-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                  Simple Explanation from Gemini
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {geminiResponse}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationModal;
