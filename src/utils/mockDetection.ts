import type { PIIDetection, PIIType } from '../types';

// Helper to generate a random UUID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Helper to generate random positions on the document
const generateRandomPosition = () => {
  return {
    x: Math.floor(Math.random() * 80) + 10, // 10-90% of width
    y: Math.floor(Math.random() * 80) + 10, // 10-90% of height
    width: Math.floor(Math.random() * 20) + 5, // 5-25% of width
    height: Math.floor(Math.random() * 5) + 2, // 2-7% of height
  };
};

// Generate mock PII data
const generateMockPIIText = (type: PIIType): string => {
  switch (type) {
    case 'aadhaar':
      return `${Math.floor(Math.random() * 10000).toString().padStart(4, '0')} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    case 'pan':
      return `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    case 'name':
      const firstNames = ['Raj', 'Priya', 'Amit', 'Neha', 'Vikram', 'Anjali', 'Sanjay', 'Meera'];
      const lastNames = ['Sharma', 'Patel', 'Singh', 'Gupta', 'Kumar', 'Verma', 'Joshi', 'Malik'];
      return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    case 'address':
      return `${Math.floor(Math.random() * 100) + 1}, ${['Main Street', 'Park Avenue', 'Gandhi Road', 'MG Road', 'Nehru Place'][Math.floor(Math.random() * 5)]}, ${['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'][Math.floor(Math.random() * 5)]}`;
    case 'phone':
      return `+91 ${Math.floor(Math.random() * 1000000000).toString().padStart(10, '0')}`;
    case 'email':
      const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com'];
      return `user${Math.floor(Math.random() * 1000)}@${domains[Math.floor(Math.random() * domains.length)]}`;
    case 'account':
      return `${Math.floor(Math.random() * 100000000000).toString().padStart(12, '0')}`;
    default:
      return 'Sensitive Information';
  }
};

export const generateMockDetections = (): PIIDetection[] => {
  // Define the types of PII we want to generate
  const piiTypes: PIIType[] = ['aadhaar', 'pan', 'name', 'address', 'phone', 'email', 'account'];
  
  // Choose a random number of detections (3-7)
  const numDetections = Math.floor(Math.random() * 5) + 3;
  
  const detections: PIIDetection[] = [];
  
  for (let i = 0; i < numDetections; i++) {
    const type = piiTypes[Math.floor(Math.random() * piiTypes.length)];
    
    detections.push({
      id: generateId(),
      type,
      text: generateMockPIIText(type),
      position: generateRandomPosition(),
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
      masked: false
    });
  }
  
  return detections;
};