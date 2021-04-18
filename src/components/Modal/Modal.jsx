import React from 'react';
import { createPortal } from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { contactsAction, contactsSelectors } from '../../redux/contacts';
import { Modal } from '@material-ui/core';

const rootModal = document.getElementById('root-modal');

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function MyModal({ children, getModalValue, closeModal }) {
  const classes = useStyles();

  return createPortal(
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={getModalValue}
        onClose={() => closeModal()}
        closeAfterTransition
      >
        <div className={classes.paper}>{children}</div>
      </Modal>
    </div>,
    rootModal,
  );
}

const mapStateToProps = state => ({
  getModalValue: contactsSelectors.getModalValue(state),
});

const mapDispatchToProps = {
  closeModal: contactsAction.closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);
