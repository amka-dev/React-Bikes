import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ItemType {
	id: string
	title: string
	description: string
	price: number
	imageUrl: string
	types: string[]
	colors: string[]
}

interface ItemsState {
	items: ItemType[]
}

const initialState: ItemsState = {
	items: []
}

const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<ItemType[]>) {
			state.items = action.payload
		}
	}
})

export const { setItems } = itemsSlice.actions

export default itemsSlice.reducer
