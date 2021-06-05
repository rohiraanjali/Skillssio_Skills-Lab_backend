const mongoose = require("mongoose");

const errorHandler = (error, req, res, next) => {
console.log(error.stack)
res.status(500).json({
    success: false,
    message: 'Request failed please check errorMessage for more details',
	errorMessage: error.message,
})
}
module.exports = errorHandler;