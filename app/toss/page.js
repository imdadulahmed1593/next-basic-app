'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Toss() {
  const baseUrl = 'http://localhost:3500';
  const router = useRouter();
  const searchParams = useSearchParams();
  const countryOne = searchParams.get('countryOne');
  const countryTwo = searchParams.get('countryTwo');
  const [selectedToBowl, setSelectedToBowl] = useState('');
  const handleSelect = (country) => {
    if (selectedToBowl === '') {
      setSelectedToBowl(country);
    }
  };

  const createMatch = async (matchData) => {
    try {
      const response = await fetch(`${baseUrl}/matches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchData),
      });

      if (!response.ok) {
        throw new Error('Failed to create match');
      }

      const newMatch = await response.json();
      console.log('New match created:', newMatch);
      return newMatch;
    } catch (error) {
      console.error('Error creating match:', error.message);
      throw error;
    }
  };

  const handleGoToPlay = async () => {
    const matchId = uuidv4();
    const matchData = {
      id: matchId,
      bowlingTeam: selectedToBowl,
      battingTeam: selectedToBowl === countryOne ? countryTwo : countryOne,
      winner: null,
      bowlingTeamScores: [],
      battingTeamScores: [],
    };
    await createMatch(matchData);
    router.push(`/play/${matchId}`);
  };

  return (
    <main className="flex flex-col items-center justify-center max-w-7xl mx-auto p-2">
      <h1 className="text-2xl font-bold mb-6">Choose Who Will Bowl</h1>
      <div className=" p-4 mx-auto grid grid-cols-2 gap-20 place-items-center">
        <Image
          className={`rounded-full drop-shadow-md cursor-pointer ${
            selectedToBowl === countryOne ? 'border-8 border-green-900' : ''
          }`}
          src={`/countryImg/${countryOne}.png`}
          alt={countryOne}
          width={200}
          height={200}
          onClick={() => handleSelect(countryOne)}
        />
        <Image
          className={`rounded-full drop-shadow-md cursor-pointer ${
            selectedToBowl === countryTwo ? 'border-8 border-green-900' : ''
          }`}
          src={`/countryImg/${countryTwo}.png`}
          alt={countryTwo}
          width={200}
          height={200}
          onClick={() => handleSelect(countryTwo)}
        />
      </div>
      {selectedToBowl && (
        <button
          onClick={handleGoToPlay}
          className="py-2 px-4 rounded-lg text-white border border-gray-200 bg-cyan-900 font-bold"
        >
          Lets Play!
        </button>
      )}
    </main>
  );
}

export default Toss;
