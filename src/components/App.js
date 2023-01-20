import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import uuid from 'react-uuid';
import api from "../api/contacts";

import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY = 'contacts';
  const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  const [contacts, setContacts] = useState(retriveContacts ?? []);
  const [searchTerm, setsearchTerm] = useState('');
  const [searchResult, setsearchResult] = useState([]);

  const retriveContactsApi = async () => {
    const response = await api.get('/contacts');
    return response.data;
  }

  const addContactHandller = async (contact) => {
    const request = {
      id: uuid(),
      ...contact
    }
    const response = await api.post('/contacts', request);
    setContacts([...contacts, response.data]);
  }

  const updateContactHandller = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map(contact => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  }

  const removeContactHandller = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter(contact => {
      return contact.id !== id;
    })
    setContacts(newContactList);
  }
  const searchHandler = (thisTerm) => {
    setsearchTerm(thisTerm);
    if (thisTerm !== '') {
      const newContactList = contacts.filter(contact => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(thisTerm.toLowerCase());
      })
      setsearchResult(newContactList);
    } else {
      setsearchResult(contacts);
    }
  }

  useEffect(() => {
    (async function () {
      const allContacts = await retriveContactsApi();
      if (allContacts) setContacts(allContacts);
    })();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui '>
      <Router>
        <Header />
        <div className='ui container'>
          <Routes>
            <Route path='/add' element={<AddContact addContactHandller={addContactHandller} />} />
            <Route path='/edit/:id' element={<EditContact updateContactHandller={updateContactHandller} />} />
            <Route path='/' element={<ContactList contacts={searchTerm.length < 1 ? contacts : searchResult} getContactId={removeContactHandller} term={searchTerm} searchKeyword={searchHandler} />} />
            <Route path='/contact/:id' element={<ContactDetail />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
