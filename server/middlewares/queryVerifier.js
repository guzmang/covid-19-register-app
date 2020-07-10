// ====================================
// Verify country and result parameters
// ====================================

let queryValidator = (req, res, next) => {

    const stats = ['healthy', 'infected', 'immune'];
    let country = req.query.country;
    let result = req.query.result;
    let dbObjectParameter;

    if (country == null && result == null) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'You must insert at least a value for country or result in query.'
            }
        });
    }

    if (result != null) {
        result = result.toLowerCase();
        if (!stats.includes(result)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'The result just can be one of: healthy, infected or immune.'
                }
            });
        }
    }

    if (result == null) {
        dbObjectParameter = { country }
    } else if (country == null) {
        dbObjectParameter = { result }
    } else {
        dbObjectParameter = {
            country,
            result
        }
    }

    req.dbObjectParameter = dbObjectParameter;
    next();

}

module.exports = {
    queryValidator
};