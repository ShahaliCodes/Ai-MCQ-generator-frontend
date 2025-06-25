const handleSubmit = async (e) => {
  e.preventDefault();
  if (!file) {
    setError('Please select a file first');
    return;
  }

  setIsLoading(true);
  setError(null);

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await uploadFile(formData);
    
    // Validate response structure
    if (!response?.questions || !Array.isArray(response.questions)) {
      throw new Error('Invalid response format from server');
    }

    navigate('/results', { 
      state: { 
        questions: response.questions,
        filename: file.name 
      } 
    });
  } catch (err) {
    setError(err.message || 'Failed to process file');
  } finally {
    setIsLoading(false);
  }
};
