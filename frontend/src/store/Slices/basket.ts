import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasketState {
  basketItems: {
    id: string;
    quantity: number;
  }[];
}

const initialState: BasketState = {
  basketItems: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      // trying to find if the item already exists in the basket
      const findExistingItem = state.basketItems.find((item) => item.id === id);
      // if the item already exists, filter it out from the basket
      const filteredBasketItems = state.basketItems.filter(
        (item) => item.id !== id
      );

      if (findExistingItem) {
        // If the item already exists, update its quantity
        return {
          ...state,
          basketItems: [
            ...filteredBasketItems,
            {
              ...findExistingItem,
              quantity: findExistingItem.quantity + quantity,
            },
          ],
        };
      } else {
        // If the item does not exist, add it to the basket
        // state.basketItems.push({ id, quantity });
        return {
          ...state,
          basketItems: [...state.basketItems, action.payload],
        };
      }
    },
    removeOneItemFromCart: (state, action: PayloadAction<string>) => {
      const updatedBasketItems = state.basketItems.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        basketItems: updatedBasketItems,
      };
    },
    resetCart: () => initialState,
  },
});

export const { addToCart, removeOneItemFromCart, resetCart } =
  basketSlice.actions;

export default basketSlice.reducer;
