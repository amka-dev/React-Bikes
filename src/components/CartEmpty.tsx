import { Link } from 'react-router-dom'

const CartEmpty = () => {
	return (
		<div className='cart cart--empty'>
			<h2>Cart is empty 😕</h2>
			<p>
				Add something to your cart and come again
				<br /> To return to the main page, click the button below.
			</p>
			<img src='https://i.gifer.com/2rK.gif' width='300' alt='gif'></img>
			<Link to='/' className='button button--black'>
				<span>Return to main </span>
			</Link>
		</div>
	)
}

export default CartEmpty
