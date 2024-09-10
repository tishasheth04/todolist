import './CSS/todoitems.css';
import check from './Assets/check.png';
import circle from './Assets/circle.png';
import cross from './Assets/cross.png';

const ToDoItems = ({ no, text, completed, reminder, onComplete, onDelete }) => {
  return (
    <div className={`todoitems ${completed ? 'completed' : ''}`}>
      <div className='todoitems-container'>
        <img
          src={completed ? check : circle}
          alt={completed ? 'Task Completed' : 'Task Not Completed'}
          className='todo-icon'
          onClick={() => onComplete(no)}
        />
        <div className={`todoitems-text ${completed ? 'completed-text' : ''}`}>
          {text}
          {!completed && reminder && <div className='reminder-text'>Due: {new Date(reminder).toLocaleString()}</div>}
        </div>
      </div>
      <img
        src={cross}
        alt='Delete Task'
        className='todo-icon'
        onClick={() => onDelete(no)}
      />
    </div>
  );
};

export default ToDoItems;
