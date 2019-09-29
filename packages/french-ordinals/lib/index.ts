const frenchOrdinals: string[] = [
  'premier', // ou "première"
  'deuxième',
  'troisième',
  'quatrième',
  'cinquième',
  'sixième',
  'septième',
  'huitième',
  'neuvième',
  'dixième',
  'onzième',
  'douzième',
  'treizième',
  'quatorzième',
  'quinzième',
  'seizième',
  'dix-septième',
  'dix-huitième',
  'dix-neuvième',
  'vingtième',
  'vingt et unième',
  'vingt-deuxième',
  'vingt-troisième',
  'vingt-quatrième',
  'vingt-cinquième',
  'vingt-sixième',
  'vingt-septième',
  'vingt-huitième',
  'vingt-neuvième',
  'trentième',
  'trente et unième',
  'trente-deuxième',
  'trente-troisième',
  'trente-quatrième',
  'trente-cinquième',
  'trente-sixième',
  'trente-septième',
  'trente-huitième',
  'trente-neuvième',
  'quarantième',
  'quarante et unième',
  'quarante-deuxième',
  'quarante-troisième',
  'quarante-quatrième',
  'quarante-cinquième',
  'quarante-sixième',
  'quarante-septième',
  'quarante-huitième',
  'quarante-neuvième',
  'cinquantième',
  'cinquante et unième',
  'cinquante-deuxième',
  'cinquante-troisième',
  'cinquante-quatrième',
  'cinquante-cinquième',
  'cinquante-sixième',
  'cinquante-septième',
  'cinquante-huitième',
  'cinquante-neuvième',
  'soixantième',
  'soixante et unième',
  'soixante-deuxième',
  'soixante-troisième',
  'soixante-quatrième',
  'soixante-cinquième',
  'soixante-sixième',
  'soixante-septième',
  'soixante-huitième',
  'soixante-neuvième',
  'soixante-dixième',
  'soixante et onzième',
  'soixante-douzième',
  'soixante-treizième',
  'soixante-quatorzième',
  'soixante-quinzième',
  'soixante-seizième',
  'soixante-dix-septième',
  'soixante-dix-huitième',
  'soixante-dix-neuvième',
  'quatre-vingtième',
  'quatre-vingt-unième',
  'quatre-vingt-deuxième',
  'quatre-vingt-troisième',
  'quatre-vingt-quatrième',
  'quatre-vingt-cinquième',
  'quatre-vingt-sixième',
  'quatre-vingt-septième',
  'quatre-vingt-huitième',
  'quatre-vingt-neuvième',
  'quatre-vingt-dixième',
  'quatre-vingt-onzième',
  'quatre-vingt-douzième',
  'quatre-vingt-treizième',
  'quatre-vingt-quatorzième',
  'quatre-vingt-quinzième',
  'quatre-vingt-seizième',
  'quatre-vingt-dix-septième',
  'quatre-vingt-dix-huitième',
  'quatre-vingt-dix-neuvième',
  'centième',
];

export function getOrdinal(val: number): string {
  if (val <= 100) {
    return frenchOrdinals[val - 1];
  } else {
    const err = new Error();
    err.name = 'RangeError';
    err.message = `French ordinal only works with <= ${frenchOrdinals.length}`;
    throw err;
  }
}
