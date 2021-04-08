exports.BucketsList = function (req, res, next) {
  const AWS = require("aws-sdk");
  const fs = require("fs");
  AWS.config.update({
    accessKeyId: req.body.access_key,
    secretAccessKey: req.body.secret_key,
    region: req.body.region,
  });
  const keys = req.body;
  s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  let elementName = [];
  // Create the parameters for calling createBucket
  s3.listBuckets(function (err, data) {
    if (err) {
      console.log("Error not getiin list error", err.code);
      res
        .status(500)
        .render("list", { data: null, aKeys: null, bucket: false, err: err });
      return;
    } else {
      // console.log("Success", data.Buckets, "after data");
      for (var i = 0; i < data.Buckets.length; i++) {
        let options = data.Buckets[i];
        elementName.push(options);
      }
    }
    res.render("list", {
      data: elementName,
      aKeys: keys,
      bucket: true,
      title: "Bucket Created Succesfully!",
    });
  });
};

exports.uploadSourceCode = function (req, res) {
  let formBody = req.body;
  const file = req.files;
  // console.log(file, "Success and list bucket upload", req );
  console.log(file, "Success and list bucket upload", req.directory);
  // console.log(req.file.buffer,"file")
  const fs = require("fs");
  const AWS = require("aws-sdk");
  AWS.config.update({
    accessKeyId: formBody.access_key,
    secretAccessKey: formBody.secret_key,
    region: formBody.region,
  });

  //  const mimetype = req.file.mimetype;
  // let myFiles = req.file.originalname.split(".");
  // const fileExt = myFiles[myFiles.length - 1]

  // call S3 to retrieve upload file to specified bucket
  // var uploadParams = {
  //   Bucket: formBody.bucket_name,
  //   Key: req.file.originalname,
  //   Body: req.file.buffer,
  //   ContentType: "text/html",
  //   ACL: 'public-read'
  // };

  // mapping for array of file to upload in the s3 buckets
  file.map((item) => {
    console.log(item, "thisi si item file");
    var uploadParams = {
      Bucket: formBody.bucket_name,
      Key: item.originalname,
      Body: item.buffer,
      ContentType: item.mimetype,
      ACL: "public-read",
    };
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
        return res.render("list", {
          data: this.elementName,
          bucket: false,
          title: "Get the list ",
          err: err,
        });
      }
      if (data) {
        console.log("Upload Success", data.Location);
        const elementNull = null;
        return res.render("thankyou", {
          data: elementNull,
          bucket: true,
          body: formBody,
          title: "Uploaded Succesfully !!",
        });
      }
    });
  });

  // Configure the file stream and obtain the upload parameters

  // var fileStream = fs.createReadStream(file);
  // fileStream.on("error", function (err) {
  //   console.log("File Error", err);
  // });

  // uploadParams.Body = fileStream;
  // var path = require("path");
  // uploadParams.Key = path.basename(file);

  // call S3 to retrieve upload file to speclistified bucket
};

exports.initListPage = function (req, res, next) {
  res.render("list", {
    data: this.elementName,
    bucket: false,
    title: "Get the list ",
  });
};
