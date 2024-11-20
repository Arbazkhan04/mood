'use client';

import { useRouter } from 'next/navigation';
import { createNewEntry } from '@/utlis/api';

const NewEntryCard = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-200"
      onClick={handleOnClick}
    >
      <div className="px-6 py-10 text-center">
        <span className="text-4xl font-bold">+ New Entry</span>
        <p className="text-lg mt-2">Start documenting your thoughts</p>
      </div>
    </div>
  );
};

export default NewEntryCard;
