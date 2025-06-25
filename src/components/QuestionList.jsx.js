import { useState } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function QuestionList({ questions = [] }) {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  if (!questions || questions.length === 0) {
    return <div className="p-6 text-center text-gray-500">No questions available</div>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {questions.map((question, index) => {
        if (!question || !question.options) return null;
        
        const selectedOption = selectedOptions[question.id];
        const correctOption = question.options.find((opt) => opt?.is_correct)?.id;
        const isAnswered = selectedOption !== undefined;
        const isCorrect = isAnswered && selectedOption === correctOption;

        return (
          <li key={question.id || index} className="p-6">
            {/* ... rest of the component ... */}
          </li>
        );
      })}
    </ul>
  );
}
