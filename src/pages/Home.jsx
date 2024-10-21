import React, { useContext, useEffect, useState } from 'react'
import '../index.css';
import { Context } from '../context/context';
import { Link, useNavigate } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import { IoMdClose, IoMdAdd  } from "react-icons/io";
import Swal from 'sweetalert2';
import { FaCirclePlus   } from "react-icons/fa6";
import Todo from '../components/Todo';
import { FaRegCircle,FaRegCircleCheck   } from "react-icons/fa6";

import { RiMoonFill,RiSunFill } from "react-icons/ri";
const Home = () => {
const navigate = useNavigate();
const {user,setUser,todos,addTodo,allUsers} = useContext(Context);
const [category,setCategory] = useState("work");
const [addTodoVisible,setAddTodoVisible] = useState(false);
const [userTodos,setUserTodos] = useState([]);
const [listStatus,setListStatus]=useState("default");
const [themeToggle,setThemeToogle]=useState("light");


const getUserTodos=()=>{
  if (todos && user) {

    setUserTodos([]);
    const array=[];
    
    todos.forEach((eachTodo) => {
      if (user.user_id == eachTodo.user_id) {
        // Eğer todo zaten varsa eklemeyi atla
        if (!array.some((todo) => todo.id === eachTodo.id)) {
          array.push(eachTodo); // Diziye ekle
        }
      }

      const NewSortedArr = sortTodos(array);
      setUserTodos(NewSortedArr);

    });


  }
}

const sortTodos =(todoList)=>{

  const sortedTodos = todoList.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0); // `createdAt` yoksa en eski tarih atanır
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
    
    return dateB - dateA;
  });

  return sortedTodos;

 
}




useEffect(() => {

  getUserTodos();

}, [todos]);

useEffect(()=>{
let theme = localStorage.getItem("theme");
if(theme && theme=="dark"){
  setThemeToogle("dark")
}
},[])

const toggleTheme = () => {

themeToggle=="light" ? localStorage.setItem("theme","dark") : localStorage.setItem("theme","light");
  setThemeToogle((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  
};

useEffect(() => {
  document.documentElement.setAttribute("data-theme", themeToggle);
}, [themeToggle]);




useEffect(()=>{
const id = localStorage.getItem("user_id");
const password = localStorage.getItem("user_password");
const username = localStorage.getItem("user_username");
  if(id==null){
    navigate('/login');    
   
  }
  else{
    setUser(
      {
       user_id:id,
       user_username:username,
       user_password:password   
      }  )
  }
  },[])

  const getDate=()=>{
    return new Date().toDateString();
}

useEffect(()=>{
document.getElementById("newTodo").value="";
},[addTodoVisible])

const SwitchToPersonal=()=>{
  setCategory("personal");
  document.getElementById("work").classList.remove("font-bold");
  document.getElementById("personal").classList.add("font-bold");
}
const SwitchToWork=()=>{
  setCategory("work");
  document.getElementById("personal").classList.remove("font-bold");
  document.getElementById("work").classList.add("font-bold");
}


const addTodoRequest=()=>{
let newTodo = document.getElementById("newTodo").value;
let replaced = newTodo.split(' ').join('');
if(replaced!="" && replaced!=null)
{
addTodo(user.user_id,category,newTodo);
document.getElementById("newTodo").value="";
setAddTodoVisible(!addTodoVisible);
}
else{
  Swal.fire({
    position: "center",
    icon: "warning",
    iconColor:"#1577EA",
    text: "Todo's title can not be empty.",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar:true
  });
  document.getElementById("newTodo").value="";
}
}

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    addTodoRequest();
  }
};

useEffect(()=>{

  if(addTodoVisible==false){
    document.getElementById("addTodoForm").style.display="none";
    document.getElementById("addTodoIcon").style.display="flex";
  }
  else{
    document.getElementById("addTodoForm").style.display="flex";
    document.getElementById("addTodoIcon").style.display="none";
  }

},[addTodoVisible])

const LogOut =()=>{
  Swal.fire({
    text: "Do you want to logout?",
    icon: "question",
    iconColor:"#1577EA",
    showCancelButton: true,
    confirmButtonColor: "#1577EA",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout!"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      setUser({});
      navigate("/login");
    }
  });    
}

