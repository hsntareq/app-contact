import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import uuid from 'react-uuid';

import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY = 'contacts';
  const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  const [contacts, setContacts] = useState(retriveContacts ?? []);

  const addContactHandller = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }]);
  }

  const removeContactHandller = (id) => {
    const newContactList = contacts.filter(contact => {
      return contact.id !== id;
    })
    setContacts(newContactList);
  }

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) {
      setContacts(retriveContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui '>
      <Router>
        <Header />
        <div className='ui container'>
          <Routes>
            <Route path='/add' element={<AddContact addContactHandller={addContactHandller} />} />
            <Route path='/' element={<ContactList contacts={contacts} getContactId={removeContactHandller} />} />
            <Route path='/contact/:id' element={<ContactDetail />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
