import { createStore} from "redux";
import { Todo } from '../components/model/model';
import {Store} from "./types";  
import {
  ActionTypes,
  SET_TODOS,
  SET_COMPLETED_TODOS,
  DELETE_TODO,
  UPDATE_TODO,
  TOGGLE_TODO,
  ADD_TODO,
  FINISH_TODO
} from "./actions";

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    todo: todo.id === id ? text : todo.todo,
  }));

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    isDone: todo.id === id ? !todo.isDone : todo.isDone,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Date.now(),
    todo:text,
    isDone: false,
  },
];

const finishTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Date.now(),
    todo:text,
    isDone: true,
  },
];
// Redux implementation
function todoReducer(
  state: Store = {
    todos: [],
    completedTodos: [],
  },
  action: ActionTypes
) {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
      case SET_COMPLETED_TODOS:
      return {
        ...state,
        completedTodos : action.payload,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: updateTodo(state.todos, action.payload.id, action.payload.text),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: toggleTodo(state.todos, action.payload),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: removeTodo(state.todos, action.payload),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: addTodo(state.todos, action.payload),
      };
      case FINISH_TODO:
      return {
        ...state,
        todos: removeTodo(state.todos, action.payload.id),
        completedTodos: finishTodo(state.completedTodos, action.payload.text),
      };
    default:
      return state;
  }
}


const store= createStore(todoReducer);
export default store;
