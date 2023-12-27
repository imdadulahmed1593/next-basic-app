'use client';
import TeamScorecard from '@/app/components/TeamScorecard';
import { getMatchById, updateMatch } from '@/util/helpers';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MatchResult from '../../components/MatchResult';

function MatchPage() {
  const { matchId } = useParams();
  const router = useRouter();
  const [match, setMatch] = useState(null);
  const [firstBatting, setFirstBatting] = useState(true);
  const [matchFinished, setMatchFinished] = useState(false);
  console.log(matchId);

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
  }, [firstBatting]);

  const calcTotalRuns = (scores) => {
    return scores.reduce((accumulator, currentOver) => {
      Object.keys(currentOver).forEach((overKey) => {
        accumulator += currentOver[overKey];
      });
      return accumulator;
    }, 0);
  };

  const updateMatchData = async (scores) => {
    let updatedMatchData = {};
    console.log(scores);
    firstBatting
      ? (updatedMatchData = {
          ...match,
          battingTeamScores: scores,
        })
      : (updatedMatchData = {
          ...match,
          bowlingTeamScores: scores,
          winner:
            calcTotalRuns(match.battingTeamScores) > calcTotalRuns(scores)
              ? match.battingTeam
              : match.bowlingTeam,
        });

    try {
      const updatedMatch = await updateMatch(matchId, updatedMatchData);
      setMatch(updatedMatch);
      if (firstBatting) {
        setFirstBatting(!firstBatting);
      } else {
        setMatchFinished(true);
      }
    } catch (error) {
      console.error('Error updating match:', error.message);
    }
  };

  return (
    <main className="flex gap-4 flex-col items-center justify-center max-w-7xl mx-auto p-2">
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
          {firstBatting && !matchFinished ? (
            <TeamScorecard
              team={match.battingTeam}
              prevScores={match.battingTeamScores}
              firstBatting={true}
              updateMatchData={updateMatchData}
            />
          ) : !firstBatting && !matchFinished ? (
            <TeamScorecard
              team={match.bowlingTeam}
              prevScores={match.bowlingTeamScores}
              firstBatting={false}
              updateMatchData={updateMatchData}
            />
          ) : (
            <MatchResult match={match} setMatch={setMatch} />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default MatchPage;
