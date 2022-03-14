import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { useState } from 'react';
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: ()=> true, 
  Active: (task) => !task.completed,
  completed: (task)=> task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const filter_list = FILTER_NAMES.map((name)=>
        <FilterButton name={name} key={name} isPressed={name === filter} setFilter={setFilter}/>
 );

  function addTask(name){
    const newTask = {id:"todo-" + nanoid(), name:name, completed:false};
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map((task) => {
      if(task.id == id){
        return {...task, completed:!task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log(tasks);
  }

  function editTask(id,newName){
    const editedTasks = tasks.map((task)=>{
      if(task.id==id){
        return {...task,name:newName};
      }
      return task;
    });
    setTasks(editedTasks);
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter((task)=> task.id!=id);
    setTasks(remainingTasks);
  }

  const taskList = (tasks).filter(FILTER_MAP[filter])
  .map(
    (task)=> <Todo key={task.id} name={task.name} completed={task.completed} id={task.id} 
    toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask} editTask={editTask}/> 
  );

  const tasksNoun = taskList.length!==1?'tasks':'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      
      <Form addTask={addTask}/>

      <div className="filters btn-group stack-exception">
        {filter_list}
      </div>

      <h2 id="list-heading"> {headingText} </h2>
      <ul role="list" className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading">
        {taskList}
      </ul>

    </div>
  );
}

export default App;
