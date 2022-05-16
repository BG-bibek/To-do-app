import db from "../../../models";
import config from "../../../config/auth.config";
import BaseApiService from './baseApiService';
import {Op} from 'sequelize';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const Role = db.role;
const User = db.user;

class AuthService extends BaseApiService{
    
    async signin(payload){
        console.log('I am inside authService')
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
        var token = jwt.sign({ id: userData.id }, config.secret, {
        expiresIn: 86400 // 24 hours
        });
        var authorities = [];
        const roles =  userData.getRoles()
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        return{
          id: userData.id,
          username: userData.username,
          email: userData.email,
          roles: authorities,
          accessToken: token
        };
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
}

export default AuthService;