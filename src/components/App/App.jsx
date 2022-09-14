import Form from "../ContactForm/ContactForm";
import ContactsList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import { ContactsTitle } from './App.styled';
import { useDispatch } from 'react-redux';
import { updateFilter } from "../../redux/filter/filter-actions";

export function App() {
    const dispatch = useDispatch();

  const handleFilter = (e) => {
    const { value } = e.target;
    dispatch(updateFilter(value));
  };
  
  return (
    <div>
      <ContactsTitle>Phonebook</ContactsTitle>
      <Form />
      <ContactsList />
      <Filter handleFilter={handleFilter} />
    </div>
  )
}


