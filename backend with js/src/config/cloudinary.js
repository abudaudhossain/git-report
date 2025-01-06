// Importing the necessary package
import {v2 as cloudinary} from 'cloudinary';

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: "*****", 
    api_key: "*********", 
    api_secret: "********" // Click 'View Credentials' below to copy your API secret
});


export default cloudinary;