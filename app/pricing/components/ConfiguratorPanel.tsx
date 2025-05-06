'use client';

import React from 'react';
import CategoryToggles from './CategoryToggles';
import DynamicForm from './DynamicForm';

export default function ConfiguratorPanel() {
  return (
    <div className="p-6 md:p-8 bg-gradient-to-b from-[#161616] via-[#1D1D1D] to-[#242424] rounded-[24px]">
      <h2 className="text-2xl md:text-3xl font-bold font-['Helvetica_Neue'] mb-6 ">What kind of designs do you want?</h2>
      <CategoryToggles />
      <DynamicForm />
    </div>
  );
} 