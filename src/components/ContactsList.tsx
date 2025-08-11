import { useState } from 'react';

interface ContactInput {
  id: string;
  name: string;
  email: string;
  phone: string; 
}

interface ContactsListProps {
  contacts: ContactInput[];
  onDelete: (id: string) => void;
  onSelect: (contact: ContactInput) => void;
}

function ContactsList({ contacts, onDelete, onSelect }: ContactsListProps) {
  const [search, setSearch] = useState('');

  const filteredContacts = search.trim() === ""
    ? contacts
    : contacts.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase()) ||
        contact.phone.includes(search)
      );

  return (
    <>
      <div className="contact-list">
        <input
          className="search"
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <div className="contacts-table">
          {filteredContacts.length > 0 ? (
            filteredContacts.map(contact => (
              <div key={contact.id} className="contact">
                <div onClick={() => onSelect(contact)} className="contact-info">
                  <span>Name: {contact.name}</span> 
                  <span>Email: {contact.email}</span>
                  <span>Number: {contact.phone}</span> 
                </div>
                <button onClick={() => onDelete(contact.id)} className="delete-button">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
              </div>
            ))
          ) : (
            <div>No contacts found</div>
          )}
        </div>
        </div> 
    </>
  );
}

export default ContactsList;
