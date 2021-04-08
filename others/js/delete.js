
console.log("working");

const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.loadFromPath('./credential.json');
AWS.config.update({region: 'ap-south-1'});

s3 = new AWS.S3({apiVersion: '2006-03-01'});




// Create params for S3.deleteBucket
var bucketParams = {
    Bucket : process.argv[2]
  };
  
  // Call S3 to delete the bucket
  s3.deleteBucket(bucketParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });