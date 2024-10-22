import { Lock } from '@mui/icons-material'
import { Alert } from '@mui/material'
import { useState } from 'react'
import { UserLiked } from './UserLiked'
import { UserVideos } from './UserVideos'

interface UserTabsProps {
	openFavorite: boolean | undefined
}

export const UserTabs: React.FC<UserTabsProps> = ({ openFavorite }) => {
	const USER_TABS = [
		{
			slug: 'videos',
			title: 'Videos',
			content: <UserVideos />,
		},

		{
			slug: 'liked',
			title: 'Liked',
			content: <UserLiked />,
		},
	]
	const [activeTab, setActiveTab] = useState(USER_TABS[0])
	return (
		<div className='user-tabs'>
			<ul className='flex w-full justify-center gap-10'>
				{USER_TABS.map(tab => {
					const { slug, title } = tab
					return (
						<li
							className={
								activeTab.slug === slug
									? 'cursor-pointer mt-3 mb-3 flex items-center justify-center text-white'
									: 'cursor-pointer mt-3 mb-3 flex items-center justify-center text-neutral-500'
							}
							key={slug}
							onClick={() => setActiveTab(tab)}
						>
							{!openFavorite && slug === 'liked' && (
								<Lock sx={{ fontSize: 14 }} />
							)}
							<span>{title}</span>
						</li>
					)
				})}
			</ul>
			<div className='user-tabs-content'>
				{!openFavorite && activeTab.slug === 'liked' ? (
					<Alert severity='info'>This user's liked videos are private</Alert>
				) : (
					activeTab.content
				)}
			</div>
		</div>
	)
}
