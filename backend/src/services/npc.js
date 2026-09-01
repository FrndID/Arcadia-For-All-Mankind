// backend/src/services/npc.js
// NPC autopilot skeleton — to be invoked by cron jobs

async function runNpcTurn(npc) {
  // npc: { id, archetype, ap, budget, strategy }
  // This function should decide actions (research/produce/launch) based on archetype
  // For MVP this is a no-op placeholder.
  return { message: 'npc turn executed (stub)', npcId: npc && npc.id };
}

module.exports = { runNpcTurn };
