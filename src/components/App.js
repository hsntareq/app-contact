import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';

import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

function App() {
  const LOCAL_STORAGE_KEY = 'contacts';
  const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  const [contacts, setContacts] = useState(retriveContacts ?? []);
  const addContactHandller = (contact) => {
    console.log(contact);
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
    console.log(contacts);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui container'>
      <Header />
      <AddContact addContactHandller={addContactHandller} />
      <ContactList contacts={contacts} getContactId={removeContactHandller} />
    </div>
  );
}

export default App;
