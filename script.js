const TOTAL_SECONDS = 60 * 60;
let remainingSeconds = TOTAL_SECONDS;
let elapsedSeconds = 0;
let timerId = null;
let logId = null;

const timeDisplay = document.getElementById('timeDisplay');
const progressDisplay = document.getElementById('progressDisplay');
const stateDisplay = document.getElementById('stateDisplay');
const progressBar = document.getElementById('progressBar');
const logContainer = document.getElementById('logContainer');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');

const fakeLogs = [
  'Scanning mock assets...',
  'Generating sandbox report...',
  'Simulation mode active.',
  'Rendering block world snapshot...',
  'Calibrating neon console UI...',
  'Verifying fictional packet flow...',
  'Applying fake cyber filter...',
  'Compiling harmless debug overlay...',
  'No external APIs contacted.',
  'No credentials accessed or stored.',
  'All actions are visual simulation only.'
];

function formatTime(total) {
  const h = Math.floor(total / 3600).toString().padStart(2, '0');
  const m = Math.floor((total % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(total % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function clockStamp() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour12: false });
}

function addLog(text) {
  const p = document.createElement('p');
  p.className = 'log-line';
  p.textContent = `[${clockStamp()}] ${text}`;
  logContainer.appendChild(p);
  logContainer.scrollTop = logContainer.scrollHeight;

  const maxLines = 120;
  while (logContainer.children.length > maxLines) {
    logContainer.removeChild(logContainer.firstChild);
  }
}

function updateUI() {
  const progress = (elapsedSeconds / TOTAL_SECONDS) * 100;
  timeDisplay.textContent = formatTime(remainingSeconds);
  progressDisplay.textContent = `${progress.toFixed(1)}%`;
  progressBar.style.width = `${progress}%`;
}

function setState(state) {
  stateDisplay.textContent = state;
}

function tick() {
  if (remainingSeconds <= 0) {
    stopTimer();
    setState('COMPLETE');
    addLog('Simulation complete. This was a visual-only demonstration.');
    return;
  }
  remainingSeconds -= 1;
  elapsedSeconds += 1;
  updateUI();
}

function startLogs() {
  if (logId) return;
  logId = setInterval(() => {
    const entry = fakeLogs[Math.floor(Math.random() * fakeLogs.length)];
    addLog(entry);
  }, 1700);
}

function stopLogs() {
  clearInterval(logId);
  logId = null;
}

function startTimer() {
  if (timerId || remainingSeconds <= 0) return;
  timerId = setInterval(tick, 1000);
  setState('RUNNING');
  addLog('Simulation timer started (1 hour mock sequence).');
  startLogs();
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
  stopLogs();
}

function pauseTimer() {
  if (!timerId) return;
  stopTimer();
  setState('PAUSED');
  addLog('Simulation paused. No real processes were running.');
}

function resetTimer() {
  stopTimer();
  remainingSeconds = TOTAL_SECONDS;
  elapsedSeconds = 0;
  updateUI();
  setState('IDLE');
  logContainer.innerHTML = '';
  addLog('Sandbox reset complete. Simulation only.');
}

function exportPNG() {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#050607';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0b1512';
  ctx.strokeStyle = '#1d5030';
  ctx.lineWidth = 4;
  ctx.fillRect(35, 35, 1210, 650);
  ctx.strokeRect(35, 35, 1210, 650);

  ctx.fillStyle = '#52ff89';
  ctx.font = 'bold 38px monospace';
  ctx.fillText('RBX TERMINAL // SIMULATION', 70, 90);

  ctx.fillStyle = '#f5ff7f';
  ctx.font = '20px monospace';
  ctx.fillText('SIMULATION ONLY - NO REAL HACKING OR NETWORK TRAFFIC', 70, 122);

  ctx.fillStyle = '#101a16';
  ctx.fillRect(70, 150, 1140, 64);
  ctx.strokeStyle = '#1d5030';
  ctx.strokeRect(70, 150, 1140, 64);

  ctx.fillStyle = '#b8ffcf';
  ctx.font = '26px monospace';
  ctx.fillText(`Time: ${timeDisplay.textContent}`, 90, 191);
  ctx.fillText(`Progress: ${progressDisplay.textContent}`, 420, 191);
  ctx.fillText(`State: ${stateDisplay.textContent}`, 840, 191);

  ctx.fillStyle = '#070d0b';
  ctx.fillRect(70, 235, 1140, 24);
  ctx.strokeRect(70, 235, 1140, 24);

  const progressValue = elapsedSeconds / TOTAL_SECONDS;
  ctx.fillStyle = '#52ff89';
  ctx.fillRect(72, 237, Math.max(0, (1136 * progressValue)), 20);

  ctx.fillStyle = '#060b09';
  ctx.fillRect(70, 280, 1140, 370);
  ctx.strokeRect(70, 280, 1140, 370);

  ctx.fillStyle = '#52ff89';
  ctx.font = '22px monospace';
  ctx.fillText('mock://rbx-sim/terminal', 88, 310);

  ctx.font = '19px monospace';
  ctx.fillStyle = '#b8ffcf';
  const lines = Array.from(logContainer.querySelectorAll('.log-line'))
    .slice(-13)
    .map((n) => n.textContent);

  if (!lines.length) lines.push(`[${clockStamp()}] Awaiting start. Simulation mode active.`);

  lines.forEach((line, i) => {
    const y = 340 + i * 23;
    if (y < 635) ctx.fillText(line.slice(0, 94), 88, y);
  });

  const link = document.createElement('a');
  link.download = `rbx-terminal-sim-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();

  addLog('Exported mock terminal snapshot as PNG.');
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
exportBtn.addEventListener('click', exportPNG);

updateUI();
addLog('Simulation initialized. This interface is visual-only and harmless.');
