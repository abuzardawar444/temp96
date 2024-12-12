import { Router } from "express";
const router = Router();
import { login, loginGoogle, logout, register } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../middleware/validationMiddleware.js";
import rateLimiter from "express-rate-limit";
import passport from "passport";

const apiLimiter = rateLimiter({
    windowMs:5*60*1000,
    max: 10,
    message: {message: 'IP rate limit exceeded, retry in 5 minutes'}
})

router.get('/google', apiLimiter, passport.authenticate("google",{scope:['profile','email']}));
router.get('/google/callback', apiLimiter, passport.authenticate('google'),loginGoogle)
router.post('/register', apiLimiter, validateRegisterInput, register);
router.post('/login', apiLimiter, validateLoginInput, login);
router.get('/logout', logout);

export default router