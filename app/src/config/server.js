// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import cors from "cors";

// import { getDatabase,ref,set,get,onValue} from "firebase/database"; 
// //db 가져오는게 getdatabase , ref는 포인터 경로를 알려주겠고 , get은 읽기
// import express from "express";

// const app =express();
// app.use(cors());

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCbJE2C96JTtzcgHoPGOV_3uUtlkhzl8OU",
//   authDomain: "appp-4c807.firebaseapp.com",
//   databaseURL: "https://appp-4c807-default-rtdb.firebaseio.com",
//   projectId: "appp-4c807",
//   storageBucket: "appp-4c807.firebasestorage.app",
//   messagingSenderId: "404879124528",
//   appId: "1:404879124528:web:bb6603193264c91fdde5f5",
//   measurementId: "G-V479NCQS9N"
// };


// // Initialize Firebase
// const firebaseapp = initializeApp(firebaseConfig);
// const db = getDatabase(firebaseapp)

// async function writeExample(){
//     const userRef = ref(db , "users/user1");

//     await set(userRef,{name:"우성" ,age:18 , role: "developer"});
//     console.log("데이터 저장완")
// }




// async function readExample() {
//     const userRef = ref(db, "users/user1");
  
//     const snapshot = await get(userRef);
//     if (snapshot.exists()) {
//       console.log("가져온 데이터:", snapshot.val());
//     } else {
//       console.log("데이터가 없습니다.");
//     }
//   }
  
//   // 5) 실제 실행 흐름
//   (async () => {
//     try {
//       await writeExample();   // 먼저 써보고
//       await readExample();    // 그 다음 읽어오기
//     } catch (err) {
//       console.error("에러 발생:", err);
//     } finally {
//       // 작업 끝나면 프로세스 종료 (테스트용)
//       process.exit(0);
//     }
//   })();






import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get ,set ,update } from "firebase/database";
import session from "express-session";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const JWT_SECRET = process.env.JWT_SECRET || "DEV_ONLY_CHANGE_ME";

//db 가져오는게 getdatabase , ref는 포인터 경로를 알려주겠고 , get은 읽기

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // ← 너 리액트 주소로 바꿔 (예: http://localhost:5173)
  credentials: true
}));
app.use(express.json());  //이건 왜 있는걸까

app.use(session({
  name: "sid",              // 쿠키 이름(원하면 변경)
  secret: "CHANGE_THIS_SECRET", // .env로 빼는 게 좋음
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,         // JS에서 쿠키 접근 불가 (보안 좋음)
    sameSite: "lax",         // 로컬 개발에 적합
    secure: false,           // https면 true
    maxAge: 1000 * 60 * 60 * 24 // 1일
  }
}));


app.use(cookieParser());



// 1) Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyCbJE2C96JTtzcgHoPGOV_3uUtlkhzl8OU",
  authDomain: "appp-4c807.firebaseapp.com",
  databaseURL: "https://appp-4c807-default-rtdb.firebaseio.com",
  projectId: "appp-4c807",
  storageBucket: "appp-4c807.firebasestorage.app",
  messagingSenderId: "404879124528",
  appId: "1:404879124528:web:bb6603193264c91fdde5f5",
  measurementId: "G-V479NCQS9N",
};

// 2) Firebase & DB 연결
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

// 3) 라우트(API) 만들기
// GET /api/users 로 들어오면 Firebase에서 데이터 읽어서 JSON으로 응답
app.get("/api/users", async (req, res) => {
  try {
    const snapshot = await get(ref(db, "users"));
    const users = snapshot.exists() ? snapshot.val() : {};
    return res.json(users);
  } catch (err) {
    console.error("서버 에러:", err);
    return res.status(500).json({ error: "서버 에러" });
  }
});

app.get("/api/texts", async (req, res) => {
  try {
    const usersRef = ref(db, "texts");
    const snapshot = await get(usersRef);
    

    if (!snapshot.exists()) {
      return res.json({});
    }

    const texts = snapshot.val();
    const text1 = texts.text1;
    return res.json(texts);


  } catch (err) {
    console.error("서버 에러:", err);
    return res.status(500).json({ error: "서버 에러" });
  }
});




app.post("/api/write",async(req,res)=>{
  try{
    const {title,content} = req.body;
    const baseRef = ref(db,"texts");
    const snap = await get(ref(db,"texts/cnt"));
    const cnt = snap.exists() ? snap.val() : 0;
    const next = cnt+1;
    
    await update(baseRef,{
      cnt: next,[`title${next}`]:title,[`text${next}`]:content,
    }) ;
    return res.status(201).json({ ok: true, id: next });
  }
  catch(e){}

});


app.post("/api/login", async (req, res) => {
  try {



    const {ID,password} = req.body;
    const usersRef = ref(db, "users");
    const snapshot = await get(usersRef);
    

    if (!snapshot.exists()) {
      return res.json({});
    }

    const users = snapshot.val();
    const cnt = users.cnt;

    let foundUser = null;

    for(let i = 0; i<cnt;i++){
      if(ID == users[`user${i}`].ID && String(password) == users[`user${i}`].password){

        
        
        foundUser = users[`user${i}`];
        break;
        
      }
    }
    
    if (!foundUser){
      return res.status(401).json({ ok: false, error: "아이디/비번 불일치" });
    }
    const token = jwt.sign(
      { id: foundUser.ID },   // 필요하면 role 같은 것도 추가 가능
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // https면 true
      maxAge: 1000 * 60 * 60 * 24, // 1일
    });
    return res.json({ ok: true });


  } catch (err) {
    console.error("서버 에러:", err);
    return res.status(500).json({ error: "서버 에러" });
  }
});




app.post("/api/logout", (req, res) => {
  res.clearCookie("access_token");
  return res.json({ ok: true });
});




// 4) 서버 시작
const PORT = 4000; 
app.listen(PORT, () => {
  console.log(`Node API 서버가 http://localhost:${PORT} 에서 실행 중`);
});