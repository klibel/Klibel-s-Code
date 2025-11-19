'use client'; 

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ModernNav from './nav'; // 👈 Importa el componente simplificado

interface NavWrapperProps {
  logoAlt: string;
  logoSrc: string; 
  // No necesitas 'activeHref' aquí
}

const RouterWrapper: React.FC<NavWrapperProps> = (props) => {
  return (
    <BrowserRouter>
      {/* 👈 Pasa solo los props de imagen */}
      <ModernNav {...props} /> 
    </BrowserRouter>
  );
};

export default RouterWrapper;