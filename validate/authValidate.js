exports.registerValidate = (data) => {
    console.log("içerisi", data);
    if (!data.username || !data.password) {
        return { error: "Kullanıcı adı ve şifre boş olamaz!" };
    }
    return { error: null };
};

exports.loginValidate = (data) => {
    if (!data.username || !data.password) {
        return { error: "Kullanıcı adı ve şifre boş olamaz!" };
    }
    return { error: null };
};