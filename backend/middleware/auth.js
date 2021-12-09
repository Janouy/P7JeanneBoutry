const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.id && req.body.id != userId) {
            throw 'Invalid user Id or expired Token';
        }else {
            next();
        }
    }catch (error) {
        res.status(401).json({error: 'Invalid user Id or expired Token'});
    }
};

