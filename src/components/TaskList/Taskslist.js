import PropTypes from 'prop-types';
import {useState, useRef} from "react";

import {TaskItem} from "../Task/Task.js";
import "./TaskList.sass"

export const TaskList = ({tasksType, tasks, addNewTask, deleteTask, changeInputChecked, handleEditTask}) => {

    const [taskName, setTaskName] = useState('');

    const [dublicates, setDublicates] = useState(false);

    const inputEl = useRef(null);

    const handleInputChange = (event) => {

        
        if(dublicates) {
        
          setDublicates(false);
        
        }

        setTaskName(event.target.value);

    }

    const handleKeyDown = (event) => {

        if(event.key === 'Enter' && event.target.value.trim() !== '' && event.target.value.length <= 20) {

            inputEl.current.blur();

            if(addNewTask(taskName, tasksType)) {

              setTaskName("");
            
            }
            else {
              setDublicates(true);
            }

        }

    }

    const handleRemoveClick = (event) => {

      console.log("delete");
      
      const index = event.target.id;
      const id = tasks[index]._id
      
      deleteTask(tasksType, id, index);
        
        

      

    }
    const InputCheckboxChange = (id, index, checked) => {
      

       console.log('change');
       
       changeInputChecked(tasksType, id, index, checked);

       
      

    }

    const handleTaskChange = (id, name, editValue, checked) => {
      
     
      if(!handleEditTask(id, tasksType, name, editValue, checked)) {
        setDublicates(true);
        return false
      }
      else {
        setDublicates(false);
      }
      
      return true

    }

    return (
      <div className="task-list">

        {tasks && tasks.length > 0 && tasks.map((task, index) => {
            return (

                  <TaskItem key={index} task={task} number={index} onClick={handleRemoveClick} InputCheckboxChange={InputCheckboxChange} editTask={handleTaskChange}/>
      
            )
        })}

        <input type="text" 
               ref={inputEl}
               placeholder="Введите название задачи..."
               name={tasksType} 
               value={taskName} 
               onChange={handleInputChange}
               onKeyDown={handleKeyDown} />
        
        { 
          dublicates
            &&
          <span className='task-list-error'>Задача с таким именем уже существует</span>
        }
        {taskName.length >= 20
              &&
            <span className='task-list-error'>Длина не может превыщать 20 символов</span>
          }

  
      </div>
    );
  }

TaskList.propTypes = {
  tasksType: PropTypes.string,
  dublicateTypeCreate: PropTypes.bool,
  tasks: PropTypes.object,
  addNewTask: PropTypes.func,
  deleteTask: PropTypes.func,
  changeInputChecked: PropTypes.func,
};