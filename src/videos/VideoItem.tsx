import { VideoSmall } from '../components/Video/VideoSmall'
import { IData } from '../interfaces'
import { UserVideoSmall } from './UserVideoSmall'

interface VideoItemProps {
	item: IData
}

export const VideoItem: React.FC<VideoItemProps> = ({ item }) => {
	return (
		<div className='w-[220px] bg-neutral-800 p-2 rounded-2xl'>
			<UserVideoSmall item={item} />
			<div className='relative'>
				<VideoSmall item={item} />
			</div>

			<div
				style={{ overflow: 'hidden' }}
				className='h-[40px] text-sm font-thin'
			>
				{item.title}
			</div>
		</div>
	)
}
