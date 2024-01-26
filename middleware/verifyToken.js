const jwt = require('jsonwebtoken');

// Verify Token
function verifyToken(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (err) {
        res.status(401).json({message: 'Token is not valid'});
    }
}

// Verify Token And Authorize the user
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403) // Forbidden
                .json({
                    success: false,
                    message: 'You are not allowed'
                });

        }
    });
}

// Verify Token And Admin
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403) // Forbidden
                .json({
                    success: false,
                    message: 'You are not allowed, only admin can perform this'
                });

        }
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}