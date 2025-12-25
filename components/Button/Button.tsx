'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { theme } from '../../styles/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  fullwidth?: boolean;
  fullWidth?: boolean; // Add the capitalized version for compatibility
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// Button styles for button element
const ButtonStyle = styled.button<{
  $variant?: string;
  $size?: string;
  $fullwidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${({ $size }) => {
    switch ($size) {
      case 'sm': return `${theme.spacing.xs} ${theme.spacing.md}`;
      case 'lg': return `${theme.spacing.md} ${theme.spacing.xl}`;
      default: return `${theme.spacing.sm} ${theme.spacing.lg}`;
    }
  }};
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'sm': return '0.875rem';
      case 'lg': return '1.125rem';
      default: return '1rem';
    }
  }};
  font-weight: 600;
  border-radius: 50px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${({ $fullwidth }) => $fullwidth ? '100%' : 'auto'};
  text-decoration: none;
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary};
          color: white;
          
          &:hover:not(:disabled) {
            background: ${theme.colors.secondary};
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(224, 48, 108, 0.3);
          }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.secondary};
          color: white;
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primary};
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(64, 93, 230, 0.3);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primary};
            color: white;
            transform: translateY(-2px);
          }
        `;
      case 'gradient':
        return `
          background: ${theme.colors.gradient.secondary};
          color: white;
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(131, 58, 180, 0.4);
          }
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: white;
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Link styles for anchor element (external links)
const LinkStyle = styled.a<{
  $variant?: string;
  $size?: string;
  $fullwidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${({ $size }) => {
    switch ($size) {
      case 'sm': return `${theme.spacing.xs} ${theme.spacing.md}`;
      case 'lg': return `${theme.spacing.md} ${theme.spacing.xl}`;
      default: return `${theme.spacing.sm} ${theme.spacing.lg}`;
    }
  }};
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'sm': return '0.875rem';
      case 'lg': return '1.125rem';
      default: return '1rem';
    }
  }};
  font-weight: 600;
  border-radius: 50px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${({ $fullwidth }) => $fullwidth ? '100%' : 'auto'};
  text-decoration: none;
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary};
          color: white;
          
          &:hover {
            background: ${theme.colors.secondary};
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(224, 48, 108, 0.3);
          }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.secondary};
          color: white;
          
          &:hover {
            background: ${theme.colors.primary};
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(64, 93, 230, 0.3);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          
          &:hover {
            background: ${theme.colors.primary};
            color: white;
            transform: translateY(-2px);
          }
        `;
      case 'gradient':
        return `
          background: ${theme.colors.gradient.secondary};
          color: white;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(131, 58, 180, 0.4);
          }
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: white;
        `;
    }
  }}
`;

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullwidth = false,
  fullWidth = false, // Destructure the capitalized version
  href,
  target,
  rel,
  onClick,
  disabled,
  type = 'button',
  ...props 
}) => {
  // Use either fullWidth (capital) or fullwidth (lowercase), defaulting to false
  const isFullWidth = fullWidth || fullwidth;
  
  const styleProps = {
    $variant: variant,
    $size: size,
    $fullwidth: isFullWidth
  };

  // Handle Next.js Link (internal navigation)
  if (href && !href.startsWith('http')) {
    return (
      <Link 
        href={href} 
        style={{ 
          textDecoration: 'none', 
          display: 'inline-block',
          width: isFullWidth ? '100%' : 'auto'
        }}
      >
        <ButtonStyle 
          {...styleProps} 
          style={{ width: '100%' }}
          onClick={onClick}
          disabled={disabled}
          type={type}
        >
          {children}
        </ButtonStyle>
      </Link>
    );
  }

  // Handle external links
  if (href && href.startsWith('http')) {
    return (
      <LinkStyle
        {...styleProps}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </LinkStyle>
    );
  }

  // Regular button
  return (
    <ButtonStyle
      {...styleProps}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;