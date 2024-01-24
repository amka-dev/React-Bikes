import React from 'react'

import debounce from 'lodash.debounce'

import { SearchContext } from '../../App'

const Search = () => {
	const [value, setValue] = React.useState('')
	const { setSearchValue } = React.useContext(SearchContext)

	const inputRef = React.useRef<HTMLInputElement>(null)

	const onClear = () => {
		setSearchValue('')
		setValue('')
		inputRef.current?.focus()
	}

	const updateSearchValue = React.useCallback(
		debounce(str => {
			setSearchValue(str)
		}, 1000),
		[]
	)

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	return (
		<div className='search'>
			<img
				className='search__iconSearch'
				width='20px'
				height='20px'
				src='https://img.icons8.com/ios/50/search--v1.png'
				alt='search--v1'
			/>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className='search__input'
				placeholder='Type for search'
			></input>
			{value && (
				<img
					onClick={onClear}
					className='search__iconClear'
					width='24px'
					height='24px'
					src='https://img.icons8.com/external-linear-outline-icons-papa-vector/78/external-Cross-Mark-interface-linear-outline-icons-papa-vector.png'
					alt='external-Cross-Mark-interface-linear-outline-icons-papa-vector'
				/>
			)}
		</div>
	)
}

export default Search
