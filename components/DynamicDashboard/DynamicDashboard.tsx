'use client';

import React from 'react';
import styled from 'styled-components';
import { useUserData } from '@/contexts/UserDataContext';
import { theme } from '@/styles/theme';
import UserDataDisplay from '@/components/UserDataDisplay/UserDataDisplay';

const DashboardContainer = styled.div`
  padding: ${theme.spacing.xl} 0;
`;

const WelcomeSection = styled.div<{ $hasData: boolean }>`
  background: ${({ $hasData }) => 
    $hasData ? theme.colors.gradient.secondary : theme.colors.background};
  color: ${({ $hasData }) => $hasData ? 'white' : theme.colors.text};
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  transition: all 0.3s ease;
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const WelcomeText = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 600px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const StatCard = styled.div<{ $type: 'data' | 'analytics' | 'status' }>`
  background: white;
  border-radius: 15px;
  padding: ${theme.spacing.lg};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-left: 4px solid ${({ $type }) => {
    switch ($type) {
      case 'data': return theme.colors.primary;
      case 'analytics': return theme.colors.secondary;
      case 'status': return theme.colors.success;
      default: return theme.colors.primary;
    }
  }};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const StatTitle = styled.h3`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
  font-size: 1.1rem;
`;

const StatValue = styled.div<{ $size?: 'large' | 'normal' }>`
  font-size: ${({ $size }) => $size === 'large' ? '2.5rem' : '1.5rem'};
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${theme.colors.textLight};
  font-size: 0.875rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: 8px;
  border: 2px solid ${({ $variant }) => 
    $variant === 'primary' ? theme.colors.primary : 'transparent'};
  background: ${({ $variant }) => 
    $variant === 'primary' ? theme.colors.primary : 'white'};
  color: ${({ $variant }) => 
    $variant === 'primary' ? 'white' : theme.colors.text};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const DynamicDashboard: React.FC = () => {
  const { userData, analytics, isLoading, clearUserData, refreshData } = useUserData();
  
  const hasData = !!userData;
  const isMobile = userData?.userAgent?.includes('Mobile') || false;
  const totalLogins = analytics?.totalLogins || 0;
  const sessionDuration = analytics?.lastLogin 
    ? Math.floor((Date.now() - new Date(analytics.lastLogin).getTime()) / 60000)
    : 0;

  return (
    <DashboardContainer>
      {/* Welcome Section - Changes based on data */}
      <WelcomeSection $hasData={hasData}>
        {hasData ? (
          <>
            <WelcomeTitle>Welcome back, {userData.username}! 👋</WelcomeTitle>
            <WelcomeText>
              Your data from Cloudflare backend is loaded and ready. 
              {analytics && ` You've logged in ${totalLogins} times.`}
            </WelcomeText>
          </>
        ) : (
          <>
            <WelcomeTitle>Welcome to InstaMonetize Dashboard</WelcomeTitle>
            <WelcomeText>
              Complete the login process to see your personalized data from Cloudflare backend.
            </WelcomeText>
          </>
        )}
      </WelcomeSection>

      {/* Dynamic Stats Grid */}
      <StatsGrid>
        <StatCard $type="data">
          <StatTitle>📦 Data Status</StatTitle>
          <StatValue $size="large">
            {hasData ? '✓' : '∅'}
          </StatValue>
          <StatLabel>
            {hasData ? 'Data Loaded from Cloudflare' : 'No Data Available'}
          </StatLabel>
          {hasData && (
            <div style={{ marginTop: theme.spacing.sm, fontSize: '0.875rem' }}>
              ID: #{userData.id} • {userData.type || 'instagram'}
            </div>
          )}
        </StatCard>

        <StatCard $type="analytics">
          <StatTitle>📈 Session Analytics</StatTitle>
          <StatValue>
            {totalLogins}
          </StatValue>
          <StatLabel>
            Total Logins
          </StatLabel>
          {analytics && (
            <div style={{ marginTop: theme.spacing.sm, fontSize: '0.875rem' }}>
              Last: {new Date(analytics.lastLogin).toLocaleDateString()}
            </div>
          )}
        </StatCard>

        <StatCard $type="status">
          <StatTitle>🔗 Connection Status</StatTitle>
          <StatValue>
            {isLoading ? '...' : '✓'}
          </StatValue>
          <StatLabel>
            {isLoading ? 'Connecting to Cloudflare...' : 'Cloudflare Connected'}
          </StatLabel>
          {hasData && (
            <div style={{ marginTop: theme.spacing.sm, fontSize: '0.875rem' }}>
              IP: {userData.ip.substring(0, 15)}...
            </div>
          )}
        </StatCard>
      </StatsGrid>

      {/* Action Buttons - Change based on state */}
      <ActionButtons>
        <ActionButton 
          $variant="primary" 
          onClick={refreshData}
          disabled={isLoading}
        >
          {isLoading ? 'Refreshing...' : '🔄 Refresh Data'}
        </ActionButton>
        
        {hasData && (
          <ActionButton 
            $variant="secondary" 
            onClick={() => {
              // Simulate new data update
              if (userData) {
                const updatedData = {
                  ...userData,
                  recordedAt: new Date().toISOString()
                };
                // In real app, you would update the context
                console.log('Updated data:', updatedData);
              }
            }}
          >
            📝 Update Data
          </ActionButton>
        )}
        
        {hasData && (
          <ActionButton 
            $variant="secondary" 
            onClick={clearUserData}
            style={{ background: theme.colors.error, color: 'white', border: 'none' }}
          >
            🗑️ Clear Data
          </ActionButton>
        )}
      </ActionButtons>

      {/* Main Data Display */}
      <UserDataDisplay />

      {/* Real-time Updates Section */}
      {hasData && (
        <div style={{ 
          background: theme.colors.background, 
          borderRadius: '20px', 
          padding: theme.spacing.lg,
          marginTop: theme.spacing.xl 
        }}>
          <h3 style={{ color: theme.colors.text, marginBottom: theme.spacing.md }}>
            🕒 Real-time Updates
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: theme.spacing.md 
          }}>
            <div>
              <div style={{ fontSize: '0.875rem', color: theme.colors.textLight }}>
                Session Active
              </div>
              <div style={{ 
                color: theme.colors.success, 
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  background: theme.colors.success,
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }} />
                {sessionDuration} minutes
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '0.875rem', color: theme.colors.textLight }}>
                Device
              </div>
              <div style={{ color: theme.colors.text, fontWeight: '600' }}>
                {isMobile ? '📱 Mobile' : '💻 Desktop'}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '0.875rem', color: theme.colors.textLight }}>
                Data Source
              </div>
              <div style={{ color: theme.colors.primary, fontWeight: '600' }}>
                Cloudflare D1
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardContainer>
  );
};

export default DynamicDashboard;