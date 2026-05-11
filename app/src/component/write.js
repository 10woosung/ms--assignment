import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";


export default function Write() {
  const [title , setTitle] = useState("");
  const [content , setContent] = useState("");
  const navigate = useNavigate();
  

  const fetchUsers = async () => {
    const textres = await fetch("http://localhost:4000/api/write",{
      method: "POST",headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    
    navigate(`/`)

    
  }
  

  useEffect(() => {
    

    

    });

  return(
  <div>
    <h1>글 작성</h1>
    <table border="1">
      <tr>
        <td>제목</td>
        <td>
          <input type="text" name="title" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <textarea name="content" placeholder="내용" rows="5" cols="40" maxlength="200" value={content} onChange={(e) => setContent(e.target.value)}/>
        </td>
      </tr>
      <Button size = "lg" variant="outline-primary" onClick={()=> fetchUsers()}>제출</Button>
      
    </table>

  </div>


  
);
}