import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    filteredUsers: []
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_USERS(state, action) {
            const {users, search} = action.payload;
            state.filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()));
        }
    }
});

export const {FILTER_USERS} = filterSlice.actions;

export const selectUsers = (state) => state.filter.filteredUsers;

export default filterSlice.reducer;