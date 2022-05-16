import db from "../../../models";
import config from "../../../config/auth.config";
import BaseApiService from './baseApiService';
import {Op} from 'sequelize';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import otpGenerator from 'otp-generator';
import { text } from "express";
const Role = db.role;
const User = db.user;
// import sendEmail from "../email-service/emailService";

class AuthService extends BaseApiService{
    
    async signin(payload){
        const userData = await User.findOne({
            where:{
                [Op.or]: [
                    {username: payload.username},
                    {email: payload.username}
                ]
            }
        });
        if (!userData || ! bcrypt.compareSync(payload.password, userData.password)){            
            this.customError(404, "UNAUTHORIZED");
        }
        const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        console.log(otp)
         userData.set({
                token: otp,
                tokenExpires: Date.now() + 60000
        });
        await userData.save();  
        const subject =  "OTP Verification";
        const link =  `http://localhost:3000/auth/otp/${payload.username}`;
        const text = `Your OTP is ${otp}  link: ` +link;
        await this.sendEmail(userData.email, subject, "This link will be invalid in 1 min: "+ text);
        return 'OPT link sent to your email account';       
    }

    async signup(payload){
        const user = await User.create({ username: payload.username, email: payload.email, password: bcrypt.hashSync(payload.password, 8)})
        if(!payload.roles){
        await user.setRoles([1]);
        return "User was registered successfully!"
        }
        const roles = await Role.findAll({where: {name: {[Op.or]: payload.roles }}})
        await user.setRoles(roles)
        return "User was registered successfully!"
    }  

     async otp(payload) {
        //todo:validation.
        const otp = payload.otp;
        const userData = await User.findOne({
            where:{
                token : payload.otp,
                [Op.or]: [  
                    {username: payload.username},
                    {email: payload.username}
                ]
        }
        });
        if (!userData) return "invalid link or expired 1"
        if(!(userData.tokenExpires > Date.now())) return "Invalid link or expired 3";
        var token = jwt.sign({ id: userData.id }, config.secret, {
        expiresIn: 86400 // 24 hours
        });
        var authorities = [];
        const roles =  userData.getRoles()
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        await userData.set({
                token: null,
                tokenExpires: null
        });
        await userData.save();
        return{
          id: userData.id,
          username: userData.username,
          email: userData.email,
          roles: authorities,
          accessToken: token
        };  
    }
}

export default AuthService;