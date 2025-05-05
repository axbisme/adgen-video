import React, { useState } from "react";
import PropTypes from "prop-types";
import { ERROR_MESSAGES, LABELS } from "../constant";

/**
 * Renders a styled "Generate" button that triggers video generation.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onGenerate - Function to call when the button is clicked.
 * @param {boolean} props.disabled - Whether the button is disabled.
 * @param {boolean} props.loading - Whether the app is currently generating a video.
 * @returns {JSX.Element}
 */
const GenerateButton = ({ onGenerate }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      await onGenerate();
    } catch (err) {
      alert(ERROR_MESSAGES.GENERATION_FAILED);
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
        {!loading ? <i className="bi bi-film me-2" /> : ""}
        {loading ? (
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          ""
        )}
        {loading ? LABELS.GENERATING_BUTTON : LABELS.GENERATE_BUTTON}
      </button>
    </div>
  );
};

GenerateButton.propTypes = {
  /** Function to trigger video generation */
  onGenerate: PropTypes.func.isRequired,
  /** Disable the button during invalid input or loading */
  disabled: PropTypes.bool,
  /** Indicates if the app is currently generating */
  loading: PropTypes.bool,
};

export default GenerateButton;
