import React from 'react';

const VideoPreview = ({ videoUrl }) => {
  if (!videoUrl) return null;

  const filename = videoUrl.split('/').pop();

  return (
    <div className="mt-4">
      <h4>Your Ad</h4>
      <video
        src={videoUrl}
        controls
        className="w-100 rounded shadow-sm mb-3"
        style={{ maxHeight: '400px' }}
      />
      <a
        href={videoUrl}
        download={filename}
        className="btn btn-primary"
      >
        <i className="bi bi-download me-2" /> 
        Download Video
      </a>
    </div>
  );
};

export default VideoPreview;
