// Importing all necessary packages
import JWT from "jsonwebtoken";

// Importing custom exceptions and handlers
import handlers from "../../exceptions/handlers.js";
import UnauthorizedError from "../../exceptions/UnauthorizedError.js";
import AccessTokenError from "../../exceptions/AccessTokenError.js";
import publicSessionService from "../modules/system/services/publicSessionServices.js";

/**
 * Middleware to authenticate the user using JWT
 *
 * @param {Object} req - Express request object
 * @param {Object} req.cookies - Cookies attached to the request
 * @param {Object} req.headers - Headers attached to the request
 * @param {Object} req.nativeRequest - Custom object to attach user details and some important data
 * @param {Object} res = Express response object
 * @param {Function} next - Express next middleware function
 */

const userAuthMiddleware = async (req, res, next) => {
    let accessToken = null,
        refreshToken = null;
    try {
        // console.log("cookies ------------", req.cookies)

        // Retrieve access token and refresh token from cookies
        accessToken = req.cookies.accessToken;
        refreshToken = req.cookies.refreshToken;

        // If accessToken is not present in the cookies, retrieve it from the headers
        if (!accessToken) {
            accessToken = req.headers?.authorization?.split(" ")[1];
        }
        // If refreshToken is not present in the cookies, retrieve it from the headers
        if (!refreshToken) {
            refreshToken = req.headers?.refresh_token;
        }

        // If neither accessToken nor refreshToken is present, throw UnauthorizedError and refreshToken present throw AccessTokenError
        if (!accessToken) {
            if (!refreshToken) {
                throw new UnauthorizedError("Invalid User.");
            } else {
                throw new AccessTokenError("Invalid access token");
            }
        }

        // Verify the accessToken and retrieve payload from JWT. If accessToken is not valid throw AccessToken Error
        let decoded = JWT.verify(
            accessToken,
            process.env.JWT_KEY,
            (err, decoded) => {
                if (err) {
                    // console.error(err)
                    throw new AccessTokenError(
                        "Invalid JWT. Please log in again"
                    );
                }
                return decoded;
            }
        );

        // Retrieve the session using the sessionId from the decoded payload
        let session = await publicSessionService.sessionGet({
            _id: decoded.sessionId,
        });

        // console.log("session: ", session)
        // If the session is not exist , throw AccessTokenError
        if (!session)
            throw new AccessTokenError(
                "Invalid session. Please log in again to obtain a new token"
            );

        // If the session is exist but the accessToken is not match with the session accessToken, throw AccessTokenError
        if (session.accessToken != accessToken)
            throw new AccessTokenError(
                "Expired Authentication Token. Please log in again to obtain a new token"
            );

        // Attach user details to the request object for downstream middleware and
        req.nativeRequest.setUserId = session.user;
        req.nativeRequest.accessToken = accessToken;
        req.nativeRequest.refreshToken = refreshToken;
        req.nativeRequest.decoded = decoded;
        req.nativeRequest.session = session;

        // Pass control to the next middleware function or route handler
        next();
    } catch (error) {
        console.error(error);
        // Log the error and respond with appropriate error handling
        handlers(
            {
                errorLog: {
                    location: req.originalUrl.slice(1).split("/").join("::"),
                    details: `Error: ${error}`,
                    message: error.message,
                },
                error,
            },
            req,
            res
        );
    }
};

// Exporting the middleware
export default userAuthMiddleware;
