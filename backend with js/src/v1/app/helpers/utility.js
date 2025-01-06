const { randomBytes } = require('crypto');
const jwt = require("jsonwebtoken");

const getOTP = () => {
    return "213200";
    const otp = Math.floor(Math.random() * 1000000).toString();
    if (otp.length > 5) {
        return otp;
    } else {
        return getOTP();
    }
};

module.exports = {
    getOTP,
    getAccessToken: (data) => {
        console.log(process.env.JWT_KEY);
        return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "30 days" });
    },
    getRefreshToken: (data) => {
        console.log(process.env.REFRESH_JWT_KEY);
        return jwt.sign(data, process.env.REFRESH_JWT_KEY, { expiresIn: "30days" });
    },
    getToken: (data) => {
        return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "30 m" });
    },
    generateActivationToken: () => {
        return randomBytes(32).toString('hex');
    },
    getFileUrl: (file) => {
        if (!file)
            return null;
        let fileUrl = file.path.split("\\").join("/");
        // return `${process.env.BASE_URL}/api/v1/show/${fileUrl}`;
        return `https://dettol.singularitybd.co/api/v1/show/${fileUrl}`;
    },

    getFilesUrl: (files) => {
        let filesUrl = [];
        if (files?.length > 0) {
            for (let f = 0; f < files?.length; f++) {
                filesUrl.push(
                    `https://dettol.singularitybd.co/api/v1/show/${files[f].path
                        .split("\\")
                        .join("/")}`
                );
            }
        }
        return filesUrl;
    },
    phoneNumberValidation: (num) => {
        var re = /^[0-9]+$/;
        if (re.test(num))
            return false;
        else
            return true;
    },

    getOperator: (num) => {
        const USSDCode = num.slice(0, 3);
        switch (USSDCode) {
            case "019":
            case "014":
                return "Banglalink"

            case "017":
            case "013":
                return "GrameenPhone "
            case "018":
                return "Robi"

            case "016":
                return "Airtel"
            case "015":
                return "Teletalk"
            default:
                return false;
        }
    },

}



