import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react';
import { ThemeProvider } from './context/ThemeContext';
import { DocumentProvider } from './context/DocumentContext';
import { Layout } from './components/layout/Layout';
import { HomePage, UploadPage, DashboardPage, AboutPage } from './pages';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider>
        <DocumentProvider>
          <Router>
            <Routes>
              <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
              <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Router>
        </DocumentProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default App;