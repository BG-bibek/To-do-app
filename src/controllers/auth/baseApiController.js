import registerUserValidation from "../../validator/userValidator"
import {validationResult} from "express-validator";
module.exports = class Controller {
    constructor() {
        this.bindMethods();
        this.validate = validationResult;
    }

    successResponse(res, data){
        return res.status(200).send(data);
    }

    errorResponse(res, err){
        return res.status(400).send({
            code:err.statusCode,
            message:err.msg
        });
    }

    bindMethods() {
        //Get methods
        const proto = Object.getPrototypeOf(this);
        const methods = [
            ...Object.getOwnPropertyNames(Controller.prototype),
            ...Object.getOwnPropertyNames(proto)
        ];

        //Bind methods
        for (const method of methods) {
            if (typeof this[method] === 'function') {
                this[method] = this[method].bind(this);
            }
        }
    }
};