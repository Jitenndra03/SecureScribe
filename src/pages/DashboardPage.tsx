import React from 'react';
import { Clock, FileCheck, ShieldAlert, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';
import { useDocuments } from '../context/DocumentContext';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { documents } = useDocuments();
  const navigate = useNavigate();
  
  // Calculate summary stats
  const totalDocuments = documents.length;
  const totalPII = documents.reduce((sum, doc) => sum + doc.detections.length, 0);
  const maskedPII = documents.reduce(
    (sum, doc) => sum + doc.detections.filter(d => d.masked).length, 
    0
  );
  const protectionRate = totalPII > 0 ? Math.round((maskedPII / totalPII) * 100) : 0;
  
  // Get recent documents (up to 5)
  const recentDocuments = documents.slice(0, 5);
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <Button 
            onClick={() => navigate('/upload')}
          >
            Upload New Document
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalDocuments}</div>
                  <div className="rounded-full bg-blue-100 p-1.5 dark:bg-blue-900/30">
                    <FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Detected PII
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalPII}</div>
                  <div className="rounded-full bg-yellow-100 p-1.5 dark:bg-yellow-900/30">
                    <ShieldAlert className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Protected PII
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{maskedPII}</div>
                  <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900/30">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Protection Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{protectionRate}%</div>
                  <div>
                    <Badge variant={
                      protectionRate >= 90 ? 'success' : 
                      protectionRate >= 60 ? 'warning' : 
                      'danger'
                    }>
                      {
                        protectionRate >= 90 ? 'Good' : 
                        protectionRate >= 60 ? 'Fair' : 
                        'Poor'
                      }
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Recent Documents */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Recent Documents</h2>
          
          {recentDocuments.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Document
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      PII Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Last Modified
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  {recentDocuments.map((doc) => {
                    const totalDetections = doc.detections.length;
                    const maskedDetections = doc.detections.filter(d => d.masked).length;
                    
                    return (
                      <tr key={doc.id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{Math.round(doc.size / 1024)} KB</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <Badge variant={
                            maskedDetections === totalDetections ? 'success' : 
                            maskedDetections > 0 ? 'warning' : 
                            'danger'
                          }>
                            {maskedDetections}/{totalDetections} protected
                          </Badge>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {new Date(doc.lastModified).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              navigate('/upload');
                            }}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                  <FileCheck className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No documents yet</h3>
                <p className="mb-4 text-center text-gray-500 dark:text-gray-400">
                  Upload documents to start protecting your sensitive information
                </p>
                <Button onClick={() => navigate('/upload')}>
                  Upload Document
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};