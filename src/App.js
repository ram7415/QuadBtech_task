import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

function App() {
  const [todo, setTodo] = useState([
    { task: "sample", id: uuidv4(), isDone: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);

  //here we use this function for adding new task
  const addTodo = () => {
    setTodo([...todo, { task: newTodo, id: uuidv4(), isDone: false }]);
    setNewTodo("");
  };

  //for updating value
  const updateTodo = (e) => {
    setNewTodo(e.target.value);
  };

  //function for delete todo
  const deleteTodo = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  //after editing saving todo

  const saveTodo = (id) => {
    const updatedTodos = todo.map((item) => {
      if (item.id === id) {
        return { ...item, task: newTodo };
      }
      return item;
    });
    setTodo(updatedTodos);
    setEditingTodoId(null);
    setNewTodo("");
  };

  const editTodo = (id) => {
    const todoToEdit = todo.find((item) => item.id === id);
    setEditingTodoId(id);
    setNewTodo(todoToEdit.task);
  };

  // those task which is completed
  const markAsDone = (id) => {
    setTodo(
      todo.map((item) => {
        if (item.id === id) {
          return { ...item, isDone: true };
        }
        return item;
      })
    );
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      <input type="text" id="todoInput" value={newTodo} onChange={updateTodo} />
      <Button variant="contained" color="primary" onClick={addTodo}>
        Add Todo
      </Button>

      {todo.map((item) => (
        <div key={item.id}>
          <span
            style={item.isDone ? { textDecorationLine: "line-through" } : {}}
          >
            {editingTodoId === item.id ? (
              <input type="text" value={newTodo} onChange={updateTodo} />
            ) : (
              item.task
            )}
          </span>
          &nbsp;
          {item.isDone ? (
            <span> 🥳🥳</span>
          ) : editingTodoId === item.id ? (
            <Button
              variant="contained"
              size="small"
              onClick={() => saveTodo(item.id)}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={() => editTodo(item.id)}
            >
              Edit
            </Button>
          )}
          &nbsp;
          <IconButton aria-label="delete" onClick={() => deleteTodo(item.id)}>
            <DeleteIcon />
          </IconButton>
          <button onClick={() => markAsDone(item.id)}>Mark as Done</button>
        </div>
      ))}
    </div>
  );
}

export default App;
