var FrenchVerbs = require('./dist/index.js');

// elle est allée
console.log( "elle " + FrenchVerbs.getConjugation({
  verb: 'aller',
  person: 2,
  aux: 'ETRE',
  tense: 'PASSE_COMPOSE',
  agreeGender:'F'
}) );

// je finis
console.log( "je " + FrenchVerbs.getConjugation({
  verb: 'finir',
  person: 0,
  tense: 'PRESENT'
}) );

// true
console.log(FrenchVerbs.alwaysAuxEtre('demeurer'));

// true
console.log(FrenchVerbs.isIntransitive('voleter'));

// true
console.log(FrenchVerbs.isTransitive('abandonner'));
