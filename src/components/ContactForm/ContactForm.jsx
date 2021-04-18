import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { InputAdornment } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';

import s from './ContactForm.module.css';

import {
  contactsAction,
  contactsOperations,
  contactsSelectors,
} from '../../redux/contacts';

export default function ContactForm({ editedContact }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (editedContact) {
      const { id, name, number } = editedContact;
      setId(id);
      setName(name);
      setNumber(number);
    }

    return () => {
      setId('');
      setName('');
      setNumber('');
    };
  }, [editedContact]);

  const contactName = e => {
    setName(e.currentTarget.value);
  };

  const [number, setNumber] = useState('');

  const contactNumber = e => {
    setNumber(e.currentTarget.value);
  };

  const contacts = useSelector(contactsSelectors.getAllContacts);

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    reset();

    if (id) {
      dispatch(contactsOperations.editContact({ id, name, number }));
      return;
    }

    if (contacts.some(el => el.name.toLowerCase() === name.toLowerCase())) {
      dispatch(contactsAction.closeModal());
      return toast.error('Name already exist');
    }

    if (contacts.some(el => el.number.toLowerCase() === number.toLowerCase())) {
      dispatch(contactsAction.closeModal());
      return toast.error(`${number} is already in contacts`);
    }

    dispatch(contactsOperations.addContact(name, number));
  };

  const isValid = () => {
    if (name === '' || name.length > 23) {
      return false;
    }
    if (number === '' || number.length < 17) {
      return false;
    }

    return true;
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <div className={s.form__container}>
        <form onSubmit={handleSubmit} className={s.form}>
          <TextField
            className={s.textField}
            style={{ marginBottom: 10 }}
            fullWidth
            id="name"
            name="name"
            label="Name"
            placeholder="Tomy Brait"
            type="name"
            inputProps={{
              pattern: '[A-Za-z]{1,} [A-Za-z]{1,}',
              'aria-describedby': 'my-helper-text',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            }}
            value={name}
            onChange={contactName}
          />
          <TextField
            style={{ marginBottom: 10 }}
            fullWidth
            id="phone"
            name="number"
            label="Phone number"
            type="phone"
            placeholder="+48-897-89-89-897"
            inputProps={{
              pattern: '[+][0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{3}',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="primary" />
                </InputAdornment>
              ),
            }}
            value={number}
            onChange={contactNumber}
          />
          {editedContact ? (
            <Button
              disableRipple
              disabled={!isValid()}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          ) : (
            <Button
              disableRipple
              disabled={!isValid()}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          )}
        </form>
      </div>
    </>
  );
}
