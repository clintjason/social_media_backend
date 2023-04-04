module.exports = (req, res, next) => {
    if(req.baseUrl === "/user") {
        req.imageFolderPath = "images/users";
    }
    if(req.baseUrl === "/post") {
        req.imageFolderPath = "images/posts";
    }
    if(req.baseUrl === "/comment") {
        req.imageFolderPath = "images/comments";
    }
    next();
}