import { connect } from 'react-redux';
import { contactsAction, contactsSelectors } from '../../redux/contacts';
import ContactsPage from './ContactsPage';

const mapStateToProps = state => ({
  modal: contactsSelectors.getModalValue(state),
});

const mapDispatchToProps = {
  openModal: contactsAction.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);
