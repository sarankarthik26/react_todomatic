import { useState } from "react";

const Todo = (props) => {

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(e){
    setNewName(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="{props.id}" className="todo-label">New name for {props.id} </label>
      <input id={props.id} className="todo-text" type="text" value={newName} onChange={handleChange}/>
    </div>
    <div className="btn-group">
      <button type="button" className="btn todo-cancel" onClick={()=>setEditing(false)}>
        Cancel
        <span className="visually-hidden">renaming {props.name}</span>
      </button>
      <button type="submit" className="btn btn__primary todo-edit">Save
        <span className="visually-hidden">new name for {props.name}</span>
      </button>
    </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input id={props.id} type="checkbox" defaultChecked={props.completed}
        onChange={()=> props.toggleTaskCompleted(props.id)} />
        <label htmlFor={props.id} className="todo-label">{props.name}</label>
      </div>
      <div className="btn-group">
        <button className="btn" type="button" onClick={()=>setEditing(true)}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button type="button" className="btn btn__danger" onClick={()=>props.deleteTask(props.id)}>
        Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

    //console.log(props);
    return (
        <li className="todo stack-small">
          {isEditing ? editingTemplate:viewTemplate}
        </li>
    );
}
 
export default Todo;