

let notesListRootElement = document.querySelector('.noteslist');

let notes = []


function renderElementsToScreen(){
    if(localStorage.getItem('notes')){
        notes = JSON.parse(localStorage.getItem('notes'))
        notes.forEach(note =>{
            renderNoteToList(note, note.uniqueID)
        })
    }
}


document.querySelector('#deleteallnotes').addEventListener('click', () => {
    document.querySelectorAll('.note').forEach(note => {
        note.remove()
    })
    localStorage.clear()
})


document.querySelector('#createNoteButton').addEventListener('click', () =>{
    let uniqueID  = 'note' + Math.floor(Math.random() * 1000)
    let note = {
        title : document.querySelector('#createNoteTitle').value,
        content : document.querySelector('#createNoteContent').value
    }
    if(note.title.length>0 && note.content.length>0){
        addNoteToLocalStorage(note, uniqueID)
        renderNoteToList(note, uniqueID)
      }
      else{
           alert('please enter note title & note description')
      }
})


function renderNoteToList(note,uniqueID){


    


    let noteDiv = document.createElement('div')
    noteDiv.className = 'note'
    noteDiv.classList.add('note' , uniqueID)
    let noteTitle = document.createElement('h4')
    let noteContent = document.createElement('p')
    let noteDeleteButton  = document.createElement('button')
    let noteEditButton=document.createElement('button')

    noteTitle.innerText = note.title
    noteContent.innerText = note.content
    noteDeleteButton.innerText = 'Delete'
    noteEditButton.innerText = 'Edit'

    noteDeleteButton.addEventListener('click', () => {
        removeElementFromNotesList(uniqueID)
    })
    noteEditButton.addEventListener('click',()=>{
        
        document.querySelector('#createNoteTitle').value=note.title;
    document.querySelector('#createNoteContent').value=note.content;
    removeElementFromNotesList(uniqueID)

    


    })

    noteDiv.appendChild(noteTitle)
    noteDiv.appendChild(noteContent)
    noteDiv.appendChild(noteDeleteButton)
    noteDiv.appendChild(noteEditButton)

    notesListRootElement.appendChild(noteDiv)

    document.querySelector('#createNoteTitle').value = ''
    document.querySelector('#createNoteContent').value = ''

    
}

function addNoteToLocalStorage(note, uniqueID){
    note = {...note, uniqueID}

    notes.push(note)

    localStorage.setItem('notes', JSON.stringify(notes))
}


function removeElementFromNotesList(id){
    console.log(id)
    document.querySelector('.'+id).remove();
    notes = JSON.parse(localStorage.getItem('notes'))

    let index = notes.findIndex(note=> note.uniqueID == id)
    
    notes.splice(index, 1)

    localStorage.setItem('notes', JSON.stringify(notes));
}

renderElementsToScreen()