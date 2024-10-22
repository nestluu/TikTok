import { Link } from 'react-router-dom'
import { IData } from '../interfaces'

interface UserVideoSmallProps {
	item: IData
}

export const UserVideoSmall: React.FC<UserVideoSmallProps> = ({ item }) => {
	return (
		<Link
			to={`/user/${item?.author?.unique_id}`}
			className='flex flex-row mb-5'
		>
			<img
				src={item?.author?.avatar}
				alt=''
				className={'w-12 h-12 rounded-[50%] mr-2'}
			/>
			<div className=''>
				<p className='text-md font-medium'>{item?.author?.nickname}</p>
				<span className='text-xs font-thin'>{item?.author?.unique_id}</span>
			</div>
		</Link>
	)
}
