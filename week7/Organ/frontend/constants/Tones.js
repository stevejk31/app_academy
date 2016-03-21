var Note = require("../utils/Note.js");

var TONES = {
  65:	{id: "g3", note: new Note(196.00)},
  83: {id: "g3s", note: new Note(207.65)},
  68:	{id: "a3", note: new Note(220.00)},
  70: {id: "as3", note: new Note(233.08)},
  71:	{id: "b3", note: new Note(246.94)},
  72:	{id: "c4", note: new Note(261.63)},
  74: {id: "cs4", note: new Note(277.18)},
  75:	{id: "d4", note: new Note(293.66)},
  76: {id: "ds4", note: new Note(311.13)}
};

module.exports = TONES;
