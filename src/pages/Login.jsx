import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/context';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
const navigate = useNavigate();
const {allUsers,setUser} = useContext(Context);



const LogInFunc =()=>{
let USERusername = document.getElementById("username").value;
let USERpassword = document.getElementById("password").value;
let logincontrol =false;
    for(let i=0;i<allUsers.length;i++){

        if(allUsers[i].username == USERusername && allUsers[i].password == USERpassword){
         logincontrol=true;
            setUser(
            {
             user_id:allUsers[i].userid,
             user_username:allUsers[i].username,
             user_password:allUsers[i].password   
            }     
         );
        localStorage.setItem("user_id", allUsers[i].userid);
        localStorage.setItem("user_username", allUsers[i].username);
        localStorage.setItem("user_password", allUsers[i].password);
         navigate('/');
        }}

    if(logincontrol==false){
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    Swal.fire({
      title: "Login Failed!",
      iconColor:"#1577EA",
      text:"Username or password is wrong.",
      confirmButtonColor:"#1577EA",
      icon: "warning"
    });
    }
    
   
}

  return (
    <div className='login sm:w-[450px] max-sm:w-[95%] h-fit bg-app-white rounded-xl shadow p-6 flex flex-col'>
    <span className='title font-bold text-3xl'>Login</span>
    <span className='to-start-planing font-medium my-2'>to start planing</span>
        <input id='username' className='w-full h-4 outline-none rounded-md border-2 border-app-border py-6 px-2 my-3' placeholder='Username' required type="text" />
        <input id='password' className='w-full h-4 outline-none rounded-md border-2 border-app-border py-6 px-2 my-3' placeholder='Password' required type="password" />  
        <input onClick={()=>{LogInFunc()}} className='w-full duration-300 ease-in-out hover:bg-[#4191F0] py-3 outline-none rounded-sm font-semibold text-app-white mt-8 cursor-pointer bg-app-blue' value="Login" type="submit" /> 
    </div>
  )
}

export default Login