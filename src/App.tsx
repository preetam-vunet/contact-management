import { useState, useEffect } from 'react';
import AddContact from './components/AddContact';
import ContactsList from './components/ContactsList';
import ContactDetails from './components/ContactDetails';
import './App.css';

interface ContactInput {
  id: string;
  name: string;
  email: string;
  phone: string; 
}

function App() {
  const [contacts, setContacts] = useState<ContactInput[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactInput | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('contactInfo') || '[]');
    setContacts(stored);
  }, []);

  const addContact = (newContact: ContactInput) => {
    const updated = [...contacts, newContact];
    setContacts(updated);
    localStorage.setItem('contactInfo', JSON.stringify(updated));
  };

  const deleteContact = (id: string) => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    localStorage.setItem('contactInfo', JSON.stringify(updated));
    if (selectedContact?.id === id) {
      setSelectedContact(null);
    }
  };

  return (
    <>
      <h2 className="main-heading">Contact Management App</h2>
      <div className="contact-container">
        <AddContact onAddContact={addContact} />
        <ContactsList 
          contacts={contacts} 
          onDelete={deleteContact} 
          onSelect={(contact) => setSelectedContact(contact)} 
        />
        <ContactDetails 
          contact={selectedContact} 
          onClose={() => setSelectedContact(null)} 
        />
      </div>
    </>
  );
}

export default App;
