import { PlayArrow } from '@mui/icons-material'
import { Video } from '../components/Video/Video'
import { numberToLetters } from '../Helpers/numberToLetters'
import { IData } from '../interfaces'

interface VideoUserItemProps {
	item: IData
}

export const VideoUserItem: React.FC<VideoUserItemProps> = ({ item }) => {
	const width1 = '200px'
	const height1 = '360px'
	return (
		<div className='bg-neutral-950 relative flex justify-center items-center  border-neutral-800 border-[1px] overflow-hidden rounded-md'>
			<div className='relative '>
				<Video
					width={width1}
					height={height1}
					className='relative'
					item={item}
				></Video>
			</div>

			<div className='absolute top-2 right-2'>
				<PlayArrow />
				<span>{numberToLetters(item.play_count!)}</span>
			</div>
			{/* <div className='video-title'>{item.title}</div> */}
		</div>
	)
}
