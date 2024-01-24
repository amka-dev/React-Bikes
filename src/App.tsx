/* Main page of react bikes */

import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import ItemPage from './pages/ItemPage'
import NotFound from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'

interface SearchContextType {
	searchValue: string
	setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

export const SearchContext = React.createContext<SearchContextType>({ searchValue: '', setSearchValue: () => {} })

function App() {
	const [searchValue, setSearchValue] = React.useState('')

	return (
		<div className='wrapper'>
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className='content'>
					<div className='container'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/cart' element={<Cart />} />
							<Route path='/item/:id' element={<ItemPage />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</div>
				</div>
			</SearchContext.Provider>
		</div>
	)
}

export default App
