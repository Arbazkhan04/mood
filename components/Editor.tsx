'use client';

import { useState } from 'react';
import { updateEntry } from '@/utlis/api';
import { useAutosave } from 'react-autosave';

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  const { mood, summary, color, subject, negative } = analysis;
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ];

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const data = await updateEntry(entry.id, _value);
      setAnalysis(data.analysis);
      setIsLoading(false);
    },
  });

  return (
    <div className="h-full w-full flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Editor Section */}
      <div className="flex-grow bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Journal Entry</h2>
        {isLoading && <p className="text-sm text-gray-500 italic mb-2">Saving...</p>}
        <textarea
          className="w-full h-[300px] p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-gray-50"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write your thoughts here..."
        />
      </div>

      {/* Analysis Section */}
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow border border-gray-200">
        <div
          className="px-6 py-4 text-white font-bold text-xl rounded-t-lg"
          style={{ backgroundColor: color || '#f9d71c' }}
        >
          Analysis
        </div>
        <ul className="p-6 space-y-4">
          {analysisData.map((item) => (
            <li
              key={item.name}
              className="flex flex-col p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
            >
              <span className="text-sm font-semibold text-gray-500">{item.name}</span>
              <span className="text-lg font-medium text-gray-800">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Editor;
