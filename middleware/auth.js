const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Extract Token from Request Header
    const token = req.headers.authorization;

    // Check if Token exists
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify and Decode Token
        const decodedToken = jwt.verify(token, 'secretkey');

        // Append Decoded User Data to request
        req.user = decodedToken;

        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
