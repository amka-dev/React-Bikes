import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/store'

interface ItemBlockProps {
	id: string
	title: string
	types: string[]
	colors: string[]
	price: number
	imageUrl: string
}

const ItemBlock: React.FC<ItemBlockProps> = ({ id, imageUrl, title, types, colors, price }) => {
	const cartItem = useSelector((state: RootState) => state.cart.items.find(obj => obj.id === id))
	const dispatch = useDispatch()
	const [activeType, setActiveType] = React.useState(0)
	const [activeColor, setActiveColor] = React.useState(0)

	const addedCount = cartItem ? cartItem.count : 0

	const getItemData = () => {
		return {
			id,
			title,
			price,
			imageUrl,
			types: types[activeType],
			colors: colors[activeColor]
		}
	}

	const onClickAdd = () => {
		const itemData = getItemData()
		dispatch(addItem(itemData))
	}

	return (
		<div className='item-block-wrapper'>
			<div className='item-block'>
				<Link to={`/item/${id}`}>
					<img className='item-block__image' src={imageUrl} alt='item' />
					<h4 className='item-block__title'>{title}</h4>
				</Link>

				<div className='item-block__selector'>
					{' '}
					<ul>
						{types.map((typeId, i) => (
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
						{colors.map((colors, i) => (
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
				<div className='item-block__bottom'>
					<Link to={`/item/${id}`}>
						<div className='item-block__price'>{price} $</div>
					</Link>
					<button onClick={onClickAdd} className='button button--outline button--add'>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span>Add to cart</span>
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div>
		</div>
	)
}

export default ItemBlock
