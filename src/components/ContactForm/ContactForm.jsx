import { Component } from 'react';
import s from './ContactForm.module.css';
import { InputAdornment } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import SaveIcon from '@material-ui/icons/Save';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';

class ContactForm extends Component {
  state = {
    id: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const { editedContact } = this.props;

    if (editedContact) {
      const { id, name, number } = editedContact;
      this.setState({ id, name, number });
    }
  }

  componentWillUnmount() {
    this.setState({ id: '', name: '', number: '' });
  }

  contactInfo = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, number, id } = this.state;
    const { contacts, addContact, editContact } = this.props;

    this.reset();

    if (id) {
      editContact(this.state);
      return;
    }

    if (contacts.some(el => el.name.toLowerCase() === name.toLowerCase())) {
      return alert(`${name} is already in contacts`);
    }

    if (contacts.some(el => el.number.toLowerCase() === number.toLowerCase())) {
      return alert(`${number} is already in contacts`);
    }

    addContact(name, number);
  };

  isValid = () => {
    const { name, number } = this.state;

    if (name === '' || name.length > 23) {
      return false;
    }
    if (number === '' || number.length < 17) {
      return false;
    }

    return true;
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { editedContact } = this.props,
      { name, number } = this.state;
    return (
      <>
        <div className={s.form__container}>
          <form onSubmit={this.handleSubmit} className={s.form}>
            <TextField
              className={s.textField}
              style={{ marginBottom: 10 }}
              fullWidth
              id="name"
              name="name"
              label="Name"
              placeholder="Tomy Brait"
              type="name"
              inputProps={{
                pattern: '[A-Za-z]{1,} [A-Za-z]{1,}',
                'aria-describedby': 'my-helper-text',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              value={name}
              onChange={this.contactInfo}
            />
            <TextField
              style={{ marginBottom: 10 }}
              fullWidth
              id="phone"
              name="number"
              label="Phone number"
              type="phone"
              placeholder="+48-897-89-89-897"
              inputProps={{
                pattern: '[+][0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{3}',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              value={number}
              onChange={this.contactInfo}
            />
            {editedContact ? (
              <Button
                disableRipple
                disabled={!this.isValid()}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            ) : (
              <Button
                disableRipple
                disabled={!this.isValid()}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            )}
          </form>
        </div>
      </>
    );
  }
}

export default ContactForm;
