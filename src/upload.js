const fs = require('fs');
const AWS = require('aws-sdk');

const ID = 'AKIAJKBEUTABQOCPIGTQ';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'tufts-housing-hub';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

uploadFile('room-11.jpeg');ret

s3.getObject(getParams, function(err, data) {
    // Handle any error and exit
    if (err)
        return err;

  // No error happened
  // Convert Body from a Buffer to a String

  let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
});