const { it } = require("@jest/globals");
const {shuffle} = require ("./script")

{
    const numbers = [1, 2, 3, 4, 5];

    const array = shuffle(numbers);

    assert.equal(array);
}
