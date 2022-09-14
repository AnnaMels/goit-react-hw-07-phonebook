import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/contacts";

export const fetchContacts = createAsyncThunk(
    'contacts/fetch',
    async (_, thunkAPI) => {
        try {
            const contacts = await api.getContacts();
            return contacts;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

const isDublicate = ({ name }, contacts) => {
    const normalizedName = name.toLowerCase();

    const result = contacts.find(item => {
        return (normalizedName === item.name.toLowerCase())
    });

    return Boolean(result);
};

export const addContact = createAsyncThunk(
    'contacts/add',
    async (data, { rejectWithValue }) => {
        try {
            const result = await api.addContact(data);
            return result;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
    {
        condition: (data, { getState }) => {
            const { contacts } = getState();
            if (isDublicate(data, contacts.items)) {
                alert(`${data.name}  is alredy exist`);
                return false;
            }
        }
    }
);

export const removeContact = createAsyncThunk(
    'contacts/remove',
    async (id, { rejectWithValue }) => {
        try {
            await api.removeContact(id);
            return id;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

