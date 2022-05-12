import CustomError from "../../errors/customError";
class BaseApiService {

    customError(code, msg){
        throw new CustomError({statusCode: code, msg: msg});
    }
}

export default BaseApiService;