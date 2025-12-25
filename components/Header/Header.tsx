'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiInstagram, FiUser } from 'react-icons/fi';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Button from '../Button/Button';
import { useUserData } from '@/contexts/UserDataContext';

// ... (previous Header styles remain the same)


const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  box-shadow: 0 2px 24px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.5rem;
  font-family: 'Instagram Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  span {
    background: linear-gradient(45deg, #fff, #ffdc80);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  svg {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.tablet}) {
    position: fixed;
    top: 0;
    right: -100%;
    bottom: 0;
    width: 280px;
    background: linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%);
    flex-direction: column;
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
    transition: right 0.3s ease;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
    z-index: 1001;

    &.open {
      right: 0;
    }
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    border-radius: 12px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover {
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: flex-start;
    font-size: 1.1rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: 8px;
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

const UserBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1));
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: 20px;
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: center;
    margin-top: ${theme.spacing.md};
    padding: ${theme.spacing.sm};
  }
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData, clearUserData } = useUserData();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo href="/">
          <FiInstagram size={28} />
          <span>InstaMonetize</span>
        </Logo>

        <MobileMenuButton onClick={() => setIsMenuOpen(true)}>
          <FiMenu />
        </MobileMenuButton>

        <Nav className={isMenuOpen ? 'open' : ''}>
          <CloseButton onClick={() => setIsMenuOpen(false)}>
            <FiX />
          </CloseButton>
          
          <NavLink href="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink href="/dashboard" onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink href="/apply" onClick={() => setIsMenuOpen(false)}>
            Apply Now
          </NavLink>
          
          {/* Show user data if available */}
          {userData ? (
            <>
              <UserBadge>
                <FiUser />
                <Username>{userData.username}</Username>
              </UserBadge>
              <Button 
                variant="outline" 
                onClick={() => {
                  clearUserData();
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <NavLink href="/login" onClick={() => setIsMenuOpen(false)}>
              <FiUser /> Login
            </NavLink>
          )}
          
          <Button 
            variant="primary" 
            onClick={() => setIsMenuOpen(false)}
            href="/apply"
          >
            Start Earning
          </Button>
        <Overlay $isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;