require("dotenv").config();
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const bucketName = 'bucollections-image';
const bucketRegion = 'us-east-1';
const accessKey = 'AKIA6BJD5HLYHMH4RSFR';
const secretAccessKey = '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';

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

async function getObjectSignedUrl(imagePath) {
  // console.log("Generating signed URL for image:", imagePath);

  const params = {
    Bucket: bucketName,
    Key: imagePath,
  };

  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  // console.log("Generated signed URL for image:", imagePath, ":", url);
  return url;
}


module.exports = {
  getObjectSignedUrl,
};
