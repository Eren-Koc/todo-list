import React, { useContext, useEffect, useState } from 'react'
import { FaRegCircle,FaRegCircleCheck   } from "react-icons/fa6";
import { Context } from '../context/context';
import { IoMdClose  } from "react-icons/io";
import { BiSolidEditAlt } from "react-icons/bi";
import Swal from 'sweetalert2';

const Todo = ({props}) => {
  const {changeTodoStatus,deleteTodo,changeTodoTitle} = useContext(Context);
  const [todoTitle, setTodoTitle] = useState(props.todo_title);


  useEffect(()=>{
   

  },[])

  const handleChange = (event) => {
    setTodoTitle(event.target.value);
  };
  const handleBlur = () => {
    changeTodoTitle(props,todoTitle);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      changeTodoTitle(props,todoTitle);
      event.target.blur();
    }
  };

    const WorkCompeletedStyle ={
        backgroundColor:'#1577EA',
        textDecoration:"line-through",
    }
    const PersonalCompeletedStyle ={
        // backgroundColor:'#50E3A4',
        backgroundColor:'#7BB4F8',
        textDecoration:"line-through",
    }
    const DefaultStyle ={
        backgroundColor:'#FFF',
    }
    
  const deleteTodoConfirm=(todo)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        iconColor:"#1577EA",
        showCancelButton: true,
        confirmButtonColor: "#1577EA",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          deleteTodo(todo);
        }
      });
      
    }

    
  return (
    <div style={props.todo_completed ? props.category=="work" ? WorkCompeletedStyle : PersonalCompeletedStyle : DefaultStyle } className='todo my-1 py-3 duration-500 ease-in-out px-2 w-full justify-between border-y border-app-border items-center flex'>
        <input type="text" value={todoTitle} onKeyDown={handleKeyDown} onBlur={handleBlur} onChange={handleChange} className='outline-none bg-transparent flex-1' />       
    <span className='flex justify-center items-center flex-row ml-2 gap-2'>
    {props.todo_completed ? <FaRegCircleCheck onClick={()=>{changeTodoStatus(props)}} className='cursor-pointer'/> 
    : <FaRegCircle onClick={()=>{changeTodoStatus(props)}} className='cursor-pointer'/>}
    <IoMdClose onClick={()=>{deleteTodoConfirm(props)}} className='w-[22px] h-auto cursor-pointer'/>
    </span>
  </div>
  
  )
  
}

export default Todo