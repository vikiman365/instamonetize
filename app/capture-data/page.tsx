'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { useUserData } from '@/contexts/UserDataContext';
import { theme } from '@/styles/theme';

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

const StatusIndicator = styled.div<{ $status: 'loading' | 'success' | 'error' }>`
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

export default function CaptureDataPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateUserData } = useUserData();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing your data...');
  const [isClient, setIsClient] = useState(false);

  // Mark when component is mounted on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Wait for client-side rendering

    const processData = async () => {
      try {
        // Get encoded data from URL
        const encodedData = searchParams.get('data');
        
        if (!encodedData) {
          throw new Error('No data received from Cloudflare');
        }

        // Decode the data (matching Cloudflare's encoding)
        // Use try-catch for decoding
        let decodedData;
        try {
          // First decode URI component, then base64 decode
          const uriDecoded = decodeURIComponent(encodedData);
          decodedData = atob(uriDecoded);
        } catch (decodeError) {
          // If that fails, try direct base64 decode
          console.log('Trying direct base64 decode...');
          decodedData = atob(encodedData);
        }
        
        const userData = JSON.parse(decodedData);
        
        // Add timestamp if not present
        if (!userData.recordedAt) {
          userData.recordedAt = new Date().toISOString();
        }
        
        // Update context with the data
        updateUserData(userData);
        
        setStatus('success');
        setMessage('✅ Data successfully loaded from Cloudflare!');
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
        
      } catch (error) {
        console.error('Error processing data:', error);
        setStatus('error');
        setMessage('❌ Failed to process data. Please try again.');
        
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    };

    processData();
  }, [searchParams, updateUserData, router, isClient]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading': return '⏳';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  // Loading state while waiting for client-side
  if (!isClient) {
    return (
      <Container>
        <Card>
          <StatusIndicator $status="loading">
            ⏳
          </StatusIndicator>
          <Title>Loading...</Title>
          <p style={{ color: theme.colors.text, marginBottom: theme.spacing.lg }}>
            Initializing data capture...
          </p>
        </Card>
      </Container>
    );
  }

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
            ? 'Redirecting to your dashboard...' 
            : 'Data is being transferred from your Cloudflare Worker to this dashboard...'}
        </p>
      </Card>
    </Container>
  );
}