console.log("working");

// const AWS = require('aws-sdk');
// const fs = require('fs');
AWS.config.loadFromPath('./credential.json');
AWS.config.update({region: 'ap-south-1'});


// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});
// Call S3 to list the buckets

let list = document.getElementById('bucket-list');
// 

$( document ).ready(function() {
    console.log( "ready!" );
    
    s3.listBuckets(function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Buckets);
          for(var i = 0; i < data.Buckets.length; i++) {
              let options = data.Buckets[i]
              let el = document.createElement('option');
              el.textContent = options.name;
              el.value = options.name;
              list.appendChild(el);
          }
        }
      });
});

