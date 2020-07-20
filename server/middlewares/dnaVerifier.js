const { dnaIsWholeNumberAfterSqrt, dnaBases, dnaConverter, getDiagnostic } = require('../utils/utils');

// ===========================
// Verify dna bases and length
// ===========================

let dnaValidator = (req, res, next) => {
    let dna = req.body.dna;

    if (dna === '' || dna === undefined || dna === null) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Please insert a DNA value.'
            }
        });
    }

    if ((typeof dna === 'string')) {
        dna = req.body.dna.toUpperCase();
        dna = dna.replace(/\n/g, '')
        dna = dna.replace(/\t/g, '')
        dna = dna.replace(/ /g, '')
    } else {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'DNA must be String type.'
            }
        });
    }

    if (people.dna.length < 36) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'DNA must have a minimum length value = 36 and follow a NxN sequence (with a minimum value of N = 6).'
            }
        });
    }

    if (!dnaIsWholeNumberAfterSqrt(dna)) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'DNA is not a NxN sequence.'
            }
        });
    }

    if (!dnaBases(dna)) {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'DNA is not valid. The values in nitrogen base must be type A, T, C and G (no matter order).'
            }
        });
    }

    req.dnaFormated = dnaConverter(dna);
    req.result = getDiagnostic(dna);
    next();

}

module.exports = {
    dnaValidator
};