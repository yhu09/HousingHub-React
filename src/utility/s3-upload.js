const fs = require("fs");
const AWS = require("aws-sdk");
require("dotenv").config();

const ID = process.env.REACT_APP_S3Id;
const SECRET = process.env.REACT_APP_S3Secret;

// The name of the bucket that you have created
const BUCKET_NAME = process.env.REACT_APP_S3BucketName;

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

export async function listFilesInFolder(folder) {
  var getParams = {
    Bucket: BUCKET_NAME, // your bucket name,
    Delimiter: "",
    Prefix: folder
  };

  try {
    var data = await s3.listObjects(getParams).promise();
  } catch (error) {
    throw error;
  }
  return data;
}

export const imageLinkURL = key => {
  return "https://" + BUCKET_NAME + ".s3.amazonaws.com/" + key;
};
