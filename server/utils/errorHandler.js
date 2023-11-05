
exports.errorHandler = (err, req, res, next) => {

    let customError = {};
    console.log("came here");
    console.log(err);
    // check if the error is a joi validation error which have an _original property 

    if (err._original) {
        err.details.forEach((error) => {
            customError[error.path[0]] = error.message;
        })

        return res.status(400).json(customError)
    }

    // check if the error is a mongoose validation error and not a joi validation error as joi validation error has a _original property

    if ((err.name === 'CastError' || err.name === 'ValidationError') && err._original == undefined) {
        console.log("PRESENT");
        Object.values(err.errors).forEach((error) => {
            customError[error.path] = error.message
        })
        return res.status(400).json(customError)
    }

    if (err.message === "invalid id"){
        return res.status(404).json({
            success: false,
            message: "invalid id"
        })
    }

    customError.message = err.message;
    console.log(customError);
    res.status(500).json(customError)

}

exports.notFound = (req, res) => {
    res.status(404).send("<h1>Page not found</h1>")
}