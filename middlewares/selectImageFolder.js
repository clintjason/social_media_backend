module.exports = (req, res, next) => {
    if(req.baseUrl === "/api/user") {
        req.imageFolderPath = "images/users";
    }
    if(req.baseUrl === "/api/post") {
        req.imageFolderPath = "images/posts";
    }
    if(req.baseUrl === "/api/comment") {
        req.imageFolderPath = "images/comments";
    }
    if(req.baseUrl === "/api/course") {
        req.imageFolderPath = "images/courses";
        req.videoFolderPath = "videos/courses";
    }
    next();
}