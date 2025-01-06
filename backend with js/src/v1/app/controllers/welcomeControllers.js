import NotFoundError from "../../../exceptions/NotFoundError.js";
import response from "../../../utils/native.js";

const welcomeControllers = {
  welcomeHandler: async (req, res, next) => {
    try {
      console.log("req", req.user, req.isAuthenticated());

      response(
        {
          success: true,
          message: "Data loaded Successful",
          data: "welcome to api",
          status: 200,
        },
        req,
        res
      );
    } catch (error) {
      next(error);
    }
  },
};

export default welcomeControllers;
