import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { contactsAction, contactsSelectors } from '../../redux/contacts';
import Filter from './Filter';

const mapStateToProps = state => ({
  filterValue: contactsSelectors.getFilterValue(state),
});

const mapDispatchToProps = {
  filterContacts: contactsAction.filterContacts,
};

Filter.propTypes = {
  filterContacts: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
