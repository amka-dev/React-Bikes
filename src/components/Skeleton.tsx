import ContentLoader from 'react-content-loader'

const Skeleton = () => (
	<ContentLoader
		speed={2}
		width={280}
		height={475}
		viewBox='0 0 280 475'
		backgroundColor='#F4F4F4'
		foregroundColor='#cccaca'
		className='content-loader'
	>
		<rect x='5' y='1' rx='10' ry='10' width='260' height='260' />
		<rect x='15' y='270' rx='10' ry='10' width='240' height='34' />
		<rect x='0' y='437' rx='10' ry='10' width='65' height='30' />
		<rect x='125' y='430' rx='19' ry='30' width='155' height='45' />
		<rect x='0' y='318' rx='10' ry='10' width='275' height='85' />
	</ContentLoader>
)

export default Skeleton
