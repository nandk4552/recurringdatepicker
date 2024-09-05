// pages/index.js (or index.tsx for TypeScript)
import Image from 'next/image';
import DatePicker from '../components/DatePicker';

export default function Home() {
  return (
    <div>
      <DatePicker />
    </div>
  );
}
