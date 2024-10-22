import { Pause, PlayCircle } from '@mui/icons-material'
import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { IData } from '../../interfaces'
import { Spinner } from '../Spinner/Spinner'

interface VideoElemProps {
	item?: IData
	width: string
	height: string
}

export const VideoElem: React.FC<VideoElemProps> = ({
	item,
	width,
	height,
}) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [isReady, setIsReady] = useState(false)
	const [progress, setProgress] = useState(0)
	const videoRef = useRef(null)

	const handleClick = () => {
		setIsPlaying(!isPlaying)
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
			className={`${isPlaying ? 'rounded-2xl' : 'rounded-2xl'}`}
			ref={videoRef}
		>
			{!isReady && (
				<div>
					<Spinner />
				</div>
			)}
			<ReactPlayer
				playing={isPlaying}
				loop={true}
				url={item?.play}
				width={width}
				height={height}
				onProgress={handleProgress}
				onReady={() => setIsReady(true)}
			/>
			<div className={`absolute top-[47%] left-[45%]`} onClick={handleClick}>
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
