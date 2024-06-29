import { useParams,useLocation, useNavigate,Link} from "react-router-dom";
import axios from "axios";
import { useState} from "react";
export default function Note(){
    const [edit,setEdit]=useState(false);
    const [newNote,setnewNote]=useState("");
    const [image,setImage]=useState(null);
    const text=useLocation();
    const value=text.state.text;
    const { noteId } = useParams(); 
    const navigate=useNavigate();
      
    async function generateImage  (){
     const res= await axios.post(`http://localhost:3000/notes/photo`,  {noteText:value});
    setImage(res.data)
    }
const editNote = async () => {
    if (newNote.trim() === '') {
      alert('Note text cannot be empty');
      return;
    }
    try {
       await axios.put(`http://localhost:3000/notes/${noteId}`, {
        newText: newNote,
      }); 
    navigate('/');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };
return(
<div className="notePage"><p className="id">Note id: {noteId}</p>
<p className="text">{value}</p>
<button aria-label="Edit-button" onClick={()=>{setEdit(!edit)}}>Edit Note</button>
{edit&&(
<div>
        <input value={newNote} onChange={(e)=>setnewNote(e.target.value)}></input>
        <button aria-label="submit the note" onClick={()=>{
            editNote();
        }}>submit Note</button>
        </div>)}
        <button aria-label="generate-image" onClick={()=>generateImage()}>Generate Image</button>
        {image&&    
        (
          <div>
          <img src={image.url} alt="image for notes"/>
          <div className="author">
          <span>Photo by </span>
          <Link to={image.userLink}>{image.user}</Link>
          </div>
        </div>
        )
      }
</div>)
}