import axios from 'axios';
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactSuccess,
  deleteContactRequest,
  deleteContactError,
  initContactsRequest,
  initContactsSuccess,
  initContactsError,
  editContactRequest,
  editContactError,
  editContactSuccess,
} from './contacts-action';

// axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const initContacts = () => async dispatch => {
  dispatch(initContactsRequest());

  try {
    const { data } = await axios.get('/contacts');

    dispatch(initContactsSuccess(data));
  } catch (error) {
    dispatch(initContactsError(error.message));
  }
};

const addContact = (name, number) => async dispatch => {
  const contact = {
    name,
    number,
  };

  dispatch(addContactRequest());

  try {
    const { data } = await axios.post('/contacts', contact);
    dispatch(addContactSuccess(data));
  } catch (error) {
    dispatch(addContactError(error.message));
  }
};

const deleteContact = id => async dispatch => {
  dispatch(deleteContactRequest());

  try {
    await axios.delete(`/contacts/${id}`);
    dispatch(deleteContactSuccess(id));
  } catch (error) {
    dispatch(deleteContactError(error.message));
  }
};

const editContact = ({ name, number, id }) => async dispatch => {
  dispatch(editContactRequest());

  try {
    const { data } = await axios.patch(`/contacts/${id}`, { name, number });

    dispatch(editContactSuccess(data));
  } catch (error) {
    dispatch(editContactError(error.message));
  }
};

export { addContact, deleteContact, initContacts, editContact };
