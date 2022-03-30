import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";
import { Todo } from "../model/model";
import "./TodoList.css";

interface Props {
  todos: Todo[];
  // setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  // setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  // setTodos,
  completedTodos,
  // setCompletedTodos,
}) => {
  return (
    <div className="todo_list_wrapper">
      <div className="headers">
        <p className="header">Active Tasks</p>
        <p className="header">Completed Tasks</p>
      </div>
      <div className="todos_container">
        <Droppable droppableId="activeTodos">
          {(provided, snapshot) => (
            <div
              className={`todos active ${
                snapshot.isDraggingOver ? "dragactive" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todos.length > 0 ? (
                todos.map((todo_item, index) => (
                  <Card
                    index={index}
                    key={todo_item.id}
                    todo={todo_item}
                    todos={todos}
                    // setTodos={setTodos}
                  />
                ))
              ) : (
                <p style={{ textAlign: "center" }}>
                  Add some tasks to brush up your skills...
                </p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="completed">
          {(provided, snapshot) => (
            <div
              className={`completed todos ${
                snapshot.isDraggingOver ? "dragcompleted" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {completedTodos.length > 0 ? (
                completedTodos.map((todo_item, index) => (
                  <Card
                    index={index}
                    key={todo_item.id}
                    todo={todo_item}
                    todos={completedTodos}
                    // setTodos={setCompletedTodos}
                  />
                ))
              ) : (
                <p style={{ textAlign: "center" }}>
                  Be productive by completing some tasks...
                </p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TodoList;
