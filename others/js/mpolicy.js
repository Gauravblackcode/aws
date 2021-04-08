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
  const { S3Client, PutBucketAclCommand } = require("@aws-sdk/client-s3");
  
  // Set the parameters. For more information,
  // see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putBucketAcl-property.
  const bucketParams = {
      Bucket: "stride12345678",
      // 'GrantFullControl' allows grantee the read, write, read ACP, and write ACP permissions on the bucket.
      // For example, an AWS account Canonical User ID in the format:
      // id=002160194XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXa7a49125274
      GrantFullControl:
          "GRANTEE_1",
      // 'GrantWrite' allows grantee to create, overwrite, and delete any object in the bucket..
      // For example, 'uri=http://acs.amazonaws.com/groups/s3/LogDelivery'
      GrantWrite: "GRANTEE_2"
  };
  
  // Create an Amazon S3 client service object.
  const s3 = new S3Client({});
  
  const run = async () => {
      try {
          const data = await s3.send(new PutBucketAclCommand(bucketParams));
          console.log("Success, permissions added to bucket", data);
      } catch (err) {
          console.log("Error", err);
      }
  };
  run();