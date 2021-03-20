import React, {useState, useEffect} from 'react'
import { isEmpty , result, size} from 'lodash'
import shortid from 'shortid'
import { addDocument, deleteDocument, getCollection, updateDocument } from './actions'


function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])  
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)


  useEffect(() => {
    (async () => {
      const result = await getCollection("tasks")
      if (result.statusResponse) {
        setTasks(result.data)      
      }
    })()
  }, [])

  const validForm = () => {
    let isValid = true
    setError(null)

    if (isEmpty(task)) {
      setError("You must enter a task")
      isValid = false
    }

    return isValid
  }

  const addTask = async(e) => {
    e.preventDefault()

    if (!validForm()) {
      return
    }

    const result = await addDocument("tasks", {name: task })

    if (!result.statusResponse) {
      setError(result.error)
      return
    }
    
    // const newTask = {
    //   id: shortid.generate(),
    //   name: task

    const newTask = {
      id: result.data.id,
      name: task
    }

    setTasks([...tasks, newTask])

    setTask("")

}

  const saveTask = async(e) => {
    e.preventDefault()
   
    if (!validForm()) {
      return
    }

    const result = await deleteDocument("tasks", id, {name: task})

    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    const editedTasks = tasks.map(item => item.id === id ? {id, name:task} : item)
    setTasks(editedTasks)
    setEditMode(false)

    setTask("")
    setId("")
  

  }
  
  const deleteTask = async(id) => {
    const result = await deleteDocument("tasks", id)

    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    const filteredTasks = tasks.filter(task => task.id !== id)

    setTasks(filteredTasks)

  }


  const editTask = (_task) => {
    setTask(_task.name)
    setEditMode(true)
    setId(_task.id)
  }

  return (
   <div className="container mt-5">
     <h1>Tasks</h1>
     <hr/>
     <div className="row">
       <div className="col-8">
          <h4 className="text-center">Task List</h4>
        {
        (size(tasks) === 0)?
          (<li className="list-group-item">No tasks found </li>):
          (
          <ul className="list-group">
            {
            tasks.map((task) => (
              <li className="list-group-item" key = {task.id}> 
              <span className="lead">{task.name}</span>
              <button 
                className="btn btn-danger btn-sm float-right"
                onClick = {() => deleteTask(task.id)}
                >Delete
              </button>
              <button 
                className="btn btn-warning btn-sm float-right mx-2"
                onClick = {() => editTask(task)}
                >Edit
              </button>
            </li>
            ))
            }
          </ul>
        )
        }
       </div>
       <div className="col-4">
          <h4 className="text-center">{ editMode ? "Edit Task":"Add task"}</h4>
          <form onSubmit={editMode? saveTask : addTask}> 
            {
              error && <span class="text-danger">{error}</span>
            }
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter the Task..."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
            <button className={editMode?"btn btn-warning btn-block":"btn btn-dark btn-block"}
            type="submit">{editMode?"Save":"Add"}</button>
          </form>
       </div>
     </div>
   </div>
  );
}

export default App;
