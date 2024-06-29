import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
export default function Home(){
    const [data,setData]=useState([]);
    const [addNote,setNote]=useState(false);
    const [newNote,setnewNote]=useState();
  useEffect(()=>{
    async function fetchData(){
        try{
        const res=await axios.get("http://localhost:3000/notes");
        setData(res.data.notes);
        }
        catch(err){
        console.log(err);
        }

    }
    fetchData();
  },[])
  async function deleteNote(id){
    const res=await axios.delete(`http://localhost:3000/notes/${id}`)
    setData(res.data.notes)
  }
  const handleAddNote = async () => {
    if (newNote.trim() === '') {
      alert('Note text cannot be empty');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/notes', {
        noteText: newNote,
      });
      setData(res.data.notes); 
      setnewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };
 
    return (
        <div className="home">
          <div>
        <h1>YANT</h1>
       {data&&
        data.map((note)=>{
           return(
            <div  key={note.id} className="note">  
            <Link to={`/${note.id}`} state={{text:note.text}}>
            <p>{note.text}</p>
          </Link>
            <button aria-label="delete button" onClick={()=>{
                deleteNote(note.id)
            }}>Delete</button>
            </div>
           )
        })
       }
       <button aria-label="add-note" onClick={()=>setNote(!addNote)}>Add a Note</button>
       {
        addNote&&
       <div>
        <input value={newNote} onChange={(e)=>setnewNote(e.target.value)}></input>
        <button aria-label="submit the note" onClick={()=>{
            handleAddNote();
        }}>submit Note</button>
        </div>
       }

       </div>
       </div>
    )
}