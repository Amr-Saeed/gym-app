import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WorkoutList from './pages/WorkoutList';
import ExerciseDetail from './pages/ExerciseDetail';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkoutList />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
