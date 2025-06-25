import { useLocation, useNavigate } from 'react-router-dom';
import QuestionList from '../components/QuestionList';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Safe optional chaining
  const questions = location.state?.questions;
  const filename = location.state?.filename;

  if (!questions || !Array.isArray(questions)) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-medium text-gray-900 mb-4">No questions found</h2>
        <p className="text-gray-600 mb-6">
          It seems you arrived here without generating any questions. Please go back and upload a file.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back to upload
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Generated Questions</h1>
        <p className="text-gray-600">From: {String(filename)}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <QuestionList questions={questions} />
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Generate New Set
        </button>
      </div>
    </div>
  );
}
