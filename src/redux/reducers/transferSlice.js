import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    amount:0,
    receiverId:null,
    paymentMethod:null
}

export const transferSlice = createSlice({
    name:'transferSlice',
    initialState,
    reducers:{
        setTransferDetails: (state,action) => {
            state.amount = action.payload.amount
            state.receiverId= action.payload.selectedContact.id
           // state.paymentMethod = action.payload.paymentMethod
        },
        setPaymentMethod:(state,action) =>{
            state.paymentMethod = action.payload
        }
    }
})


// Action creators are generated for each case reducer function
export const {setTransferDetails,setPaymentMethod} = transferSlice.actions

export default transferSlice.reducer