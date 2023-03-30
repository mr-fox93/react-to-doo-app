import "./styles.css";
import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("");

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(currentDate());
      return interval;
    }, 1000);
  }, []);

  function currentDate() {
    const date = new Date();
    const day =
      date.getDate() +
      "/" +
      date.getMonth() +
      "/" +
      date.getFullYear() +
      "/" +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    return day;
    //console.log(day);
  }

  function addTask() {
    const task = {
      text: newTask,
      created: currentDate(),
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
    setCount(count + 1);
  }

  return (
    <div className="App">
      <input
        className="input"
        type={"text"}
        placeholder={"add new task..."}
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addTask();
          }
        }}
      />
      <button onClick={addTask}>➕</button>
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
      <span className="counter">counter: {count}</span>
      <span> </span>
      <span className="timer">{time}</span>

      <ul>
        {tasks.map((task, index) => {
          return (
            <li key={index}>
              {task.completed ? <s>{task.text}</s> : task.text}
              <span> </span> {task.created}
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
                    tasks.map((item, i) =>
                      i === index ? { ...item, completed: true } : item
                    )
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
