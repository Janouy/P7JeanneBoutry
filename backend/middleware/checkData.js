// ce middleware empêche d'inclure certains caractères spéciaux pour éviter les attaques par injections//
module.exports = (req, res, next) =>{
    try {
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        let passwordVerif = /^[\w'\-,.][^_!¡?÷?¿/\\+=#$%ˆ&(){}|~<>;:[\]]{2,}$/;
        let nameVerif = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        let emailVerif = /^[\w'\-,.][^!¡?÷?¿/\\+=" "#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        if (passwordVerif.test(password)== false || nameVerif.test(firstName)==false || nameVerif.test(lastName)==false || emailVerif.test(email)==false){
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