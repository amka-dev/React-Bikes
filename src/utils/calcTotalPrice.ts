type CartItem = {
	id: string
	title: string
	types: string
	colors: string
	price: number
	count: number
	imageUrl: string
}

export const calcTotalPrice = (items: CartItem[]) => {
	return items.reduce((sum, obj) => sum + obj.price * obj.count, 0)
}
