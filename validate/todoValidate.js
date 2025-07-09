exports.todoTitleValidate = (data) => {
    if (!data.title) {
        return { error: "Başlık gerekli !" };
    }
    return { error: null };
};