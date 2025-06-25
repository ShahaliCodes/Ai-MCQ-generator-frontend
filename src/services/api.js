import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const uploadFile = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('[uploadFile] Response:', response.data); // ✅ Debug log
    return response.data;
  } catch (error) {
    console.error('[uploadFile] Error:', error); // ✅ Debug log
    throw new Error(error.response?.data?.detail || 'Failed to upload file');
  }
};
