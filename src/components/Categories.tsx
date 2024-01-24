import React from 'react'

interface CategoriesProps {
	value: number
	onClickCategory: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
	/* array with category names */
	const categories = ['All', 'Suspension fork', 'Rear suspension', 'Pedals', 'Grips', 'Equipment']

	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, i) => (
					/* This is where the names of the items in the array are converted from the identifier to their names */
					<li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
