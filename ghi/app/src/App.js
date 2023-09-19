//import logo from './logo.svg';
//import './App.css';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeeForm from './AttendeeForm'
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';
import ConferenceDetail from './ConferenceDetail';




function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
        </Route>
        <Route path="locations">
          <Route path="new" element={<LocationForm />} />
        </Route>
        <Route path="conferences">
          <Route path="new" element={<ConferenceForm />} />
          <Route path=":id" element={<ConferenceDetail />} />
        </Route>
        <Route path="attendees">
          <Route path='' element={<AttendeesList />} />
          <Route path="new" element={<AttendeeForm />} />
        </Route>
        <Route path="presentation">
          <Route path="new" element={<PresentationForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
