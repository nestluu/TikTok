// import { useInfiniteQuery } from '@tanstack/react-query'
// import { useState } from 'react'
// import { fetchDataByKeywords } from '../service/common'

// const region = 'RU'
// type Params = {
// 	keywords: string | null
// 	cursor: number
// 	region?: string
// }

// export const useSearch = () => {
// 	const [params, setParams] = useState<Params>({
// 		keywords: '',
// 		cursor: 0,
// 		region,
// 	})
// 	const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
// 		queryKey: ['searchFeed', params.keywords],
// 		queryFn: ({ pageParam = params }: { pageParam: Params }) =>
// 			fetchDataByKeywords(pageParam),
// 		getNextPageParam: data => {
// 			return data?.data.hasMore
// 				? { ...params, cursor: data.data.cursor }
// 				: undefined
// 		},
// 		enabled: !!params.keywords,
// 		select: data => data.pages,
// 		initialPageParam: { cursor: 0, keywords: params.keywords },
// 	})
// 	return { data, isFetching, params, setParams, fetchNextPage, hasNextPage }
// }

import { useEffect, useState } from 'react'
import { useLazySearchVideosQuery } from './../service/api'

export const useSearch = () => {
	const [params, setParams] = useState({
		keywords: '',
		cursor: 0,
		region: 'RU',
	})
	const [trigger, { data, isFetching, isError }] = useLazySearchVideosQuery()

	const fetchNextPage = () => {
		if (data?.data.hasMore) {
			trigger({
				keywords: params.keywords,
				cursor: data.data.cursor,
				region: params.region,
			})
		}
	}

	useEffect(() => {
		if (params.keywords) {
			trigger(params)
		}
	}, [trigger, params])

	return {
		data,
		isFetching,
		isError,
		fetchNextPage,
		hasNextPage: data?.data.hasMore ?? false,
		setParams,
	}
}
