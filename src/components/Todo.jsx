import React, { useContext } from 'react'
import { FaRegCircle,FaRegCircleCheck   } from "react-icons/fa6";
import { Context } from '../context/context';
import { IoMdClose  } from "react-icons/io";
import { BiSolidEditAlt } from "react-icons/bi";
const Todo = ({props}) => {
    
    const WorkCompeletedStyle ={
        backgroundColor:'#1577EA',
        textDecoration:"line-through",
    }
    const PersonalCompeletedStyle ={
        backgroundColor:'#50E3A4',
        textDecoration:"line-through",
    }
    const DefaultStyle ={
        backgroundColor:'#FFF',
    }
    

    const {changeTodoStatus,deleteTodo} = useContext(Context);
  return (
    <div style={props.todo_completed ? props.category=="work" ? WorkCompeletedStyle : PersonalCompeletedStyle : DefaultStyle } className='my-1 py-3 px-2 w-full justify-between border-y border-app-border items-center flex'>
    <span className='flex justify-center items-center gap-2'>
       <span>{props.todo_title}</span>
        
        </span>
    <span className='flex justify-center items-center flex-row gap-2'>
    {props.todo_completed ? <FaRegCircleCheck onClick={()=>{changeTodoStatus(props.todo_id)}} className='cursor-pointer'/> 
    : <FaRegCircle onClick={()=>{changeTodoStatus(props.todo_id)}} className='cursor-pointer'/>}
    <IoMdClose onClick={()=>{deleteTodo(props.todo_id)}} className='w-[22px] h-auto cursor-pointer'/>
    </span>
  </div>
  
  )

{/* <div className='my-1 py-3 px-2 w-full justify-between border-y bg-app-blue border-app-border items-center flex'>
<span className='italic line-through'>Görevlerini tamamla</span>

</div> */}
  
}

export default Todo