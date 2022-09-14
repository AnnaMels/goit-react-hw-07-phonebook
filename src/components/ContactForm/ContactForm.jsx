import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import { useState } from 'react';
import { ContactForm } from './ContactForm.styled';
import { AddContactButton } from './ContactForm.styled';
import { Input } from './ContactForm.styled';
import { Label } from './ContactForm.styled';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// import { saveContact } from "../../components/redux/contacts/contacts-actions";
import { fetchContacts, addContact } from "../redux/contacts/contacts-operations";
// import { getContacts } from "../../api/contacts";

export default function Form() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch]);

    const handleNameInfo = e => {
        const { name, value } = e.target;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value)
                break;
            default:
                break;
        }
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        const newData = {
            id: nanoid(),
            name,
            number
        }
        
        dispatch(addContact(newData))
        reset();
    }


    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <ContactForm onSubmit={onFormSubmit}>
            <Label>Name
                <Input
                    onChange={handleNameInfo}
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </Label>
            <Label>Number
                <Input
                    onChange={handleNameInfo}
                    type="tel"
                    name="number"
                    value={number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </Label>
            <AddContactButton>Add contact</AddContactButton>
        </ContactForm>
    );
}

Form.propTypes = {
        name: PropTypes.string,
        number: PropTypes.number
    };

