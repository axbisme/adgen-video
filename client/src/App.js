import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [product, setProduct] = useState('');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Create Your Video Ad</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
          style={inputStyle}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Tone (e.g., energetic, professional)"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Creating...' : 'Create Ad'}
        </button>
      </form>

      {videoUrl && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Your Ad</h3>
          <video src={videoUrl} controls width="100%" />
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  fontSize: '1rem'
};

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  backgroundColor: '#333',
  color: '#fff',
  border: 'none',
  cursor: 'pointer'
};

export default App;
