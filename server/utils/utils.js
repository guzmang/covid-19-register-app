// ============================
//  DNA validation
// ============================

function dnaIsWholeNumberAfterSqrt(dna) {
    let dnaLength = Math.sqrt(dna.length);
    return (dnaLength - Math.floor(dnaLength) === 0);
}

function dnaBases(dna) {
    let regExp = /[ACGT]/g;
    let search = dna.match(regExp);
    console.log(search);
    console.log(dna.length);
    return (search ? (dna.match(regExp).length === dna.length) : false);
}

// ============================
//  DNA format to save into DB
// ============================

function dnaConverter(dna) {
    let fragmentLength = Math.sqrt(dna.length);
    let dnaConverted = new Array();
    let dnaFragment = '';
    for (let i = 0; i < dna.length; i++) {
        dnaFragment = dnaFragment + dna[i];
        if (dnaFragment.length === fragmentLength) {
            dnaConverted.push(dnaFragment);
            dnaFragment = '';
        }
    };
    return dnaConverted;
}

// ============================
//  Diagnostic
// ============================

function searchSequenceInRow(row) {
    let sequences = ['AAAA', 'CCCC', 'GGGG', 'TTTT']

    let sequenceCounter = sequences.map((sequence) => row.includes(sequence))
        .filter((isMatch) => isMatch)
        .length;

    return sequenceCounter;
}

function getMatchesInDNA(dna) {
    let counter = 0;
    dna.forEach(row => counter = searchSequenceInRow(row) + counter);
    return counter;
}

function getTransposedMatrix(dna) {
    return dna.map((_, colIndex) => (dna.map(row => row[colIndex]).join('')));
}

function analyzeMatches(matches) {
    if (matches < 2) {
        return 'healthy';
    } else if (matches >= 2 && matches < 4) {
        return 'infected';
    } else {
        return 'immune';
    }
}

function getDiagnostic(dna) {
    let dnaFormated;
    if ((typeof dna === 'string')) {
        dnaFormated = dnaConverter(dna);
    } else {
        dnaFormated = dna;
    }
    return analyzeMatches(
        getMatchesInDNA(dnaFormated) + getMatchesInDNA(getTransposedMatrix(dnaFormated))
    );
};

// ============================
//  Count by status
// ============================

function countByStatus(persons) {
    return {
        healthy: persons.filter((person) => person.result === 'healthy').length,
        infected: persons.filter((person) => person.result === 'infected').length,
        immune: persons.filter((person) => person.result === 'immune').length
    }
};

module.exports = {
    dnaIsWholeNumberAfterSqrt,
    dnaBases,
    dnaConverter,
    getDiagnostic,
    countByStatus
};