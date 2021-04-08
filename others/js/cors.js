const express = require("express");

const router = express.Router();

const AWS = require("aws-sdk");


  AWS.config.update({
    accessKeyId: "AKIA3IKS3ZJHUC5ZLUPJ",
    secretAccessKey: "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",
    "region": "ap-south-1",
  });

  // Create the parameters for calling createBucket
  var bucketParams = {
    Bucket: process.argv[2],
  };
  // Create S3 service object
s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  // call S3 to create the bucket
  s3.createBucket(bucketParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success location", data.Location);
    }
  });
  // call S3 to retrieve policy for selected bucket
// s3.getBucketAcl(bucketParams, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else if (data) {
//     console.log("Success grant", data.Grants);
//   }
// });
  // start cors permission
  var readOnlyAnonUserPolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "AddPerm",
        Effect: "Allow",
        Principal: "*",
        Action: [
          "s3:GetObject"
        ],
        Resource: [
          ""
        ]
      }
    ]
  };
  
  // create selected bucket resource string for bucket policy
  var bucketResource = "arn:aws:s3:::" + "bodynames3" + "/*";
  readOnlyAnonUserPolicy.Statement[0].Resource[0] = bucketResource;
  
  // convert policy JSON into string and assign into params
  var bucketPolicyParams = {Bucket: "bodynames3", Policy: JSON.stringify(readOnlyAnonUserPolicy)};
  
  // set the new policy on the selected bucket
  s3.putBucketPolicy(bucketPolicyParams, function(err, data) {
    if (err) {
      // display error message
      console.log("Error", err);
    } else {
      console.log("Success policy", data);
    }
  });
// call S3 to retrieve CORS configuration for selected bucket
s3.getBucketCors(bucketParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else if (data) {
      console.log("Success", JSON.stringify(data.CORSRules));
    }
  });

module.exports = router;
