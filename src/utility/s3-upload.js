const fs = require("fs");
const AWS = require("aws-sdk");

const ID = "AKIAJKBEUTABQOCPIGTQ";
const SECRET = "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";

// The name of the bucket that you have created
const BUCKET_NAME = "tufts-housing-hub";

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

export const uploadFile = (path, file) => {
  // Read content from the file
  // const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: path + file.name, // File name you want to save as in S3
    Body: file
  };

  // Uploading files to the bucket
  var data = s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
  });
  let name = data.body.name;
  return name;
};

export const getFile = async key => {
  var getParams = {
    Bucket: BUCKET_NAME, // your bucket name,
    Key: key // path to the object you're looking for
  };

  s3.getObject(getParams, async function(err, data) {
    // Handle any error and exit
    if (err) {
      console.log(err);
      return err;
    }
    console.log("success");
    // No error happened
    // Convert Body from a Buffer to a String
    console.log(data);
    let objectData = data.Body.toString("utf-8"); // Use the encoding necessary
  });
};

export const imageLinkURL = key => {
  return "https://" + BUCKET_NAME + ".s3.amazonaws.com/" + key;
};
