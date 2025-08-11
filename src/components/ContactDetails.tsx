interface ContactInput {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ContactDetailsProps {
  contact: ContactInput | null;
  onClose: () => void;
}

function ContactDetails({ contact, onClose }: ContactDetailsProps) {
  if (!contact) return null;

  return (
    <div className="contact-details">
      <div className="contact-info">
        <div><strong>Name:</strong> {contact.name}</div>
        <div><strong>Email:</strong> {contact.email}</div>
        <div><strong>Phone:</strong> {contact.phone}</div>
      </div>
      <button className="close-button " onClick={onClose}>Close</button>
    </div>
  );
}

export default ContactDetails;
