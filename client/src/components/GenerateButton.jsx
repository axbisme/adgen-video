import React, { useState } from 'react';

const GenerateButton = ({ onGenerate }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      await onGenerate();
      setSuccess(true);
    } catch (err) {
      alert('Error generating video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center mt-3">
      <button
        className="btn btn-success px-4 py-2 fw-bold"
        onClick={handleClick}
        disabled={loading}
      >
        {!loading ? <i className="bi bi-film me-2" /> : ''}
        {loading ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''}
        {loading ? ' Creating...' : 'Create Video'}
      </button>
    </div>
  );
};

export default GenerateButton;
