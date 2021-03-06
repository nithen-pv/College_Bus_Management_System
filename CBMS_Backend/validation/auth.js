exports.signupvalidation = async (req, res, next) => {
    req.check('username', 'Username is required').notEmpty();
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 8 })
        .withMessage('Password must contain 8 character')
        .matches(/\d/)
        .withMessage("password must contain a number");

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            status: false,
            error: errors
        });
    }

    next();
}

exports.signinValidation = async (req, res, next) => {
    req.check('username', 'Username is required').notEmpty();
    req.check('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            status: false,
            error: errors
        });
    }

    next();

}