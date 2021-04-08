const AWS = require("aws-sdk");
const { render } = require("ejs");
const fs = require("fs");

exports.AddNewBucket = async function (req, res, next) {
  let body = req.body;
  AWS.config.update({
    accessKeyId: body.access_key,
    secretAccessKey: body.secret_key,
    region: body.region,
  });
  // create bucket varaibale end
  var bucketParams = {
    Bucket: body.name,
    ACL: "public-read",
  };

  // cors variables start
  var thisConfig = {
    AllowedHeaders: ["Authorization"],
    AllowedMethods: ["POST", "PUT", "DELETE"],
    AllowedOrigins: ["*"],
    ExposeHeaders: [],
    MaxAgeSeconds: 3000,
  };
  // Create array of configs then add the config object to it
  var corsRules = new Array(thisConfig);

  // Create CORS params
  var corsParams = {
    Bucket: body.name,
    CORSConfiguration: { CORSRules: corsRules },
  };

  // cors variables end

  // policy varaible start
  var readOnlyAnonUserPolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "AddPerm",
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetObject"],
        Resource: [""],
      },
    ],
  };
  var bucketResource = "arn:aws:s3:::" + body.name + "/*";
  readOnlyAnonUserPolicy.Statement[0].Resource[0] = bucketResource;
  // convert policy JSON into string and assign into params
  console.log(body.name, "policy name bucketResource");
  var bucketPolicyParams = {
    Bucket: body.name,
    Policy: JSON.stringify(readOnlyAnonUserPolicy),
  };
  // policy varaible end

  // host website variable start
  var staticHostParams = {
    Bucket: body.name,

    WebsiteConfiguration: {
      ErrorDocument: {
        Key: "index.html",
      },
      IndexDocument: {
        Suffix: "index.html",
      },
    },
  };
  // host website variable end
  
  // Create S3 service object
  s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  // call S3 to create the bucket
  let CreatePromise = new Promise((resolve, reject) => {
    s3.createBucket(bucketParams, function (err, data) {
      if (err) {
        console.log("Error this is crate error", err); 
        const body = null;
        const elementName = null;        
        reject(res.status(500).render('create', {body: body, data: elementName, err:err}));
        return
      } else {
        console.log("Success location", data.Location);
        let url = data.Location;
        s3.putBucketCors(corsParams, function (err, data) {
          if (err) {
            console.log("Error c", err);
          } else {
            console.log("Successc c", data);
            s3.putBucketPolicy(bucketPolicyParams, function (err, data) {
              if (err) {
                console.log("Error po", err);
              } else {
                console.log("Success po", data);
                s3.putBucketWebsite(staticHostParams, function (err, data) {
                  if (err) {
                    console.log("Error", err);
                  } else {
                    console.log("Success url and data", data, url);
                    res.render("list", {bucket:false, url: url, data: null, title: "Bucket Created Successfully!! "})
                    resolve();
                  }
                });
              }
            });
          }
        });
      }
    });
  });
  // CreatePromise.then(() => {
  //   console.log("this is after promise");
  //   res.render('list', {added:true});
  // })
  // .then(() => {
  //   console.log("agian for ppolicy");
  // });
};
