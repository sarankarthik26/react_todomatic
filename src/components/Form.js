import { useState } from 'react';

const Form = (props) => {

    const [name,setName] = useState('');

    function handleChange(e){
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        //props.addTask(name);
        //console.log("i am in submit");
        name=="" && alert("empty field");
        name!="" && props.addTask(name);      //to stop calling addTask if name is empty
        setName("");
      }  

    return (
        <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label_lg">
            What needs to be done?
          </label>
        </h2>
        <input type="text" id="new-todo-input" className="input input_lg" name="text"
        autoComplete="off" value={name} onChange={handleChange}/>
        <button type="submit" className="btn btn__primary btn_lg">
          Add
        </button>       
      </form>
    );
}
 
export default Form;