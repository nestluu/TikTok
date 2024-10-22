import { Alert } from '@mui/material'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'react-router-dom'
import { useSearch } from '../../hooks/useSearch'
import { VideoItem } from '../../videos/VideoItem'
import { Spinner } from '../Spinner/Spinner'

export const SearchFeed = () => {
	const [searchParams] = useSearchParams()
	const query = searchParams.get('q')
	const { data, isFetching, setParams, fetchNextPage, hasNextPage } =
		useSearch()

	console.log('data', data)

	useEffect(() => {
		setParams(prevParams => ({
			...prevParams,
			keywords: query || '',
			cursor: 0,
		}))
	}, [setParams, query])

	const videos = data?.data?.videos || []

	return (
		<div className='bg-neutral-950'>
			{!videos.length && !isFetching && (
				<Alert severity='error'>Nothing found for {query}</Alert>
			)}
			{videos.length > 0 && (
				<InfiniteScroll
					loader={<h4>Loading...</h4>}
					dataLength={videos.length}
					scrollThreshold={'600px'}
					hasMore={hasNextPage}
					next={fetchNextPage}
				>
					<div className='flex items-center justify-center mt-5 bg-neutral-950'>
						<div className='grid grid-cols-2 gap-5 bg-neutral-950'>
							{videos.map(videoItem => (
								<VideoItem key={videoItem.video_id} item={videoItem} />
							))}
						</div>
					</div>
				</InfiniteScroll>
			)}
			{isFetching && <Spinner />}
		</div>
	)
}
