import React, { useState } from 'react';
import { detectPII, redactPII } from '../api/api';

interface PIIEntity {
  entity: string;
  start: number;
  end: number;
  score: number;
}

const PIIDetector: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [detectionResult, setDetectionResult] = useState<PIIEntity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDetect = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const result = await detectPII(selectedFile);
      setDetectionResult(result.pii_entities);
    } catch (error) {
      console.error(error);
      alert('Detection failed!');
    }
    setLoading(false);
  };

  const handleRedact = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const blob = await redactPII(selectedFile);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'redacted_file.txt');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      alert('Redaction failed!');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">PII Detection & Redaction</h2>

      <input type="file" onChange={handleFileChange} className="mb-4" />

      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleDetect}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          Detect PII
        </button>
        <button
          onClick={handleRedact}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          Redact PII
        </button>
      </div>

      {loading && <p>Processing...</p>}

      {detectionResult && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Detected PII:</h3>
          <ul className="list-disc list-inside">
            {detectionResult.length === 0 ? (
              <li>No PII detected!</li>
            ) : (
              detectionResult.map((entity, index) => (
                <li key={index}>
                  {entity.entity} ({entity.start}-{entity.end}) [Score: {entity.score.toFixed(2)}]
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PIIDetector;
