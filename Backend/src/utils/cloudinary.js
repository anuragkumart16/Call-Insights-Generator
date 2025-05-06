import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) throw new Error("No file found :src/utils/cloudinary.js");
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
        });
        console.log('File Uploaded successfully :src/utils/cloudinary.js', result.url)
        return result;
    } catch (error) { 
        fs.unlink(filePath)
        return null
    }
};

export default uploadOnCloudinary;
