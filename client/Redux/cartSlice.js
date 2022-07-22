import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { price: 0, dishes: {}, counter: 0 },
  reducers: {
    setCart: (state, action) => {
      //update quantity
      console.log((state.counter += 1));
      const qty = state.dishes[action.payload.dishId]
        ? state.dishes[action.payload.dishId].quantity + 1
        : 1;
      //new dish obj
      const newDishObj = {
        price: action.payload.price,
        name: action.payload.name,
        quantity: qty,
      };

      state.dishes = {
        ...state.dishes,
        [action.payload.dishId]: newDishObj,
      };

      state.price = Number(
        Number(state.price) +
          Number(action.payload.price.slice(1).replace(/,/g, ""))
      ).toFixed(2);
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
