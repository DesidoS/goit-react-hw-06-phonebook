import { useSelector } from 'react-redux';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Section from './Section';
import { Container } from './App.styled';

const App = () => {
  const contacts = useSelector(state => state.contacts);
  return (
    <Container>
      <Section title="" header="Phonebook">
        <ContactForm />
      </Section>
      {contacts.length > 0 && (
        <Section header="" title="Contacts">
          <Filter />
          <ContactList />
        </Section>
      )}
    </Container>
  );
};

export default App;
