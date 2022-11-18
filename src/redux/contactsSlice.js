import { createSlice } from '@reduxjs/toolkit';
const contactsInitialState = [
  { id: '1', name: 'Rosie Simpson', number: '459-12-56', type: 'mobile' },
  { id: '2', name: 'Hermione Kline', number: '443-89-12', type: 'mobile' },
  { id: '3', name: 'Eden Clements', number: '645-17-79', type: 'mobile' },
  { id: '4', name: 'Annie Copeland', number: '227-91-26', type: 'mobile' },
];

const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(contact) {
        return {
          payload: {
            ...contact,
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addContact, deleteContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
