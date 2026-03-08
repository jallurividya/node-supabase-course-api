const logger = (req, res, next) => {
    console.log(`Request : ${req.method} ${req.url}`);
    next()
}
export default logger