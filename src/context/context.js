import React, { createContext, useEffect, useState } from 'react'
import { collection,query,onSnapshot,doc,updateDoc,deleteDoc, QuerySnapshot, addDoc } from 'firebase/firestore';
import { db } from '../firabase';
export const Context =createContext(null);

export const ContextProvider = (props) => {
const [allUsers,setAllUsers] = useState([]);
const [user,setUser] = useState({});
const [todos,setTodos] = useState([]);
  
    useEffect(() => {
        const q = query(collection(db, "users"));
        const unsub = onSnapshot(q, (QuerySnapshot) => {
          let usersArray = QuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
         
          setAllUsers(usersArray);
        });
        return () => unsub();
      }, []);

      useEffect(() => {
        const q = query(collection(db, "todos"));
        const unsub = onSnapshot(q, (QuerySnapshot) => {
          let todosArray = QuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          
          setTodos(todosArray);
        });
        return () => unsub();
      }, [QuerySnapshot]);

    const addTodo =async(userId,categoryName,todoTitle)=>{
        await addDoc(collection(db,"todos"),{
            todo_id:todos.length,
            user_id:userId,
            category:categoryName,
            todo_title:todoTitle,
            todo_completed:false,
            createdAt: new Date(),
        });
    }

    function generateUniqueId() {  
      const uniqueId = Math.floor(Math.random() * 100000) + 1;

      
      if (!isIdUnique(uniqueId)) {
        return generateUniqueId();
      }
      return uniqueId;
    }
    
    function isIdUnique(id) {
      const exists = allUsers.some((user) => user.userid === id);
      return !exists;
    }

    const Register=async(username,password)=>{
      const foundUser = allUsers.find((user) => user.username == username);
      let isRegisterSuccsess=false;
      if(!foundUser){


        const userid=generateUniqueId();

          await addDoc(collection(db,"users"),{
              username:username,
              password:password,
              userid: userid,

          });
          isRegisterSuccsess=true;
      }
      return new Promise((resolve, reject) => {
        if (isRegisterSuccsess) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    }

    const changeTodoStatus = async (todo) => {
      await updateDoc(doc(db,"todos",todo.id), {
        todo_completed:!todo.todo_completed,
        createdAt: new Date(),
      });
      };
    const changeTodoTitle = async (todo,newTitle) => {
      
      await updateDoc(doc(db,"todos",todo.id), {
        todo_title:newTitle,
        createdAt: new Date(),
      });
      };      
    const deleteTodo = async(todo)=>{
        await deleteDoc(doc(db,"todos", todo.id));
    }

    const contextValue={user,setUser,allUsers,todos,setTodos,addTodo,changeTodoStatus,deleteTodo,changeTodoTitle,Register};

    return (
        <Context.Provider value={contextValue}>{props.children}</Context.Provider>
      )
}
    



    

