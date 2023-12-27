const createMatch = async (matchData) => {
  try {
    const response = await fetch('http://localhost:3500/matches', {
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

const getMatches = async () => {
  try {
    const response = await fetch('http://localhost:3500/matches');

    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }

    const matches = await response.json();
    console.log('Matches:', matches);
    return matches;
  } catch (error) {
    console.error('Error fetching matches:', error.message);
    throw error;
  }
};

const updateMatch = async (matchId, updatedMatchData) => {
  try {
    const response = await fetch(`http://localhost:3500/matches/${matchId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMatchData),
    });

    if (!response.ok) {
      throw new Error('Failed to update match');
    }

    const updatedMatch = await response.json();
    console.log('Match updated:', updatedMatch);
    return updatedMatch;
  } catch (error) {
    console.error('Error updating match:', error.message);
    throw error;
  }
};

const deleteMatch = async (matchId) => {
  try {
    const response = await fetch(`http://localhost:3500/matches/${matchId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete match');
    }

    console.log('Match deleted');
  } catch (error) {
    console.error('Error deleting match:', error.message);
    throw error;
  }
};

const getMatchById = async (matchId) => {
  try {
    const response = await fetch(`http://localhost:3500/matches/${matchId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch match by ID');
    }

    const match = await response.json();
    console.log('Match by ID:', match);
    return match;
  } catch (error) {
    console.error('Error fetching match by ID:', error.message);
    throw error;
  }
};

const calcTotalRuns = (scores) => {
  scores.reduce((accumulator, currentOver) => {
    Object.keys(currentOver).forEach((overKey) => {
      accumulator += currentOver[overKey];
    });
  });
};

export {
  createMatch,
  getMatches,
  updateMatch,
  deleteMatch,
  getMatchById,
  calcTotalRuns,
};
