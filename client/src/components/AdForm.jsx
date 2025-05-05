import React from 'react';

function AdForm({ product, message, tone, setProduct, setMessage, setTone, error, isFormValid }) {
  return (
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

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}

export default AdForm;
