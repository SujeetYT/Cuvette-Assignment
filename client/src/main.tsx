import { StrictMode } from 'react'
import './index.css'
import { createRoot } from 'react-dom/client'

// Third Party Libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./redux/store.ts";

// Components
import Navbar from './components/Navbar/Navbar.tsx';

// Routes
import App from './routes/App.tsx'
import Signup from './routes/Signup.tsx';
import Dashboard from './routes/Dashboard.tsx';
import HomeDashboard from './components/Dashboard/HomeDashboard.tsx';
import CreateJobPost from './components/Dashboard/CreateJobPost.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path='' element={<HomeDashboard />} />
            <Route path='createJobPost' element={<CreateJobPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
