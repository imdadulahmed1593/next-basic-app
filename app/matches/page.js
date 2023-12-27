'use client';
import React, { useEffect, useState } from 'react';
import { getMatches } from '../../util/helpers';
import Link from 'next/link';

function Matches() {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatches();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    fetchMatches();
  }, []);

  return (
    <main className="flex gap-4 flex-col items-center justify-center max-w-7xl mx-auto p-2">
      <h1>All Matches List</h1>
      {matches.map((match) => (
        <div className="flex justify-between items-center w-1/3 bg-gray-100 hover:bg-gray-200 p-4">
          <p>
            {match.battingTeam} vs {match.bowlingTeam}
          </p>{' '}
          <Link className="cursor-pointer" href={`/matches/${match.id}`}>
            ➕
          </Link>
        </div>
      ))}
    </main>
  );
}

export default Matches;
