require("dotenv").config();
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

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
  const url = await getSignedUrl(s3, command, { expiresIn: 86400 });

  // console.log("Generated signed URL for image:", imagePath, ":", url);
  return url;
}


module.exports = {
  getObjectSignedUrl,
};
