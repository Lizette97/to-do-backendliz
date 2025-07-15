const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const autHeader = req.header.authorization;
    if(!autHeader){
        return res.status(401).json ({message: 'Token no proporcionado o formato incorrecto'});

    }
    const token = autHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;  // Traducir el token codificado al objeto de usuario
        next();

    }catch(error){
        console.log('Error en la autenticación', error);
        res.status(401).json({message: 'Token invalido o expirado'});
    }
};

module.exports = authenticate;
