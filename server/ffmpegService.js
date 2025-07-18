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

  // Format long text to be wrapped using box and max_width
  const fullText = `${text}`.replace(/\n/g, ' ');
  const tempTextPath = path.join(os.tmpdir(), `ffmpeg-text-${Date.now()}.txt`);
  fs.writeFileSync(tempTextPath, fullText);

  // Placeholder logo path
  const logoPath = path.join(__dirname, 'assets', 'landscaping_logo.png');

  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(path.join(__dirname, 'videos', 'sample.mp4'))
      .input(logoPath)
      .complexFilter([
        // Label the main video as [base]
        { filter: 'null', inputs: '0:v', outputs: 'base' },
      
        // Draw text onto base video => output to [texted]
        {
          filter: 'drawtext',
          inputs: 'base',
          outputs: 'texted',
          options: {
            fontfile: FONT_PATH,
            textfile: tempTextPath,
            fontcolor: 'white',
            fontsize: 32,
            x: '(w-text_w)/2',
            y: '(h-text_h)/2 + 150',
            box: 0,
            boxcolor: 'black@0.1',
            line_spacing: 6
          }
        },
       // Scale the logo to 100x100
        {
            filter: 'scale',
            inputs: '1:v',
            outputs: 'logo_scaled',
            options: {
            w: 200,
            h: 200
            }
        },
        // Overlay the scaled logo on the texted video
        {
          filter: 'overlay',
          inputs: ['texted', 'logo_scaled'],
          options: {
            x: '(main_w-overlay_w)/2',
            y: '(main_h-overlay_h)/2'
          }
        }
      ])
      .output(outputPath)
      .on('start', cmd => console.log('[FFmpeg command]', cmd))
      .on('stderr', line => console.log('[FFmpeg stderr]', line))
      .on('end', () => {
        fs.unlinkSync(tempTextPath);
        resolve(outputFile);
      })
      .on('error', (err, stdout, stderr) => {
        console.error('[FFmpeg error]', err.message);
        if (fs.existsSync(tempTextPath)) fs.unlinkSync(tempTextPath);
        reject(err);
      })
      .run();
  });
}

module.exports = { renderVideo };
