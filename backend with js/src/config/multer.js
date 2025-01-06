// Importing the necessary packages
import multer from "multer";
import path from "path";

// Middleware for handling file uploads using multer
export const multerMiddleware = multer().any();

// file upload folder
// Define the path where uploaded files will be stored. Default to './storage' if the environment variable UPLOADS_FOLDER is not set
const uploadsFolder = process.env.UPLOADS_FOLDER || "./storages";

// define the multer storage configuration
const storage = multer.diskStorage({
    // Specify the destination directory where uploaded files will be stored
    destination: (req, file, cb) => {
        cb(null, uploadsFolder);
    },

    // Define the filename for the uploaded file
    filename: (req, file, cb) => {
        // Get the file extension from the original filename
        const fileExtension = path.extname(file.originalname);

        // Generate a unique filename using the current timestamp and the file extension
        const fileName =
            file.originalname.replace(fileExtension, "").split(" ").join("_") +
            "_" +
            Date.now();

        // call the callback function with the generated file name
        cb(null, fileName + fileExtension);
    },
});

// Another storage configuration for handling multiple file storing
const filesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${uploadsFolder}`);
    },
    filename: (req, file, cb) => {
        // Get the file extension
        const fileExt = path.extname(file.originalname);

        // Generate a unique file name starting with "file_", based on the original name, current time, and remove spaces
        let fileName =
            "file_" +
            file.originalname
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("_") +
            "_" +
            Date.now();

        // Call the callback function with the generated file name
        cb(null, fileName + fileExt);
    },
});

// Prepare the final multer upload object with th defined storage and file size limit for single file upload
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000, // 10MB
    },
});

// Prepare the final multer upload object with the defined storage for multiple file upload
export const multipleFileUpload = multer({
    storage: filesStorage,
});
