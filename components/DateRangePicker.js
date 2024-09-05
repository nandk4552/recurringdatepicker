// components/DateRangePicker.js
'use client';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useDatePickerStore from '../store/useDatePickerStore';

const DateRangePicker = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useDatePickerStore();

  return (
    <div>
      {/* Start Date */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          Start Date
        </label>
        <ReactDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-300 shadow-sm transition duration-200 ease-in-out"
        />
      </div>

      {/* End Date (optional) */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          End Date (optional)
        </label>
        <ReactDatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-300 shadow-sm transition duration-200 ease-in-out"
          isClearable
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
