import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import ErrorFallback from './components/ErrorFallback'; // Create this component
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}
