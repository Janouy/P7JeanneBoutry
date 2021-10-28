// ce middleware empêche d'inclure certains caractères spéciaux pour éviter les attaques par injections//
module.exports = (req, res, next) =>{
    try {
        const password = req.body.password;
        if (password.includes('=' || '?' || '"' || '<'|| '>')) {
            throw 'caractères non autorisés ';
        } else {
            next();
        }
    } catch (err) {
        res.status(401).json({
            error: new Error('Invalid request!')
          });
    }
};