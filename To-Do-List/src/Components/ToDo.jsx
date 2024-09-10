import { useState, useRef } from 'react';
import './CSS/todo.css';
import ToDoItems from './ToDoItems';

let count = 0;

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);
  const reminderRef = useRef(null);

  const add = () => {
    const taskText = inputRef.current.value.trim();
    const reminderTime = reminderRef.current.value;
    if (taskText === "") return;
    
    const newTask = {
      no: count++, 
      text: taskText, 
      completed: false, 
      reminder: reminderTime
    };

    setTodos([...todos, newTask]);
    inputRef.current.value = "";
    reminderRef.current.value = "";

    scheduleReminder(newTask);
  };

  const scheduleReminder = (task) => {
    if (task.reminder) {
      const reminderDate = new Date(task.reminder);
      const currentTime = new Date();
      const timeDifference = reminderDate.getTime() - currentTime.getTime();

      if (timeDifference > 0) {
        setTimeout(() => {
          alert(`Reminder: ${task.text} is due now!`);
        }, timeDifference);
      }
    }
  };

  const handleComplete = (taskNo) => {
    setTodos(todos.map(todo => 
      todo.no === taskNo ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (taskNo) => {
    setTodos(todos.filter(todo => todo.no !== taskNo));
  };

  return (
    <div className="todo">
      <div className="todo-header">To-Do List</div>
      <div className="todo-add">
        <input ref={inputRef} type="text" placeholder="Add your task!" className="todo-input" />
        <input ref={reminderRef} type="datetime-local" className="todo-reminder" />
        <div onClick={add} className="todo-add-btn">ADD</div>
      </div>

      <div className="todo-list">
        <h2>Remaining Tasks</h2>
        {todos.filter(item => !item.completed).length > 0 ? (
          todos.filter(item => !item.completed).map((item) => (
            <ToDoItems 
              key={item.no}
              no={item.no}
              text={item.text}
              completed={item.completed}
              reminder={item.reminder}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No remaining tasks!</p>
        )}
      </div>

      <div className="todo-list">
        <h2>Completed Tasks</h2>
        {todos.filter(item => item.completed).length > 0 ? (
          todos.filter(item => item.completed).map((item) => (
            <ToDoItems 
              key={item.no}
              no={item.no}
              text={item.text}
              completed={item.completed}
              reminder={item.reminder}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No completed tasks yet!</p>
        )}
      </div>
    </div>
  );
};

export default ToDo;
