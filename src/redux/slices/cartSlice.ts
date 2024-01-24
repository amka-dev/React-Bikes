import { createSlice } from '@reduxjs/toolkit'

import { getCartFromLS } from '../../utils/getCartFromLS'
import { calcTotalPrice } from '../../utils/calcTotalPrice'

interface CartSliceState {
	totalPrice: number
	items: CartItem[]
}

type CartItem = {
	id: string
	title: string
	types: string
	colors: string
	price: number
	count: number
	imageUrl: string
}

const cartData = getCartFromLS()

const initialState: CartSliceState = {
	totalPrice: cartData.totalPrice,
	items: cartData.items
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			const findItem = state.items.find(obj => obj.id === action.payload.id)

			if (findItem) {
				findItem.count++
			} else {
				state.items.push({ ...action.payload, count: 1 })
			}

			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum
			}, 0)
		},

		minusItem(state, action) {
			const findItem = state.items.find(obj => obj.id === action.payload.id)

			if (findItem) {
				if (findItem.count > 1) {
					findItem.count--
				}
			} else {
				state.items.push({ ...action.payload, count: 1 })
			}

			state.totalPrice = calcTotalPrice(state.items)
		},
		removeItem(state, action) {
			state.items = state.items.filter(item => item.id !== action.payload.id)

			state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0)
		},

		clearItems(state, action) {
			state.items = []
			state.totalPrice = 0
		}
	}
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer
