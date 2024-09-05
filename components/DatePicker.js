'use client';
import React from 'react';
import { addDays, addMonths, addYears } from 'date-fns';
import useDatePickerStore from '../store/useDatePickerStore';
import DatePreview from './DatePreview';
import DateRangePicker from './DateRangePicker';
import RecurrenceSettings from './RecurrenceSettings';
import { isSameDay, getDay } from 'date-fns';
export default function DatePicker() {
  const {
    recurrenceType,
    startDate,
    endDate,
    customInterval,
    selectedDaysOfWeek,
    setPreviewDates,
  } = useDatePickerStore();

  // Helper function to limit the date generation to avoid unresponsiveness
  const limitDateRange = (currentDate, dates) => {
    if (!endDate && dates.length >= 11) {
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

    // Only include endDate if it matches one of the selected days in weekly recurrence
    if (recurrenceType === 'weekly' && endDate) {
      const endDayOfWeek = getDay(endDate);
      if (
        selectedDaysOfWeek.includes(endDayOfWeek) &&
        !dates.some((date) => isSameDay(date, endDate))
      ) {
        dates.push(endDate);
      }
    } else if (endDate && !dates.some((date) => isSameDay(date, endDate))) {
      dates.push(endDate);
    }

    setPreviewDates(dates);
  };

  return (
    <div className="flex items-center justify-center h-auto min-h-screen p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 md:p-8">
        <h3 className="text-3xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 animate-pulse">
          🗓️ Recurring Date Picker
        </h3>

        <div className="flex flex-col md:flex-row items-start md:space-x-8">
          {/* Date Picker */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            {/* Recurrence Settings */}
            <RecurrenceSettings />

            {/* Date Range Picker */}
            <DateRangePicker />

            {/* Generate Preview Button */}
            <button
              onClick={generateRecurringDates}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-lg hover:bg-gradient-to-l hover:from-blue-600 hover:to-teal-500 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
            >
              Generate Recurring Dates
            </button>
          </div>

          {/* Visual Preview: Mini Calendar */}
          <DatePreview />
        </div>
      </div>
    </div>
  );
}
