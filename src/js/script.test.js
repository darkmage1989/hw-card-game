const assert = require('node:assert').strict;
import { shuffle } from './script.js';

{
    const numbers = [1, 2, 3, 4, 5];

    const array = shuffle(numbers);

    assert.equal(array);
}
