exports.studentReq = async (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    req.check('username', 'username is required').notEmpty();
    req.check('rollNo', 'rollNo is required').notEmpty();
    req.check('batch', 'batch is required').notEmpty();
    req.check('program', 'program is required').notEmpty();
    req.check('year', 'year is required').notEmpty();
    req.check('bus', 'bus is required').notEmpty();
    req.check('busStop', 'busStop is required').notEmpty();
    req.check('busFee', 'busFee is required').notEmpty();
    req.check('paymentStatus', 'paymentStatus is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            status: false,
            error: errors
        });
    }

    next();
}