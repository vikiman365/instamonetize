import { Theme } from '../types';

export const theme: Theme = {
  colors: {
    primary: '#405DE6', // Instagram blue
    secondary: '#E1306C', // Instagram pink
    accent: '#F56040', // Instagram orange
    background: '#FAFAFA',
    text: '#262626',
    textLight: '#8E8E8E',
    success: '#4ADE80',
    warning: '#FBBF24',
    error: '#F87171',
    gradient: {
      primary: 'linear-gradient(135deg, #405DE6, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #FCAF45)',
      secondary: 'linear-gradient(135deg, #405DE6, #833AB4, #E1306C)',
      accent: 'linear-gradient(135deg, #405DE6, #F56040)',
    },
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1200px',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '5rem',
  },
};