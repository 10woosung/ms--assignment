// import logo from './logo.svg';
// import './App.css';
// import {useState} from 'react'

// function App() {
// let post ='강남 우동 맛집';
// let [글제목,b] = useState(['남자 코트 추천','여자 코트 추천','중성 코트 추천']);
// let [따봉,따봉변경] = useState(0);
// let [choice, setChoice] = useState('');

// function 따봉함수(){
//   따봉변경(따봉+1)
// }


//   return (
//     <div className="App">
//       <div className="black-nav">
//         <h4> ReactBlog </h4>
//       </div>
//       <div className="list">
//         <h4>{ 글제목[1] }<span onClick = {따봉함수}>👍</span>{따봉}</h4>
//         <p>{글제목[0]}</p>
//       </div>
//       <div className="list">
//         <h4>{ 글제목[1] }</h4>
//         <p>{글제목[0]}</p>
//         <a href="https://www.youtube.com/watch?v=eVZpJrRvt08">하입보이</a>
//         <form>
//           좋아하는 가수: <input type='text'/>
//           <button type="button" onClick={따봉함수}>👍{따봉}</button><br></br>
          
//           <label>
//             <input type="radio" name="choice" value="김우성"onChange={(e) => setChoice(e.target.value)}/>김우성
            

//           </label>
//           <label>
            
//           <input type="radio" name="choice" value="차차차"onChange={(e) => setChoice(e.target.value)}/>자자자

//           </label>

//           <h4>{choice}</h4>

//           <label for="female">파일

            

//           </label>
//           FILE : <input type = "file"/>
          
//         </form>

        
        
//       </div>
//     </div>
//   );
// }

// export default App;



//변수에 있던 자료를 html에 넣고싶으면 <h4> { post } <h4> 이렇게 중괄호로 변수 선언 후 넣을 수 있다.
//state 하면 재랜더링 되어서 좋음
//state는 = 로 변경 금지

//submit 은 서버에 전송기능 있음





import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Badge from 'react-bootstrap/Badge';
import { Routes, Route , useNavigate} from "react-router-dom";
import Write from "./component/write";
import Texts from "./component/texts";
import Signup from "./component/signup";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';



function App() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [texts, setText] = useState(null);
  const [print, setPrint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    // 컴포넌트 처음 렌더링될 때 서버에서 데이터 가져오기
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/users"); // server.js의 API
        const textres = await fetch("http://localhost:4000/api/texts");
        const data = await res.json();
        const textsdata = await textres.json();
        setUsers(data);
        setText(textsdata)
        setPrint(textsdata.text1)
        
      } catch (err) {
        console.error("데이터 가져오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;

  return (
    
      <div>


        <div className="d-flex justify-content-front my-3 d-flex gap-1">
            <Button size = "lg" variant="outline-primary" onClick={()=> navigate('/')}>Home</Button>
            <Button size = "lg" variant="outline-primary" onClick={()=> navigate('/write')}>write</Button>
            <Button variant="outline-primary" >search</Button>
          </div>
        <div className="d-flex justify-content-front my-3 d-flex gap-1">
        <Button size = "lg" variant="outline-primary" onClick={()=> navigate('/signup')}>로그인</Button>
        </div>


        <Routes>
          <Route path="/" element={<>
          알림 <Badge bg="primary">New</Badge>
          <h1>Firebase에서 가져온 유저 목록</h1>
          <pre>{JSON.stringify(users, null, 1)}</pre>
          <pre>{JSON.stringify(texts, null, 1)}</pre>
          <pre>{JSON.stringify(print, null, 1)}</pre>

          



          
          {texts &&
          Array.from({ length: texts.cnt }, (_, i) => (
          
            <Card bg = "dark" text = "white" key={i}>
            <Card.Body>
              <Card.Text>
                <span
                  style={{ cursor: "pointer" }} onClick={()=>navigate(`/texts/${i+1}`)}
                  >
                    {texts[`title${i+1}`]}
                </span>
                
              </Card.Text>
            </Card.Body>
          </Card>
          
          
          ))}




          {/* <Card bg = "dark" text = "white">
            <Card.Body>
              <Card.Text>
                <span
                  style={{ cursor: "pointer" }} onClick={()=>navigate("/texts")}
                  >
                    하이용
                </span>
                
              </Card.Text>
            </Card.Body>
          </Card> */}


          

          
        </>}
        />
        
          <Route path="/write" element={<Write />} />


          <Route path="/texts/:id" element={<Texts texts={texts} />} />
            
            


          <Route path="/search" element={<>
            
            
            </>} />

          <Route path="/signup" element={<Signup/>} />

        </Routes>

          

      </div>
    
  );
}

export default App;