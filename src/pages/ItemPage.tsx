import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../redux/slices/cartSlice'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/store'

interface ItemType {
	id: string
	title: string
	description: string
	price: number
	imageUrl: string
	types: string[]
	colors: string[]
}

const ItemPage: React.FC = () => {
	const [item, setItem] = React.useState<ItemType | null>(null)
	const { id } = useParams()
	const dispatch = useDispatch()
	const cartItem = useSelector((state: RootState) => state.cart.items.find(obj => obj.id === id))

	const [activeType, setActiveType] = React.useState(0)
	const [activeColor, setActiveColor] = React.useState(0)

	React.useEffect(() => {
		async function fetchItem() {
			try {
				const { data } = await axios.get('https://6571948ed61ba6fcc012fed0.mockapi.io/parts/' + id)
				setItem(data)
			} catch (error) {
				alert('Error fetching item')
			}
		}

		fetchItem()
	}, [id])

	if (!item) {
		return (
			<div className='itemFull__loader'>
				<img src='https://i.gifer.com/XOsX.gif' width='300' alt='gif'></img>
				<h3>loading</h3>
			</div>
		)
	}

	const addedCount = cartItem ? cartItem.count : 0

	const handleAddToCart = () => {
		const itemData = {
			id: item.id,
			title: item.title,
			price: item.price,
			imageUrl: item.imageUrl,
			types: item.types[activeType],
			colors: item.colors[activeColor]
		}
		dispatch(addItem(itemData))
	}

	return (
		<div className='itemFull'>
			<img src={item.imageUrl} alt={item.title} />
			<div className='itemFull__info'>
				<h1>{item.title}</h1>
				<p>{item.description}</p>
				<h2>{item.price} $</h2>

				<div className='itemFull__selector'>
					{' '}
					<ul>
						{item.types.map((typeId, i) => (
							<li
								key={typeId}
								onClick={() => setActiveType(i)}
								className={activeType === i ? 'active' : ''}
							>
								{typeId}
							</li>
						))}
					</ul>
					<ul>
						{item.colors.map((colors, i) => (
							<li
								key={colors}
								onClick={() => setActiveColor(i)}
								className={activeColor === i ? 'active' : ''}
							>
								{colors}
							</li>
						))}
					</ul>
				</div>

				<button onClick={handleAddToCart} className='button button--outline button--add'>
					<svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
							fill='white'
						/>
					</svg>
					<span>Add to cart</span>
					{addedCount > 0 && <i>{addedCount}</i>}
				</button>
				<div className='itemFull__btn'>
					<Link to='/' className='button button--outline button--add go-back-btn'>
						<svg width='8' height='14' viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M7 13L1 6.93015L6.86175 1'
								stroke='#D3D3D3'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>

						<span>Back</span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ItemPage
