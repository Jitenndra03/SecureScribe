export type PIIType = 
  | 'aadhaar'
  | 'pan'
  | 'name'
  | 'address'
  | 'phone'
  | 'email'
  | 'account'
  | 'other';

export interface PIIDetection {
  id: string;
  type: PIIType;
  text: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  confidence: number;
  masked: boolean;
}

export interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  lastModified: number;
  preview: string;
  detections: PIIDetection[];
}

export type ThemeMode = 'light' | 'dark' | 'system';