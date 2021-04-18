import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { contactsAction, contactsSelectors } from '../../redux/contacts';

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

export default function MyModal({ children }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const getModalValue = useSelector(contactsSelectors.getModalValue);
  const closeModal = useCallback(() => dispatch(contactsAction.closeModal()), [
    dispatch,
  ]);

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
