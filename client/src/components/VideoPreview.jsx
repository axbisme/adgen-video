import React from "react";
import PropTypes from "prop-types";

/**
 * Renders a preview of the generated video with a download button.
 *
 * @component
 * @param {Object} props
 * @param {string} props.videoUrl - The URL of the generated video to preview.
 * @returns {JSX.Element|null}
 */
const VideoPreview = ({ videoUrl }) => {
  if (!videoUrl) return null;

  const filename = videoUrl.split("/").pop();

  return (
    <div className="mt-4">
      <h4>Your Ad</h4>
      <video
        src={videoUrl}
        controls
        className="w-100 rounded shadow-sm mb-3"
        style={{ maxHeight: "400px" }}
      />
      <a href={videoUrl} download={filename} className="btn btn-primary">
        <i className="bi bi-download me-2" />
        Download Video
      </a>
    </div>
  );
};

VideoPreview.propTypes = {
  /** The URL of the video to be previewed and downloaded */
  videoUrl: PropTypes.string,
};

export default VideoPreview;
