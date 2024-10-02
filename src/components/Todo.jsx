import React, { useContext, useEffect, useState } from 'react'
import { FaRegCircle,FaRegCircleCheck   } from "react-icons/fa6";
import { Context } from '../context/context';
import { IoMdClose  } from "react-icons/io";
import { BiSolidEditAlt } from "react-icons/bi";
import Swal from 'sweetalert2';
import { FaChevronDown,FaChevronUp  } from "react-icons/fa";
const Todo = ({props}) => {
  const {changeTodoStatus,deleteTodo,changeTodoTitle} = useContext(Context);
  const [todoTitle, setTodoTitle] = useState(props.todo_title);
  const [showAll,setShowAll] = useState(false);

  const [urlData, setUrlData] = useState([]);


  useEffect(() => {
    UrlDetection();
  }, []);

  const UrlDetection=()=>{

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const foundUrls = todoTitle.match(urlRegex);
    if (foundUrls) {
      const urlObjects = foundUrls.map((url) => {

        const urlName = url
        .replace(/(^\w+:|^)\/\//, '') 
        .replace(/\/.*$/, '')         
        .replace(/^www\./, '')        
        .replace(/\.[a-z]{2,3}$/, ''); 
        
        return {
          url,      
          urlName   
        };
      });
      
      setUrlData(urlObjects); 
    }

      const cleanedText = todoTitle.replace(urlRegex, '');
      setTodoTitle(cleanedText.trim()); 

  }

  const removeNavigation=(value)=>{

    const updateData = urlData.filter((eachurl) => eachurl.url !== value);
    setUrlData(updateData);
    const urls = updateData.map(data => data.url).join(' ');
    const lastTitle = todoTitle +" "+ urls;
    changeTodoTitle(props,lastTitle);


  }
 
 
  const handleChange = (event) => {
    setTodoTitle(event.target.value);
  };
  const handleBlur = () => {

    let lastTitle;

    if (urlData) {
      const urls = urlData.map(data => data.url).join(' ');
        lastTitle = todoTitle +" "+ urls;
      changeTodoTitle(props,lastTitle);
      UrlDetection();
    } else {
 
      changeTodoTitle(props,todoTitle);
    }

  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      let lastTitle;

      if (urlData) {
        const urls = urlData.map(data => data.url).join(' ');
        lastTitle = todoTitle +" "+ urls;
        
        changeTodoTitle(props,lastTitle);
        UrlDetection();
      } else {
   
        changeTodoTitle(props,todoTitle);
      }
      event.target.blur();
    }
  };


    const WorkBorderStyle ={
        borderColor:"#1577EA",
      }
    const PersonalBorderStyle ={
        borderColor:'#7BB4F8',
    }
    const WorkCompeletedStyle ={
        backgroundColor:'#1577EA',
        textDecoration:"line-through",
    }
    const PersonalCompeletedStyle ={
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
    <>
    <div className='flex flex-col '>
    <div style={props.todo_completed ? props.category=="work" ? WorkCompeletedStyle : PersonalCompeletedStyle : DefaultStyle } className='todo my-1 py-3 duration-500 ease-in-out px-2 w-full justify-between border-y border-app-border items-center flex'>
        <textarea type="text" value={todoTitle} onKeyDown={handleKeyDown} rows={showAll ? todoTitle.length/35 > 1 ? todoTitle.length/35 : 1 : 1} onBlur={handleBlur} onChange={handleChange} className='resize-none form-sizi overflow-hidden min-h-fit outline-none bg-transparent flex-1' />       
    <span className='flex justify-center items-center flex-row ml-2 gap-2'>
    {todoTitle.length>34 || urlData.length>0 ?
     
     showAll ? <FaChevronUp  className='cursor-pointer' onClick={()=>{setShowAll(false)}}/>  : <FaChevronDown  className='cursor-pointer' onClick={()=>{setShowAll(true)}}/>

     
     : null} 

    {props.todo_completed ? <FaRegCircleCheck onClick={()=>{changeTodoStatus(props)}} className='cursor-pointer'/> 
    : <FaRegCircle onClick={()=>{changeTodoStatus(props)}} className='cursor-pointer'/>}
    
    <IoMdClose onClick={()=>{deleteTodoConfirm(props)}} className='w-[22px] h-auto cursor-pointer'/>
     
    </span>
  </div>
  {showAll && urlData.length>0 ? (

    <div className='w-full flex flex-wrap mt-1 mb-2 h-fit text-[13px] gap-3'>
      {urlData.map((eachData,i)=>{
        return (
        <div key={"navigator-"+props.todo_id+i}  className='flex gap-1 h-fit justify-center items-center'>
        <IoMdClose onClick={()=>{removeNavigation(eachData.url)}} className='cursor-pointer hover:text-blue-600'/>
        <a  target='_blank' style={ props.category=="work" ? WorkBorderStyle : PersonalBorderStyle } className="border-[1px]  px-2 py-1 rounded-md" href={eachData.url}>{eachData.urlName}</a>
        </div>
        ) 
      })}
      <div className=''></div>
    </div>
  ) : null}
  </div>
  </>
  
  )
  
}

export default Todo