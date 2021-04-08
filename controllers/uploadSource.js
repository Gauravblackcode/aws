exports.UploadCode = function (req, res, next) {
 console.log("firsttt", req.body)
  const fs = require("fs");
  const AWS = require("aws-sdk");
  AWS.config.update({
    // accessKeyId: body.access_key,
    // secretAccessKey: body.secret_key,
    // "region": body.region,

    // accessKeyId: "AKIA3IKS3ZJHUC5ZLUPJ",
    // secretAccessKey: "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",
    // region: "ap-south-1",
  });

  // const mimetype = req.file.mimetype;
  // let myFiles = req.file.originalname.split(".");
  // const fileExt = myFiles[myFiles.length - 1]

  // call S3 to retrieve upload file to specified bucket
  // var uploadParams = {
  //   Bucket: "newkeyboardgaurav23",
  //   Key: req.file.originalname,
  //   Body: req.file.buffer,
  //   ContentType: "text/html",
  // };
  // Configure the file stream and obtain the upload parameters

  // var fileStream = fs.createReadStream(file);
  // fileStream.on("error", function (err) {
  //   console.log("File Error", err);
  // });

  // uploadParams.Body = fileStream;
  // var path = require("path");
  // uploadParams.Key = path.basename(file);

  // call S3 to retrieve upload file to speclistified bucket
  // s3.upload(uploadParams, function (err, data) {
  //   if (err) {
  //     console.log("Error", err);
  //   }
  //   if (data) {
  //     console.log("qoring successfully");
  //     console.log("Upload Success", data.Location);
  //   }
  // });
  res.render("upload", { title: "Uploaded" });
};


// get html file method
exports.codePage = function (req, res, next) {
  res.render("upload", { title: "Go back and select bucket" });
};
