import { Link } from 'react-router-dom'
import { Search } from '../Search/Search'

export const Header = () => {
	return (
		<header className='flex flex-row justify-between bg-neutral-800 py-3 border-b border-neutral-600 px-5 sticky top-0 z-50'>
			<Link to='/' className='text-3xl font-bold'>
				<h1 className=''>TikTok</h1>
			</Link>
			<Search />
			<div className='text-center items-center'>Avatar</div>
		</header>
	)
}
