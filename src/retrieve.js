const fs = require('fs');
const AWS = require('aws-sdk');

const ID = 'AKIAJKBEUTABQOCPIGTQ';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'tufts-housing-hub';

var getParams = {
    Bucket: BUCKET_NAME, // your bucket name,
    Key: 'room-11.jpeg' // path to the object you're looking for
}

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});


s3.getObject(getParams, function(err, data) {
    // Handle any error and exit
    if (err)
        return err;

  // No error happened
  // Convert Body from a Buffer to a String

  let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
});