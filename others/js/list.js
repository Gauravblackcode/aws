
(() => {
  console.log("1")
  const AWS = require('aws-sdk');
  const fs = require('fs');
  
  AWS.config.update({ accessKeyId: 'AKIA3IKS3ZJHUC5ZLUPJ', secretAccessKey: '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', region: 'ap-south-1' });

  // Create S3 service object
  s3 = new AWS.S3({ apiVersion: '2006-03-01' });
  // Create the parameters for calling createBucket

  // s3.listBuckets(function (err, data) {
  //     if (err) {
  //         console.log("Error", err);
  //     } else {
  //         console.log("4");
  //         console.log("Success", data.Buckets);
        
  //     }
  // });
  s3.getObject(function (err, data) {
      if (err) {c
          console.log("Error", err);
      } else {
          console.log("4");
          console.log("Success", data.Buckets);
        
      }
  });
})();