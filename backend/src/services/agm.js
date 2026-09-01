// backend/src/services/agm.js
// Deterministic AGM logic (skeleton)

async function processLaunch({ agency_id, vehicle_id, mission_type }) {
  // NOTE: This is a skeleton intended to be replaced with DB lookups.
  // For now it runs a deterministic formula using placeholder values.

  // placeholder fetches (in real implementation, load agency, vehicle, tech bonuses)
  const agency = { ap: 25, budget: 100, rp: 0, si: 70, ipi: 60 };
  const vehicle = { reliability: 70 };

  const missionDifficulty = getMissionDifficulty(mission_type || 'orbital');
  const techBonus = 0; // compute from technologies
  const crewBonus = 0;
  const randomVariance = Math.floor(Math.random() * 11) - 5; // -5..+5

  let finalScore = vehicle.reliability + techBonus + crewBonus - missionDifficulty + randomVariance;
  finalScore = Math.max(0, Math.min(100, finalScore));

  let result = 'failure';
  if (finalScore >= 80) result = 'success';
  else if (finalScore >= 50) result = 'partial';
  else if (finalScore >= 20) result = 'failure';
  else result = 'catastrophic';

  return {
    result,
    finalScore,
    rpChange: result === 'success' ? 10 : result === 'partial' ? 2 : 0,
    ipiChange: result === 'success' ? 3 : result === 'partial' ? -1 : -5,
    siChange: result === 'catastrophic' ? -15 : result === 'failure' ? -5 : 1
  };
}

function getMissionDifficulty(type) {
  switch ((type || '').toLowerCase()) {
    case 'test': return 10;
    case 'satellite': return 25;
    case 'orbital': return 35;
    case 'lunar': return 60;
    case 'manned_lunar': return 80;
    case 'mars': return 95;
    default: return 30;
  }
}

module.exports = { processLaunch };
