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
    let slug = houseAddress.split(" ").join("-");
    let path = slug + "/";

    var photoKeys = [];
    var imagePathKey;
    for (var file of pictures) {
      let key = await uploadFile(path, file);
      imagePathKey = path + key;
      photoKeys.push(imagePathKey);
    }

    setReadyToSubmit(false);
    await sleep(60000);
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
