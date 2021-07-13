const fs=require("fs")
const chalk=require("chalk")

const addNote=(title,body)=>{
    const notes=loadNotes()
    // console.log(notes)

    // const DuplicateNotes=notes.filter((note)=>note.title===title)

    const DuplicateNote=notes.find((note) => note.title === title)

    if(!DuplicateNote){
        notes.push({
            title:title,
            body:body
        })
        console.log(chalk.bgGreen("ADDED NOTE"))
    }
    else{
        console.log(chalk.bgRed("Note Title Taken Already"))
    }

    saveNote(notes)
}

const removeNote=(title)=>{
    const notes=loadNotes()

    const newNote=notes.filter((note)=>note.title!==title)
    // console.log(matchedNote)
    // console.log(newNote)
    if(newNote.length===notes.length){
        console.log(chalk.bgRed("No Note Found!"))
    }
    else
    {
        console.log(chalk.bgGreen("Note Removed"))
        saveNote(newNote)
    }

    // console.log("Title to be removed: ",title)
}

const saveNote=(notes)=>{
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync("notes.json",dataJSON)
}

const loadNotes=()=>{
    try {
        const dataBuffer=fs.readFileSync("notes.json")
        const dataJSON=dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e)
    {
        return []
    }
}

const listNotes=()=>{
    const notes=loadNotes()
    console.log(chalk.green.bold("Your notes:"))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNotes=(title)=>{
    const notes=loadNotes()
    const ispresent=notes.find((note)=> note.title===title)
    if(ispresent){
        // const shownote=notes.filter((note)=> note.title===title)
        console.log(chalk.green.bold.italic(ispresent.title))
        console.log(ispresent.body)
        // console.log(chalk.bold.green.italic(shownote.title))
        // console.log(shownote.body)
    }
    else{
        console.log(chalk.bold.red("No Note Found"))
    }
}

module.exports ={
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNotes:readNotes
}