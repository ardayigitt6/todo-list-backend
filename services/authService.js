const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userDataAccess = require("../data-access/userDataAccess");
const userTokenDataAccess = require("../data-access/userTokenDataAccess");

exports.register = async (username, password) => {
    const existing = await userDataAccess.findUserByUsername(username);
    if (existing) {
        throw new Error("Sistemde böyle bir kullanıcı var !!!");
    }
    const hashed = await bcrypt.hash(password, 10);
    await userDataAccess.createUser({ username, password: hashed });
};

exports.login = async (username, password) => {
    const user = await userDataAccess.findUserByUsername(username);
    if (!user) throw new Error("Bu username ile password eşleşmedi !!!");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Girilen şifre yanlış!." );
    const token = jwt.sign({ owner: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });
    await userTokenDataAccess.createToken({ owner: user._id, token });
    return token;
}

exports.logout = async (token) => {
    await userTokenDataAccess.deleteToken(token);
};