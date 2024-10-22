import { Route, Routes } from 'react-router-dom'
import { SingleVideo } from '../../videos/SingleVideo'
import { Feed } from '../Feed/Feed'
import { SearchFeed } from '../Search/searchFeed'
import { User } from '../User/User'

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Feed />} />
			<Route path='/search' element={<SearchFeed />} />
			<Route path='/user/:unique_id' element={<User />} />
			<Route path='/video/:id' element={<SingleVideo />} />
		</Routes>
	)
}
