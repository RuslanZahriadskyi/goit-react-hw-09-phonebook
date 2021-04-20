import { useCallback, useState } from 'react';
import s from '../App.module.css';
import { contactsAction, contactsSelectors } from '../redux/contacts';
import ContactForm from '../components/ContactForm';
import Filter from '../components/Filter';
import ContactList from '../components/ContactList';
import MyModal from '../components/Modal';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useDispatch, useSelector } from 'react-redux';

export default function ContactsPage() {
  const [contactForEdit, setContactForEdit] = useState(null);

  const getContactForEdit = contactForEdit => {
    setContactForEdit(contactForEdit);
  };

  const onAddBtn = () => {
    setContactForEdit(null);
  };

  const dispatch = useDispatch();
  const openModal = useCallback(() => dispatch(contactsAction.openModal()), [
    dispatch,
  ]);

  const modal = useSelector(contactsSelectors.getModalValue);

  return (
    <div>
      <h1 className={s.title}>Phonebook</h1>
      <div className={s.filter__add__container}>
        <Filter />
        <button
          className={s.add__btn}
          type="button"
          name="addContact"
          onClick={() => {
            onAddBtn();
            openModal();
          }}
        >
          <AddCircleIcon style={{ fontSize: 56 }} />
        </button>
      </div>
      {modal && (
        <MyModal>
          <ContactForm editedContact={contactForEdit} />
        </MyModal>
      )}
      <div className={s.container}>
        <h2 className={s.contacts__title}>Contacts</h2>
        <ContactList contactForEdit={getContactForEdit} />
      </div>
    </div>
  );
}
