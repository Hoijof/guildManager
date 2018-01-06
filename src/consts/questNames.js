const actions = [
    {
        name: 'Kill ',
        links: [0, 1, 2, 3, 4, 5]
    },
    {
        name: 'Save ',
        links: [4, 6, 7, 8, 9, 10, 11, 12, 13]
    },
    {
        name: 'Clean ',
        links: [1, 4, 8, 9, 13, 14]
    }
];

const names = [
    // Kill 0-5
    'a rat',
    'a dog',
    'a dragon',
    'the lord of darkness',
    'Isra',
    'something alive',
    // Save 6-12
    'the princess',
    'a farmer',
    'yourself',
    'a farm',
    'a town',
    'a city',
    'the kingdom',
    // Clean 13-15
    'the stables',
    'a house'
];

export default {
    actions,
    names
}