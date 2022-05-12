import ServiceProvider from '../provider/service-provider';
import controller from './auth/baseApiController';

class AuthController extends controller{
    constructor(){
        super();
        this.service = ServiceProvider.AuthService;
        this.signin = this.signin.bind(this)
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

    async signup (req, res)  {
        try{
            const payload = {
                username : req.body.username,
                email: req.body.email,
                password: req.body.password,
                roles: req.body.roles
            }
            console.log(payload)
            const data = await this.service.signup(payload);
            return this.successResponse(res,data);
        } catch(err){
            return this.errorResponse(res, err);
        }
  // Save User to Database
};
}
export default new AuthController();

