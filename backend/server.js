require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const NodeCache = require('node-cache');

const app = express();
const port = process.env.PORT || 5000;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize cache with 1 hour TTL
const cache = new NodeCache({ stdTTL: 3600 });

app.use(cors());
app.use(express.json());

// Generate image endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Check cache first
    const cachedImage = cache.get(prompt);
    if (cachedImage) {
      return res.json({ image: cachedImage });
    }

    // Generate image using DALL-E
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
    });

    const imageUrl = response.data[0].url;

    // Cache the result
    cache.set(prompt, imageUrl);

    res.json({ image: imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
