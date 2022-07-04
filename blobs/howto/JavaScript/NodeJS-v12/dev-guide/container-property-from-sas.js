// index.js
const { BlobServiceClient, ContainerClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
require('dotenv').config()
const { setLogLevel } = require("@azure/logger");
setLogLevel("info");
/*

This request is not authorized to perform this operation using this permission.
Unable to extract accountName with provided information.
Unable to extract containerName with provided information.
Server failed to authenticate the request. Make sure the value of Authorization header is formed correctly including the signature.
'Authentication information is not given in the correct format. Check the value of Authorization header.

*/

const constants = {
  accountName: "",
  accountKey:
    "key",
};

const sharedKeyCredential = new StorageSharedKeyCredential(
  constants.accountName,
  constants.accountKey
);

async function main() {
  const blobServiceUri = `https://abc.blob.core.windows.net/container-read-list?sastoken`;

  console.log(blobServiceUri);

  const containerClient = new ContainerClient(
    blobServiceUri,
    sharedKeyCredential
  );

  const serviceGetPropertiesResponse = await containerClient.getProperties();
  
  console.log(
    `Sas Permission: ${JSON.stringify(serviceGetPropertiesResponse)}`
  );
}

main()
  .then(() => {
    console.log(`done`);
  }).catch((ex) => {
    console.log(`Error: ${ex.message}`)
  });
