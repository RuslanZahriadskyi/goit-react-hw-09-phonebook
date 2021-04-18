import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Filter.module.css';

import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { contactsAction, contactsSelectors } from '../../redux/contacts';

export default function Filter() {
  const dispatch = useDispatch();
  const filterValue = useSelector(contactsSelectors.getFilterValue);

  const handlerFilter = e => {
    const { value } = e.currentTarget;

    dispatch(contactsAction.filterContacts(value));
  };

  return (
    <>
      <div className={s.filter__container}>
        <TextField
          id="outlined-search"
          label="Search contacts"
          type="search"
          variant="outlined"
          name="filter"
          value={filterValue}
          placeholder="Search contacts"
          onChange={handlerFilter}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="primary" edge="end" />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </>
  );
}
