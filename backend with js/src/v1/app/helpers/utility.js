import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import ValidationError from "../../../exceptions/ValidationError.js";

export const getAccessToken = (data) => {
  return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "30 days" });
};

export const getDate = (data) => {
  try {
    let date = new Date(data);
    const timeZone = process.env.TZ || "Asia/Dhaka";
    const options = {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options)
      .format(date)
      .replace(/\//g, "-");
  } catch (error) {
    console.log(`${error.message}\n${error.stack}`);
    throw new ValidationError(error.message);
  }
};

// const getOTP = () => {
//     return "213200";
//     const otp = Math.floor(Math.random() * 1000000).toString();
//     if (otp.length > 5) {
//         return otp;
//     } else {
//         return getOTP();
//     }
// };

// module.exports = {
//     getOTP,
//     getAccessToken: (data) => {
//         console.log(process.env.JWT_KEY);
//         return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "30 days" });
//     },
//     getRefreshToken: (data) => {
//         console.log(process.env.REFRESH_JWT_KEY);
//         return jwt.sign(data, process.env.REFRESH_JWT_KEY, { expiresIn: "30days" });
//     },
//     getToken: (data) => {
//         return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "30 m" });
//     },
//     generateActivationToken: () => {
//         return randomBytes(32).toString('hex');
//     },
//     getFileUrl: (file) => {
//         if (!file)
//             return null;
//         let fileUrl = file.path.split("\\").join("/");
//         // return `${process.env.BASE_URL}/api/v1/show/${fileUrl}`;
//         return `https://dettol.singularitybd.co/api/v1/show/${fileUrl}`;
//     },

//     getFilesUrl: (files) => {
//         let filesUrl = [];
//         if (files?.length > 0) {
//             for (let f = 0; f < files?.length; f++) {
//                 filesUrl.push(
//                     `https://dettol.singularitybd.co/api/v1/show/${files[f].path
//                         .split("\\")
//                         .join("/")}`
//                 );
//             }
//         }
//         return filesUrl;
//     },
//     phoneNumberValidation: (num) => {
//         var re = /^[0-9]+$/;
//         if (re.test(num))
//             return false;
//         else
//             return true;
//     },

//     getOperator: (num) => {
//         const USSDCode = num.slice(0, 3);
//         switch (USSDCode) {
//             case "019":
//             case "014":
//                 return "Banglalink"

//             case "017":
//             case "013":
//                 return "GrameenPhone "
//             case "018":
//                 return "Robi"

//             case "016":
//                 return "Airtel"
//             case "015":
//                 return "Teletalk"
//             default:
//                 return false;
//         }
//     },

// }
