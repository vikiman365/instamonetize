'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserData } from '@/contexts/UserDataContext';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { ProcessedData } from './actions';

interface CaptureDataClientProps {
  encodedData?: string | null;
  serverProcessedData: ProcessedData | null;
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  background: linear-gradient(135deg, ${theme.colors.background} 0%, #f8f9fa 100%);
`;

const Card = styled.div`
  background: white;
  border-radius: 25px;
  padding: ${theme.spacing.xl};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const StatusIndicator = styled.div<{ $status: 'loading' | 'success' | 'error' | 'no-data' }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.lg};
  font-size: 2.5rem;
  background: ${({ $status }) => {
    switch ($status) {
      case 'loading': return theme.colors.primary + '20';
      case 'success': return theme.colors.success + '20';
      case 'error': return theme.colors.error + '20';
      default: return '#e5e7eb';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'loading': return theme.colors.primary;
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      default: return theme.colors.text;
    }
  }};
`;

export default function CaptureDataClient({ 
  encodedData,
  serverProcessedData 
}: CaptureDataClientProps) {
  const router = useRouter();
  const { updateUserData } = useUserData();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'no-data'>(
    encodedData ? 'loading' : 'no-data'
  );
  const [message, setMessage] = useState(
    encodedData ? 'Processing your data...' : 'No data received'
  );

  useEffect(() => {
    const processData = async () => {
      try {
        // If no data in URL, show error and redirect
        if (!encodedData) {
          setStatus('error');
          setMessage('❌ No data received from Cloudflare');
          setTimeout(() => router.push('/'), 3000);
          return;
        }

        // Option 1: Use server-processed data if available
        if (serverProcessedData && serverProcessedData.success && serverProcessedData.userData) {
          console.log('✅ Using server-processed data');
          updateUserData(serverProcessedData.userData);
          setStatus('success');
          setMessage('✅ Data loaded successfully!');
          
          setTimeout(() => router.push('/dashboard'), 2000);
          return;
        }

        // Option 2: Process data client-side (fallback)
        console.log('🔄 Processing data client-side');
        
        // Decode the data client-side
        let decodedData: string;
        try {
          // Try different decoding strategies
          const uriDecoded = decodeURIComponent(encodedData);
          decodedData = atob(uriDecoded);
        } catch {
          decodedData = atob(encodedData);
        }
        
        const userData = JSON.parse(decodedData);
        
        // Add timestamp if not present
        if (!userData.recordedAt) {
          userData.recordedAt = new Date().toISOString();
        }
        
        // Update context
        updateUserData(userData);
        
        setStatus('success');
        setMessage('✅ Data successfully loaded from Cloudflare!');
        
        // Redirect to dashboard
        setTimeout(() => router.push('/dashboard'), 2000);
        
      } catch (error) {
        console.error('❌ Client: Error processing data:', error);
        setStatus('error');
        setMessage('❌ Failed to process data. Redirecting...');
        
        setTimeout(() => router.push('/'), 3000);
      }
    };

    processData();
  }, [encodedData, serverProcessedData, updateUserData, router]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading': return '⏳';
      case 'success': return '✅';
      case 'error': return '❌';
      case 'no-data': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <Container>
      <Card>
        <StatusIndicator $status={status}>
          {getStatusIcon()}
        </StatusIndicator>
        
        <Title>Processing Cloudflare Data</Title>
        
        <p style={{ 
          color: theme.colors.text, 
          marginBottom: theme.spacing.lg,
          lineHeight: '1.6'
        }}>
          {message}
        </p>
        
        {status === 'loading' && (
          <div style={{ 
            width: '100%', 
            height: '4px', 
            background: '#e5e7eb',
            borderRadius: '2px',
            overflow: 'hidden',
            marginTop: theme.spacing.xl
          }}>
            <div style={{
              width: '70%',
              height: '100%',
              background: theme.colors.primary,
              animation: 'loading 1.5s infinite ease-in-out'
            }} />
          </div>
        )}
        
        <p style={{ 
          fontSize: '0.875rem', 
          color: theme.colors.textLight,
          marginTop: theme.spacing.lg
        }}>
          {status === 'success' 
            ? 'Redirecting to dashboard...' 
            : status === 'loading'
            ? 'Processing data from Cloudflare Worker...'
            : 'Please wait...'}
        </p>
      </Card>
    </Container>
  );
}