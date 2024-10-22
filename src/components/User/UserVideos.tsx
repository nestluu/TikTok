import { Loop } from '@mui/icons-material'
import { Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IData } from '../../interfaces'
import { useFetchUserVideosQuery } from '../../service/api'
import { VideoUserItem } from '../../videos/VideoUserItem'
import { Spinner } from '../Spinner/Spinner'

export const UserVideos = () => {
	const [items, setItems] = useState<IData[]>([])
	const [cursor, setCursor] = useState(0)
	const { unique_id } = useParams()

	const { data, isLoading, isError } = useFetchUserVideosQuery({
		unique_id,
		cursor,
	})

	useEffect(() => {
		const currentVideos = data?.data?.videos || []

		if (!currentVideos.length) return

		setItems(_items => [..._items, ...currentVideos])
	}, [data])

	if (isLoading) {
		return <Spinner />
	}
	if (isError || (data?.code !== undefined && +data?.code === -1)) {
		return (
			<Alert severity='error' sx={{ width: '100%' }}>
				{data?.msg || 'Something went wrong. Try again later'}
			</Alert>
		)
	}

	if (!data?.data) {
		return <Alert severity='info'>{unique_id} doesn't have videos yet</Alert>
	}

	const { hasMore, cursor: next } = data?.data

	const handleLoadMore = () => {
		setCursor(next ?? cursor)
	}

	return (
		<div className='flex flex-col'>
			{items.length ? (
				<>
					<div className='flex flex-row gap-3 flex-wrap justify-between'>
						{items.map(item => (
							<VideoUserItem key={item.id} item={item} />
						))}
					</div>
					<div className='flex items-center justify-center mt-3 mb-3'>
						{hasMore && (
							<button
								onClick={handleLoadMore}
								className='flex items-center justify-center gap-2 p-2 bg-neutral-700 rounded-lg hover:bg-zinc-800'
							>
								<Loop />
								<span>Load more</span>
							</button>
						)}
					</div>
				</>
			) : (
				<Alert severity='info'>{unique_id} doesn't have videos yet</Alert>
			)}
		</div>
	)
}
