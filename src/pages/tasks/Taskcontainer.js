import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {CreateTask, CheckedTask, DeleteTask, addTasks, EditTask} from '../../redux/actions/toDoAction';
import axios from 'axios';
import {TaskList} from "../../components/TaskList/Taskslist.js";
import "./taskContainer.sass";


export const TasksContainer = () => {

    const history = useHistory();
    const  dispatch = useDispatch();

    const tasksState = useSelector(state => state.ToDOReducer);

    const [userId, setUserId] = useState('');


    
    useEffect(() => {
    
        if(!JSON.parse(localStorage.getItem('isAdmin'))) {
            axios.get('http://localhost:8080/users/userId', {
                headers: { 'token': localStorage.getItem('token') }
                })
                .then(res => {
                    if(res.status === 200) {
                        setUserId(res.data);
                        getTasksRequest(res.data);
                    }
                })
                .catch(err => {
                    console.error(err);
                    if(err.response.status === 401) {
                        history.push('/login');
                    }
            })
        } else {
            const id = history.location.pathname.split('/')[2];
            setUserId(id);
            getTasksRequest(id);
        }

    }, []);

    const getTasksRequest = (userId) => {
        axios.get(`http://localhost:8080/tasks/${userId}`, {
            headers: { 'token': localStorage.getItem('token') }
            })
            .then(res => {
                const {data} = res;
                const notImportantTasks = filterTasks(data, "unImportant");
                const importantTasks = filterTasks(data, "important");
                const veryImportantTasks = filterTasks(data, "veryImportant");

                dispatch(addTasks({tasks: notImportantTasks, type: 'UNIMPORTANT'}));
                dispatch(addTasks({tasks: importantTasks, type: 'IMPORTANT'}));
                dispatch(addTasks({tasks: veryImportantTasks, type: 'VERYIMPORTANT'}));
            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 401) {
                    history.push('/login');
                }
            })
    }
    

    const filterTasks = (tasks, type) => {

        return tasks.filter(task => task.type === type);

    } 
   

   
    const addNewTask = (name, type) => {

        const tasksCopy = {...tasksState.tasks};
        const {unImportant, important, veryImportant} = tasksCopy;
        
        const allArrTasks = unImportant.concat(important, veryImportant);
        
        if(checkDublicates(allArrTasks, name)) {
        
            axios.post(`http://localhost:8080/tasks/${userId}`, 
                { 
                    checked: false,
                    name,
                    type
                }, 
                {
                    headers: { 'token': localStorage.getItem('token') }
                })
                .then(res => {
                    if(res.status === 201) {
                        dispatch(CreateTask({type: type.toUpperCase(), task: name}))
                    }
                })
                .catch(err => {
                    console.error(err);
                    if(err.response.status === 401) {
                        history.push('/login');
                    }
                })
        
            return true;
        
        } else  {
           
            return false;

        }
    
    }

    
    const checkDublicates = (tasks, name) => {   

        const index = tasks.findIndex(task => task.name === name);

        
        return index === -1;

    }

    const handledeleteTask = (type, id, index) => {
        const tasksCopy = {...tasksState.tasks};
        console.log(tasksCopy[type][index]);

        if(tasksCopy[type][index].checked === true){
            axios.delete(`http://localhost:8080/tasks/${userId}/${id}`,  
        {
            headers: { 'token': localStorage.getItem('token') }
        })
        .then(res => {
            if(res.status === 204) {
                dispatch(DeleteTask({type: type.toUpperCase(), index: index, id: id}));
            }
        })
        .catch(err => {
            console.error(err);
            if(err.response.status === 401) {
                history.push('/login');
            }
        })
        }

       
    }
        
    const changeInputChecked = (type, id, index, checked) => {

        
        const tasksCopy = {...tasksState.tasks};
        const name = tasksCopy[type][index].name;

        editTaskRequest(id, type, name, checked, userId, 'check', );
        
         

    }


    
    const handleEditTask = (id, type, name, editName, checked) => {

        const tasksCopy = {...tasksState.tasks};
        const {unImportant, important, veryImportant} = tasksCopy;

        const allTasks = unImportant.concat(important, veryImportant);
        const taskIndex = allTasks.findIndex(task => task.name === name);

        allTasks.splice(taskIndex, 1);
        
        if(checkDublicates(allTasks, editName)) {    

            editTaskRequest(id, type, editName, checked, userId, 'rename', name );
            
            return true;
        
        } else {
            
            return false;

        }

    }

    const editTaskRequest = (id, type, name, checked, userId, editType, oldName = '') => {
        axios.put(`http://localhost:8080/tasks/${userId}`,  
        { 
            id,
            checked,
            name,
            type
        }, 
        {
            headers: { 'token': localStorage.getItem('token') }
        })
        .then(res => {
            if(res.status === 204) {
                editType === 'check' ? 
                dispatch(CheckedTask({type: type.toUpperCase(), payload: {id: id, checked: checked, name: name}})) :
                dispatch(EditTask({type: type.toUpperCase(), payload: {editName: name, name: oldName, type}}));
                
            }
        })
        .catch(err => {
            console.error(err);
            if(err.response.status === 401) {
                history.push('/login');
            }
        })
    }



    return (
      <div className="tasks">
          
        <div className="tasks-header">
            Планировщик задач
        </div>


        <div className="tasks-main">
            <div className="tasks-main-col">
                <div className="tasks-main-col-unImportant">
                    Не важные задачи
                </div>

                <TaskList tasksType="unImportant"
                          tasks={tasksState.tasks.unImportant}
                          addNewTask={addNewTask}
                          deleteTask={handledeleteTask}
                          changeInputChecked={changeInputChecked}
                          handleEditTask={handleEditTask} />
            </div>

            <div className="tasks-main-col">
                <div className="tasks-main-col-important">
                    Важные задачи
                </div>

                <TaskList tasksType="important"
                          tasks={tasksState.tasks.important} 
                          addNewTask={addNewTask}
                          deleteTask={handledeleteTask}
                          changeInputChecked={changeInputChecked}
                          handleEditTask={handleEditTask} />
            </div>

            <div className="tasks-main-col">
                <div className="tasks-main-col-veryImportant">
                    Очень важные задачи
                </div>

                <TaskList tasksType="veryImportant"
                          tasks={tasksState.tasks.veryImportant}
                          addNewTask={addNewTask}
                          deleteTask={handledeleteTask}
                          changeInputChecked={changeInputChecked}
                          handleEditTask={handleEditTask} />
            </div>
        </div>

      </div>
    );
}