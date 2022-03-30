import React from "react";
import "./InputField.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  return (
    <form className="input_form" onSubmit={(e) => handleAdd(e)}>
      <input
        type="input"
        placeholder="Enter a task"
        value={todo}
        className="input_box"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input_submit" type="submit">
        ADD
      </button>
    </form>
  );
};

export default InputField;
