// console.log(30-"7") // 23

// var a = [1,2,3,4];  // 배열



// var car = {manycar: {many:{ma:0 , ny:1} , 0 : "zero"}};   //람다구조
// console.log(car.manycar.many.ma)




// switch('사과'){        //컴파일러에서 if ,else문보다 속도가 빠름. 단 break 필수
//     case '배':
//         console.log(2)
//         break;
//     case '사과':
//         console.log(1)
//         break;

// }








// try{    //오류가 나는지 실험할 코드
//     throw 11;  //오류를 일부러 방출하는 코드.   
// } catch(e){  #try 에서 오류가 발생할시 실행하는 코드.
//     console.log(e);
// }







//정적 메서드 = static

// class person {
//     constructor(name, age){       //constructor 가 자동으로 호출되는 유일한 메서드
//         this.name = name;    
//     }
// }
// var person1 = new person('john', 23);
// console.log(person1.name);




//메타클래스 엔더한테 개인강의 받기









//var(변수) , const(선언하면 안변함)  , let(블록 범위의 지역변수)

// let a = 1;    //let은 if,for,while 안에서도 변하는 범위가 작게 선언될 수 있음
// if(a = 1){
//     let a = 2;
//     console.log(a);
// }
// console.log(a);











//부모 클래스 , 자식클래스


// class parent {
//     god(){
//         console.log("god");
//     }
// }
// class god_child extends parent{

// }

// var c = new god_child();
// c.god();







//구형 class 문법


// function weather(날씨){
//   this.today = 날씨[0];
//   this.next = 날씨[1];
// }

// var weather = new weather(['맑음','흐림'])
// console.log(weather.today)
// console.log(weather.next)

//이 코드에 함수를 그대로 클래스에 담으면 똑같다


//신형 class 문법

// class weather{
//   constructor(날씨){
//     this.today = 날씨[0];
//     this.next = 날씨[1];
//   }
// }
// const w = new weather(['맑음','흐림'])

// console.log(w.next)





//콜백함수
// app.get("/api/users", async (req, res) => {

//     console.log("aa")     //뭐 값을 받거나 버튼을 누르거나 했을 떄 그 때 시작하는 함수를 콜백함수


//or 다른 예시로


// function first(값){
//     값()
// }
// function second(){

// }
// first(second)

// }

//or 



// function a(callback){
//     const data = 100;
//     callback(data);
// }



// a((x) =>{
//     console.log(x)
// })

//callback 안에 console.log 함수가 들어가게 된거임.





//promise


// const promise = new Promise((resolve,reject) => {    // 앞에 함수는 .then 의 기능을 수행하게 하고 두번째 함수는 reject 의 기능을 수행
//     setTimeout(()=>{
//         const text = prompt("입력")
//         if (text === 'hello'){
//             resolve('1');
//         }
//         else{
//             reject('error')
//         }
//     },2000)
// });


// promise
//     .then((result) =>{
//         console.log('result',result)
//     })
//     .catch((err) => {
//         console.log('result',err)
//     })




//async-await


// function getuser(userid){
//     return new Promise((resolve)=>{
//         setTimeout(()=>{
//             try{
//                 const user = userid === 1 ? {id: userid ,name: 'coding'} : null; //물음표 문법 : 에 따라 if else 구분
//                 resolve(user)
//             }
//             catch(error){
//                 rejects(error)
//             }

//         })

//     });
// }

// a = 0
// async function test(){
//     const user = await 'a'; // 처리될 때까지 함수 실행을 기다리게 만듭니다
// }









// function fetchdata(){
//     return new Promise((resolve) =>{
//         setTimeout(() => resolve("data"),1000);
//     });
// }

// function processdata(){
//     return new Promise((resolve) => {
//         setTimeout(()=> resolve(`${data} processed`),1000);
        
//     });
// }

// fetchdata()
//     .then((data) => processdata(data))          // 특정 값에 따라서 다른 프로미스가 필요하기 때문에 함수를 쓴다.
    





//Proxy

// const o = { foo: "bar" , boo:"far"};
// const p = new Proxy(o , {
//   get(target , prop){   // o 통째로 target 에 들어가고 prop에는 p.foo 라고 한다면 foo 가 들어간다.
//     if(prop in target){
//       return target[prop]
//     }
//     throw new Error("존재X")
//   }
// })
// console.log(p.foo);




// // 대상 객체(Real Subject)
// let target = { name: "coding", age: 17 };

// // target의 동작을 가로채는 핸들러
// let handler = {
//   get(target, prop) {
//     console.log("get:", prop);
//     return target[prop];
//   },
//   set(target, prop, value) {
//     console.log("set:", prop, "=", value);
//     target[prop] = value;
//     return true;
//   },
// };

// // 프록시 생성
// const proxy = new Proxy(target, handler);

// console.log(proxy.name);   // get: name -> "coding"
// proxy.age = 20;            // set: age = 20




//창을 이동시키려면 두가지 명령어가 있음 navigate , link