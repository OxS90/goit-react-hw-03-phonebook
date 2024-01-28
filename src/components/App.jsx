import { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';
import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { contacts } = this.state;
    const name = e.target[0].value;
    const number = e.target[1].value;

    if (contacts.some(contact => contact.name === name)) {
      alert(name + ' is already in contacts.');
      return;
    }
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    const newContacts = [...contacts, newContact];
    this.setState({ contacts: newContacts });
    document.getElementsByTagName('form')[0].reset();
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  deleteContact = e => {
    const idToDelete = e.target.id;
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== idToDelete
    );
    this.setState({ contacts: updatedContacts });
  };

  render() {
    let list = this.state.contacts;
    if (this.state.filter !== '') {
      list = list.filter(contact =>
        contact.name.toLowerCase().includes(this.state.filter)
      );
    }
    return (
      <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm submitFunction={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter filterFunction={this.handleFilterChange} />
        <ContactList listToSearch={list} deleteFunction={this.deleteContact} />
      </div>
    );
  }
}

export default App;
