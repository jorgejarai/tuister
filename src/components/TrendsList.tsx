const trends = [
  {
    keyword: 'Gatos',
    count: 1234234,
  },
  {
    keyword: 'Michis',
    count: 900000,
  },
  {
    keyword: '#papitas',
    count: 750000,
  },
  {
    keyword: 'Comida',
    count: 420000,
  },
];

const TrendList = () => {
  return (
    <div className="my-5 mx-8 w-1/5 py-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold px-4">Tendencias</h2>
      <div className="mt-2 flex flex-col">
        {trends.map(({ keyword, count }) => (
          <div
            key={keyword}
            className="px-4 py-2 flex flex-col cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <span className="font-semibold text-md">{keyword}</span>
            <span className="text-gray-400 text-sm">
              {roundNumber(count)} posts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const roundNumber = (count: number) => {
  if (count < 1000) {
    return `${count}`;
  } else if (count >= 1000 && count < 1_000_000) {
    const thousands = Math.floor(count / 1000);

    return `${thousands}k`;
  } else {
    const millions = count / 1_000_000;

    return `${millions.toFixed(1)}M`;
  }
};

export default TrendList;
