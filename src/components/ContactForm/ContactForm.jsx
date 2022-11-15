import { useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import {
  Form,
  Label,
  Field,
  Add,
  TypeLabel,
  Type,
  Radio,
  OpenForm,
} from './ContactForm.styled';
import {
  Flipper,
  Flipped,
} from 'https://cdn.skypack.dev/react-flip-toolkit@7.0.13';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/actions';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setContactName] = useState('');
  const [number, setNumber] = useState('');
  const [type, setType] = useState('mobile');
  const ref = useRef();

  const toggleState = () => {
    if (isOpen) return;
    setIsOpen(!isOpen);
    ref.current.blur();
  };

  const onInputChange = e => {
    const fieldName = e.currentTarget.name;
    const fieldValue = e.currentTarget.value;

    if (fieldName === 'name') {
      setContactName(fieldValue);
    }
    if (fieldName === 'number') {
      setNumber(fieldValue);
    }
    if (fieldName === 'type') {
      setType(fieldValue);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    if (contacts.length > 0) {
      const contactsInPhonebook = [];
      contacts.forEach(({ name }) =>
        contactsInPhonebook.push(name.toLowerCase())
      );
      if (contactsInPhonebook.includes(name.toLowerCase())) {
        Notify.warning(`${name}is already in contacts.`);
        form.reset();
        return;
      }
    }
    dispatch(addContact({ id: nanoid(), name, number, type }));
    form.reset();
    setIsOpen(false);
  };

  return (
    <>
      <Flipper flipKey={isOpen} spring="stiff" stagger>
        {isOpen ? (
          <Flipped flipId="wrapper">
            <div ref={ref}>
              <Form onSubmit={onSubmit}>
                <Label>
                  Name
                  <Field
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={onInputChange}
                  />
                </Label>
                <Label>
                  Number
                  <Field
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={onInputChange}
                  />
                </Label>
                <Type>
                  <TypeLabel>
                    <p>📱</p>
                    <Radio
                      type="radio"
                      checked={type === 'mobile'}
                      name="type"
                      value="mobile"
                      onChange={onInputChange}
                    />
                  </TypeLabel>
                  <TypeLabel>
                    <p>🏭</p>
                    <Radio
                      type="radio"
                      checked={type === 'work'}
                      name="type"
                      value="work"
                      onChange={onInputChange}
                    />
                  </TypeLabel>
                  <TypeLabel>
                    <p>🏠</p>
                    <Radio
                      type="radio"
                      checked={type === 'home'}
                      name="type"
                      value="home"
                      onChange={onInputChange}
                    />
                  </TypeLabel>
                </Type>
                <Add type="submit">Add contact</Add>
                <OpenForm type="button" onClick={() => setIsOpen(false)}>
                  ❌
                </OpenForm>
              </Form>
            </div>
          </Flipped>
        ) : (
          <Flipped flipId="wrapper">
            <div ref={ref} onClick={toggleState}>
              <Flipped flipId="action">
                <OpenForm>➕</OpenForm>
              </Flipped>
            </div>
          </Flipped>
        )}
      </Flipper>
    </>
  );
};

export default ContactForm;
