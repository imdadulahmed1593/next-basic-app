'use client';
import { useEffect, useState } from 'react';
import { getMatchById } from '../../../util/helpers';
import { useParams } from 'next/navigation';
import TeamScorecard from '../../components/TeamScorecard';

function Match() {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);

  const calcTotalRuns = (scores) => {
    return scores.reduce((accumulator, currentOver) => {
      Object.keys(currentOver).forEach((overKey) => {
        accumulator += currentOver[overKey];
      });
      return accumulator;
    }, 0);
  };

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const match = await getMatchById(matchId);
        setMatch(match);
      } catch (error) {
        console.error('Error fetching match:', error.message);
      }
    };

    fetchMatch();
  }, []);

  return (
    <main className="flex gap-4 flex-col items-center justify-center max-w-7xl mx-auto p-2">
      <h1 className="text-3xl">Match Details</h1>
      {match ? (
        <>
          <h1>
            {match.battingTeam.toUpperCase()} vs{' '}
            {match.bowlingTeam.toUpperCase()}
          </h1>
          <h2>
            {match.bowlingTeam.toUpperCase()} has won the toss and decided to
            bowl.
          </h2>
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
          <div className="w-full gap-4 flex flex-col md:flex-row justify-between items-center">
            <TeamScorecard
              team={match.battingTeam}
              prevScores={match.battingTeamScores}
            />
            <TeamScorecard
              team={match.bowlingTeam}
              prevScores={match.bowlingTeamScores}
            />
          </div>

          {/* <MatchResult match={match} setMatch={setMatch} /> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default Match;
