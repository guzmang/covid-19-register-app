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
    "name": "Eduardo",
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
    "name": "Alvaro",
    "country": "Argentina",
    "result": "immune",
    "__v": 0
};

let getChecks = {
    "ok": true,
    "persons": [
        mockHealthy,
        mockInfected,
        mockImmune
    ]
};

let getStats = {
    "ok": true,
    "healthy": 6,
    "infected": 1,
    "immune": 2
}

let dnaNoString = {
    "name": "Antonella",
    "country": "Uruguay",
    "dna": 9
};

let postOkResponse = {
    "ok": true,
    "person": {
        "dna": [
            "ATGCGA",
            "CGGTAC",
            "TTATGT",
            "AGAAGG",
            "CCCCTA",
            "TCACTG"
        ],
        "_id": "5f1e6d293d08a85da4751678",
        "name": "Antonella",
        "country": "Uruguay",
        "result": "healthy",
        "__v": 0
    }
}

let postHealthy = {
    "name": "Antonella",
    "country": "Uruguay",
    "dna": "ATGCGACGGTACTTATGTAGAAGGCCCCTATCACTG"
};

let postInfected = {
    "name": "Angeles",
    "country": "Peru",
    "dna": "ATGCGACGGTGCTTATGTAGAAGGCCCCTATCACTG"
};

let postImmune = {
    "name": "Elizabeth",
    "country": "Chile",
    "dna": "AAAAGACGGTGCTTATGTAGAAGTCCCCTTTCACTT"
};

module.exports = {
    mockHealthy,
    mockInfected,
    mockImmune,
    getChecks,
    getStats,
    dnaNoString,
    postOkResponse,
    postHealthy,
    postInfected,
    postImmune
};