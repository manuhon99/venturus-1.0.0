import React, { useEffect, useState } from "react";
import { createLocalStorageStateHook } from "use-local-storage-state";

export const useTodos = createLocalStorageStateHook("todos");

export const Todo = ({ name, index, onDelete }) => {
  const [todos, setTodos] = useTodos();
  const [todo, setTodo] = useState("");
  const [editing, setEditing] = useState(false);

  const save = () => {
    const newTodos = [...todos];
    newTodos[index] = todo;
    setTodos(newTodos);
    setEditing(false);
  };

  useEffect(() => {
    setTodo(name);
  }, []);

  return (
    <div>
      {(() => {
        if (editing) {
          return (
            <p>
              <input value={todo} onChange={e => setTodo(e.target.value)} />
              <button onClick={save}>Save</button>
            </p>
          );
        } else {
          return <p>{name}</p>;
        }
      })()}
      <button onClick={() => setEditing(editing => !editing)}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export const Teste = ({ name, index, onDelete }) => {
        const [todos, setTodos] = useTodos();
        const [todo, setTodo] = useState("");
        const [editing, setEditing] = useState(false);
      
        const save = () => {
          const newTodos = [...todos];
          newTodos[index] = todo;
          setTodos(newTodos);
          setEditing(false);
        };
      
        useEffect(() => {
          setTodo(name);
        }, []);
      
        return (
          <div>
            {(() => {
              if (editing) {
                return (
                  <p>
                    <input value={todo} onChange={e => setTodo(e.target.value)} />
                    <button onClick={save}>Save</button>
                  </p>
                );
              } else {
                return <p>{name}</p>;
              }
            })()}
          </div>
        );
}

export function App() {
  const [todos, setTodos] = useTodos();
  const [todo, setTodo] = useState("");

  const onClick = () => {
    setTodos([...todos, todo]);
    setTodo("");
  };

  const onDelete = index => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <input value={todo} onChange={e => setTodo(e.target.value)} />
      <button onClick={onClick}>Create</button>
      {todos.map((t, i) => (
        <Todo key={i} index={i} name={t} onDelete={onDelete.bind(this, i)} />
      ))}
    </div>
  );
}

export default function FormDataComponent() {
    const [todos, setTodos] = useTodos();
    const [todo, setTodo] = useState("");
  
    const onClick = () => {
      setTodos([...todos, todo]);
      setTodo("");
    };
  
    const onDelete = index => {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    };
  
    return (
      <div className="App">
        {todos.map((t, i) => (
          <Todo key={i} index={i} name={t} onDelete={onDelete.bind(this, i)} />
        ))}
      </div>
    );
  }