import React, { useState } from 'react';
import { X, Upload, Camera, Check } from 'lucide-react';

interface FormAnalysisProps {
  onClose: () => void;
}

interface AnalysisResults {
  score: number;
  feedback: string[];
}

export default function FormAnalysis({ onClose }: FormAnalysisProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      setPreview(null);
      return;
    }
    
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
  };

  const handleAnalyze = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults({
        score: 82,
        feedback: [
          "Knee alignment looks good during the squat",
          "Depth is appropriate for your mobility level",
          "Try to maintain a more neutral spine at the bottom position",
          "Keep your chest up more throughout the movement"
        ]
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Camera className="h-5 w-5 mr-2 text-yellow-500" />
            Form Analysis
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          {!results ? (
            <>
              {preview ? (
                <div className="mb-4">
                  <div className="relative">
                    <img 
                      src={preview} 
                      alt="Video preview" 
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <button 
                      onClick={() => {
                        setFile(null);
                        setPreview(null);
                      }}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      {isAnalyzing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing...
                        </>
                      ) : (
                        'Analyze Form'
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-500 mb-4 text-center">
                    Upload a video of your exercise form for AI analysis
                  </p>
                  <input
                    type="file"
                    id="video-upload"
                    accept="video/*,image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="video-upload"
                    className="flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Select Video
                  </label>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Form Score</h3>
                <div className="bg-green-100 text-green-800 text-lg font-bold rounded-full h-12 w-12 flex items-center justify-center">
                  {results.score}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Feedback:</h4>
                <ul className="space-y-2">
                  {results.feedback.map((item, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    setResults(null);
                  }}
                  className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Try Another Video
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}