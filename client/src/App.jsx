import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Fetch from "./Fetch";
import Form from "./Form";
import Read from "./Read";
import Update from "./Update";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Fetch /> } />
      <Route path="/Form" element={<Form/>} />
      <Route path="/Read/:id" element={ <Read /> } />
      <Route path="/Update/:id" element={<Update/>} />
    </Routes>
    </BrowserRouter>
  )
}
export default App;