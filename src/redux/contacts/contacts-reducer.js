// import * as actions from './contacts-action';
import { createReducer } from '@reduxjs/toolkit';
import {
  gentCurrentUserError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
} from '../auth/auth-actions';
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  filterContacts,
  initContactsRequest,
  initContactsSuccess,
  initContactsError,
  editContactSuccess,
  closeModal,
  openModal,
  changeContact,
  editContactRequest,
  editContactError,
} from './contacts-action';

//================================================b===============
//Redux Toolkit

const itemsReducers = createReducer([], {
  [initContactsSuccess]: (_, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => [...state, payload],
  [editContactSuccess]: (state, { payload }) =>
    state.map(contact => (contact.id !== payload.id ? contact : payload)),
  [deleteContactSuccess]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
});

const setTrue = () => true;
const setFalse = () => false;

const loading = createReducer(false, {
  [addContactRequest]: setTrue,
  [addContactSuccess]: setFalse,
  [addContactError]: setFalse,
  [editContactRequest]: setTrue,
  [editContactSuccess]: setFalse,
  [editContactError]: setFalse,
  [deleteContactRequest]: setTrue,
  [deleteContactSuccess]: setFalse,
  [deleteContactError]: setFalse,
  [initContactsRequest]: setTrue,
  [initContactsSuccess]: setFalse,
  [initContactsError]: setFalse,
  [getCurrentUserRequest]: setTrue,
  [getCurrentUserSuccess]: setFalse,
  [gentCurrentUserError]: setFalse,
});

const filterReducer = createReducer('', {
  [filterContacts]: (_, { payload }) => payload,
});

const modalReducer = createReducer(false, {
  [openModal]: setTrue,
  [changeContact]: setTrue,
  [addContactSuccess]: setFalse,
  [editContactSuccess]: setFalse,
  [closeModal]: setFalse,
});

//=================================================================
//without Redux Toolkit

// const innitialItems = [];

// const itemsReducers = (state = innitialItems, { type, payload }) => {
//   switch (type) {
//     case types.ADD:
//       return [...state, payload];
//     case types.DELETE:
//       return state.filter(contact => contact.id !== payload);
//     default:
//       return state;
//   }
// };
// const filterReducer = (state = '', { type, payload }) => {
//   switch (type) {
//     case types.FILTER:
//       return payload;
//     default:
//       return state;
//   }
// };

const reducers = { itemsReducers, filterReducer, loading, modalReducer };

export default reducers;
