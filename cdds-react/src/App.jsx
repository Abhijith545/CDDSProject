import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css';
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import { Routes, Route, Navigate } from 'react-router-dom';
import ListEmployee from './components/ListEmployee';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import ViewEmployee from './components/ViewEmployee';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
      <Sidebar />
      <main className="main-content">
        <div className="container-fluid">
          <Routes>
            {/* For localhost normal port */}
            <Route path="/" element={<Navigate to="/employees" replace />} />
            {/* for /employees url */}
            <Route path="/employees" element={<ListEmployee />} />
            <Route path="*" element={<Navigate to="/employees" replace />} />
            <Route path='/add-employee' element={<AddEmployee/>}></Route>

            {/* for edit employee url--user goes to updateEmployee page */}
            {/* //https://localhost:5134/updateEmployee/1 */}
            <Route path='/edit-employee/:id' element={<UpdateEmployee/>}></Route>
            <Route path='/view-employee/:id' element={<ViewEmployee/>}></Route>
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
