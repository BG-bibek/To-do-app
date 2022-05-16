import {checkSchema}  from "express-validator";
import { user } from "../../models";

let registerUserValidation = checkSchema({
    'username': {
        isLength: {
            errorMessage: ' Name is required',
            options: { min : 1}
        }
    },
    'email': {
        isLength: {
            errorMessage: 'Email is required',
            options: { min: 1}
        },
        isEmail: {
            errorMessage: 'This email is not a valid email'
        },
        custom: {
            options: (value) => {
                    return new Promise ((resolve, reject) => {
                    let whereCondition = {email: value};
                    user.findOne({where: whereCondition}).then(user => {
                        if(user === null) {
                            resolve (true);
                        } else {
                            reject('This email already exists');
                        }
                    }).catch(() => {
                        resolve(true);
                    });
                });
            }
        }
    },
    'password': {
        custom: {
            options: (value) => {
                if(value === '' || value == undefined){
                    throw new Error('Password is required');
                } else {
                    if(value.length >= 8 && value.length <=30) {
                        return true;
                    } else {
                        throw new Error('Password must be between 8 and 25 characters.');
                    }
                }
            }
        }
    }
});

export default {registerUserValidation};
