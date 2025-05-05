import React, { useState } from 'react';
import axios from 'axios';
import GenerateButton from './components/GenerateButton';
import VideoPreview from './components/VideoPreview';


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

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="Enter product name"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control shadow-sm"
            placeholder="Enter specific messaging"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="Enter tone (e.g., energetic, professional)"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          />
        </div>
      </form>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="container text-center">
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
