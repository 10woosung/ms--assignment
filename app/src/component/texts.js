import { useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";


export default function Texts({texts}) {
    const {id} = useParams();
    const n = Number(id);



  return(
  <div>
    <h1>{n}번 글</h1>
    <p>{texts?.[`text${n}`]}</p>

  </div> // 또는 <div>이동 중...</div>
);
}