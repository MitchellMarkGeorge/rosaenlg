const assert = require('assert');
const rosaenlgPug = require('../../../dist/index.js');

describe('rosaenlg', function () {
  it('includes javascript', function () {
    const rendered = rosaenlgPug.renderFile(`${__dirname}/template.pug`, { language: 'en_US' });
    assert.strictEqual(rendered, 'Toto');
  });
});
