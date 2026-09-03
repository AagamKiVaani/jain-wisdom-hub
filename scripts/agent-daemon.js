// ============================================================================
// AUTONOMOUS ELEVATION AGENT - LOCAL DAEMON RUNNER
// Runs every 5.5 hours continuously in the background on your PC.
// ============================================================================

const { spawn } = require("child_process");
const path = require("path");

const INTERVAL_HOURS = 5.5;
const INTERVAL_MS = INTERVAL_HOURS * 60 * 60 * 1000;

console.log("==================================================================");
console.log(`🤖 JAIN WISDOM HUB - AUTONOMOUS DAEMON INITIALIZED`);
console.log(`⏱️ Schedule: Running every ${INTERVAL_HOURS} hours`);
console.log("==================================================================");

function runCycle() {
  console.log(`\n[${new Date().toLocaleString()}] 🚀 Initiating scheduled elevation cycle...`);

  const child = spawn("node", ["--experimental-strip-types", "scripts/run-elevation-agent.ts"], {
    cwd: path.resolve(__dirname, ".."),
    stdio: "inherit",
    shell: true
  });

  child.on("close", (code) => {
    console.log(`[${new Date().toLocaleString()}] Cycle finished with exit code ${code}.`);
    console.log(`Next cycle scheduled in ${INTERVAL_HOURS} hours (${new Date(Date.now() + INTERVAL_MS).toLocaleTimeString()})...`);
  });
}

// Run initial cycle after 5 seconds startup, then on interval
setTimeout(runCycle, 5000);
setInterval(runCycle, INTERVAL_MS);
