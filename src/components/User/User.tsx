import { useParams } from 'react-router-dom'
import { numberToLetters } from '../../Helpers/numberToLetters.js'
import { Spinner } from '../Spinner/Spinner.js'

import { Instagram, Lock, Twitter, YouTube } from '@mui/icons-material'
import { Alert } from '@mui/material'
import { Fragment } from 'react'
import { replaceWithBr } from '../../Helpers/space.js'
import { useGetUserQuery } from '../../service/api.js'
import { UserTabs } from './UserTabs.js'

export const User = () => {
	const { unique_id } = useParams()
	const numericId = String(unique_id)

	const { data, isLoading, error } = useGetUserQuery(numericId)

	if (error) {
		let errorMessage = 'An unknown error occurred'
		if ('status' in error) {
			if (error.status === 404) {
				errorMessage = 'User not found'
			} else {
				errorMessage = `Error: ${error.status}`
			}
		} else if ('message' in error) {
			errorMessage = error.message || 'An unknown error occurred'
		}

		return (
			<div className='flex items-center justify-center mt-5'>
				<Alert severity='error'>{errorMessage}</Alert>
			</div>
		)
	}

	if (isLoading) {
		return <Spinner />
	}

	const {
		stats: { followingCount, followerCount, heartCount, videoCount } = {},
		user: {
			avatarMedium,
			nickname,
			youtube_channel_id,
			twitter_id,
			ins_id,
			signature,
			privateAccount,
			openFavorite,
		} = {},
	} = data?.data || {}

	const statsData = [
		{ text: 'Following', count: followingCount },
		{ text: 'Followers', count: followerCount },
		{ text: 'Likes', count: heartCount },
		{ text: 'Video', count: videoCount },
	]

	const socialsData = [
		{ link: 'https://youtube.com/', icon: <YouTube />, id: youtube_channel_id },
		{ link: `https://instagram.com/`, icon: <Instagram />, id: ins_id },
		{ link: `https://twitter.com/`, icon: <Twitter />, id: twitter_id },
	]

	const hasSocials = socialsData.some(({ id }) => id)

	return (
		<div className='max-w-[426px] my-0 mx-auto pt-[24px]'>
			<div className='flex flex-wrap gap-[16px] flex-col'>
				<div
					className='w-24 h-24 bg-no-repeat bg-cover bg-center rounded-full '
					style={{ backgroundImage: `url(${avatarMedium})` }}
				></div>
				<div className=''>
					<div className='text-[52px] font-bold leading-[1.5]'>{unique_id}</div>
					<div className='text-lg leading-[1.5]'>{nickname}</div>
				</div>

				<ul className='w-full items-center flex gap-4'>
					{statsData.map(({ text, count }) => (
						<li key={text} className='flex gap-1'>
							<span>{numberToLetters(count!)}</span>
							<p className='text-neutral-500'>{text}</p>
						</li>
					))}
				</ul>
				{!signature ? (
					<p>No bio yet</p>
				) : (
					<div
						className=''
						dangerouslySetInnerHTML={{ __html: replaceWithBr(signature) }}
					/>
				)}
				{hasSocials && (
					<ul className='w-full items-center flex gap-4'>
						{socialsData.map(({ link, icon, id }) => {
							const href = `${link}${id}`
							return href ? (
								<li key={href} className='flex gap-1'>
									<a href={href} target='_blank'>
										{icon}
									</a>
								</li>
							) : (
								<Fragment key={href} />
							)
						})}
					</ul>
				)}

				<div className='h-[1px] bg-neutral-600'></div>
			</div>
			{!privateAccount ? (
				<UserTabs openFavorite={openFavorite} />
			) : (
				<div className='flex items-center justify-center'>
					<p>This account is private</p>
					<Lock />
				</div>
			)}
		</div>
	)
}
