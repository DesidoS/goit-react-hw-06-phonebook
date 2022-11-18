import { Delete, List, Item } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { GiFactory, GiSmartphone, GiFamilyHouse } from 'react-icons/gi';
import { TiDelete } from 'react-icons/ti';

const ContactList = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const handleDelete = id => dispatch(deleteContact(id));
  const getVisibleContacts = () => {
    if (!state.filters) return state.contacts;
    return state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(state.filters?.toLowerCase())
    );
  };

  const visibleContacts = getVisibleContacts();
  if (!visibleContacts) return;
  return (
    <List>
      {visibleContacts.map(({ id, name, number, type }) => (
        <Item key={id}>
          <Delete
            onClick={() => {
              handleDelete(id);
            }}
          >
            <TiDelete
              style={{
                color: 'tomato',
                fontSize: '36px',
                marginBottom: '-4px',
              }}
            />
          </Delete>
          {type === 'mobile' && <GiSmartphone />}
          {type === 'work' && <GiFactory />}
          {type === 'home' && <GiFamilyHouse />}
          {name}: {number}
        </Item>
      ))}
    </List>
  );
};
export default ContactList;
