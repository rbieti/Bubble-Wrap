const admin = require("firebase-admin");
const functions = require('firebase-functions');
const cors = require("cors");
const express = require("express");
const fileUpload = require("./cloud-function-file-upload");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// https://medium.com/@wcandillon/uploading-images-to-firebase-with-expo-a913c9f8e98d
const api = express().use(cors({ origin: true }));
fileUpload("/picture", api);

admin.initializeApp(functions.config().firebase);

api.post("/picture", function (req, response, next) {
  uploadImageToStorage(req.files.file[0])
    .then(metadata => {
      response.status(200).json(metadata[0]);
      next();
    })
    .catch(error => {
      console.error(error);
      response.status(500).json({ error });
      next();
    });
});

exports.api = functions.https.onRequest(api);

const uploadImageToStorage = file => {
  const storage = admin.storage();
  return new Promise((resolve, reject) => {
    const fileUpload = storage.bucket().file(file.originalname);
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: "image/jpg"
      }
    });

    blobStream.on("error", error => reject(error));

    blobStream.on("finish", () => {
      fileUpload.getMetadata()
        .then(metadata => resolve(metadata))
        .catch(error => reject(error));
    });

    blobStream.end(file.buffer);
  });
}

