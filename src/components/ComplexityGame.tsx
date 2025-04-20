import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import ExplanationModal from './ExplanationModal';

interface CodeQuestion {
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
}

const allQuestions: CodeQuestion[] = [
  {
    code: `function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'We traverse the array once and use only a single variable for storage.',
  },
  {
    code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    explanation: 'Bubble sort uses nested loops but sorts in place.',
  },
  {
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Binary search halves the search space in each step and uses constant extra space.',
  },
  {
    code: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'The recursive factorial makes n calls and uses n stack frames.',
  },
  {
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    timeComplexity: 'O(2ⁿ)',
    spaceComplexity: 'O(n)',
    explanation:
      'Each call branches into two recursive calls, creating an exponential time complexity, while the recursion depth is n.',
  },
  {
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Merge sort divides the array log n times and uses linear space for merging.',
  },
  {
    code: `function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'We create a new array of n characters and join them back into a string.',
  },
  {
    code: `function twoSum(nums, target) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (complement in seen) {
      return [seen[complement], i];
    }
    seen[nums[i]] = i;
  }
  return [];
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'We traverse the array once and use a hash table for constant-time lookups.',
  },
  {
    code: `function permutations(str) {
  if (str.length <= 1) return [str];
  
  const result = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remaining = str.slice(0, i) + str.slice(i + 1);
    const subPerms = permutations(remaining);
    
    for (const subPerm of subPerms) {
      result.push(char + subPerm);
    }
  }
  return result;
}`,
    timeComplexity: 'O(n!)',
    spaceComplexity: 'O(n!)',
    explanation:
      'Generating all permutations requires factorial time and space to store all possible arrangements.',
  },
  {
    code: `function constantOperation(n) {
  return n % 2 === 0 ? "even" : "odd";
}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    explanation:
      'A simple modulo operation that takes constant time and space regardless of input size.',
  },
];

const shuffleArray = (array: CodeQuestion[]): CodeQuestion[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const TOTAL_QUESTIONS = 10;

const complexityOptions = [
  'O(1)',
  'O(log n)',
  'O(n)',
  'O(n log n)',
  'O(n²)',
  'O(2ⁿ)',
  'O(n!)',
];

const ComplexityGame: React.FC = () => {
  const [questions] = useState(() =>
    shuffleArray(allQuestions).slice(0, TOTAL_QUESTIONS)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedTimeComplexity, setSelectedTimeComplexity] = useState('');
  const [selectedSpaceComplexity, setSelectedSpaceComplexity] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [currentQuestionIndex]);

  const handleTimeComplexityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTimeComplexity(event.target.value);
  };

  const handleSpaceComplexityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSpaceComplexity(event.target.value);
  };

  const checkAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect =
      selectedTimeComplexity === currentQuestion.timeComplexity &&
      selectedSpaceComplexity === currentQuestion.spaceComplexity;

    if (isCorrect) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedTimeComplexity('');
      setSelectedSpaceComplexity('');
      setShowResult(false);
    }
  };

  const resetGame = () => {
    window.location.reload();
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-neutral-700 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}
          </h2>
          <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Score: {score}/{TOTAL_QUESTIONS}
          </div>
        </div>

        <div className="my-6">
          <pre className="text-sm">
            <code className="language-javascript">{currentQuestion.code}</code>
          </pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Time Complexity
            </label>
            <select
              value={selectedTimeComplexity}
              onChange={handleTimeComplexityChange}
              disabled={showResult}
              className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white disabled:opacity-50"
            >
              <option value="">Select Time Complexity</option>
              {complexityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Space Complexity
            </label>
            <select
              value={selectedSpaceComplexity}
              onChange={handleSpaceComplexityChange}
              disabled={showResult}
              className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white disabled:opacity-50"
            >
              <option value="">Select Space Complexity</option>
              {complexityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showResult ? (
          <div className="mt-4">
            <div
              className={`text-xl font-semibold mb-4 ${
                selectedTimeComplexity === currentQuestion.timeComplexity &&
                selectedSpaceComplexity === currentQuestion.spaceComplexity
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {selectedTimeComplexity === currentQuestion.timeComplexity &&
              selectedSpaceComplexity === currentQuestion.spaceComplexity
                ? 'Correct!'
                : 'Incorrect!'}
            </div>
            <div className="text-neutral-900 dark:text-white mb-2">
              Time Complexity: {currentQuestion.timeComplexity}
              <br />
              Space Complexity: {currentQuestion.spaceComplexity}
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              {currentQuestion.explanation}
            </p>
            {selectedTimeComplexity !== currentQuestion.timeComplexity ||
            selectedSpaceComplexity !== currentQuestion.spaceComplexity ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md transition-colors mb-4"
              >
                View Detailed Explanation
              </button>
            ) : null}
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
              >
                Next Question
              </button>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                  Final Score: {score}/{TOTAL_QUESTIONS}
                </div>
                <button
                  onClick={resetGame}
                  className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition-colors"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={checkAnswer}
            disabled={!selectedTimeComplexity || !selectedSpaceComplexity}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-md transition-colors"
          >
            Check Answer
          </button>
        )}
      </div>

      <ExplanationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        timeComplexity={currentQuestion.timeComplexity}
        spaceComplexity={currentQuestion.spaceComplexity}
        explanation={currentQuestion.explanation}
        code={currentQuestion.code}
      />
    </div>
  );
};

export default ComplexityGame;
