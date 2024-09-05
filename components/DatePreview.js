'use client';
import React from 'react';
import useDatePickerStore from '../store/useDatePickerStore';
import { isSameDay } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DatePreview = () => {
  const { previewDates, startDate, endDate } = useDatePickerStore();
  console.log(previewDates);
  // Function to check if a date should be highlighted
  const tileClassName = ({ date }) => {
    return previewDates.some((previewDate) => isSameDay(date, previewDate))
      ? 'highlight'
      : '';
  };

  return (
    <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded-lg shadow-lg">
      <h4 className="text-lg font-semibold mb-4 text-gray-700">
        Visual Preview
      </h4>

      {previewDates.length > 0 ? (
        <Calendar
          className="bg-white rounded-lg shadow-lg p-2"
          tileClassName={tileClassName}
          value={startDate}
          minDate={startDate}
          maxDate={endDate}
        />
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-red-500">
            No dates available. Generate dates in the date picker.
          </p>
        </div>
      )}
      <style>{`
        .highlight {
          background-color: #4caf50;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default DatePreview;
