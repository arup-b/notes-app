// require statements:
const validator = require('validator');
const yargs = require('yargs');
const notes = require('./notes.js');
const { default: chalk } = require('chalk');

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
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});
yargs.command({
  command: 'remove',
  describe: 'Remove a note from the list',
  handler(argv) {
    notes.remove(argv.title);
  },
});
yargs.command({
  command: 'read',
  showInHelp: true,
  describe: 'Read a note from the list',
  handler() {
    console.log('reading a note ');
  },
});
yargs.command({
  command: 'list',
  showInHelp: true,
  describe: 'Get a list of all notes',
  handler() {
    const noteList = notes.list();
    noteList.forEach((note, index)=>{
      if(index % 2){
        console.log(chalk.black.bgGreenBright.bold(note.title + ' : ' + note.body));
      }else{
        console.log(chalk.black.bgMagentaBright.bold(note.title + ' : ' + note.body));
      }
      
    })
  },
});

yargs.parse();
// start with chapter 4, video 5,  storing data with JSON
