import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import Viewer from "./ImageViewer";
function ImageShow({
  buttonText,
  selectedImage,
  handleRemoveImage,
  handleImageChange,
  type,
}) {
  console.log(selectedImage);
  const [imageUrl, setimageUrl] = useState(false);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {imageUrl && <Viewer imageUrl={imageUrl} setimageUrl={setimageUrl} />}
        {selectedImage?.map((item, index) => {
          console.log(item);
          return (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "30%", // Adjust the width as needed (33.33% for three boxes per row)
                cursor: type === "detail" ? "pointer" : "auto", // Conditionally set the cursor style
              }}
              onClick={() => {
                if (type === "detail") {
                  setimageUrl(item); // Set the imageUrl when type is 'detail'
                }
              }}
            >
              <img
                src={
                  typeof item === "string"
                    ? `${import.meta.env.VITE_BASE_URL}/${item}`
                    : URL.createObjectURL(item)
                }
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                  objectFit: "cover", // Make the image cover the parent div
                }}
              />
              {console.log(type)}
              {type !== "detail" && (
                <div
                  style={{
                    position: "absolute",
                    top: "-13px",
                    right: "-8px",
                    borderRadius: "50%",
                    background: "#FF9800",
                    padding: "3px 8px",
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveImage(index);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "white",
                    }}
                  >
                    &#10006;
                  </button>
                </div>
              )}
            </Box>
          );
        })}
      </Box>
      {type !== "detail" && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              accept="image/jpg,image/jpeg,image/png"
              style={{ display: "none" }}
              id="file-input"
              type="file"
              multiple
              onChange={handleImageChange}
              disabled={selectedImage.length === 3}
            />
            <label htmlFor="file-input">
              <Button
                variant="contained"
                disabled={selectedImage.length === 3}
                sx={{
                  mt: 2,
                  backgroundColor: "#FF9800",
                  boxShadow: "none",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#FFA726",
                  },
                  "&:disabled": {
                    backgroundColor: "#dfdfdf !important",
                    color: "rgb(101 94 94 / 80%)",
                  },
                }}
                component="span" // This is important for accessibility
              >
                {buttonText}
              </Button>
            </label>
          </Box>
        </>
      )}

      {/* <Button
        variant="contained"
        // onClick={() => setshowAddModal(true)}
        sx={{ mt: 2, backgroundColor: '#FF9800', boxShadow: 'none', borderRadius: '8px',"&:hover": {
          backgroundColor: "#FF9800", 
        } }}
      >
        Change Images
      </Button> */}
    </>
  );
}

export default ImageShow;
