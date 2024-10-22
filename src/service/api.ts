import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
	ApiResponse,
	ApiResponseSearch,
	fetchCommentsParams,
	fetchDataByKeywordsParams,
	fetchUserVideos,
	fetchVideoResponse,
	ICommnetsResponse,
	UserResponse,
	UserVideoResponse,
} from '../interfaces'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://tiktok-video-no-watermark2.p.rapidapi.com',
		prepareHeaders: headers => {
			headers.set(
				'x-rapidapi-key',
				'28baa93e0emsh7a9b6210a17f289p1cfdcbjsn0f6cef6fe033'
			)
			headers.set(
				'x-rapidapi-host',
				'tiktok-video-no-watermark2.p.rapidapi.com'
			)
			return headers
		},
	}),
	endpoints: builder => ({
		searchVideos: builder.query<ApiResponseSearch, fetchDataByKeywordsParams>({
			query: ({ keywords, cursor, region = 'RU' }) => ({
				url: `/feed/search`,
				params: {
					keywords,
					count: 10,
					cursor,
					region,
				},
			}),
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName
			},
			merge: (currentCache, newItems) => {
				currentCache.data.videos.push(...newItems.data.videos)
				currentCache.data.cursor = newItems.data.cursor
				currentCache.data.hasMore = newItems.data.hasMore
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg?.keywords !== previousArg?.keywords
			},
		}),
		getFeed: builder.query<ApiResponse, string>({
			query: region => ({
				url: `/feed/list?region=${region}&count=20`,
			}),
		}),
		getUser: builder.query<UserResponse, string>({
			query: unique_id => ({
				url: `user/info?unique_id=${unique_id}`,
			}),
		}),
		fetchUserVideos: builder.query<UserVideoResponse, fetchUserVideos>({
			query: ({ unique_id, cursor }) => ({
				url: `user/posts?unique_id=${unique_id}&count=10&cursor=${cursor}`,
			}),
		}),
		getComments: builder.query<ICommnetsResponse, fetchCommentsParams>({
			query: ({ id, cursor }) => ({
				url: `comment/list`,
				params: {
					url: `https://www.tiktok.com/video/${id}&count=10&cursor=${cursor}`,
				},
			}),
		}),
		getVideo: builder.query<fetchVideoResponse, string>({
			query: id => ({
				url: '/',
				params: {
					url: `https://www.tiktok.com/video/${id}/hd=1`,
					hd: '1',
				},
			}),
		}),
	}),
})

export const {
	useLazySearchVideosQuery,
	useGetFeedQuery,
	useGetUserQuery,
	useFetchUserVideosQuery,
	useGetCommentsQuery,
	useGetVideoQuery,
} = api
