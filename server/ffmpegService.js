const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');
const os = require('os');

ffmpeg.setFfmpegPath(ffmpegPath);

const FONT_PATH = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';

async function renderVideo(text, product) {
  const outputFile = `output-${Date.now()}.mp4`;
  const outputPath = path.join(__dirname, 'videos', outputFile);

  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  // Write the drawtext content to a temp file
  const fullText = `${product}: ${text}`.replace(/\n/g, ' ');
  const tempTextPath = path.join(os.tmpdir(), `ffmpeg-text-${Date.now()}.txt`);
  fs.writeFileSync(tempTextPath, fullText);

  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(path.join(__dirname, 'videos', 'sample.mp4'))
      .videoFilter(`drawtext=fontfile=${FONT_PATH}:textfile='${tempTextPath}':fontcolor=white:fontsize=24:x=10:y=H-th-30`)
      .output(outputPath)
      .on('start', cmd => console.log('[FFmpeg command]', cmd))
      .on('stderr', line => console.log('[FFmpeg stderr]', line))
      .on('end', () => {
        fs.unlinkSync(tempTextPath); // clean up
        resolve(outputFile);
      })
      .on('error', (err, stdout, stderr) => {
        console.error('[FFmpeg error]', err.message);
        fs.unlinkSync(tempTextPath); // clean up even on failure
        reject(err);
      })
      .run();
  });
}

module.exports = { renderVideo };
