import { Link } from 'react-router-dom'
import { IData } from '../interfaces'

interface UserVideoProps {
	item?: IData
}

export const UserVideo: React.FC<UserVideoProps> = ({ item }) => {
	return (
		<Link
			to={`/user/${item?.author?.unique_id || item?.unique_id}`}
			className='flex flex-row '
		>
			<img
				src={item?.author?.avatar || item?.avatar}
				alt=''
				className={'w-14 rounded-[50%] mr-2'}
			/>
			<div className=''>
				<p className='text-xl font-bold'>
					{item?.author?.nickname || item?.nickname}
				</p>
				<span className='text-sm font-normal text-neutral-400'>
					{item?.author?.unique_id || item?.unique_id}
				</span>
			</div>
		</Link>
	)
}
