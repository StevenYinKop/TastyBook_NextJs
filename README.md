# TastyBook

## Implement Redux in Next.js project
1. npm install `npm install @reduxjs/toolkit react-redux`
2. create folder and files `/lib/stores.ts`, `lib/features/cart-slice.ts`

`/lib/stores.ts`:
```typescript
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        
    }
});

```
`lib/features/cart-slice.ts`:
```typescript
import {createSlice, Payload} from "@reduxjs/toolkit";

type CartState = {
    uid: string
    cuisineList: Cart[]
}

// define initial state type
type InitialState = {
    value: CanvasRect;
}

// create object containing all states
const initialState = {
    value: {
        uid: "",
        cuisineList: []
    }
}

export const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addIntoCart: (state, action: PayloadAction<Cuisine>) => {
            const cuisineList = [...state.cuisineList];
            cuisineList.push(action.payload);
            return {
                value: {
                    uid: state.uid,
                    cuisineList
                }
            }
        },
        clearCart: () => initialState
    }
});

export const { addIntoCarts, clearCart } = cart.actions;
export default cart.reducer
```

`/lib/stores.ts`:
```typescript
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

`/lib/provider.tsx`
```typescript
'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../../../lib/store'

export default function StoreProvider({ children }: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}

```


## How to use Redux?
```typescript
import { addIntoCart, clearCart } from "@/lib/features/cart-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/stores";

expot default function Page() {
    const dispatch = useDispatch<AppDispatch>();
    // to dispatch action
    dispatch(addIntoCart({...}));

    // use the variable stored in redux
    const carts = useAppSelector((state: ) => state.cartReducer.value.carts);
}

```
