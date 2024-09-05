// components/RecurrenceSettings.js
'use client';
import React from 'react';
import useDatePickerStore from '../store/useDatePickerStore';

const RecurrenceSettings = () => {
  const {
    recurrenceType,
    customInterval,
    selectedDaysOfWeek,
    setRecurrenceType,
    setCustomInterval,
    setSelectedDaysOfWeek,
  } = useDatePickerStore();

  const handleRecurrenceTypeChange = (e) => {
    setRecurrenceType(e.target.value);
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

  return (
    <div>
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
    </div>
  );
};

export default RecurrenceSettings;
