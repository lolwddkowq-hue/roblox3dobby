const TOTAL_SECONDS = 60 * 60;

const timeText = document.getElementById("timeText");
const percentText = document.getElementById("percentText");
const statusText = document.getElementById("statusText");
const progressBar = document.getElementById("progressBar");
const logList = document.getElementById("logList");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const exportBtn = document.getElementById("exportBtn");

let remainingSeconds = TOTAL_SECONDS;
let timerId = null;
let logIntervalId = null;

const fakeLogs = [
  "Simulation mode active",
  "Scanning mock assets",
  "Reading fake texture index",
  "Generating sandbox report",
  "Compiling test-only block map",
  "Checking placeholder nodes",
  "No external requests executed",
  "Encrypting visual-only packets",
  "Parsing sample terminal theme",
  "Rendering cyber block overlays",
  "Validating offline simulator state",
  "Refreshing synthetic diagnostics",
  "Updating pretend progress markers",
  "Mock audit complete",
  "Sandbox still isolated",
  "No APIs contacted",
  "Simulation safety check passed"
];

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (totalSeconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function addLog(message) {
  const timeStamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const item = document.createElement("li");
  item.textContent = `[${timeStamp}] ${message}`;
  logList.prepend(item);

  while (logList.children.length > 40) {
    logList.removeChild(logList.lastChild);
  }
}

function randomLog() {
  const msg = fakeLogs[Math.floor(Math.random() * fakeLogs.length)];
  addLog(msg);
}

function updateUI() {
  const completedSeconds = TOTAL_SECONDS - remainingSeconds;
  const pct = Math.floor((completedSeconds / TOTAL_SECONDS) * 100);

  timeText.textContent = formatTime(remainingSeconds);
  percentText.textContent = `${pct}%`;
  progressBar.style.width = `${pct}%`;
}

function setStatus(value) {
  statusText.textContent = value;
}

function startSimulation() {
  if (timerId) {
    return;
  }

  setStatus("Running (Visual Simulation)");
  addLog("Simulation started - visual mode only.");

  timerId = window.setInterval(() => {
    remainingSeconds -= 1;

    if (remainingSeconds <= 0) {
      remainingSeconds = 0;
      updateUI();
      stopSimulation(false);
      setStatus("Completed (Simulation)");
      addLog("Countdown complete - no real actions performed.");
      return;
    }

    updateUI();
  }, 1000);

  if (!logIntervalId) {
    logIntervalId = window.setInterval(randomLog, 1400);
  }
}

function stopSimulation(logPause = true) {
  if (timerId) {
    window.clearInterval(timerId);
    timerId = null;
  }

  if (logIntervalId) {
    window.clearInterval(logIntervalId);
    logIntervalId = null;
  }

  if (logPause) {
    setStatus("Paused");
    addLog("Simulation paused.");
  }
}

function resetSimulation() {
  stopSimulation(false);
  remainingSeconds = TOTAL_SECONDS;
  updateUI();
  setStatus("Idle");
  addLog("Simulation reset.");
}

function exportPNG() {
  const width = 1280;
  const height = 720;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#020606";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(77,255,136,0.08)";
  for (let i = 0; i < 20; i += 1) {
    ctx.fillRect(i * 64, 0, 1, height);
    ctx.fillRect(0, i * 36, width, 1);
  }

  ctx.strokeStyle = "#4dff88";
  ctx.lineWidth = 3;
  ctx.strokeRect(38, 34, width - 76, height - 68);

  ctx.fillStyle = "#0d1a14";
  ctx.fillRect(48, 44, width - 96, 84);

  ctx.fillStyle = "#25ff73";
  ctx.font = "bold 34px monospace";
  ctx.fillText("ROBLOX-STYLE TERMINAL SIMULATOR", 70, 95);

  ctx.font = "20px monospace";
  ctx.fillStyle = "#c8ffe0";
  ctx.fillText("SIMULATION ONLY · NO REAL HACKING · NO NETWORK REQUESTS", 70, 122);

  ctx.fillStyle = "#08110d";
  ctx.fillRect(48, 145, width - 96, 100);
  ctx.strokeStyle = "#1d3838";
  ctx.strokeRect(48, 145, width - 96, 100);

  ctx.fillStyle = "#95f7ba";
  ctx.font = "22px monospace";
  ctx.fillText(`STATUS: ${statusText.textContent}`, 70, 182);
  ctx.fillText(`TIME REMAINING: ${timeText.textContent}`, 70, 212);
  ctx.fillText(`PROGRESS: ${percentText.textContent}`, 620, 212);

  ctx.fillStyle = "#071111";
  ctx.fillRect(48, 262, width - 96, 36);
  ctx.strokeStyle = "#1d3838";
  ctx.strokeRect(48, 262, width - 96, 36);

  const pct = parseFloat(percentText.textContent) || 0;
  ctx.fillStyle = "#2cff78";
  ctx.fillRect(51, 265, ((width - 102) * pct) / 100, 30);

  ctx.fillStyle = "#040b08";
  ctx.fillRect(48, 316, width - 96, height - 370);
  ctx.strokeStyle = "#1d3838";
  ctx.strokeRect(48, 316, width - 96, height - 370);

  ctx.fillStyle = "#95f7ba";
  ctx.font = "20px monospace";
  ctx.fillText("FAKE TERMINAL LOG (VISUAL DEMO)", 70, 348);

  ctx.font = "18px monospace";
  ctx.fillStyle = "#b9ffd1";

  const logs = Array.from(logList.children)
    .slice(0, 12)
    .map((li) => li.textContent);

  if (logs.length === 0) {
    logs.push("[00:00:00] Simulation mode active");
    logs.push("[00:00:01] No real operations executed");
  }

  logs.forEach((entry, index) => {
    const y = 382 + index * 26;
    ctx.fillText(`> ${entry}`, 70, y);
  });

  const link = document.createElement("a");
  link.download = `terminal-simulation-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();

  addLog("PNG export generated from canvas.");
}

startBtn.addEventListener("click", startSimulation);
pauseBtn.addEventListener("click", () => stopSimulation(true));
resetBtn.addEventListener("click", resetSimulation);
exportBtn.addEventListener("click", exportPNG);

updateUI();
addLog("Ready. This interface is a visual simulation only.");
addLog("No real hacking tools, APIs, or credentials are used.");
