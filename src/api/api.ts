import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // adjust if needed

interface DetectPIIResponse {
  detectedEntities: Array<{ entity: string; confidence: number }>;
}

export const detectPII = async (file: File): Promise<DetectPIIResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_BASE_URL}/detect`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const redactPII = async (file: File): Promise<Blob> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_BASE_URL}/redact`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob',
  });
  return response.data;
};
