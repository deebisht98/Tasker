import { Todo } from './../components/model/model';
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const SET_TODOS = "SET_TODOS";
export const SET_COMPLETED_TODOS = "SET_COMPLETED_TODOS";
export const FINISH_TODO = "FINISH_TODO";

export type ActionTypes = 
| {type: typeof SET_TODOS; payload:Todo[]}
| {type: typeof SET_COMPLETED_TODOS; payload:Todo[]}
| {type: typeof ADD_TODO; payload:string}
| {type: typeof DELETE_TODO; payload:number}
| {type: typeof UPDATE_TODO; payload:{
    id:number,
    text:string
}}
| {type: typeof TOGGLE_TODO; payload:number}
| {type: typeof FINISH_TODO; payload:{
    id:number,
    text:string
}}

export const addTodo = (text:string):ActionTypes => ({type:ADD_TODO, payload:text}); 
export const deleteTodo = (id:number):ActionTypes => ({type:DELETE_TODO, payload:id}); 
export const updateTodo = (id: number, text: string):ActionTypes => ({type:UPDATE_TODO, payload: {
    id,
    text,
  },}); 
export const toggleTodo = (id:number):ActionTypes => ({type:TOGGLE_TODO, payload:id}); 
export const setTodos = (todos:Todo[]):ActionTypes => ({type:SET_TODOS, payload:todos}); 
export const setCompletedTodos = (todos:Todo[]):ActionTypes => ({type:SET_COMPLETED_TODOS, payload:todos}); 
export const finishTodo = (id: number, text: string):ActionTypes => ({type:FINISH_TODO, payload:{
    id,
    text,
},}); 