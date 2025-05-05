import React, { useState } from "react";
import axios from "axios";
import GenerateButton from "./components/GenerateButton";
import VideoPreview from "./components/VideoPreview";
import AdForm from "./components/AdForm";
import { ERROR_MESSAGES, API } from "./constant";

function App() {
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState("");

  const isFormValid = product.trim() && message.trim() && tone.trim();

  const handleSubmit = async () => {
    if (!isFormValid) {
      setError(ERROR_MESSAGES.MISSING_FIELDS);
      return;
    }

    setLoading(true);
    setError("");
    setVideoUrl(null);

    try {
      const response = await axios.post(API.GENERATE_VIDEO, {
        product,
        message,
        tone,
      });

      setVideoUrl(`${API.VIDEO_BASE_URL}${response.data.filename}`);
    } catch (err) {
      console.error("Error generating ad:", err);
      alert(ERROR_MESSAGES.GENERATION_FAILED);
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
