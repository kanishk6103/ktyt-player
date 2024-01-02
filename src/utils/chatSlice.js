import { createSlice } from "@reduxjs/toolkit"
import { MAX_LIVE_MESSAGES } from "../constants";
const chatSlice = createSlice({
    name: "chat",
    initialState: { messages: [], },
    reducers: {
        addMessage: (state, action) => {
            state.messages.unshift(action.payload);
            state.messages.splice(MAX_LIVE_MESSAGES, 1)
        },
    },
});


export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;