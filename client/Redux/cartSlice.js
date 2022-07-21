import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
  name: "cart",
  initialState: { price: 0, dishes: {} },
  reducers: {
    setCart : (state,action) => {
      console.log("action:", action)
      //update quantity
      const qty = state.dishes[action.payload.dishId]
      ? state.dishes[action.payload.dishId].quantity + 1
      : 1;
      //new dish obj
    const newDishObj = {
      price: action.payload.price,
      name: action.payload.name,
      quantity: qty,
    };
    state = {...state,
     dishes: {
        ...state.dishes,
        [action.payload.dishId]: newDishObj,
      },
      price: (
        Number(state.price) + Number(action.payload.price.slice(1))
      ).toFixed(2)
    };
    console.log('state', state)
    }
  }
})

export const { setCart } =
  cartSlice.actions;
export default cartSlice.reducer;