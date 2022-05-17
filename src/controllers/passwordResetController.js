import ServiceProvider from '../provider/service-provider';
import controller from './auth/baseApiController';

class PwdController extends controller{
    constructor(){
        super();
        this.service = ServiceProvider.PasswordReset
    }

    async PasswordReset(req,res){
        try {
            const payload = {
                email:req.body.email
            };
            console.log(this.service)
            const data = await this.service.forgotPwd(payload);
            return this.successResponse(res, data);
        } catch(err) {     
            console.log(err);
            return this.errorResponse(res, err);
        }
    }

    async resetPwd(req,res){
         try{
            // const errors = this.validate(req);
            // if (!errors.isEmpty()) {
            //     return this.errorResponse(res,errors);
            // }
            const payload = {
                userId : req.params.userId,
                token: req.params.token,
                password : req.body.password
            }
            const data = await this.service.resetPassword(payload);
            console.log(data)
            return this.successResponse(res,data);
        } catch(err){
            return this.errorResponse(res, err);
        }
    }

}

export default new PwdController();