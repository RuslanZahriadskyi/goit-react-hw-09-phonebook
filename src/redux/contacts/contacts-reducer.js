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

const loading = createReducer(false, {
  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,
  [editContactRequest]: () => true,
  [editContactSuccess]: () => false,
  [editContactError]: () => false,
  [deleteContactRequest]: () => true,
  [deleteContactSuccess]: () => false,
  [deleteContactError]: () => false,
  [initContactsRequest]: () => true,
  [initContactsSuccess]: () => false,
  [initContactsError]: () => false,
  [getCurrentUserRequest]: () => true,
  [getCurrentUserSuccess]: () => false,
  [gentCurrentUserError]: () => false,
});

const filterReducer = createReducer('', {
  [filterContacts]: (_, { payload }) => payload,
});

const modalReducer = createReducer(false, {
  [openModal]: () => true,
  [changeContact]: () => true,
  [addContactSuccess]: () => false,
  [editContactSuccess]: () => false,
  [closeModal]: () => false,
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
