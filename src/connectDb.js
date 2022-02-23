// this file handle connecting to firestore
const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../credentials.json");//import credentials from credentials.json

//create a function checks if connected to firebase Db
exports.connectDb = () => {
  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }
  return getFirestore();
};
