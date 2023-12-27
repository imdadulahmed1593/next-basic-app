import { useEffect, useState } from 'react';
import { updateMatch } from '../../util/helpers';
import Link from 'next/link';

function MatchResult({ match, setMatch }) {
  console.log(match);

  const calcTotalRuns = (scores) => {
    return scores.reduce((accumulator, currentOver) => {
      Object.keys(currentOver).forEach((overKey) => {
        accumulator += currentOver[overKey];
      });
      return accumulator;
    }, 0);
  };

  return (
    <>
      {' '}
      <p>Match Finished</p>
      <p>
        {match.battingTeam} batted first and scored{' '}
        {calcTotalRuns(match.battingTeamScores)} runs.
      </p>
      <p>
        {match.bowlingTeam} batted second and scored{' '}
        {calcTotalRuns(match.bowlingTeamScores)} runs.
      </p>
      <p className="font-bold">
        {match.winner} won the match by{' '}
        {calcTotalRuns(match.battingTeamScores) >
        calcTotalRuns(match.bowlingTeamScores)
          ? calcTotalRuns(match.battingTeamScores) -
            calcTotalRuns(match.bowlingTeamScores)
          : calcTotalRuns(match.bowlingTeamScores) -
            calcTotalRuns(match.battingTeamScores)}{' '}
        runs
      </p>
      <Link
        href="/"
        className="py-2 px-4 rounded-lg text-white border border-gray-200 bg-cyan-900 font-bold"
      >
        Go to Home
      </Link>
    </>
  );
}

export default MatchResult;
