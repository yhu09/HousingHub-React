import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { uploadFile } from "../utility/s3-upload";

const UploadImages = ({ token, houseAddress }) => {
  const [pictures, setPictures] = useState([]);
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  function updateSubmitStatus(pictureFiles) {
    if (pictureFiles.length === 0) {
      console.log(false);
      setReadyToSubmit(false);
    } else {
      console.log(true);
      setReadyToSubmit(true);
    }
  }

  function onDrop(pictureFiles, pictureDataURLs) {
    setPictures(pictureFiles);
    updateSubmitStatus(pictureFiles);
  }

  async function uploadPhotos() {
    console.log(pictures);
    console.log("upload photo");
    let slug = houseAddress.split(" ").join("-");
    let path = slug + "/";

    var photoKeys = [];
    var imagePathKey;
    for (var file of pictures) {
      let key = uploadFile(path, file);
      imagePathKey = path + key;
      photoKeys.push(imagePathKey);
    }

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        photoKeys: photoKeys
      })
    };
    try {
      await fetch(
        "http://localhost:3002/houses/photos/?houseAddress=" + houseAddress,
        requestOptions
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });
    } catch (e) {
      console.error(e);
    }
    window.location.reload(false);
  }

  return (
    <div>
      <ImageUploader
        withIcon={false}
        withPreview={true}
        buttonText="Add more images"
        onChange={onDrop}
        imgExtension={[".webp", ".jpg", ".gif", ".png"]}
        maxFileSize={5242880}
      />
      {readyToSubmit ? (
        <button
          style={{ position: "relative", left: "46%" }}
          onClick={uploadPhotos}
        >
          Upload photos
        </button>
      ) : null}
    </div>
  );
};

export default UploadImages;
