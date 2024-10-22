export interface FetchDataParams {
	region: string
	method: string
}
export interface fetchUserVideos {
	unique_id: string | undefined
	cursor: number
}
export interface fetchCommentsParams {
	cursor: number
	id: string
}
export interface fetchDataByKeywordsParams {
	keywords: string | null
	cursor: number
	region?: string
}
export interface fetchDataByKeywordsResponse {
	data: {
		hasMore: boolean
		cursor: number
		items: any[]
	}
}
export interface ApiResponse {
	data: IData[]
}
export interface fetchVideoResponse {
	data: {
		data: IData[]
		author: {
			unique_id: number
		}
		origin_cover: string
		title: string
		music_info?: {
			title: string
		}
	}
}
export interface ICommnetsResponse {
	data: {
		comments: IComment[]
	}
}
export interface IComment {
	id: number
	user: IData
	text: string
}
export interface IVideo {
	id: number
}
export interface UserVideoResponse {
	data: {
		videos: IData[]
		cursor?: number
		hasMore?: boolean
	}
	code: string
	msg: string
}
export interface UserResponse {
	data: {
		stats: {
			followingCount: number
			followerCount: number
			heartCount: number
			videoCount: number
			diggCount: number
			heart: number
		}
		user: {
			avatarMedium: number
			nickname: number
			youtube_channel_id: number
			twitter_id: number
			ins_id: number
			signature: string
			privateAccount: number
			openFavorite: boolean
		}
		length: number
	}
	code: string
	msg: string
}
export interface ApiResponseSearch {
	data: {
		videos: IData[]
		hasMore: boolean
		cursor: number
	}
}
export interface IData {
	id?: number
	video_id?: number
	title?: string
	play_count?: number
	comment_count?: number
	share_count?: number
	digg_count?: number
	music_info?: IMusic
	video?: []
	play?: string
	author?: {
		unique_id: number
		avatar?: string
		nickname?: string
	}
	unique_id?: string
	avatar?: string
	nickname?: string
}
export interface IMusic {
	title: string
}
