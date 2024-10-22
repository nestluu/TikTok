import { SearchOff } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useLocation, useMatch, useNavigate } from 'react-router-dom'

export const Search = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const isMatch = useMatch('search')
	const [search, setSearch] = useState('')

	useEffect(() => {
		if (isMatch) return
		setSearch('')
	}, [location, isMatch])

	const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault()
		const val = search.trim()

		if (!val) return
		navigate(`/search?q=${val}`)
	}
	return (
		<form
			className='flex bg-neutral-950 rounded-xl items-center p-[6px]'
			onSubmit={handleSubmit}
		>
			<div className='mr-1'>
				<SearchOff className='text-white' />
				<input
					value={search}
					className='bg-neutral-950 pl-1'
					type='text'
					name='search'
					placeholder='Search'
					onChange={e => setSearch(e.target.value)}
				/>
			</div>
			<button
				type='submit'
				className='bg-neutral-800 rounded-lg text-sm p-1 text-white'
			>
				Search
			</button>
		</form>
	)
}
