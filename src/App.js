import "./styles.css";
import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const x = localStorage.getItem("tasks");
    const y = localStorage.getItem("count");
    if (x) {
      setTasks(JSON.parse(x));
    }
    if (y) {
      setCount(JSON.parse(y));
    }
  }, []);

  return (
    <div className="App">
      <input
        type={"text"}
        placeholder={"add new task..."}
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setTasks([...tasks, newTask], setNewTask(""));
            setCount(count + 1);
          }
        }}
      />
      <button
        onClick={() => {
          setTasks([...tasks, newTask], setNewTask(""));
          setCount(count + 1);
        }}
      >
        {" "}
        ➕{" "}
      </button>
      <button
        onClick={() => {
          setTasks([]);
          setCount(0);
        }}
      >
        Clear All
      </button>
      <button
        className="save"
        onClick={() => {
          localStorage.setItem("tasks", JSON.stringify(tasks));
          localStorage.setItem("count", JSON.stringify(count));
        }}
      >
        Save to locale storage
      </button>
      <span>counter: {count}</span>
      <ul>
        {tasks.map((task, index) => {
          return (
            <li key={index}>
              {task}
              <button
                onClick={() => {
                  setTasks(tasks.filter((a, i) => i !== index));
                  setCount(count - 1);
                }}
              >
                🗑️
              </button>
              <button
                onClick={() => {
                  setTasks(
                    tasks.map((item, i) => (i === index ? <s>{task}</s> : item))
                  );
                  setCount(count - 1);
                }}
              >
                {" "}
                🚩{" "}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
