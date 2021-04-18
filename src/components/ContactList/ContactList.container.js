import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContactList from './ContactList';
import {
  contactsAction,
  contactsOperations,
  contactsSelectors,
} from '../../redux/contacts';
// import { getSearchedContacts } from '../../redux/contacts/contacts-selectors';

const mapStateToProps = state => ({
  searchedContacts: contactsSelectors.getSearchedContacts(state),
  filterValue: contactsSelectors.getFilterValue(state),
});

const mapDispatchToProps = {
  deleteContact: id => contactsOperations.deleteContact(id),
  initContacts: contactsOperations.initContacts,
  onEditClick: contactsAction.changeContact,
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),

  filterValue: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
