const express = require('express');
const router = express.Router();
const { generateAdCopy } = require('./llmService');
const { renderVideo } = require('./ffmpegService');

router.post('/generate', async (req, res) => {
  const { product, message, tone } = req.body;

  try {
    const adCopy = await generateAdCopy(product, message, tone);
    const videoPath = await renderVideo(adCopy, product);
    res.json({ adCopy, videoUrl: `/videos/${videoPath}`, filename: videoPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate video ad' });
  }
});

module.exports = router;
