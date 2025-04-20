import React from 'react';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Complexity Explanation
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
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
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              Time Complexity: {timeComplexity}
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">What this means:</h4>
              <p className="text-gray-700">
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
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Space Complexity: {spaceComplexity}
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">What this means:</h4>
              <p className="text-gray-700">
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
            <h3 className="text-lg font-semibold text-purple-600 mb-2">
              Detailed Explanation
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{explanation}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Code</h3>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm text-gray-100">{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationModal;
