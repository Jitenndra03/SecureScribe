import React, { createContext, useContext, useState } from 'react';
import type { DocumentFile, PIIDetection } from '../types';
import { generateMockDetections } from '../utils/mockDetection';

interface DocumentContextType {
  documents: DocumentFile[];
  currentDocument: DocumentFile | null;
  addDocument: (file: File) => Promise<void>;
  setCurrentDocument: (documentId: string | null) => void;
  toggleMasking: (detectionId: string) => void;
  maskAllDetections: () => void;
  unmaskAllDetections: () => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [currentDocument, setCurrentDoc] = useState<DocumentFile | null>(null);

  const addDocument = async (file: File) => {
    try {
      const preview = URL.createObjectURL(file);
      
      // In a real app, we would send the file to a backend service for PII detection
      // For this demo, we'll generate mock detections
      const detections = generateMockDetections();
      
      const newDocument: DocumentFile = {
        id: `doc-${Date.now()}`,
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        preview,
        detections
      };
      
      setDocuments(prev => [...prev, newDocument]);
      setCurrentDoc(newDocument);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const setCurrentDocument = (documentId: string | null) => {
    if (!documentId) {
      setCurrentDoc(null);
      return;
    }
    
    const document = documents.find(doc => doc.id === documentId);
    setCurrentDoc(document || null);
  };

  const toggleMasking = (detectionId: string) => {
    if (!currentDocument) return;
    
    setDocuments(prevDocs => 
      prevDocs.map(doc => {
        if (doc.id !== currentDocument.id) return doc;
        
        return {
          ...doc,
          detections: doc.detections.map(detection => 
            detection.id === detectionId 
              ? { ...detection, masked: !detection.masked }
              : detection
          )
        };
      })
    );
    
    // Also update current document
    setCurrentDoc(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        detections: prev.detections.map(detection => 
          detection.id === detectionId 
            ? { ...detection, masked: !detection.masked }
            : detection
        )
      };
    });
  };

  const maskAllDetections = () => {
    if (!currentDocument) return;
    
    setDocuments(prevDocs => 
      prevDocs.map(doc => {
        if (doc.id !== currentDocument.id) return doc;
        
        return {
          ...doc,
          detections: doc.detections.map(detection => ({
            ...detection,
            masked: true
          }))
        };
      })
    );
    
    // Also update current document
    setCurrentDoc(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        detections: prev.detections.map(detection => ({
          ...detection,
          masked: true
        }))
      };
    });
  };

  const unmaskAllDetections = () => {
    if (!currentDocument) return;
    
    setDocuments(prevDocs => 
      prevDocs.map(doc => {
        if (doc.id !== currentDocument.id) return doc;
        
        return {
          ...doc,
          detections: doc.detections.map(detection => ({
            ...detection,
            masked: false
          }))
        };
      })
    );
    
    // Also update current document
    setCurrentDoc(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        detections: prev.detections.map(detection => ({
          ...detection,
          masked: false
        }))
      };
    });
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        currentDocument,
        addDocument,
        setCurrentDocument,
        toggleMasking,
        maskAllDetections,
        unmaskAllDetections
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};