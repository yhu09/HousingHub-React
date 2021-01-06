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

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const photoIDLength = 8;
export const uploadFile = (path, file) => {
  // make photoId
  let id = makeid(photoIDLength);
  let fileType = file.name.split(".")[1];
  let fileName = id + "." + fileType;

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: path + fileName, // File name you want to save as in S3
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
