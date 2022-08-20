import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoStr = localStorage.getItem("Reactodos");
    if (todoStr === null) setTodoInput([]);
    else setTodos(JSON.parse(todoStr));
  }, []);

  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    saveTodos();
  }, [todos]);

  const onkeyupHandler = (event) => {
    if (event.key !== "Enter") return;

    if (todoInput == "") {
      alert("Todo cannot be empty");
      setTodoInput("");
    } else {
      event.preventDefault();
      const newTodos = [{ title: todoInput, completed: false }, ...todos];
      setTodos(newTodos);
      setTodoInput("");
      saveTodos();
    }
  };

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    const newTodo = [...todos];
    setTodos(newTodo);
    saveTodos();
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed;
    setTodos([...todos]);
    saveTodos();
  };

  const moveUp = (idx) => {
    if (idx != 0) {
      const temp = todos[idx];
      todos[idx] = todos[idx - 1];
      todos[idx - 1] = temp;
      setTodos([...todos]);
      setTodos;
    }
  };

  const moveDown = (idx) => {
    if (idx != todos.length - 1) {
      const temp = todos[idx];
      todos[idx] = todos[idx + 1];
      todos[idx + 1] = temp;
      setTodos([...todos]);
      setTodos;
    }
  };

  const saveTodos = () => {
    const todoStr = JSON.stringify(todos);
    localStorage.setItem("reactTodos", todoStr);
  };

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          value={todoInput}
          onChange={(event) => {
            setTodoInput(event.target.value);
          }}
          onKeyUp={onkeyupHandler}
        />
        {/* Todos */}
        <ul>
          {todos.map((todo, i) => (
            <Todo
              key={i}
              title={todo.title}
              completed={todo.completed}
              onDelete={() => deleteTodo(i)}
              onMark={() => markTodo(i)}
              moveUp={() => moveUp(i)}
              moveDown={() => moveDown(i)}
            />
          ))}
        </ul>

        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">
            Pending ({todos.filter((x) => x.completed == false).length}){" "}
          </span>
          <span className="text-success">
            Completed ({todos.filter((x) => x.completed == true).length})
          </span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Peera Aronrat 630612184
        </p>
      </div>
    </div>
  );
}