import { MusicNote } from '@mui/icons-material'
import { useGetFeedQuery } from '../../service/api'
import { UserVideo } from '../../videos/UserVideo'
import { VideoDetails } from '../../videos/VideoDetails'
import { Spinner } from '../Spinner/Spinner'
import { Video } from '../Video/Video'

export const Feed = () => {
	const region = 'RU'
	const width = '100%'
	const height = '720px'
	const { data: feed, isLoading } = useGetFeedQuery(region)

	console.log('feed', feed)

	return !isLoading ? (
		<div className='flex flex-col items-center justify-center gap-20 py-5 bg-neutral-950'>
			{feed?.data.map(item => {
				return (
					<div
						key={item.video_id}
						className='w-[440px] bg-neutral-800 p-5 rounded-2xl'
					>
						<UserVideo item={item} />
						<div className='relative'>
							<Video width={width} height={height} item={item} />
							<VideoDetails item={item} />
						</div>
						<div className='flex text-sm font-thin mb-2 mt-3'>
							<span>original:</span>
							<MusicNote />
							<p className='music-title'>{item.music_info?.title}</p>
						</div>

						<div className='video-title'>{item.title}</div>
					</div>
				)
			})}
		</div>
	) : (
		<Spinner />
	)
}
