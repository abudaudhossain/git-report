// Importing Custom Error classes
import ForbiddenError from "../../exceptions/ForbiddenError.js";

// Importing custom error handlers
import handlers from "../../exceptions/handlers.js";

/**
 * Middleware to authorize admin users.
 *
 * @param {Object} req - Express request object
 * @param {Object} req.nativeRequest - Custom object to attach necessary request details
 * @param {Object} req.nativeRequest.session - Session object attached to the request
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const adminAuthMiddleware = async (req, res, next) => {
    try {
        const { session } = req.nativeRequest;

        // Check if the user's role is 'admin'
        if (session.role !== "admin")
            throw new ForbiddenError("Admin Access Only.");

        // If the user is an admin, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log(error);
        // Log the error and respond with appropriate error handling
        handlers(
            {
                errorLog: {
                    location: req.originalUrl.slice(1).split("/").join("::"),
                    details: `Error: ${error}`,
                },
                error,
                message: error.message,
                success: false,
            },
            req,
            res
        );
    }
};

// Exporting the middleware
export default adminAuthMiddleware;
