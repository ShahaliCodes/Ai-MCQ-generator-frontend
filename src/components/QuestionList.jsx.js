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

        const questionId = typeof question.id === 'string' ? question.id : String(question.id);
        const questionText =
          typeof question.text === 'string' ? question.text : JSON.stringify(question.text);
        const explanation =
          typeof question.explanation === 'string'
            ? question.explanation
            : JSON.stringify(question.explanation);

        const selectedOption = selectedOptions[questionId];
        const correctOption = question.options.find((opt) => opt?.is_correct)?.id;
        const isAnswered = selectedOption !== undefined;
        const isCorrect = isAnswered && selectedOption === correctOption;

        return (
          <li key={questionId || index} className="p-6">
            <div className="flex items-start">
              <span className="flex-shrink-0 bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center text-white font-medium text-sm mr-3">
                {index + 1}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{questionText}</h3>

                <fieldset className="mt-4">
                  <legend className="sr-only">Question options</legend>
                  <div className="space-y-3">
                    {question.options.map((option) => {
                      const optionId =
                        typeof option.id === 'string' ? option.id : String(option.id);
                      const optionText =
                        typeof option.text === 'string'
                          ? option.text
                          : JSON.stringify(option.text);
                      const isSelected = selectedOption === optionId;
                      const showCorrect = isAnswered && option.is_correct;
                      const showIncorrect = isAnswered && isSelected && !option.is_correct;

                      return (
                        <div
                          key={optionId}
                          onClick={() =>
                            !isAnswered && handleOptionSelect(questionId, optionId)
                          }
                          className={`relative rounded-lg border px-4 py-3 cursor-pointer ${
                            isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                          } ${showCorrect ? 'border-green-500 bg-green-50' : ''} ${
                            showIncorrect ? 'border-red-500 bg-red-50' : ''
                          } ${isAnswered ? 'cursor-default' : 'hover:border-blue-600'}`}
                        >
                          <div className="flex items-center">
                            <span className="font-medium mr-2">{optionId})</span>
                            <span>{optionText}</span>
                            {showCorrect && (
                              <span className="ml-auto flex-shrink-0 text-green-600">
                                <CheckIcon className="h-5 w-5" />
                              </span>
                            )}
                            {showIncorrect && (
                              <span className="ml-auto flex-shrink-0 text-red-600">
                                <XMarkIcon className="h-5 w-5" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </fieldset>

                {isAnswered && (
                  <div
                    className={`mt-3 p-3 rounded-md ${
                      isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}
                  >
                    <p className="font-medium">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
                    <p className="mt-1 text-sm">{explanation}</p>
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
