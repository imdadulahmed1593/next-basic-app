'use client';
import Image from 'next/image';
import { countries } from '../data/countries';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [countryOne, setCountryOne] = useState('');
  const [countryTwo, setCountryTwo] = useState('');
  const router = useRouter();

  const handleGoToToss = () => {
    router.push(`/toss?countryOne=${countryOne}&countryTwo=${countryTwo}`);
  };
  const handleSelect = (country) => {
    if (countryOne && countryTwo) return;
    if (countryOne === '') {
      setCountryOne(country);
    } else {
      setCountryTwo(country);
    }
  };
  return (
    <main className="flex flex-col items-center justify-center max-w-7xl mx-auto p-2">
      <h1 className="text-2xl font-bold">Choose Your Country</h1>
      {countryOne || countryTwo ? (
        <h2 className="py-4 font-bold">
          {countryOne.toUpperCase()} vs {countryTwo.toUpperCase()}
        </h2>
      ) : (
        ''
      )}
      {countryOne && countryTwo && (
        <button
          onClick={handleGoToToss}
          className="py-2 px-4 rounded-lg text-white border border-gray-200 bg-cyan-900 font-bold"
        >
          Go To Toss
        </button>
      )}
      <div className="p-4 mx-auto grid grid-cols-2 gap-10 place-items-center">
        {countries.map((country, idx) => (
          <Image
            key={idx}
            className={`p-6 border rounded-sm border-gray-300 drop-shadow-md cursor-pointer ${
              country === countryOne || country === countryTwo
                ? 'border-8 border-green-900'
                : ''
            }`}
            src={`/countryImg/${country}.png`}
            alt={country}
            width={200}
            height={200}
            onClick={() => handleSelect(country)}
          />
        ))}
      </div>
    </main>
  );
}
