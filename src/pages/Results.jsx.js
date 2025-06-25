import { useLocation, useNavigate } from 'react-router-dom';
import QuestionList from '../components/QuestionList';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract questions safely regardless of nested shape
  const rawQuestions = location.state?.questions;
  const questions = rawQuestions?.questions || rawQuestions || [];
  const filename = location.state?.filename || 'Unknown';

  console.log("Questions received:", questions);

  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-medium text-gray-900 mb-4">No questions found</h2>
        <p className="text-gray-600 mb-6">
          It seems you arrived here without generating any questions. Please go back and upload a file.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-primary hover:text-primary-dark mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back to upload
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Generated Questions</h1>
        <p className="text-gray-600">From: {filename}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <QuestionList questions={questions} />
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
        >
          Generate New Set
        </button>
      </div>
    </div>
  );
}
