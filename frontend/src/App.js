import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Card,
  CardMedia,
  CardActions,
  IconButton,
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/generate', {
        prompt,
      });
      setImage(response.data.image);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!image) return;

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pixilator-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading image:', err);
    }
  };

  return (
    <Container maxWidth='md'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h3' component='h1' gutterBottom align='center'>
          Pixilator
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='text.secondary'
          gutterBottom
        >
          Transform your imagination into art with AI
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant='outlined'
            label='Enter your prompt'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant='contained'
            onClick={generateImage}
            disabled={loading}
            sx={{ mb: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Image'}
          </Button>

          {image && (
            <Card>
              <CardMedia
                component='img'
                height='512'
                image={image}
                alt='Generated image'
              />
              <CardActions>
                <IconButton onClick={downloadImage} color='primary'>
                  <DownloadIcon />
                </IconButton>
              </CardActions>
            </Card>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
