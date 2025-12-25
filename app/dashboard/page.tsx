'use client';

import React from 'react';
import styled from 'styled-components';
import DynamicDashboard from '@/components/DynamicDashboard/DynamicDashboard';
import { theme } from '@/styles/theme';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.spacing.md}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    align-items: flex-start;
  }
`;

const HeaderLeft = styled.div``;

const DashboardTitle = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

const DashboardSubtitle = styled.p`
  color: ${theme.colors.textLight};
  font-size: 1.1rem;
`;

export default function DashboardPage() {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderLeft>
          <DashboardTitle>📊 Live Data Dashboard</DashboardTitle>
          <DashboardSubtitle>
            Real-time data from your Cloudflare backend. Updates automatically.
          </DashboardSubtitle>
        </HeaderLeft>
      </DashboardHeader>
      
      <DynamicDashboard />
    </DashboardContainer>
  );
}