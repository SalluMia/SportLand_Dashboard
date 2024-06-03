import { Box, Button, Typography } from "@mui/material";
import React, { useRef } from "react";

const ImageUpload = ({
  handleImageChange,
  ismultiple,
  description,
  title,
  error,
}) => {
  console.log(ismultiple);
  const fileInputRef = useRef(null);

  const handleFileInputChange = () => {
    fileInputRef.current.click(); // Trigger the file input when the button is clicked
  };
  return (
    <Box
      sx={{
        width: "100%",
        // backgroundColor: '#0074E4',
        border: `1.5px dashed ${error ? "red" : "#00000099"}`,
        borderRadius: "10px",
        p: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <input
        type="file"
        accept="image/jpg,image/jpeg,image/png"
        style={{ display: "none" }}
        ref={fileInputRef}
        // multiple={ismultiple ? ismultiple : true}

        onChange={handleImageChange}
      />
      <Button
        onClick={handleFileInputChange}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* <AddIcon style={{ fontSize: 40, color: '#0074E4' }} /> */}
        <Box>
          <svg
            style={{ marginRight: "11px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
          >
            <path
              d="M14.85 6.75H12.15V12.15H6.75V14.85H12.15L12.15 20.25H14.85L14.85 14.85L20.25 14.85V12.15L14.85 12.15V6.75ZM13.5 0C6.048 0 0 6.048 0 13.5C0 20.952 6.048 27 13.5 27C20.952 27 27 20.952 27 13.5C27 6.048 20.952 0 13.5 0ZM13.5 24.3C7.5465 24.3 2.7 19.4535 2.7 13.5C2.7 7.5465 7.5465 2.7 13.5 2.7C19.4535 2.7 24.3 7.5465 24.3 13.5C24.3 19.4535 19.4535 24.3 13.5 24.3Z"
              fill="#fadb4d"
            />
          </svg>
        </Box>
        <Typography variant="subtitle1" sx={{ color: "#fadb4d" }}>
          {title === "" ? title : <>Add Images</>}
        </Typography>
      </Button>
      <Typography
        variant="body2"
        sx={{ color: "rgba(51, 51, 51, 0.80)", mt: "8px" }}
      >
        {description ? description : <> You can add maximun 3 images</>}
      </Typography>
    </Box>
  );
};

export default ImageUpload;
