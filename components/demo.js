'use client';
// components/DatePicker.js
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, addMonths, addYears, isSameDay } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useDatePickerStore from '../store/useDatePickerStore';

export default function DatePicker() {
  const {
    recurrenceType,
    startDate,
    endDate,
    customInterval,
    selectedDaysOfWeek,
    setRecurrenceType,
    setStartDate,
    setEndDate,
    setCustomInterval,
    setSelectedDaysOfWeek,
  } = useDatePickerStore();

  const [previewDates, setPreviewDates] = React.useState([]);

  // Helper function to limit the date generation to avoid unresponsiveness
  const limitDateRange = (currentDate, dates) => {
    if (!endDate && dates.length >= 10) {
      return true;
    }
    return false;
  };

  // Generate Recurrence Preview
  const generateRecurringDates = () => {
    let dates = [];
    let currentDate = new Date(startDate);

    while (!endDate || currentDate <= endDate) {
      switch (recurrenceType) {
        case 'daily':
          dates.push(currentDate);
          currentDate = addDays(currentDate, customInterval);
          break;

        case 'weekly':
          if (selectedDaysOfWeek.length > 0) {
            for (let day of selectedDaysOfWeek) {
              const nextDate = addDays(
                currentDate,
                (day - currentDate.getDay() + 7) % 7
              );
              if (nextDate >= startDate && (!endDate || nextDate <= endDate)) {
                dates.push(nextDate);
              }
            }
          } else {
            dates.push(currentDate);
          }
          currentDate = addDays(currentDate, 7 * customInterval);
          break;

        case 'monthly':
          dates.push(currentDate);
          currentDate = addMonths(currentDate, customInterval);
          break;

        case 'yearly':
          dates.push(currentDate);
          currentDate = addYears(currentDate, customInterval);
          break;

        default:
          break;
      }

      if (limitDateRange(currentDate, dates)) break;
    }

    setPreviewDates(dates);
  };

  const handleRecurrenceTypeChange = (e) => {
    setRecurrenceType(e.target.value);
    setPreviewDates([]); // Clear preview when changing recurrence
  };

  const handleCustomIntervalChange = (e) => {
    setCustomInterval(Number(e.target.value));
  };

  const toggleDayOfWeek = (day) => {
    if (selectedDaysOfWeek.includes(day)) {
      setSelectedDaysOfWeek(selectedDaysOfWeek.filter((d) => d !== day));
    } else {
      setSelectedDaysOfWeek([...selectedDaysOfWeek, day]);
    }
  };

  // Function to check if a date should be highlighted
  const tileClassName = ({ date }) => {
    return previewDates.some((previewDate) => isSameDay(date, previewDate))
      ? 'highlight'
      : '';
  };

  return (
    <div className="flex items-center justify-center h-auto min-h-screen p-4 md:p-8">
      {/* Container for the date picker and preview */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 md:p-8">
        <h3 className="text-3xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 animate-pulse">
          🗓️ Recurring Date Picker
        </h3>

        <div className="flex flex-col md:flex-row items-start md:space-x-8">
          {/* Date Picker */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            {/* Recurrence Type */}
            <div className="mb-3">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Recurrence Type
              </label>
              <select
                value={recurrenceType}
                onChange={handleRecurrenceTypeChange}
                className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-300 shadow-sm transition duration-200 ease-in-out"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {/* Customization: Every X days/weeks/months/years */}
            <div className="mb-3">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Every{' '}
                {recurrenceType === 'daily'
                  ? 'X Days'
                  : recurrenceType === 'weekly'
                  ? 'X Weeks'
                  : recurrenceType === 'monthly'
                  ? 'X Months'
                  : 'X Years'}
              </label>
              <input
                type="number"
                value={customInterval}
                onChange={handleCustomIntervalChange}
                className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-300 shadow-sm transition duration-200 ease-in-out"
              />
            </div>

            {/* Customization: Specific Days of the Week (for weekly recurrence) */}
            {recurrenceType === 'weekly' && (
              <div className="mb-3">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Days of the Week
                </label>
                <div className="flex flex-wrap gap-1">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                    (day, index) => (
                      <button
                        key={day}
                        onClick={() => toggleDayOfWeek(index)}
                        className={`px-2 py-1 border rounded-lg transition duration-200 ease-in-out ${
                          selectedDaysOfWeek.includes(index)
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {day}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Date Range */}
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

            {/* Generate Preview Button */}
            <button
              onClick={generateRecurringDates}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-lg hover:bg-gradient-to-l hover:from-blue-600 hover:to-teal-500 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
            >
              Generate Recurring Dates
            </button>
          </div>

          {/* Visual Preview: Mini Calendar */}
          <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold mb-4 text-gray-700">
              Visual Preview
            </h4>

            {previewDates.length > 0 ? (
              <div>
                <Calendar
                  className="bg-white rounded-lg shadow-lg p-2"
                  tileClassName={tileClassName}
                  value={startDate}
                  minDate={startDate}
                  maxDate={endDate}
                />
                <style>{`
                  .highlight {
                    background-color: #4caf50;
                    color: white;
                  }
                `}</style>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-red-500">
                  No dates selected. Click on "Generate Recurring Dates" to see
                  the mini calender preview!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
