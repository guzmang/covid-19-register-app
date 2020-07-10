let mockHealthy = {
    "_id": "5f02ac3154007ac394f05b93",
    "dna": [
        "ATGCGA",
        "CGGTAC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
    ],
    "name": "Gerardo",
    "country": "Paraguay",
    "result": "healthy",
    "__v": 0
};

let mockInfected = {
    "_id": "5f02ac7a54007ac394f05b94",
    "dna": [
        "ATGCGA",
        "CGGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
    ],
    "name": "Gerardo",
    "country": "Venezuela",
    "result": "infected",
    "__v": 0
};

let mockImmune = {
    "_id": "5f02acae54007ac394f05b95",
    "dna": [
        "AAAAGA",
        "CGGTGC",
        "TTATGT",
        "AGAAGT",
        "CCCCTT",
        "TCACTT"
    ],
    "name": "Gerardo",
    "country": "Paraguay",
    "result": "immune",
    "__v": 0
};

/*
let a = ["ATGCGA", "CGGTAC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
	"dna": "ATGCGACGGTACTTATGTAGAAGGCCCCTATCACTG"
let b = ["ATGCGA", "CGGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
	"dna": "ATGCGACGGTGCTTATGTAGAAGGCCCCTATCACTG"
let c = ["AAAAGA", "CGGTGC", "TTATGT", "AGAAGT", "CCCCTT", "TCACTT"];
    "dna": "AAAAGACGGTGCTTATGTAGAAGTCCCCTTTCACTT"
    
console.log(getDiagnostic(a));
console.log(getDiagnostic(b));
console.log(getDiagnostic(c));
 */

module.exports = {
    mockHealthy,
    mockInfected,
    mockImmune
};