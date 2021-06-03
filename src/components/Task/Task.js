import PropTypes from 'prop-types';
import {useState, useRef, useEffect} from "react";
import "./task.sass";

import Trash from '../../pictures/icons8-delete-bin-32.png';
import Pen from '../../pictures/icons8-редактировать-30.png';
import cross from '../../pictures/icons8-delete-24.png';

export const TaskItem = ({task, number, onClick, InputCheckboxChange, editTask}) => {

  const[editMode, SetEditMode] = useState(false);
  const [editValue, setEditValue] = useState(task.name);
  const [dublicatEdit, setDublicateEdit] = useState(false);
  const [hrMode, SetHrMode] = useState(task.checked);

  const editInputEl = useRef(null);
  



  useEffect(() => {

    if(editMode) {

      editInputEl.current.focus();
    
    }

  }, [editMode]);

  const hundleEditInput = (event) => {
    if(dublicatEdit) {
          
      setDublicateEdit(false);

    }
    
    setEditValue(event.target.value);
    


  }
  const handleEditKeyDown = (event) => {
    if(event.key === 'Enter' && event.target.value.trim() !== '' && event.target.value.length < 20) {
      
    if(editTask(task._id, task.name, editValue, task.checked)) 
      
      SetEditMode(false);
    
      
    
           
      
    }
    else {
      console.log('err')
      setDublicateEdit(true);
      
    }
  }
  
  const handleCheckboxChange = (event) => {

    const index = event.target.id;
    const checked = event.target.checked;
    const id = task._id

    InputCheckboxChange(id, index, checked);

    SetHrMode(checked);
  }


    return (
      <div className="task-item">
        {
          editMode && 
          <div className="task-list-edit"
           style={hrMode ? {opacity: 0.6 } : null }>
            <input
                  className="edit-input"
                  type='text' 
                  value={editValue}
                  ref={editInputEl}
                  placeholder='Введите новое название задачи...'
                  onChange={hundleEditInput}
                  onKeyDown={handleEditKeyDown}
              ></input>
                  <img src={cross} onClick={() => SetEditMode(false)} className="crossPicture"></img>
          </div>
        }
        <input type="checkbox" id={number} onClick={handleCheckboxChange} defaultChecked={task.checked}></input>
        {hrMode && <hr className="task-line"></hr>}

        {task.name} 

        <img src={Pen} alt="img is not avalible"
            title="Редактировать" 
            className="penPicture" id={number} 
            onClick={() => SetEditMode(true)}
            style={!JSON.parse(localStorage.getItem('isAdmin')) ? {right: 5 + 'px'} : null}
         ></img>
        {
          JSON.parse(localStorage.getItem('isAdmin'))
          &&
          <img src={Trash} alt="img is not avalible" title="Удалить" className="trashPicture" id={number} onClick={onClick}></img>
        }
        
        
        
      </div>
    );
  }

TaskItem.propTypes = {
  task: PropTypes.object,
  number: PropTypes.number,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  editTask: PropTypes.func,
};