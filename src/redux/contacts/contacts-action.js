// import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@reduxjs/toolkit';

//========================================================
//Redux Toolkit

const initContactsRequest = createAction('contacts/initContactsRequest');
const initContactsSuccess = createAction('contacts/initContactsSuccess');
const initContactsError = createAction('contacts/initContactsError');

const addContactRequest = createAction('contacts/addContactRequest');
const addContactSuccess = createAction('contacts/addContactSuccess');
const addContactError = createAction('contacts/addContactError');

const changeContact = createAction('contacts/changeContact');
const editContactRequest = createAction('contacts/editContactsRequest');
const editContactSuccess = createAction('contacts/editContactsSuccess');
const editContactError = createAction('contacts/editContactsError');

const deleteContactRequest = createAction('contacts/deleteContactRequest');
const deleteContactSuccess = createAction('contacts/deleteContactSuccess');
const deleteContactError = createAction('contacts/deleteContactError');

const filterContacts = createAction('contact/filter');

const openModal = createAction('contacts/openModal');
const closeModal = createAction('contacts/closeModal');

//===========================================================
// without Redux Toolkit

// const addContact = (name, number) => {
// return { type: types.ADD, payload: { id: uuidv4(), name, number } };
// };
// const deleteContact = id => {
//   return { type: types.DELETE, payload: id };
// };
// const filterContacts = text => {
//   return { type: types.FILTER, payload: text };
// };

export {
  addContactRequest,
  addContactSuccess,
  addContactError,
  changeContact,
  editContactRequest,
  editContactSuccess,
  editContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  initContactsRequest,
  initContactsSuccess,
  initContactsError,
  filterContacts,
  openModal,
  closeModal,
};
