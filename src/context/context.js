import React, { createContext, useEffect, useState } from 'react'
import { allUsers } from '../data/allUsers';


export const Context =createContext(null);

export const ContextProvider = (props) => {
    const [user,setUser] = useState({});
    const [todos,setTodos] = useState([]);


useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
},[])
useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
 }, [todos]); // Her 'todos' değiştiğinde çalışır

    const addTodo=(userId,categoryName,todoTitle)=>{
        const newTodo ={
            todo_id:todos.length,
            user_id:userId,
            category:categoryName,
            todo_title:todoTitle,
            todo_completed:false
        }
        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
    }
    const deleteTodo=(todoId)=>{
        const updatedTodos = todos.filter(todo =>
            todo.todo_id !== todoId
          );
          setTodos(updatedTodos);
    }
    const changeTodoStatus=(todoId)=>{
        const updatedTodos = todos.map(todo =>
            todo.todo_id === todoId ? { ...todo, todo_completed: !todo.todo_completed } : todo
          );
          setTodos(updatedTodos);
    }

    const contextValue={user,setUser,allUsers,todos,setTodos,addTodo,deleteTodo,changeTodoStatus};

    return (
        <Context.Provider value={contextValue}>{props.children}</Context.Provider>
      )

}