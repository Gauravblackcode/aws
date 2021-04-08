console.log("working");

const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.loadFromPath('./credential.json');
AWS.config.update({region: 'ap-south-1'});


// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});
// Create the parameters for calling createBucket
var bucketParams = {
    Bucket : process.argv[2], ACL: 'public-read'
  };
  
  // call S3 to create the bucket
  s3.createBucket(bucketParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Location);
    }
  });

//Gaurav command run file and then name of bucket