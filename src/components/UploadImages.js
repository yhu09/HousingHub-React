import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { uploadFile } from "../utility/s3-upload";
import Loading from "../components/commonHeaders/Loading";

const UploadImages = ({ token, houseAddress }) => {
  const [pictures, setPictures] = useState(null);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [uploading, setUploading] = useState(false);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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
    setUploading(true);
    console.log(pictures);
    console.log("upload photo");
    let slug = houseAddress.split(" ").join("-");
    let path = slug + "/";

    var photoKeys = [];
    var imagePathKey;
    for (var file of pictures) {
      let key = await uploadFile(path, file);
      console.log(key);
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
    setReadyToSubmit(false);
    await sleep(5000);
    window.location.reload(false);
  }

  return (
    <div>
      {uploading ? (
        <Loading />
      ) : (
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
              onClick={async () => {
                await uploadPhotos();
              }}
            >
              Upload photos
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default UploadImages;