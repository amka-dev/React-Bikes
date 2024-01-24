import React from 'react'

import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

type PaginationProps = {
	currentPage: number
	onChangePage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
	return (
		<div>
			<ReactPaginate
				className={styles.pagination}
				breakLabel='...'
				nextLabel='>'
				onPageChange={event => onChangePage(event.selected + 1)}
				pageRangeDisplayed={4}
				pageCount={3}
				forcePage={currentPage - 1}
				previousLabel='<'
			/>
		</div>
	)
}

export default Pagination
