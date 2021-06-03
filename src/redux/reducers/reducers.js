export const initialState = {
    tasks: {
        unImportant: [],
        important: [],
        veryImportant: []

    }, 
};


export const ToDOReducer = (state = initialState, action) => {
    let newUnImportantTaskList;
    let newImportantTaskList;
    let newVeryImportantTaskList;

    const {type} = action;

    switch(type) {
        case 'ADD_NEW_TASKS_UNIMPORTANT':

            return {...state, tasks: {...state.tasks, unImportant: action.payload}};

        case 'ADD_NEW_TASKS_IMPORTANT': 

             return {...state, tasks: {...state.tasks, important: action.payload}};

        case 'ADD_NEW_TASKS_VERYIMPORTANT': 

            return {...state, tasks: {...state.tasks, veryImportant: action.payload}};

        case 'CREATE_NEW_TASK_UNIMPORTANT':

            const UnImportantTask = {name: action.payload, checked: false};
            newUnImportantTaskList = state.tasks.unImportant.concat(UnImportantTask);

            return {...state, tasks: {...state.tasks, unImportant: newUnImportantTaskList}};


        case 'CREATE_NEW_TASK_IMPORTANT':

            const ImportantTask = {name: action.payload, checked: false};
            newImportantTaskList = state.tasks.important.concat(ImportantTask);

            return {...state, tasks: {...state.tasks, important: newImportantTaskList}};


        case 'CREATE_NEW_TASK_VERYIMPORTANT':

            const VeryImportantTask = {name: action.payload, checked: false};
            newVeryImportantTaskList = state.tasks.veryImportant.concat(VeryImportantTask);

        return {...state, tasks: {...state.tasks, veryImportant: newVeryImportantTaskList}};

        case 'CHECKED_TASK_UNIMPORTANT':
         
            newUnImportantTaskList = checkTask([...state.tasks.unImportant], action.payload);

            return {...state, tasks: {...state.tasks, unImportant: newUnImportantTaskList}};

        case 'CHECKED_TASK_IMPORTANT':
            
            newImportantTaskList = checkTask([...state.tasks.important], action.payload);

            return {...state, tasks: {...state.tasks, important: newImportantTaskList}};
            

        case 'CHECKED_TASK_VERYIMPORTANT':
            
            newVeryImportantTaskList =  checkTask([...state.tasks.veryImportant], action.payload);

            return {...state, tasks: {...state.tasks, veryImportant: newVeryImportantTaskList}};
        
        case 'DELETE_TASK_UNIMPORTANT':

            newUnImportantTaskList = deleteTask([...state.tasks.unImportant], action.payload);

            return {...state, tasks: {...state.tasks, unImportant: newUnImportantTaskList}};

        case 'DELETE_TASK_IMPORTANT':

            newImportantTaskList = deleteTask([...state.tasks.important], action.payload);

            return {...state, tasks: {...state.tasks, important: newImportantTaskList}};

        case 'DELETE_TASK_VERYIMPORTANT':

            newVeryImportantTaskList = deleteTask([...state.tasks.veryImportant], action.payload);

            return {...state, tasks: {...state.tasks, veryImportant: newVeryImportantTaskList}};


        case 'EDIT_TASK_UNIMPORTANT':

            newUnImportantTaskList = renameTask([...state.tasks.unImportant], action.payload); 
            return {...state, tasks: {...state.tasks, unImportant: newUnImportantTaskList}};
            
        case 'EDIT_TASK_IMPORTANT':

            newImportantTaskList = renameTask([...state.tasks.important], action.payload); 
            return {...state, tasks: {...state.tasks, important: newImportantTaskList}};
            
        case 'EDIT_TASK_VERYIMPORTANT':

            newVeryImportantTaskList = renameTask([...state.tasks.veryImportant], action.payload); 
            return {...state, tasks: {...state.tasks, veryImportant: newVeryImportantTaskList}};

        default: 
            return {...state};


    }
}

const searchTask = (tasks, payload) => {
    const taskIndex = tasks.findIndex(task => task.name === payload.name);
    return taskIndex;

}


const checkTask = (tasks, data) => {

    const{id, name, checked} = data;

    const taskIndex = searchTask(tasks, data);
    
    tasks[taskIndex].checked = checked;

    return tasks;

}

const deleteTask = (tasks, data) => {
    const {index, id} = data;
    tasks.splice(index, 1);

    return tasks;

}

const renameTask = (tasks, payload) => {
    
    const taskIndex = searchTask(tasks, payload);

    tasks[taskIndex].name = payload.editName;
    console.log('tasks[taskIndex].name', tasks[taskIndex].name)
    
    return tasks;

}