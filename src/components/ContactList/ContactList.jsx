import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

import {
  contactsAction,
  contactsOperations,
  contactsSelectors,
} from '../../redux/contacts';

import { GridList, GridListTile, Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';

export default function ContactList({ contactForEdit }) {
  const dispatch = useDispatch();

  const searchedContacts = useSelector(contactsSelectors.getSearchedContacts);

  useEffect(() => {
    dispatch(contactsOperations.initContacts());
  }, [dispatch]);

  const deleteContact = useCallback(
    id => dispatch(contactsOperations.deleteContact(id)),
    [dispatch],
  );

  const onEditClick = useCallback(
    () => dispatch(contactsAction.changeContact()),
    [dispatch],
  );

  return (
    <ul className={s.contacts__list}>
      <GridList cellHeight={160}>
        {searchedContacts.map(({ name, number, id }) => (
          <GridListTile item="true" xs="true" key={id}>
            <Paper
              className={s.paper__container}
              elevation={5}
              variant="outlined"
            >
              <div className={s.contact}>
                <PersonIcon color="primary" />
                <p className={s.contact__name}>{name}</p>
              </div>
              <div className={s.contact}>
                <PhoneIcon color="primary" />
                <p className={s.contact__number}>{number}</p>
              </div>
              <div className={s.button__group}>
                <button
                  className={s.contact__btn__edit}
                  type="button"
                  name="editContact"
                  onClick={() => {
                    contactForEdit({ name, number, id });
                    onEditClick();
                  }}
                >
                  <EditIcon fontSize="large" />
                </button>
                <button
                  className={s.contact__btn__delete}
                  type="button"
                  onClick={() => deleteContact(id)}
                >
                  <DeleteIcon fontSize="large" />
                </button>
              </div>
            </Paper>
          </GridListTile>
        ))}
      </GridList>
    </ul>
  );
}

ContactList.propTypes = {
  contactForEdit: PropTypes.func.isRequired,
};
