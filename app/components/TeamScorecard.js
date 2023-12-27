import React, { useState } from 'react';

export default function TeamScorecard({
  team,
  prevScores,
  firstBatting,
  updateMatchData,
}) {
  const [scores, setScores] = useState(prevScores);

  const handleNextOver = async () => {
    if (scores.length < 12) {
      setScores([
        ...scores,
        {
          [scores.length < 6
            ? `0.${scores.length + 1}`
            : `1.${scores.length - 5}`]: Math.floor(Math.random() * 7),
        },
      ]);
    } else {
      updateMatchData(scores);
      setScores([]);
    }
  };

  return (
    <div className="w-1/2 flex flex-col gap-4 items-center">
      <p>
        Total Run :{' '}
        {scores.reduce((accumulator, currentOver) => {
          Object.keys(currentOver).forEach((overKey) => {
            accumulator += currentOver[overKey];
          });

          return accumulator;
        }, 0)}
      </p>
      {updateMatchData && (
        <button
          onClick={handleNextOver}
          className="py-2 px-4 rounded-lg text-white border border-gray-200 bg-cyan-900 font-bold"
        >
          {scores.length < 12
            ? 'Play Next Ball'
            : scores.length === 12 && firstBatting
            ? 'Go to next innings'
            : 'Go to results'}
        </button>
      )}
      <h1>Scorecard: {team}</h1>
      <table class="w-full mx-auto text-center  border-collapse border border-slate-400 ...">
        <thead>
          <tr>
            <th class="border border-slate-300 ...">Over</th>
            <th class="border border-slate-300 ...">Run</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, idx) => {
            // Extracting the key and run value from each score object
            const [over, ball] = Object.keys(score)[0].split('.');
            const run = score[Object.keys(score)[0]];

            return (
              <tr key={idx}>
                <td className="border border-slate-300 ...">{`${over}.${ball}`}</td>
                <td className="border border-slate-300 ...">{run}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
