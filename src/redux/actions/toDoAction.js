export const addTasks = (data) => {

    const {tasks, type} = data;

    

    return {
        type: `ADD_NEW_TASKS_${type}`,
        payload: tasks
    }
}


export const CreateTask = (data) => {

    const{task, type} = data;
    console.log("tasks", task)
    return {
        type: `CREATE_NEW_TASK_${type}`,
        payload: task
       }

}

export const CheckedTask = (data) => {

    const{id, type, checked, name} = data.payload;
    console.log('checked',checked)
    return {
        type: `CHECKED_TASK_${data.type}`,
        payload: {id, checked, type, name}
    }
}

export const DeleteTask = (data) => {
    const{id, type, index} = data;
    return {
        type: `DELETE_TASK_${type}`,
        payload: {id, index}
    }
}
export const EditTask = (data) => {
    const {name, type, editName} = data.payload;

    return {
        type: `EDIT_TASK_${data.type}`,
        payload: {name, type, editName}
    }

} 