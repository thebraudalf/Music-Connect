import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";

dotenv.config()

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload an file
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log(error);
        // remove the locally saved temporary file as the upload operation got failed
        fs.unlinkSync(localFilePath);
        return null;
    }
}

// Delete an image file
const deleteImageFromCloudinary = async (localFileName) => {
    try {
        if (!localFileName) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.destroy(localFileName, {
            resource_type: "image",
            invalidate: true
        })
        // file has been deleted successfully
        //console.log("file is deleted on cloudinary ", response);
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export { uploadOnCloudinary, deleteImageFromCloudinary }
