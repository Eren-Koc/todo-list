import React, { useContext, useEffect, useState } from 'react'
import '../index.css';
import { Context } from '../context/context';
import { Link, useNavigate } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import { IoMdClose, IoMdAdd  } from "react-icons/io";

import { FaCirclePlus   } from "react-icons/fa6";
import Todo from '../components/Todo';
const Home = () => {
const navigate = useNavigate();
  const {user,setUser,todos,addTodo} = useContext(Context);
  const [category,setCategory] = useState("work");
  const [addTodoVisible,setAddTodoVisible] = useState(false);


  useEffect(()=>{
    const id = localStorage.getItem("user_id");
    const username = localStorage.getItem("user_username");
    const password = localStorage.getItem("user_userpassword");
  
  if(id!=null){
    setUser(
      {
       user_id:id,
       user_username:username,
       user_password:password   
      }     
   );
  }
  else{
    navigate('/login');
  }
  
  },[])

  const getDate=()=>{
    return new Date().toDateString();
}
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
if(newTodo!="" && newTodo!=null)
{
addTodo(user.user_id,category,newTodo);
}
else{
  alert("Todo name is empty");
}

}

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
   localStorage.removeItem("user_id");
   localStorage.removeItem("user_password");
   localStorage.removeItem("user_username");
   navigate("/login");
}


const AddTodoWorkStyle ={
  backgroundColor:'#1577EA'
  
}

const AddTodoPersonalStyle ={
  backgroundColor:'#50E3A4'
}



  return (
    <div className='sm:max-w-[500px] pb-7 relative max-sm: w-full flex flex-col bg-white p-4 shadow'>
      <div id='addTodoIcon' onClick={()=>{setAddTodoVisible(!addTodoVisible)}} className='absolute z-10 bottom-[-30px] m-auto cursor-pointer left-[45%] flex justify-center items-center w-[48px] h-[48px] bg-app-black text-app-white rounded-full'><FaCirclePlus className='w-[32px] h-auto'/></div>
      <div style={category=="work" ? AddTodoWorkStyle : AddTodoPersonalStyle} id='addTodoForm' className='z-20 absolute w-full hidden justify-between px-4 items-center flex-row bottom-[-75px] left-0 shadow-xl py-6'>
        <input style={category=="work" ? AddTodoWorkStyle : AddTodoPersonalStyle} id='newTodo' type="text" className='m-0 px-2 flex-1 text-app-white outline-none' placeholder='Todo' />
        <div  className=' flex justify-center items-center gap-3'>
       <IoMdAdd onClick={()=>{addTodoRequest()}} className='bg-app-white rounded-lg w-[32px] p-1 h-auto cursor-pointer'/>
        <IoMdClose onClick={()=>{setAddTodoVisible(!addTodoVisible)}} className='bg-app-white rounded-lg w-[32px] p-1 h-auto cursor-pointer'/>
        </div>
      </div>
      <div onClick={()=>{LogOut()}} className='fixed p-3 flex justify-center items-center rounded-lg bg-white top-3 left-3 cursor-pointer'><TbLogout2 title='Log Out' size={20}/></div>
      <span className='text-2xl'>Welcome, <b >{user.user_username}</b></span>
      <span className='mt-1 mb-4'>{getDate()}</span>
      <div className='flex w-full mb-4'>
        <div id='work' onClick={()=>{SwitchToWork()}}  className='bg-app-blue font-bold text-center cursor-pointer flex-1 p-3'>Work</div>
        <div id='personal' onClick={()=>{SwitchToPersonal()}} className='bg-app-green text-center cursor-pointer flex-1 p-3'>Personal</div>
      </div>

      {todos.map((todo)=>{
        if(todo.category==category && user.user_id==todo.user_id)
        return <Todo props={todo} key={todo.todo_id}/>
      })}
      

    
    </div>
  )
}

export default Home