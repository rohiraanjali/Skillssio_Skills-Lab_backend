const routeNotFound = (req, res) => {
res.status(500).json({
    success: false,
    message: "Route not found on the server. Please check and try again."
})
}

module.exports = routeNotFound;