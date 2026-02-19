import {createSlice} from "@reduxjs/toolkit"

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        data : null,
        loading : false,
        error : null
    },

    reducers : {
        setLoading:(state)=>{
            state.loading=true
        },
   
        //state = current home slice ka state
        //action = dispatched action object

        setData:(state, action)=> {
        state.loading = false;
        state.data=action.payload;
        state.error = null;
        },

        setError:(state, action)=> {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const {setData, setError, setLoading} = homeSlice.actions;
export default homeSlice.reducer;
