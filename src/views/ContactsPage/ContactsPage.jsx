import { Component } from 'react';
import s from '../../App.module.css';
import ContactForm from '../../components/ContactForm';
import Filter from '../../components/Filter';
import ContactList from '../../components/ContactList';
import MyModal from '../../components/Modal';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

class ContactsPage extends Component {
  state = {
    contactForEdit: null,
  };

  getContactForEdit = contactForEdit => {
    this.setState({ contactForEdit });
  };

  onAddBtn = () => {
    this.setState({ contactForEdit: null });
  };

  render() {
    const { openModal, modal } = this.props;
    const { contactForEdit } = this.state;

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
              this.onAddBtn();
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
          <ContactList contactForEdit={this.getContactForEdit} />
        </div>
        {/* <ToastContainer /> */}
      </div>
    );
  }
}

export default ContactsPage;
