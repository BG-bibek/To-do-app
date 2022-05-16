import db from "../../../models";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import BaseApiService from "./baseApiService";
const User = db.user;

class PasswordReset extends BaseApiService {
    async forgotPwd(payload) {
        //todo:validation.
        const user = await User.findOne({ where:{ email: payload.email }});
        if (!user) return res.status(400).send("user with given email doesn't exist");
        var token = crypto.randomBytes(32).toString("hex");
        user.set({
                token: token,
                tokenExpires: Date.now() + 3600000
        });
        await user.save();  
        const link = `http://localhost:3000/pwd/${user.id}/${token}`;
        await this.sendEmail(user.email, "Password reset", link);
        return "password reset link sent to your email account"
    }

    async resetPassword(payload) {  
        //todo: validation
        const users = await User.findAll({
        where: {
         id: payload.userId,
         token: payload.token
             }
        });
        const user = users[0]
        if (!user) return "invalid link or expired 1"
        if(!(user.tokenExpires > Date.now())) return "Invalid link or expired 3";
        user.password = bcrypt.hashSync(payload.password, 8) ;
        await user.set({
                token: null,
                tokenExpires: null
        });
        await user.save();
        return "password reset sucessfully.";
    }
}
export default PasswordReset;