import { BrowserRouter, Route, Routes } from "react-router-dom"
import Master from "./components/Master"
import Temperature from "./components/Temperature"
import Population from "./components/Population";
import EducationInstitutions from "./components/EducationInstitutions";
import WaterResources from "./components/WaterResources";
import FoodPlaces from "./components/FoodPlaces";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Master />} />
          <Route path="/temperature" element={<Temperature />} />  
          <Route path="/population" element={<Population />} /> 
          <Route path="/education" element={<EducationInstitutions />} /> 
          <Route path="/water" element={<WaterResources />} />
          <Route path="/food" element={<FoodPlaces />} />     
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App