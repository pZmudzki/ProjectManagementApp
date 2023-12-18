const cloudinary = require("cloudinary").v2;

// Cloudinary configuration for uploading images
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handleUpload = async (file) => {
  const res = await cloudinary.uploader.upload(file, {
    quality: 60,
    width: 500,
    height: 500,
    resource_type: "image",
  });
  return res;
};

module.exports = { handleUpload };
