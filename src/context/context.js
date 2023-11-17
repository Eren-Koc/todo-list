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
          console.log("usersARRAY",usersArray);
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
          console.log("todosArray",todosArray);
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
        });
    }

    const changeTodoStatus = async (todo) => {
      await updateDoc(doc(db,"todos",todo.id), {todo_completed:!todo.todo_completed});
      };
    const changeTodoTitle = async (todo,newTitle) => {
      await updateDoc(doc(db,"todos",todo.id), {todo_title:newTitle});
      };      
    const deleteTodo = async(todo)=>{
        await deleteDoc(doc(db,"todos", todo.id));
    }

    const contextValue={user,setUser,allUsers,todos,setTodos,addTodo,changeTodoStatus,deleteTodo,changeTodoTitle};

    return (
        <Context.Provider value={contextValue}>{props.children}</Context.Provider>
      )
}
    



    

