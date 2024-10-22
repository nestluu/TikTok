import { Pause, PlayCircle } from '@mui/icons-material'
import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import { IData } from '../../interfaces'
import { Spinner } from '../Spinner/Spinner'

interface VideoProps {
	item: IData
	width: string
	height: string
	className?: string
}

export const Video: React.FC<VideoProps> = ({ item, width, height }) => {
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
		<div className={`${isPlaying ? 'rounded-2xl' : 'bg-black'}`} ref={videoRef}>
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
					width={width}
					height={height}
					onProgress={handleProgress}
					onReady={() => setIsReady(true)}
				/>
			</Link>
			<div
				className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
				onClick={handleClick}
			>
				{isPlaying ? (
					<Pause sx={{ fontSize: 60 }} />
				) : (
					<PlayCircle sx={{ fontSize: 60 }} />
				)}
			</div>
			<div className=''>
				<span className='h-[10px]' style={{ width: `${progress}%` }}></span>
			</div>
		</div>
	)
}
