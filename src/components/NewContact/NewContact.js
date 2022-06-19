import React, { useState } from 'react';
import propTypes from 'prop-types';
import s from './NewContact.module.css';

const NewContact = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });

    setName('');
    setNumber('');
  };

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleChangeNumber = e => {
    setNumber(e.target.value);
  };

  return (
    <form className={s.container} onSubmit={handleSubmit}>
      <label className={s.label}>Name</label>
      <input
        className={s.input}
        onChange={handleChangeName}
        value={name}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={s.label}>Number</label>
      <input
        className={s.input}
        onChange={handleChangeNumber}
        value={number}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={s.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

NewContact.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
export default NewContact;
