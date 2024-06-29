let _notes = [
    { id: "1", text: "An awesome web dev Note" },
  ];
  
  const notes = () => _notes;
  function addNote(note){
    _notes.push(note);
  }
  function editNote(noteId,newText){
   _notes= _notes.map((a)=>{
    if(a.id==noteId)
      return({...a,text:newText})
    else
    return a;
   }
)
  }
  function deleteNote(noteId){
    _notes=_notes.filter(a=>a.id!=noteId)
  }
  
  export { notes,addNote,deleteNote,editNote };
