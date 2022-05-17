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
                tokenExpires: Date.now() + 3600000 //1h
        });
        await user.save();  
        const link = `http://localhost:3000/pwd/${user.id}/${token}`;
        await this.sendEmail(user.email, "Password reset", link);
        return "password reset link sent to your email account"
    }

    async resetPassword(payload) {  
        //todo: validation
        const user = await User.findOne({
        where: {
         id: payload.userId,
         token: payload.token
             }
        });
        // console.log(usesrs)
        if (!user || !(user.tokenExpires > Date.now())) return "invalid link or expired";
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