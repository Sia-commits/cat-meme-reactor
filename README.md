# 🐱 Cat Meme Reactor

**Your face, translated into cat.**

Cat Meme Reactor watches your webcam, reads your facial expression in real time, and responds with the cat meme that matches your mood. Smile and you get a happy cat. Frown and the cat judges you.

**[Live demo](https://YOUR-USERNAME.github.io/cat-meme-reactor)** · Allow camera access when prompted.

<!-- Add a screenshot or GIF here: -->
<!-- ![Demo](demo.gif) -->

## Features

- Real-time webcam feed in the browser
- Detects 7 expressions: happy, sad, angry, surprised, fearful, disgusted, and neutral
- Shows a live "reading" label with the detected expression and confidence
- Matches each expression to a cat meme image and caption
- Confidence threshold and cooldown so the meme doesn't flicker
- Runs entirely in the browser. No video is uploaded or stored.

## How it works

1. `getUserMedia` requests the webcam and streams it into a `<video>` element.
2. [face-api.js](https://github.com/justadudewhohacks/face-api.js) loads two lightweight models: Tiny Face Detector and Face Expression Net.
3. Every 500 ms, the app detects a single face and picks the expression with the highest score.
4. Scores below 50% confidence are ignored, to filter out noise.
5. A decision loop checks the latest expression every 400 ms and swaps the meme, with a 900 ms cooldown between changes.

## Tech stack

- HTML, CSS, and vanilla JavaScript (no framework, no build step)
- face-api.js for face detection and expression classification
- Google Fonts: Fredoka, Space Grotesk, Space Mono

## Project structure

```
cat-meme-reactor/
├── index.html
├── style.css
├── script.js
├── happy.jpg
├── sad.jpg
├── angry.jpg
├── surprised.jpg
├── fearful.jpg
├── disgusted.jpg
├── neutral.jpg
└── default.jpg
```

## Run it locally

Camera access only works on `https://` or `localhost`, so opening the file directly (`file://`) won't work.

**Option 1: VS Code Live Server**

1. Install the Live Server extension.
2. Right-click `index.html` and choose **Open with Live Server**.
3. Allow camera access when the browser asks.

**Option 2: Python**

```bash
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Troubleshooting

| Problem | Likely cause |
| --- | --- |
| Black video box | No camera detected, camera blocked in browser permissions, or another app is using it. Check the browser console for `NotFoundError`, `NotAllowedError`, or `NotReadableError`. |
| Label stuck on "reading" | Models failed to load. Check your internet connection and the Network tab. |
| Broken meme image | An image filename in `MEME_MAP` doesn't match a file in the folder. |

## Ideas for next steps

- Show a confidence bar for each expression
- Add more memes per expression and pick one at random
- Add a button to save or share the current reaction
- Host the models locally so the app works offline

## Credits

Face detection by [face-api.js](https://github.com/justadudewhohacks/face-api.js) by Vincent Mühler.

## License

MIT
