import { BadRequestError, UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
    // console.log(req.cookies);
    const {token} = req.cookies;
    if(!token) throw new UnauthenticatedError('Authentication Invalid');

    try {
        const {userId, role} = verifyJWT(token);
        const testUser = userId === '674daa8153a557614a34790d';
        req.user = {userId, role , testUser};
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid');
    }
}

export const authorizedPermissions = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError('Unauthorized to access this route');
        }
        next();
    }
}

export const checkForTestUser = (req, res, next) => {
    if(req.user.testUser) throw new BadRequestError('Demo user, Read only!');
    next();
}