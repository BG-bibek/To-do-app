class CustomError extends Error {
    constructor(error) {
        super(error.msg);
        this.statusCode = error.statusCode;
        this.msg = error.msg;
    }
}
export default CustomError;