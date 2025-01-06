import response from "../../../../utils/native.js";

const adminControllers = {
  welcome: async (req, res, next) => {
    try {
      console.log("req", req.nativeRequest);

      response(
        {
          success: true,
          message: "Data loaded Successful",
          data: "welcome to admin",
          status: 200,
        },
        req,
        res
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default adminControllers;
