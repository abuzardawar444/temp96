import { StatusCodes } from "http-status-codes";
import User from '../models/UserModel.js';
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
    req.body.role = "user";
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({"message": 'user created'});
}

export const loginGoogle = async(req, res) => {
    let user = await User.findOne({email: req.user.emails[0].value});
    if(!user){
        user = await User.create({
            name: req.user.name.givenName,
            lastName: req.user.name.familyName,
            email: req.user.emails[0].value,
            role: 'user',
        });
    }
    const token = createJWT({userId: user._id, role: user.role});
    const oneDay = 1000 * 60 * 60 * 24 ;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    })
    res.redirect(process.env.WEBSITE_URL);
}

export const login = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    const isVaildUser = user && (await comparePassword(req.body.password , user.password));
    if(!isVaildUser) throw new UnauthenticatedError('Invalid credentials');
    const token = createJWT({userId: user._id, role: user.role});
    const oneDay = 1000 * 60 * 60 * 24 ;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    })
    res.status(StatusCodes.OK).json({message: 'login successful'});
}

export const logout = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({message: 'Logged Out sucessfully'})
}