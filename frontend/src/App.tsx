import './App.css'
import { TaskForm, TaskList } from './components'
import { TaskProvider } from './context/TaskContext/TaskContext'

function App() {

  return (
    <main className='bg-zinc-900 h-screen text-white flex items-center justify-center'>
      {/* w-2/5 = width: 40% */}
      <div className="container bg-zinc-950 rounded p-4 w-2/5">
        <h1 className="container__title text-3xl text-center block my-2">Task App</h1>
        <TaskProvider>
          <TaskForm />
          <TaskList />
        </TaskProvider>
      </div>
    </main>
  )
}

export default App
