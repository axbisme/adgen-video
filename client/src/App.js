import React, { useState } from 'react';
import axios from 'axios';
import GenerateButton from './components/GenerateButton';
import VideoPreview from './components/VideoPreview';
import AdForm from './components/AdForm';

function App() {
  const [product, setProduct] = useState('');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState('');

  const isFormValid = product.trim() && message.trim() && tone.trim();

  const handleSubmit = async () => {
    if (!isFormValid) {
      setError('Please fill in all fields before generating the video.');
      return;
    }

    setLoading(true);
    setError('');
    setVideoUrl(null);

    try {
      const response = await axios.post('http://localhost:5000/api/generate', {
        product,
        message,
        tone
      });

      setVideoUrl(`http://localhost:5000/videos/${response.data.filename}`);
    } catch (err) {
      console.error('Error generating ad:', err);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4 text-center">Create Your Video Ad</h2>

      <AdForm
        product={product}
        message={message}
        tone={tone}
        setProduct={setProduct}
        setMessage={setMessage}
        setTone={setTone}
        error={error}
        isFormValid={isFormValid}
      />

      <div className="container text-center mt-3">
        <GenerateButton
          onGenerate={handleSubmit}
          disabled={loading || !isFormValid}
          loading={loading}
        />
      </div>

      <VideoPreview videoUrl={videoUrl} />
    </div>
  );
}

export default App;
