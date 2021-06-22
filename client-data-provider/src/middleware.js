const authorized = (req, res, next) => {
    if (!req.headers.hasOwnProperty('authorization')) {
        return res.status(401).send('<h1>Not authorized</h1>');
    }
    let auth = req.headers.authorization;
    if (!auth === undefined || !auth.startsWith('Bearer ')) {
        return res.status(401).send('<h1>Not authorized</h1>');
    }
    next();
}

module.exports = authorized;