import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model/model";
import { MdEdit, MdDelete, MdDone, MdOpenInBrowser } from "react-icons/md";
import "./Card.css";
import { Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo, toggleTodo } from "../../store/actions";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  // setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const Card: React.FC<Props> = ({
  index,
  todo,
  todos,
  // setTodos
}) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [editedTodo, setEditedTodo] = useState<string>(todo.todo);
  const editRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (editedTodo) {
      // setTodos(
      //   todos.map((item) =>
      //     item.id === id ? { ...item, todo: editedTodo } : item
      //   )
      // );
      dispatch(updateTodo(id, editedTodo));
      setShowEdit(false);
    }
  };
  const handleEdit = () => {
    if (!showEdit && !todo.isDone) {
      setShowEdit(true);
    }
  };
  const handleDelete = (id: number) => {
    // setTodos(todos.filter((item) => item.id !== id));
    dispatch(deleteTodo(id));
  };
  const handleDone = (id: number) => {
    // setTodos(
    //   todos.map((item) =>
    //     item.id === id ? { ...item, isDone: !item.isDone } : item
    //   )
    // );
    dispatch(toggleTodo(id));
  };
  useEffect(() => {
    editRef.current?.focus();
  }, [showEdit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todo_card ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleSubmit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className="todo_info">
            {showEdit ? (
              <input
                ref={editRef}
                type="text"
                className="card_input"
                value={editedTodo}
                onChange={(e) => setEditedTodo(e.target.value)}
              />
            ) : todo.isDone ? (
              <p className="done">{todo.todo}</p>
            ) : (
              <p>{todo.todo}</p>
            )}
          </div>
          <div className="icons_wrapper">
            <MdOpenInBrowser
              onClick={() => {
                if (!todo.isDone) {
                  navigate(`/todo/${todo.id}`, { state: { data: todo } });
                } else {
                  alert("Completed tasks cannot be opened in pomodoro mode.");
                }
              }}
              // onMouseOver={() => alert(1)}
              className="icons"
              title="OPEN THIS TASK IN POMODORO MODE"
            />
            <MdEdit onClick={handleEdit} className="icons" />
            <MdDelete onClick={() => handleDelete(todo.id)} className="icons" />
            <MdDone onClick={() => handleDone(todo.id)} className="icons" />
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default Card;
