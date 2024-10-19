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
const Home = () => {
const navigate = useNavigate();
const {user,setUser,todos,addTodo,allUsers} = useContext(Context);
const [category,setCategory] = useState("work");
const [addTodoVisible,setAddTodoVisible] = useState(false);
const [userTodos,setUserTodos] = useState([]);
const [listStatus,setListStatus]=useState("default");
//only-completed
//only-notCompleted



const getUserTodos=()=>{
  if (todos && user) {

    setUserTodos([]);
    const array=[];
    
    todos.forEach((eachTodo) => {
      if (user.user_id === eachTodo.user_id) {
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

const AddTodoWorkStyle ={
  backgroundColor:'#1577EA'
}
const AddTodoPersonalStyle ={
  backgroundColor:'#7BB4F8'
}
const AddIconWorkStyle ={
color:"#1577EA",
}
const AddIconPersonalStyle ={
color:"#7BB4F8",
}
const JustifyContentStart ={
  justifyContent:"flex-start",
  }
  const JustifyContentEnd ={
    justifyContent:"flex-end",
    }

  return (
    <div className='todolist sm:max-w-[500px] pb-7 relative max-sm: w-full flex flex-col bg-white p-4 shadow'>
      <div style={category=="work" ? AddIconWorkStyle : AddIconPersonalStyle} id='addTodoIcon' onClick={()=>{setAddTodoVisible(!addTodoVisible)}} className='shadow-2xl absolute z-10 bg-app-white bottom-[-30px] m-auto cursor-pointer plus left-[45%] flex justify-center items-center duration-300 ease-linear w-[48px] h-[48px] rounded-full'><FaCirclePlus className='w-[32px] h-auto'/></div>
      <div style={category=="work" ? AddTodoWorkStyle : AddTodoPersonalStyle} id='addTodoForm' className='z-20 absolute w-full hidden justify-between px-4 items-center flex-row bottom-[-75px] left-0 shadow-xl py-6'>
        <input id='newTodo' autoComplete='off' onKeyDown={handleKeyDown} type="text" className='m-0 px-2 bg-transparent flex-1 text-app-black outline-none' placeholder='Todo' />
        <div  className=' flex justify-center items-center gap-3'>
       <IoMdAdd onClick={()=>{addTodoRequest()}} className='bg-app-white rounded-lg w-[32px] p-1 h-auto cursor-pointer'/>
        <IoMdClose onClick={()=>{setAddTodoVisible(!addTodoVisible)}} className='bg-app-white rounded-lg w-[32px] p-1 h-auto cursor-pointer'/>
        </div>
      </div>
      <div onClick={()=>{LogOut()}} className='fixed p-3 flex justify-center items-center rounded-lg bg-white top-3 left-3 cursor-pointer'><TbLogout2 title='Log Out' size={20}/></div>
      <span className='text-2xl'>Welcome, <b >{user.user_username}</b></span>
      <span className='mt-1 mb-4'>{getDate()}</span>
      <div className='flex flex-col w-full mb-4'>
        <div className='flex w-full'><div id='work' onClick={()=>{SwitchToWork()}}  className='bg-app-blue hover:bg-app-blue/80 duration-200 ease-in-out font-bold text-center cursor-pointer flex-1 p-3'>Work</div>
        <div id='personal' onClick={()=>{SwitchToPersonal()}} className='bg-app-light-blue hover:bg-app-light-blue/80 duration-200 ease-in-out text-center cursor-pointer flex-1 p-3'>Personal</div></div>
        
        
        <div style={category=="work" ? JustifyContentStart : JustifyContentEnd} className='w-full flex items-center'>
        <div className='w-1/2 pt-[6px] px-2 gap-1  flex justify-center items-center'>
        <div onClick={()=>{setListStatus("default")}} style={ category=="work" ?  ( listStatus=="default" ? AddTodoWorkStyle : null ) : listStatus=="default" ? AddTodoPersonalStyle : null} className='w-1/3 cursor-pointer py-1 flex gap-2 justify-center items-center border rounded-lg '><FaRegCircle/> <FaRegCircleCheck/></div>
        <div onClick={()=>{setListStatus("only-completed")}} style={ category=="work" ? ( listStatus=="only-completed" ? AddTodoWorkStyle : null ) : listStatus=="only-completed" ? AddTodoPersonalStyle : null} className='w-1/3 cursor-pointer py-1 flex justify-center items-center border  rounded-lg'><FaRegCircleCheck/></div>

        <div onClick={()=>{setListStatus("only-notCompleted")}} style={ category=="work" ? ( listStatus=="only-notCompleted" ? AddTodoWorkStyle : null ) : listStatus=="only-notCompleted" ? AddTodoPersonalStyle : null} className='w-1/3 cursor-pointer py-1 flex justify-center items-center border  rounded-lg'> <FaRegCircle/></div>
      

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