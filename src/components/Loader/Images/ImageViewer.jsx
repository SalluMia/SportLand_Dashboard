import React from 'react';
import { Modal, IconButton } from '@mui/material';
import { IoCloseCircleSharp } from "react-icons/io5";
const Viewer = ({  imageUrl, setimageUrl }) => {
  return (
    <Modal
      open={true}
      onClose={()=>setimageUrl(null)}
      aria-labelledby="image-viewer-title"
      aria-describedby="image-viewer-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '100vw', // Limit width to the viewport width
          maxHeight: '100vh', // Limit height to the viewport height
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={()=>setimageUrl(null)}
          aria-label="close"
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
          }}
        >
          <IoCloseCircleSharp />
        </IconButton>
        <img
          src={`${process.env.BACKEND_BASE_URL}${imageUrl}`}
          alt="Full Screen"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: 'calc(100vh - 56px)', // Subtract height of close button
            objectFit: 'contain', // Maintain the image's aspect ratio
          }}
        />
      </div>
    </Modal>
  );
};

export default Viewer;
