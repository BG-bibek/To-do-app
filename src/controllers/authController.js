import ServiceProvider from '../provider/service-provider';
import controller from './auth/baseApiController';

class AuthController extends controller{
    constructor(){
        super();
        this.service = ServiceProvider.AuthService;
        this.signin = this.signin.bind(this)
    }


    async signup (req, res)  {
        try{
            // const errors = this.validate(req);
            // if (!errors.isEmpty()) {
            //     return this.errorResponse(res,errors);
            // }
            const payload = {
                username : req.body.username,
                email: req.body.email,
                password: req.body.password,
                roles: req.body.roles
            }
            const data = await this.service.signup(payload);
            return this.successResponse(res,data);
        } catch(err){
            return this.errorResponse(res, err);
        }
  // Save User to Database
};

    async emailVerification(req,res){  
        try{
        const payload = {
                username : req.query.username,
                email: req.query.email,
                password: req.query.password,
                roles: req.query.roles,
                hash: req.query.hash
            }
             const data = await this.service.emailVerification(payload);
            return this.successResponse(res, data);
        }catch(err){
            console.log(err);
            return this.errorResponse(res, err);
        }
    }

    async signin(req, res){
        try {
            const payload = {
                username:req.body.username,
                password:req.body.password
            };
            const data = await this.service.signin(payload);
            return this.successResponse(res, data);
        } catch(err) {     
            console.log(err);
            return this.errorResponse(res, err);
        }
    }

    async otp(req,res){
        try{
             const payload = {
                username:req.params.username,
                otp:req.body.otp
            };
            const data = await this.service.otp(payload);
            return this.successResponse(res, data);

        }catch(err){
            console.log(err);
            return this.errorResponse(res,err);
        }
    }
    
    async token(req,res) {
        try{
            const payload = {
                refreshToken : req.body.refreshToken,
                username : req.body.username
            }
            const data = await this.service.token(payload);
            return this.successResponse(res,data);

        }catch(err){
           console.log(err);
            return this.errorResponse(res, err);  
        }
    }

    async logout(req,res) {
        try {
            const payload = {
                token : req.body.token
            }
            const data = await this.service.logout(payload);
            return this.successResponse(res,data);
        }catch(err){
            console.log(err);
            return this.errorResponse(res, err);  
        }
    }

    
}
export default new AuthController();

