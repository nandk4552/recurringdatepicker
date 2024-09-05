// components/GenerateButton.js
import React from 'react';
import useDatePickerStore from '../store/useDatePickerStore';

const GenerateButton = () => {
  const { generateRecurringDates } = useDatePickerStore();

  return (
    <button
      onClick={generateRecurringDates}
      className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-lg hover:bg-gradient-to-l hover:from-blue-600 hover:to-teal-500 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
    >
      Generate Recurring Dates
    </button>
  );
};

export default GenerateButton;
