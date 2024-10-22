import { Close, MusicNote } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { Spinner } from '../components/Spinner/Spinner'
import { VideoElem } from '../components/Video/VideoElem'
import { useGetCommentsQuery, useGetVideoQuery } from '../service/api'
import { UserVideo } from './UserVideo'

export const SingleVideo = () => {
	const navigate = useNavigate()
	const width2 = 'auto'
	const height2 = 'calc(100vh - 65px)'

	const { id } = useParams()

	const { data, isLoading } = useGetVideoQuery(id!)
	const { data: comments, isLoading: isCommentsLoading } = useGetCommentsQuery({
		id: id!,
		cursor: 0,
	})

	console.log('data', data ? data : 'data нихуята')
	console.log('comments', comments ? comments : 'comments нихуята')

	const handleClose = () => {
		navigate(`/user/${data?.data.author.unique_id}`)
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className=''>
			<div className='flex flex-row justify-between'>
				<div className='close' onClick={handleClose}>
					<Close />
				</div>

				<div className='flex w-full  justify-end'>
					<div className=' flex justify-center bg-cover bg-no-repeat relative overflow-hidden w-[50%]'>
						<div
							className=' absolute top-0 w-full h-full flex justify-center bg-cover bg-no-repeat blur-xl'
							style={{ backgroundImage: `url(${data?.data.origin_cover})` }}
						></div>
						<div className='relative w-fit'>
							<VideoElem width={width2} height={height2} item={data?.data} />
						</div>
					</div>

					<div className='flex flex-col gap-4 bg-neutral-800 p-5 min-w-[500px] max-w-[500px] overflow-y-scroll h-calc-100vh-minus-65px'>
						<div className='flex flex-col'>
							<UserVideo item={data?.data} />
							<div className='video-title'>{data?.data.title}</div>
							<div className='mt-5 text-neutral-400'>
								<MusicNote />
								<span>{data?.data.music_info?.title}</span>
							</div>
						</div>
						{isCommentsLoading && <Spinner />}
						{comments?.data.comments.length ? (
							<ul className='flex flex-col gap-6 mt-5'>
								{comments?.data.comments?.map(({ user, text, id }) => (
									<li
										key={id}
										className='border-b-[1px] border-neutral-600 pb-5'
									>
										<UserVideo item={user} />
										<div className=''>{text}</div>
									</li>
								))}
							</ul>
						) : (
							<p>No comments yet</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
