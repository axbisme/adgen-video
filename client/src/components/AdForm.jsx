import React from "react";
import PropTypes from "prop-types";
import { PLACEHOLDERS } from "../constant";

/**
 * Renders the ad generation form with product, message, and tone inputs.
 *
 * @component
 * @param {Object} props
 * @param {string} props.product - Current product input value.
 * @param {string} props.message - Current message input value.
 * @param {string} props.tone - Current tone input value.
 * @param {Function} props.setProduct - Function to update product value.
 * @param {Function} props.setMessage - Function to update message value.
 * @param {Function} props.setTone - Function to update tone value.
 * @param {string} [props.error] - Optional error message to display.
 * @returns {JSX.Element}
 */
function AdForm({
  product,
  message,
  tone,
  setProduct,
  setMessage,
  setTone,
  error,
  isFormValid,
}) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder={PLACEHOLDERS.PRODUCT}
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control shadow-sm"
          placeholder={PLACEHOLDERS.MESSAGE}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder={PLACEHOLDERS.TONE}
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

AdForm.propTypes = {
  /** Current product input value */
  product: PropTypes.string.isRequired,
  /** Current message input value */
  message: PropTypes.string.isRequired,
  /** Current tone input value */
  tone: PropTypes.string.isRequired,
  /** Updates product state */
  setProduct: PropTypes.func.isRequired,
  /** Updates message state */
  setMessage: PropTypes.func.isRequired,
  /** Updates tone state */
  setTone: PropTypes.func.isRequired,
  /** Error message (if any) */
  error: PropTypes.string,
};

export default AdForm;
