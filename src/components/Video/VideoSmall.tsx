import { Pause, PlayCircle } from '@mui/icons-material'
import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import { IData } from '../../interfaces'
import { Spinner } from '../Spinner/Spinner'

interface VideoSmallProps {
	item: IData
}

export const VideoSmall: React.FC<VideoSmallProps> = ({ item }) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [isReady, setIsReady] = useState(false)
	const [progress, setProgress] = useState(0)
	const videoRef = useRef<HTMLDivElement>(null)

	const handleClick = () => {
		setIsPlaying(!isPlaying)
		videoRef.current?.parentElement?.classList.toggle('играет видос')
	}
	const handleProgress = ({
		loaded,
		played,
	}: {
		loaded: number
		played: number
	}) => {
		if (!loaded) return
		setProgress(played * 100)
	}
	return (
		<div
			className={`${isPlaying ? 'rounded-2xl mb-3' : 'rounded-2xl mb-3'}`}
			ref={videoRef}
		>
			{!isReady && (
				<div>
					<Spinner />
				</div>
			)}
			<Link to={`/video/${item.video_id}`}>
				<ReactPlayer
					playing={isPlaying}
					loop={true}
					url={item.play}
					width='100%'
					height='360px'
					onProgress={handleProgress}
					onReady={() => setIsReady(true)}
				/>
			</Link>
			<div className='absolute top-[165px] left-[75px]' onClick={handleClick}>
				{isPlaying ? (
					<Pause sx={{ fontSize: 50 }} />
				) : (
					<PlayCircle sx={{ fontSize: 50 }} />
				)}
			</div>
			<div className=''>
				<span className='h-[10px]' style={{ width: `${progress}%` }}></span>
			</div>
		</div>
	)
}
