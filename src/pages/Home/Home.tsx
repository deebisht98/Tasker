import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import "./Home.css";
// import { Todo } from "../../components/model/model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TodoList from "../../components/TodoList/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "../../store/types";
import { setTodos, setCompletedTodos, addTodo } from "../../store/actions";

const Home: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const todos = useSelector((state: Store) => state.todos);
  const completedTodos = useSelector((state: Store) => state.completedTodos);
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === "activeTodos") {
      add = active[source.index];
      add.isDone = true;
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      add.isDone = false;
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "activeTodos") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    // setCompletedTodos(complete);
    // setTodos(active);

    dispatch(setCompletedTodos(complete));
    dispatch(setTodos(active));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch(addTodo(todo));
      // setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Tasker</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} completedTodos={completedTodos} />
        <footer>
          <p> Hold and Drop to finish or reassign tasks...</p>
          <p>Made with 💛 by Dheeraj Bisht.</p>
        </footer>
      </div>
    </DragDropContext>
  );
};

export default Home;
