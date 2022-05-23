import db from "../../../models";
import config from "../../../config/auth.config";
import BaseApiService from './baseApiService';
import {Op} from 'sequelize';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import otpGenerator from 'otp-generator';
const Role = db.role;
const User = db.user;
import signer from 'signed-url';
const sign = signer(config); 

class AuthService extends BaseApiService{ 
    constructor(){
        super();
        // this.findOneUser = this.findOneUser.bind(this);
        this.tokenList = {}
    }

    async signup(payload){
        const options = {
            method: 'GET',
            ttl: 3600 // expiry time in seconds (optional)
        };
        const signedUrl = sign.sign(`http://localhost:3000/auth/signup?username=${payload.username}&email=${payload.email}&password=${payload.password}&roles=${payload.roles}`, options);
        await this.sendEmail(payload.email, "Email verification", signedUrl);
        return "Please verify your mail. Link has been sent to your Gmail.";
    }  

    async emailVerification(payload){
        const options = {
            method: 'GET'
        };
        const valid = sign.verify(`http://localhost:3000/auth/signup?username=${payload.username}&email=${payload.email}&password=${payload.password}&roles=${payload.roles}&hash=${payload.hash}`, options);
        if(!valid) return "invalid link or expired";
        const user = await User.create({ username: payload.username, email: payload.email, password: bcrypt.hashSync(payload.password, 8)})  
        if(!payload.roles){
        await user.setRoles([1]);
        return "User was registered successfully!"
        }
        const roles = await Role.findAll({where: {name: {[Op.or]: payload.roles.split(',') }}})     
        await user.setRoles(roles);
        return "User was registered successfully!"
    }

    async signin(payload){
         const userData = await this.findOneUser(payload.username);
        if (!userData || ! bcrypt.compareSync(payload.password, userData.password)){            
            this.customError(404, "Invalid User name or Passwords");
        }
        const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
         userData.set({
                token: otp,
                tokenExpires: Date.now() + 60000 //1 min
        });
        await userData.save();  
        const subject =  "OTP Verification";
        const link =  `http://localhost:3000/auth/otp/${payload.username}`;
        const text = `Your OTP is ${otp}  link: ` +link;
        await this.sendEmail(userData.email, subject, "This link will be invalid in 1 min: "+ text);
        return 'OPT link sent to your email account';       
    }

    async otp(payload) {
        //todo:validation.

         const userData = await this.findOneUser(payload.username);
        if (!userData || !(userData.tokenExpires > Date.now())) return "invalid link or expired Token"
        var token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET, {expiresIn: 5*60});//5 min 
        var refreshToken = jwt.sign({id: userData.id}, process.env.refreshTokenSecret, {
            expiresIn: 604800 //1 week
        });
        this.tokenList[refreshToken] = {
            "refreshToken": refreshToken,
            "id":userData.id,
            "expiresIn": Date.now() +  300000 // 5min 
        }
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
          accessToken: token,
          refreshToken: refreshToken
        };  
    } 

    async token(payload){
        if(!payload.refreshToken || !payload.username || !(payload.refreshToken in this.tokenList) ) return "Invalid request";
        if(this.tokenList[payload.refreshToken].expiresIn > Date.now()) return 'Your previous token has not expired'

        const userData = await this.findOneUser(payload.username);
        var token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET, {
            expiresIn: 500// 1h 
        });  

         this.tokenList[refreshToken] = {
            "refreshToken": refreshToken,
            "id":userData.id,
            "expiresIn": Date.now() +  300000 // 5min 
        }
        
        return{
          username: userData.username,
          accessToken: token,
        }; 
    }

    async logout(payload) {
        if(!payload.token || !(payload.token in this.tokenList)) return "Invalid request";
        delete this.tokenList[payload.token];
        return "Logout sucessful!!";       
    }   

    async findOneUser(userName){
           const userData = await User.findOne({
               where:{ 
                   [Op.or]: [
                    {username: userName},
                    {email: userName}
                ]
                 }            
        }); 
        return userData;
    }
}

export default AuthService;