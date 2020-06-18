// require statements:
const validator = require('validator');
const yargs = require('yargs');
const notes = require('./notes.js');

//
yargs.version('1.1.0');

yargs.command({
  command: 'add',
  describe: 'Add a note to the list',
  builder: {
    title: {
      describe: 'Note title',
      type: 'string',
      demandOption: true,
    },
    body: {
      describe: 'Note body',
      type: 'string',
      demandOption: true,
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});
yargs.command({
  command: 'remove',
  describe: 'Remove a note from the list',
  handler: function (argv) {
    notes.remove(argv.title);
  },
});
yargs.command({
  command: 'read',
  showInHelp: true,
  describe: 'Read a note from the list',
  handler: function () {
    console.log('reading a note ');
  },
});
yargs.command({
  command: 'list',
  showInHelp: true,
  describe: 'Get a list of all notes',
  handler: function () {
    console.log('List of all notes are \n'+notes.list());
  },
});

yargs.parse();
// start with chapter 4, video 5,  storing data with JSON
