import React, { Component } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import s from './Filter.module.css';

class Filter extends Component {
  handlerFilter = e => {
    const { value } = e.currentTarget;
    const { filterContacts } = this.props;
    filterContacts(value);
  };

  render() {
    const { filterValue } = this.props;
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
            onChange={this.handlerFilter}
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
}

export default Filter;
