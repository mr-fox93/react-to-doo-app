import "./styles.css";
import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("");
  const [highPriority, setHighPriority] = useState([]);
  const [mediumPriority, setMediumPriority] = useState([]);
  const [lowPriority, setLowPriority] = useState([]);

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
      priority: "",
    };
    setTasks([...tasks, task]);
    setNewTask("");
    setCount(count + 1);
  }

  function changePriority(index, priority) {
    const task = tasks[index];
    task.completed = false;
    if (priority === "high") {
      setHighPriority([...highPriority, task]);
    } else if (priority === "medium") {
      setMediumPriority([...mediumPriority, task]);
    } else if (priority === "low") {
      setLowPriority([...lowPriority, task]);
    }
    setTasks(tasks.filter((_, i) => i !== index)); // aktualizuje stan, usuwa z lsty głównej.
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
          setHighPriority([]);
          setMediumPriority([]);
          setLowPriority([]);
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
              <select
                id="priority"
                onChange={(event) => {
                  const index = parseInt(
                    event.target.getAttribute("data-index")
                  );
                  const priority = event.target.value;
                  changePriority(index, priority);
                }}
                data-index={index}
              >
                <option value="select">select priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </li>
          );
        })}
      </ul>
      <div>
        <h2>High Priority </h2>
        <ul>
          {highPriority.map((task, index) => {
            return (
              <li key={index}>
                {task.completed ? <s>{task.text}</s> : task.text}
                <span> </span> {task.created}
                <button
                  onClick={() => {
                    setHighPriority(highPriority.filter((a, i) => i !== index));
                    setCount(count - 1);
                  }}
                >
                  🗑️
                </button>
                <button
                  onClick={() => {
                    setHighPriority(
                      highPriority.map((item, i) =>
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

      <div>
        <h2>Medium Priority</h2>
        <ul>
          {mediumPriority.map((task, index) => {
            return (
              <li key={index}>
                {task.completed ? <s>{task.text}</s> : task.text}
                <span> </span> {task.created}
                <button
                  onClick={() => {
                    setMediumPriority(
                      mediumPriority.filter((a, i) => i !== index)
                    );
                    setCount(count - 1);
                  }}
                >
                  🗑️
                </button>
                <button
                  onClick={() => {
                    setMediumPriority(
                      mediumPriority.map((item, i) =>
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
      <div>
        <h2>Low Priority </h2>
        <ul>
          {lowPriority.map((task, index) => {
            return (
              <li key={index}>
                {task.completed ? <s>{task.text}</s> : task.text}
                <span> </span> {task.created}
                <button
                  onClick={() => {
                    setLowPriority(lowPriority.filter((a, i) => i !== index));
                    setCount(count - 1);
                  }}
                >
                  🗑️
                </button>
                <button
                  onClick={() => {
                    setLowPriority(
                      lowPriority.map((item, i) =>
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
    </div>
  );
};

export default App;
