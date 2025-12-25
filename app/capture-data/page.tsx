import { Suspense } from 'react';
import { decodeAndProcessData, ProcessedData } from './actions';
import CaptureDataClient from './CaptureDataClient';

interface PageProps {
  searchParams: Promise<{ data?: string }>;
}

// This runs on the server at build time
export default async function CaptureDataPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const encodedData = params.data;
  
  // Process data server-side if it exists
  let processedData: ProcessedData | null = null;
  if (encodedData) {
    processedData = await decodeAndProcessData(encodedData);
  }
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CaptureDataClient 
        encodedData={encodedData}
        serverProcessedData={processedData}
      />
    </Suspense>
  );
}

// Simple loading component
function LoadingFallback() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#405de6',
          margin: '0 auto 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          color: 'white'
        }}>
          ⏳
        </div>
        <h2>Loading...</h2>
        <p>Preparing data capture page</p>
      </div>
    </div>
  );
}