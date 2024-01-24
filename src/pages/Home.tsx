import React from 'react'

import '../App.css'
import '../scss/app.scss'
import axios from 'axios'

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'

import Skeleton from '../components/Skeleton'
import Sort from '../components/Sort'
import Categories from '../components/Categories'
import PizzaBlock from '../components/ItemBlock'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import { useSelector, useDispatch } from 'react-redux'

import { setItems } from '../redux/slices/itemsSlice'
import { RootState } from '../redux/store'

const Home = () => {
	const { categoryId, sort, currentPage } = useSelector((state: RootState) => state.filter)
	const items = useSelector((state: RootState) => state.items.items)
	const dispatch = useDispatch()

	const [status, setStatus] = React.useState('loading')

	const { searchValue } = React.useContext(SearchContext)
	const [isLoading, setIsLoading] = React.useState(true)

	const onClickCategory = React.useCallback((id: number) => {
		dispatch(setCategoryId(id))
	}, [])

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page))
	}

	/*Before the return, everything is related to receiving json from the backend for further display*/
	React.useEffect(() => {
		setIsLoading(true)

		/*Abbreviations for axios request*/
		const sortBy = sort.sortProp.replace('-', '')
		const order = sort.sortProp.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		axios.get(
			`https://6571948ed61ba6fcc012fed0.mockapi.io/parts?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
			.then(async res => {
				dispatch(setItems(res.data))
				setIsLoading(false)
				setStatus('ok')
			})
			.catch(err => {
				setIsLoading(false)

				console.log('error:', err)
				setStatus('error')
			})
		window.scrollTo(0, 0)
	}, [categoryId, sort.sortProp, searchValue, currentPage])

	return (
		<>
			<div className='content__top'>
				<Categories value={categoryId} onClickCategory={onClickCategory} />
				<Sort />
			</div>
			<h2 className='content__title'></h2>
			{status === 'error' ? (
				<div className='cart cart--empty2'>
					<h2>Something went wrong 😕</h2>
					<p>Failed to load products. Check the link, or try again later</p>
					<img src='https://i.gifer.com/3ey.gif' width='300' alt='gif'></img>
				</div>
			) : (
				<div className='content__items'>
					{isLoading
						? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
						: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
				</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />

			<div>
				<p className='content__social'>
					<a href='https://t.me/amka_dev'>
						<img src='https://img.icons8.com/fluency/48/telegram-app.png' alt='telegram-app'></img>
					</a>
					<a href='https://www.instagram.com/amka_dev/'>
						<img src='https://img.icons8.com/fluency/48/instagram-new.png' alt='instagram-new'></img>
					</a>
					<a href='https://wa.me/+905510201707'>
						<img src='https://img.icons8.com/color/48/whatsapp--v1.png' alt='whatsapp--v1'></img>
					</a>
					<a href='https://stackoverflow.com/users/23284541/amir-nasifullin'>
						<img src='https://img.icons8.com/fluency/48/stackoverflow.png' alt='stackoverflow'></img>
					</a>
					<a href='https://github.com/amka-dev'>
						<img src='https://img.icons8.com/ios-filled/50/github.png' alt='github'></img>
					</a>
				</p>
			</div>
		</>
	)
}

export default Home
