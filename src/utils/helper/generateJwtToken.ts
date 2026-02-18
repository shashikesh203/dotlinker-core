import jwt from "jsonwebtoken";
import config from "../../config";
const generateJwtToken = (payload) => {
    return jwt.sign(
        payload,
        config.commonConfig.jwtSecret,
        { expiresIn: '10h' }
    );
}

export default generateJwtToken