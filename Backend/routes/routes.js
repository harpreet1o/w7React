import express from "express";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import 'dotenv/config';
import redis from "redis";
import { addNote, notes, deleteNote, editNote } from "../persistence.js";


const router=express();


let redisClient;
 (async() => {

  redisClient = redis.createClient();

redisClient.on("error", (error) => console.error(`Error: ${error}`));


  await redisClient.connect();
  console.log('Redis client connected successfully.');

let res=await redisClient.get("hi");
let data=JSON.parse(res);


})();

router.get("/", function (req, res, next) {
    const note=notes();
    res.send( {notes:note });
  });

  router.post("/", (req, res) => {
    try{
    if(!req.body.noteText)
     {  
res.status(400).send("empty field")
     }
     else{
const newText= req.body.noteText;
const newNote = {
    id: uuidv4(),
    text:newText
};
addNote(newNote);
const note=notes();
res.send( {notes:note });
}}
catch(err){
    res.status(400).send(err)
}

})

router.delete("/:Id",(req,res)=>{
try{
    const id=req.params.Id;
    deleteNote(id);
    const note=notes();
    res.send( {notes:note });
    
    
}
catch(err){
res.status(400).send(err);
}

})
router.put("/:Id",(req,res)=>{
    try{           
    const id=req.params.Id;
    let newText=req.body.newText;
    editNote(id,newText);
    const note=notes();
    res.send( {notes:note });
    }
    catch(err){
    res.status(400).send(err);
    }
    
    })
    router.post("/photo",async (req,res)=>{
        const query=req.body.noteText;
        console.log(query);
        const cacheData=JSON.parse(await redisClient.get(query))
        if(cacheData){
          return res.json(cacheData)
        }
        else{
        const re=await axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.key}&query=${query}&per_page=1`);
       const url= re.data.results[0]?.urls.regular;
       const user=re.data.results[0]?.user.name;
       const userLink=re.data.results[0]?.user.links.html;
       await redisClient.set(query,JSON.stringify({url:url,user:user,userLink:userLink}))
        res.json( {url:url,user:user,userLink:userLink});
        }
    })

export default router;
