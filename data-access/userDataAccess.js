const User = require("../models/User");

exports.findUserByUsername = async (username) => {
    return User.findOne({ username });
};

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};
