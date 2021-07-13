const yargs=require("yargs")
const notes=require("./notes")
const chalk=require("chalk")
const { removeNote } = require("./notes")

yargs.version("1.1.1")

// creating add command
yargs.command({
    command: "add",
    describe: "Add a note",
    builder: {
        title:{
            describe:"Note Title",
            demandOption: true,
            type: 'string'
        },
        body:{
            describe:"Note Body",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})
// creating the remove command
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder:{
        title:{
            describe:"Note Title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

// creating list command
yargs.command({
    command: "list",
    describe: "List the notes",
    handler(argv){
        notes.listNotes()
    }
})

//creating the read command
yargs.command({
    command: "read",
    describe: "Reading a note",
    builder:{
        title:{
            describe:"Note Title",
            demandOption:true,
            type:"string"
        }
    },
    handler (argv){
        notes.readNotes(argv.title)
    }
})


yargs.parse()

// console.log(yargs.argv)
