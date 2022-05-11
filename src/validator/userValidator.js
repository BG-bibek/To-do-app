const { checkSchema } = require('express-validator/check');

const User = require('../../models/user.model');

let addUserValidation = checkSchema({
    'username': {
        isLength: {
            errorMessage: 'Username is required',
            options: { min: 1 }
        },
        custom: {
            options: (value, { req }) => {
                let isEdit = req.params && req.params.id ? true : false;
                return new Promise( (resolve, reject) => {
                    let whereCondition = {username:value};
                    if (isEdit) {
                        whereCondition = {username:value, '_id': {$ne: req.params.id}};
                    }
                    User.findOne(whereCondition).then(user => {
                        if(user === null) {
                            resolve(true);
                        } else {
                            reject('Username already exists');
                        }
                    }).catch(() => {
                        resolve(true);
                    });
                });
            }
        }
    },
   
    'email': {
        isLength: {
            errorMessage: 'Email is required',
            options: { min: 1 }
        },
        isEmail: {
            errorMessage: 'Not a valid email'
        },
        custom: {
            options: (value, { req }) => {
                let isEdit = req.params && req.params.id ? true : false;
                return new Promise( (resolve, reject) => {
                    let whereCondition = {email:value};
                    if (isEdit) {
                        whereCondition = {username:value, '_id': {$ne: req.params.id}};
                    }
                    User.findOne(whereCondition).then(user => {
                        if(user === null) {
                            resolve(true);
                        } else {
                            reject('Email already exists');
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
            options: (value, { req }) => {
                if (req.query._method == 'PUT' || req.body.password_method=="is_activation_link") {
                    return true;
                }
                if (value === '' || value == undefined) {
                    throw new Error('Password is required');
                } else {
                    if (value.length >= 6 && value.length <= 20) {
                        return true;
                    }  else {
                        throw new Error('Password must be between 6 and 20 characters', 'password', 412);
                    }
                }
            }
        }
    }

});

let changeUserPasswordValidation = checkSchema({
    'password': {
        isLength: {
            errorMessage: 'Password is required',
            options: { min: 1 }
        },
        custom: {
            options: (value) => {
                if (value.length >= 6 && value.length <= 20) {
                    return true;
                }  else {
                    throw new Error('Password must be between 6 and 20 characters', 'password', 412);
                }
            }
        }
    },
    'confirm_password': {
        isLength: {
            errorMessage: 'Confirm password is required',
            options: { min: 1 }
        },
        custom: {
            options: (value, { req }) => {
                if(value === req.body.password) {
                    return true;
                } else{
                    throw new Error('Password do not match');
                }
            }
        }
    }
});

module.exports = {addUserValidation, changeUserPasswordValidation};