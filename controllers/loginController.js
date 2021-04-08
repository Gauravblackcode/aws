const AWS = require("aws-sdk");
// Create S3 service object
s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// to get the pages view
exports.login = async function (req, res, next) {
  res.render("login", { title: "first page section" });
};

// to post the login credential
exports.loginPost = async function (req, res, next) {
  let body = req.body;

  AWS.config.update({
    accessKeyId: body.access_key,
    secretAccessKey: body.secret_key,
    region: body.region,
  });

  // store all the bucket list into this array
  let elementName = [];

  // Create the parameters for calling createBucket
  s3.listBuckets(function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      // console.log("Success", data.Buckets);
      for (var i = 0; i < data.Buckets.length; i++) {
        let options = data.Buckets[i];
        elementName.push(options);
        // console.log(elementName, "elementName", body, "body");
      }

    //  localStorage.setItem({
    //     "accessKeyId": body.access_key,
    //     "secretAccessKey": body.secret_key,
    //     "region": body.region,
    //   })

      res.render("list", {body: body, data: elementName,});
    }
  });
};
