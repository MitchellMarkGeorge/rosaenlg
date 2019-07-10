module.exports = {
  simple: [
    `
p
  eachz elt in ["A","B","C"] with {"separator": ', ', last_separator: "and"}
    | #{elt}
`,
    `
\\beginParagraph
  \\foreach(elt, ["A","B","C"], -> TextListSentenceAssembly --> separator [", ", _LAST, "and"];) /* TODO MIGRATE foreach */
    \\value(elt) /* TODO MIGRATE VALUE */
  \\endForeach
\\endParagraph
`,
  ],
};
