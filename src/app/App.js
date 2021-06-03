// import {TasksContainer} from "../pages/tasks/Taskcontainer.js";
import './app.sass';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import {
  LoginPage, 
  RegistrationPage, 
  TasksContainer,
  UsersPage
 } from '../pages/AccesstoPage';


function App() {

  return (
    <div className='App'>
      <Router>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/registration'>
          <RegistrationPage />
        </Route>
        <Route path='/tasks'>
            <TasksContainer />
        </Route>
        <Route path='/users'>
          <UsersPage />
        </Route>
      </Router>
    </div>
  );
}

export default App;
