import { useState } from 'react';

interface ContactInput {
  id: string;
  name: string;
  email: string;
  phone: string; 
}

interface AddContactProps {
  onAddContact: (contact: ContactInput) => void;
}

function AddContact({ onAddContact }: AddContactProps) {
  const [input, setInput] = useState<ContactInput>({
    id: '',
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const updateInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput(values => ({ ...values, [name]: value }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!input.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (input.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(input.email.trim())) {
      newErrors.email = 'Invalid email format';
    }

    if (input.phone.trim()) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(input.phone.trim())) {
        newErrors.phone = 'Phone must be exactly 10 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearInputs = () => {
    setInput({ id: '', name: '', email: '', phone: '' });
    setErrors({});
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const newContact = { ...input, id: Date.now().toString() };
    onAddContact(newContact);
    clearInputs();
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <div className="input-wrapper">
        <div className="input-title">Name</div>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={updateInputs}
        />
        {errors.name && <div className="error-msg">{errors.name}</div>}
      </div>

      <div className="input-wrapper">
        <div className="input-title">Email Address</div>
        <input
          type="email"
          name="email"
          value={input.email}
          onChange={updateInputs}
        />
        {errors.email && <div className="error-msg">{errors.email}</div>}
      </div>

      <div className="input-wrapper">
        <div className="input-title">Phone Number</div>
        <input
          type="tel"
          name="phone"
          value={input.phone}
          onChange={updateInputs}
        />
        {errors.phone && <div className="error-msg">{errors.phone}</div>}
      </div>

      <button className="save-button" type="submit">Save Contact</button>
      <button className="close-button" type="button" onClick={clearInputs}>Clear</button>
    </form>
  );
}

export default AddContact;
