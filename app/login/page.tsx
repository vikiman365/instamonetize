'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiInstagram, FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import { theme } from '@/styles/theme';
import AnimatedSection from '@/components/AnimatedASecton/AnimatedSection';
import Button from '@/components/Button/Button';
import { fadeInUp, scaleUp } from '@/styles/animations';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.background} 0%, #f8f9fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px ${theme.spacing.md} ${theme.spacing.xxl};
`;

const LoginCard = styled(motion.div)`
  background: white;
  border-radius: 25px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  overflow: hidden;
`;

const LoginHeader = styled.div`
  background: ${theme.colors.gradient.secondary};
  color: white;
  padding: ${theme.spacing.xl};
  text-align: center;
`;

const LoginLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.sm};
  
  svg {
    font-size: 2rem;
  }
`;

const LoginSubtitle = styled.p`
  opacity: 0.9;
  font-size: 1.1rem;
`;

const LoginBody = styled.div`
  padding: ${theme.spacing.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.sm};
  font-weight: 600;
  color: ${theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.textLight};
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 50px;
  border: 2px solid ${({ $hasError }) => $hasError ? theme.colors.error : '#e5e7eb'};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => $hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ $hasError }) => 
      $hasError ? `${theme.colors.error}20` : `${theme.colors.primary}20`};
  }
  
  &::placeholder {
    color: ${theme.colors.textLight};
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${theme.colors.textLight};
  cursor: pointer;
  font-size: 1.2rem;
  
  &:hover {
    color: ${theme.colors.text};
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: 0.875rem;
  margin-top: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
    align-items: flex-start;
  }
`;

const RememberMe = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: ${theme.colors.primary};
  }
`;

const ForgotPassword = styled(Link)`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${theme.spacing.xl} 0;
  color: ${theme.colors.textLight};
  
  &:before, &:after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
  
  span {
    padding: 0 ${theme.spacing.md};
    font-size: 0.875rem;
  }
`;

const SocialLogin = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const SocialButton = styled.button<{ $provider: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  color: ${theme.colors.text};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ $provider }) => 
      $provider === 'instagram' ? theme.colors.secondary : theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.xl};
  color: ${theme.colors.textLight};
  
  a {
    color: ${theme.colors.primary};
    font-weight: 600;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Replace with your actual login endpoint
      const response = await fetch('https://your-worker-url.workers.dev/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Redirect to dashboard on successful login
        window.location.href = '/dashboard';
      } else {
        setErrors({
          ...errors,
          password: 'Invalid email or password'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        ...errors,
        password: 'Network error. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <LoginContainer>
      <AnimatedSection animation="scaleUp" threshold={0.1}>
        <LoginCard>
          <LoginHeader>
            <LoginLogo>
              <FiInstagram />
              InstaMonetize
            </LoginLogo>
            <LoginSubtitle>
              Sign in to access your monetization dashboard
            </LoginSubtitle>
          </LoginHeader>
          
          <LoginBody>
            <form onSubmit={handleSubmit}>
              <AnimatedSection animation="fadeInUp" delay={0.1}>
                <FormGroup>
                  <Label htmlFor="email">
                    <FiMail />
                    Email Address
                  </Label>
                  <InputContainer>
                    <InputIcon>
                      <FiMail />
                    </InputIcon>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="creator@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      $hasError={!!errors.email}
                    />
                  </InputContainer>
                  {errors.email && (
                    <ErrorMessage>
                      ⚠️ {errors.email}
                    </ErrorMessage>
                  )}
                </FormGroup>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={0.2}>
                <FormGroup>
                  <Label htmlFor="password">
                    <FiLock />
                    Password
                  </Label>
                  <InputContainer>
                    <InputIcon>
                      <FiLock />
                    </InputIcon>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      $hasError={!!errors.password}
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </PasswordToggle>
                  </InputContainer>
                  {errors.password && (
                    <ErrorMessage>
                      ⚠️ {errors.password}
                    </ErrorMessage>
                  )}
                </FormGroup>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={0.3}>
                <RememberForgot>
                  <RememberMe>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <span>Remember me</span>
                  </RememberMe>
                  <ForgotPassword href="/forgot-password">
                    Forgot password?
                  </ForgotPassword>
                </RememberForgot>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={0.4}>
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </AnimatedSection>
            </form>

            <AnimatedSection animation="fadeInUp" delay={0.5}>
              <Divider>
                <span>Or continue with</span>
              </Divider>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.6}>
              <SocialLogin>
                <SocialButton 
                  $provider="instagram" 
                  type="button"
                  onClick={() => {
                    // Implement Instagram OAuth
                    window.location.href = '/api/auth/instagram';
                  }}
                >
                  <FiInstagram />
                  Instagram
                </SocialButton>
                
                <SocialButton 
                  $provider="email" 
                  type="button"
                  onClick={() => {
                    // Implement email login
                  }}
                >
                  <FiMail />
                  Email
                </SocialButton>
              </SocialLogin>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.7}>
              <SignupLink>
                New to InstaMonetize?{' '}
                <Link href="/apply">Create an account</Link>
              </SignupLink>
            </AnimatedSection>
          </LoginBody>
        </LoginCard>
      </AnimatedSection>
    </LoginContainer>
  );
}