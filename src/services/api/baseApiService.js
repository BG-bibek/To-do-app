import CustomError from "../../errors/customError";
import nodemailer from "nodemailer"; 

class BaseApiService {
    constructor(model){
        this.model = model
    }

    customError(code, msg){
        throw new CustomError({statusCode: code, msg: msg});
    }

    async sendEmail(email, subject, text){
         try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: 'todoapp44@gmail.com',
                pass: "QazWsxEdc@123",
            },
        });

        await transporter.sendMail({
            from: 'todoapp44@gmail.com',
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
    }

}

export default BaseApiService;