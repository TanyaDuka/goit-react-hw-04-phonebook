import React, { useState, useEffect } from 'react';
import NewContact from './NewContact';
import Contacts from './Contacts';
import Filter from './Filter';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = contact => {
    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts([...contacts, newContact]);
  };

  const onChangeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const deleteCont = id => {
    setContacts(contacts.filter(contact => id !== contact.id));
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Phonebook</h1>
      <NewContact onSubmit={handleSubmit} />
      <h2 style={{ textAlign: 'center' }}>Contacts</h2>
      <Filter value={filter} onChange={onChangeFilter} />
      <Contacts contacts={getVisibleContacts()} onDelete={deleteCont} />
    </>
  );
};

export default App;
