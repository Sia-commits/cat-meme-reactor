




const video = document.getElementById("video");
const expressionLabel = document.getElementById("expressionLabel");
const memeImage = document.getElementById("memeImage");
const memeCaption = document.getElementById("memeCaption");

const MEME_MAP = {
  happy:     { file: "happy.jpg",     caption: "Happy cat approves" },
  sad:       { file: "sad.jpg",       caption: "Sad cat noises" },
  angry:     { file: "angry.jpg",     caption: "Angry cat is angry" },
  surprised: { file: "surprised.jpg", caption: "Surprised cat!" },
  fearful:   { file: "fearful.jpg",   caption: "Scared cat hides" },
  disgusted: { file: "disgust.jpg", caption: "Disgusted cat judges you" },
  neutral:   { file: "neutral.jpg",   caption: "Neutral cat observes" },
  default:   { file: "default.jpg",   caption: "Waiting for your face…" },
};

let latestExpression = "neutral";
let currentKey = null;
let lastUpdate = 0;
const COOLDOWN_MS = 900;

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  video.srcObject = stream;
}

const MODEL_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights";

async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
}

function detectExpressions() {
  const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224 });
  setInterval(async () => {
    const result = await faceapi.detectSingleFace(video, options).withFaceExpressions();
    if (result) {
      const sorted = Object.entries(result.expressions).sort((a, b) => b[1] - a[1]);
      const [topExpression, confidence] = sorted[0];
      if (confidence > 0.5) {
        latestExpression = topExpression;
        expressionLabel.textContent = `${topExpression} ${Math.round(confidence * 100)}%`;
      }
    } else {
      expressionLabel.textContent = "no face";
    }
  }, 500);
}

function showMeme(key) {
  const now = Date.now();
  if (key === currentKey) return;
  if (now - lastUpdate < COOLDOWN_MS) return;
  const entry = MEME_MAP[key] || MEME_MAP.default;
  memeImage.src = entry.file;
  memeCaption.textContent = entry.caption;
  currentKey = key;
  lastUpdate = now;
}

function runDecisionLoop() {
  setInterval(() => {
    showMeme(latestExpression || "default");
  }, 400);
}

(async function main() {
  await setupCamera();
  await loadModels();
  detectExpressions();
  runDecisionLoop();
})();