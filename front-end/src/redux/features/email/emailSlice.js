import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {toast} from 'react-toastify';
import authService from "../auth/authService";
import emailService from "./emailService";
import {register} from "../auth/authSlice";

const initialState = {
    sendingEmail: false,
    emailSent: false,
    message: ""
};

// Send Automated Email
export const sendAutomatedEmail = createAsyncThunk("email/sendAutomatedEmail", async (userData, thunkAPI) => {
        try {
            return await emailService.sendAutomatedEmail(userData);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const emailSlice = createSlice({
    name: "email",
    initialState,
    reducers: {
        EMAIL_RESET(state) {
            state.sendingEmail = false;
            state.emailSent = false;
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder

            // ---------- Send Automated Email
            .addCase(sendAutomatedEmail.pending, (state) => {
                state.sendingEmail = true;
            })
            .addCase(sendAutomatedEmail.fulfilled, (state, action) => {
                state.sendingEmail = true;
                state.emailSent = true;
                state.message = action.payload;
                toast.success(action.payload);
            })
            .addCase(sendAutomatedEmail.rejected, (state, action) => {
                state.sendingEmail = false;
                state.emailSent = false;
                state.message = action.payload;
                toast.error(action.payload);
            })
    }
});

export const {EMAIL_RESET} = emailSlice.actions;
export default emailSlice.reducer;