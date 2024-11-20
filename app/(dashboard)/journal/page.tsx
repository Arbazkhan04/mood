import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';
import Question from '@/components/Question';
import Link from 'next/link';
import { getUserByClerkID } from '@/utlis/auth';
import { prisma } from '@/utlis/db';

const getEntries = async () => {
  const user = await getUserByClerkID();
  const entries = await prisma.journalEntry.findMany({
    where: { 
      userId: user.id,
     },
     
    orderBy: { createdAt: 'asc' },
    include:{
      analysis:true
    }
  });

  return entries;
};

const JournalPage = async () => {
  const entries = await getEntries();
  console.log(entries)

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* <h2 className="text-4xl font-bold text-gray-800 mb-6"></h2> */}
      <div className="my-6">
        <Question />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
