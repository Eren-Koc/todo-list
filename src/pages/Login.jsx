import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/context';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
const navigate = useNavigate();
const {allUsers,setUser,Register} = useContext(Context);
const [isProgressLogin,setIsProgressLogin] = useState(true);

const Login_OR_Signup=()=>{
isProgressLogin ? LogInFunc() : SignupFunc();
}

const SignupFunc =()=>{
  let USERusername = document.getElementById("username").value;
  let USERpassword = document.getElementById("password").value;
  Register(USERusername,USERpassword).then(result => {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    Swal.fire({
      title: "Registration Success!",
      iconColor:"#1577EA",
      text:"Registration is success. You can login",
      confirmButtonColor:"#1577EA",
      icon: "success"
    });
    setIsProgressLogin(true);

  })
  .catch(error => {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    Swal.fire({
      title: "Registration Failed!",
      iconColor:"#1577EA",
      text:"This username is already taken. Please try something else",
      confirmButtonColor:"#1577EA",
      icon: "warning"
    });
  });
}
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
    <span className='title font-bold text-3xl'>{isProgressLogin ? "Login" : "Sign up"}</span>
    <span className='to-start-planing font-medium my-2'>to start planing</span>
        <input id='username' className='w-full h-4 outline-none rounded-md border-2 border-app-border py-6 px-2 my-3' placeholder='Username' required type="text" />
        <input id='password' className='w-full h-4 outline-none rounded-md border-2 border-app-border py-6 px-2 my-3' placeholder='Password' required type="password" />  
        <input onClick={()=>{Login_OR_Signup()}} className='w-full duration-300 ease-in-out hover:bg-[#4191F0] py-3 outline-none rounded-sm font-semibold text-app-white mt-8 cursor-pointer bg-app-blue' value={isProgressLogin ? "Login" : "Sign up"} type="submit" />
        <span onClick={()=>{setIsProgressLogin(!isProgressLogin)}} className='cursor-pointer text-gray-400 mt-6 m-auto'>{isProgressLogin ? "Are u not a member ? " : "You have an account ? "}<span className='font-semibold'>{isProgressLogin ? "Sign up" : "Login"}</span></span> 
    </div>
  )
}

export default Login