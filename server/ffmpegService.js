const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

async function renderVideo(text, product) {
  const outputFile = `output-${Date.now()}.mp4`;
  const outputPath = path.join(__dirname, 'videos', outputFile);

  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath));
  }

  return new Promise((resolve, reject) => {
    ffmpeg()
      .input('videos/sample.mp4') // Put a sample video in the root or videos folder
      .videoFilter(`drawtext=text='${product}: ${text}':fontcolor=white:fontsize=24:x=10:y=H-th-30`)
      .output(outputPath)
      .on('end', () => resolve(outputFile))
      .on('error', reject)
      .run();
  });
}

module.exports = { renderVideo };
