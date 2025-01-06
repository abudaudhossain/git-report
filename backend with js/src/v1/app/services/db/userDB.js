import User from "../models/userModel.js"

export const userDB = {
    // Create a new user
    create: async (data) => {
        /**
         * @param {Object} data - The user data to be created.
         * @returns {Object|null} - The created user document or null if an error occurs.
         */
        try {
            const result = await User.create(data);
            return result;
        } catch (error) {
            console.log(error);
            console.log(error._message);
            return null;
        }
    },
    // Find a single user by query
    find: async (query, filter = {}) => {
        /**
         * @param {Object} query - The query object to find the user.
         * @param {Object} [filter={}] - The fields to include or exclude.
         * @returns {Object|null} - The found user document or null if an error occurs.
         */
        try {
            const result = await User.findOne(query, filter);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    // Find multiple users by query
    finds: async (query, filter = {}, startIndex = null, limit = null, sort = {}) => {
        /**
         * @param {Object} query - The query object to find the users.
         * @param {Object} [filter={}] - The fields to include or exclude.
         * @param {number|null} [startIndex=null] - The starting index for pagination.
         * @param {number|null} [limit=null] - The maximum number of documents to return.
         * @param {Object} [sort={}] - The sorting criteria.
         * @returns {Array|null} - The found user documents or null if an error occurs.
         */
        try {
            const result = await User.find(query, filter).skip(startIndex).limit(limit).sort(sort);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    // Count the total number of users matching the query
    totalCount: async (query) => {
        /**
         * @param {Object} query - The query object to count the users.
         * @returns {number|null} - The total count of matching documents or null if an error occurs.
         */
        try {
            const result = await User.find(query).count();
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    // Update a single user by query
    update: async (query, updateData) => {
        /**
         * @param {Object} query - The query object to find the user.
         * @param {Object} updateData - The data to update the user with.
         * @returns {Object|null} - The updated user document or null if an error occurs.
         */
        try {
            const result = await User.findOneAndUpdate(
                query,
                updateData,
                { new: true }
            );
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    // Get detailed information of a single user
    details: async (query) => {
        /**
         * @param {Object} query - The query object to find the user.
         * @returns {Object|null} - The user document with populated fields or null if an error occurs.
         */
        try {
            const result = await User.findOne(query).populate("area", ['name']);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    // Delete a single user by query
    deleteOne: async (query) => {
        /**
         * @param {Object} query - The query object to find the user.
         * @returns {Object|null} - The result of the deletion or null if an error occurs.
         */
        try {
            const result = await User.deleteOne(query);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    // Delete multiple users by query
    deleteMany: async (query) => {
        /**
         * @param {Object} query - The query object to find the users.
         * @returns {Object|null} - The result of the deletion or null if an error occurs.
         */
        try {
            const result = await User.deleteMany(query);
            console.log("Deleted items:", result);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
}
