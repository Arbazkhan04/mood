const EntryCard = ({ entry }) => {
  console.log(entry)
  const date = new Date(entry.createdAt).toDateString();

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl border border-gray-200 transition-shadow duration-200">
      <div className="px-6 py-4 bg-gray-100 border-b">
        <h3 className="text-lg font-semibold text-gray-800">{date}</h3>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-600 mb-4">
          <strong>Summary:</strong> {entry.analysis.summary || 'Not available'}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Mood:</strong> {entry.analysis.mood || 'Not available'}
        </p>
      </div>
    </div>
  );
};

export default EntryCard;
