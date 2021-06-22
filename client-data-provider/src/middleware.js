const authorized = (req, res, next) => {
    if (!req.headers.hasOwnProperty('Authorization')) {
        return res.status(401).send('<h1>Not authorized</h1>');
    }
    let auth = req.headers.Authorizaion;
    if (!auth === undefined || auth.startsWith('Bearer ')) {
        return res.status(401).send('<h1>Not authorized</h1>');
    }
    console.log('Let\'s fake that oauth bearer was validated');
    next();
}

module.exports = authorized;