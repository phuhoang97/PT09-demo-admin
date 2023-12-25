import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import NotFound from "./components/pages/NotFound";
import AddUser from "./components/feature/AddUser";
import EditUser from "./components/feature/EditUser";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/contact' element={<ContactPage />}></Route>
        <Route path='/add-user' element={<AddUser />}></Route>
        <Route path='/edit-user/:id' element={<EditUser />}></Route>

        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
