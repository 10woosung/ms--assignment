import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";


export default function Signup() {
  const [ID , setID] = useState("");
  const [password , setpassword] = useState("");
  const navigate = useNavigate();
  

  const trylogin = async () => {
    const textres = await fetch("http://localhost:4000/api/login",{
      method: "POST",headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ID, password }),
    });
    
    if(!textres.ok){
      alert(textres.error || "로그인 실패")
    }


    
    
    
    
    
    else{
      navigate(`/`)
    }
    
  }
  

  useEffect(() => {
    

    

    },[]);



    return (
      <div>
        <h1>Login</h1>
        <table border="1">
          <tbody>
            <tr>
              <td>
                <input
                  style={{ width: 320, height: 48, fontSize: 18, padding: "10px 12px" }}
                  type="text"
                  name="title"
                  placeholder="ID"
                  value={ID}
                  onChange={(e) => setID(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>

                  <input
                    style={{ width: 320, height: 48, fontSize: 18, padding: "10px 12px" }}
                    type="text"
                    name="title"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <Button size="lg" variant="outline-primary" onClick={trylogin}>
                  제출
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}