const JustifyContentStart ={
  justifyContent:"flex-start",
  }
  const JustifyContentEnd ={
    justifyContent:"flex-end",
    }

    const addBtn = category === "work" ? "text-app-blue" : "text-app-light-blue";
    const inputBG = category === "work" ? "bg-app-blue" : "bg-app-light-blue";

    const filterStlying=(value)=>{
     return  category=="work" ?  ( listStatus==value ? "bg-app-blue" : null ) : listStatus==value ? "bg-app-light-blue" : null
    }
  return (
    <div   className='todolist   sm:max-w-[500px] pb-7 relative max-sm: w-full flex flex-col bg-app-white p-4 shadow'>
      <div id='addTodoIcon' onClick={()=>{setAddTodoVisible(!addTodoVisible)}} className={`shadow-2xl   absolute z-10 bg-app-white bottom-[-30px] m-auto cursor-pointer plus left-[45%] flex justify-center items-center duration-300 ease-linear w-[48px] h-[48px] rounded-full`}><FaCirclePlus className={`w-[32px] ${addBtn} h-auto`}/></div>
      
      <div id='addTodoForm' className={`z-20 ${inputBG} absolute w-full hidden justify-between px-4 items-center flex-row bottom-[-75px] left-0 shadow-xl py-6`}>
        <input id='newTodo' autoComplete='off' onKeyDown={handleKeyDown} type="text" className='m-0 px-2 bg-transparent flex-1 text-app-black outline-none' placeholder='Todo' />
        <div  className=' flex justify-center text-app-black items-center gap-3'>
       <IoMdAdd onClick={()=>{addTodoRequest()}} className='bg-app-white rounded-lg w-[32px] p-1 h-auto cursor-pointer'/>
        <IoMdClose onClick={()=>{setAddTodoVisible(!addTodoVisible)}} className='bg-app-white rounded-lg w-[32px] p-1 h-auto cursor-pointer'/>
        </div>
      </div>

      <div onClick={()=>{LogOut()}} className='fixed p-3 flex justify-center items-center rounded-lg bg-app-white top-3 left-3 cursor-pointer'><TbLogout2 title='Log Out' className='text-app-black' size={20}/></div>
      <div className='flex w-full justify-between items-center'>
      <div className='flex flex-col w-fit mb-4 '>
      <span className='text-2xl text-app-black'>Welcome, <b >{user.user_username}</b></span>
      <span className='mt-1 text-app-black'>{getDate()}</span>
      </div>
      <div onClick={()=>{toggleTheme();}} className='toggle mr-3 bg-white toogle-shadow w-[60px] justify-between cursor-pointer h-[30px] rounded-2xl flex px-1 py-[2px]'>
        {themeToggle=="light" ? (<RiSunFill className='w-[25px] bg-app-white object-contain rounded-full  py-[2px] px-1 text-app-black float- h-auto'/>): (<div className='flex justify-end w-full'><RiMoonFill className='w-[25px] bg-app-white object-contain rounded-full  py-[2px] px-1 text-app-black float- h-auto' /></div>)}
        
        
      </div>
      </div>

      <div className='flex flex-col text-app-black w-full mb-4'>
        <div className='flex w-full'><div id='work' onClick={()=>{SwitchToWork()}}  className='bg-app-blue hover:bg-app-blue/80 duration-200 ease-in-out font-bold text-center cursor-pointer flex-1 p-3'>Work</div>
        <div id='personal' onClick={()=>{SwitchToPersonal()}} className='bg-app-light-blue hover:bg-app-light-blue/80 duration-200 ease-in-out text-center cursor-pointer flex-1 p-3'>Personal</div></div>
        
        
        <div style={category=="work" ? JustifyContentStart : JustifyContentEnd} className='w-full text-app-black flex items-center'>
        <div className='w-1/2 pt-[6px] px-2 gap-1  flex justify-center items-center'>
        <div onClick={()=>{setListStatus("default")}}  className={`w-1/3 cursor-pointer py-1 ${filterStlying("default")} flex gap-2 justify-center items-center border rounded-lg`}><FaRegCircle/> <FaRegCircleCheck/></div>
        <div onClick={()=>{setListStatus("only-completed")}} className={`w-1/3 cursor-pointer py-1 ${filterStlying("only-completed")} flex gap-2 justify-center items-center border rounded-lg`}><FaRegCircleCheck/></div>

        <div onClick={()=>{setListStatus("only-notCompleted")}} className={`w-1/3 cursor-pointer py-1 ${filterStlying("only-notCompleted")} flex gap-2 justify-center items-center border rounded-lg`}> <FaRegCircle/></div>
      

        </div>
        </div>
      </div>
      <div className='todos-container pr-2 max-h-[55vh] h-fit flex flex-col overflow-hidden overflow-y-auto'>
      {
  listStatus === "default" ? (
    <>
     
      {userTodos.map((todo) => {
        if (todo.category === category && todo.todo_completed === false) {
          return <Todo props={todo} key={todo.id} />;
        }
        return null; 
      })}

   
      {userTodos.map((todo) => {
        if (todo.category === category && todo.todo_completed === true) {
          return <Todo props={todo} key={todo.id} />;
        }
        return null; 
      })}
    </>
  ) : listStatus === "only-completed" ? (
    <>
    
      {userTodos.map((todo) => {
        if (todo.category === category && todo.todo_completed === true) {
          return <Todo props={todo} key={todo.id} />;
        }
        return null; 
      })}
    </>
  ) : (
    <>
     
      {userTodos.map((todo) => {
        if (todo.category === category && todo.todo_completed === false) {
          return <Todo props={todo} key={todo.id} />;
        }
        return null; 
      })}
    </>
  )
}

</div>
    </div>
  )
}

export default Home