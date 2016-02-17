var Note = require("../utils/Note.js");

var TONES = {
  g3:	new Note(196.00),
  gs3: 	new Note(207.65),
  a3:	new Note(220.00),
  as3: 	new Note(233.08),
  b3:	new Note(246.94),
  c4:	new Note(261.63),
  cs4: 	new Note(277.18),
  d4:	new Note(293.66),
  ds4: 	new Note(311.13),
  e4:	new Note(329.63),
  f4: 	new Note(349.23)
};

module.exports = TONES;
