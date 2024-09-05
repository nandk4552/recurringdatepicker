// store/useDatePickerStore.js
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useDatePickerStore = create(
  devtools((set) => ({
    recurrenceType: 'daily',
    startDate: new Date(),
    endDate: null,
    customInterval: 1,
    selectedDaysOfWeek: [],
    previewDates: [],
    selectedDaysOfWeek: [], // e.g., [0, 2, 4] for Mon, Wed, Fri
    nthOccurrence: null, // e.g., { week: 2, day: 2 } for second Tuesday
  
    setRecurrenceType: (value) => set({ recurrenceType: value }),
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),
    setCustomInterval: (interval) => set({ customInterval: interval }),
    setSelectedDaysOfWeek: (days) => set({ selectedDaysOfWeek: days }),
    setNthOccurrence: (occurrence) => set({ nthOccurrence: occurrence }),
    setPreviewDates: (dates) => set({ previewDates: dates }),
  }))
);

export default useDatePickerStore;
