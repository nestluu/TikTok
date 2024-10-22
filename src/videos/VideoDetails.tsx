import ChatBubble from '@mui/icons-material/ChatBubble'
import Favorite from '@mui/icons-material/Favorite'
import PlayArrow from '@mui/icons-material/PlayArrow'
import Share from '@mui/icons-material/Share'
import { numberToLetters } from '../Helpers/numberToLetters'
import { IData } from '../interfaces'

interface VideoDetailsProps {
	item: IData
}

export const VideoDetails: React.FC<VideoDetailsProps> = ({ item }) => {
	const details = [
		{
			icon: <PlayArrow sx={{ fontSize: 30 }} />,
			count: item.play_count,
		},
		{
			icon: <ChatBubble sx={{ fontSize: 30 }} />,
			count: item.comment_count,
		},
		{
			icon: <Share sx={{ fontSize: 30 }} />,
			count: item.share_count,
		},
		{
			icon: <Favorite sx={{ fontSize: 30 }} />,
			count: item.digg_count,
		},
	]
	return (
		<ul
			style={{ background: 'rgba(0, 0, 0, 0.5)' }}
			className='flex flex-col gap-3 absolute top-[35%] right-0 rounded-2xl p-[10px]'
		>
			{details.map(({ icon, count }, i) => (
				<li key={i} className='flex flex-col items-center'>
					<div className=''>{icon}</div>
					<p
						style={{ textShadow: '0px 0px 5px black' }}
						className='font-thin text-sm'
					>
						{numberToLetters(count!)}
					</p>
				</li>
			))}
		</ul>
	)
}
