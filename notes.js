const fs = require('fs');
const chalk = require('chalk');
const log = console.log;
const notesRef = 'notes.json';
//
const getNotes = function(){
    const allNotesString = JSON.stringify(loadNotesFromFile());
    return allNotesString;
}
const saveNote = function(_title, _body){
    const notesArr = loadNotesFromFile();
    // filter 
    const filtered = notesArr.filter((note)=>{
        return note.title === _title;
    })
    if(filtered.length > 0){
        log(chalk.redBright('Duplicate title!! Can not save'));
        return;
    }
    const newNote = {
        title: _title, body: _body
    }
    notesArr.push(newNote);
    log(chalk.black.bgGreenBright.bold('New note with ' + _title + ' saved successfully'));
    saveNotesToFile(notesArr);
}
const removeNote = function(_title){
    const savedNotes = loadNotesFromFile();
    // find the note
    const indx = savedNotes.findIndex((note)=> note.title === _title);
    //
    if(indx >= 0){
        savedNotes.splice(indx, 1);
        saveNotesToFile(savedNotes);
        log(chalk.black.bgGreenBright.bold('Note with ' + _title + ' deleted'));
    }else if(indx < 0){
        log(chalk.white.bgRedBright.bold('Note with title "' + _title + '" does not exist'));
    }
}
// helper functions 
const loadNotesFromFile = function (){
    try{
        const notesBuffer = fs.readFileSync(notesRef);
        const notesJSON = JSON.parse(notesBuffer.toString());
        return notesJSON;
    }catch{
        return [];
    }    
}
const saveNotesToFile = function(noteArr){    
    fs.writeFileSync(notesRef, JSON.stringify(noteArr));
}
//
module.exports = {
  addNote: saveNote,
  remove: removeNote,
  list: getNotes
};