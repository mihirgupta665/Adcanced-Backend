class ExpressError extends Error{
    constructor(status, message){           // custom error class require status and error message in their constructor.
        super();
        this.status = status,
        this.message = message
    }
}

module.exports = ExpressError;  