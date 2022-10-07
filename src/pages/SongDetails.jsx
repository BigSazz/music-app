import { useParams } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetSongDetailsQuery, useGetSongsRelatedQuery } from '../redux/services/shazamCore';

import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongDetails = () => {
	const dispatch = useDispatch();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { songid } = useParams();
	const { data: songData, error, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid);
	const { data, isFetching: isFetchingRelatedSongs } = useGetSongsRelatedQuery(songid);

	const handlePauseClick = () => {
		dispatch(playPause(false));
	  };
	
	  const handlePlayClick = (song, i) => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	  }; 

	if (isFetchingSongDetails || isFetchingRelatedSongs ) return <Loader title="Searching song details" />;

	if (error) return <Error />;

	return (
		<div className='flex flex-col'>
			<DetailsHeader artistId="" songData={songData} />

			<div className='mb-10'>
				<h2 className='text-white text-3xl font-bold'>Lyrics:</h2>

				<div className='mt-5'>
					{songData?.sections[1].type === 'LYRICS' ? 
						songData?.sections[1].text.map((lyric, index) => (
							<p 
								key={index} 
								className='text-gray-400 text-base my-1'
							>
								{lyric}
							</p>
						)) : <p className='text-gray-400 text-base'>Sorry, no lyrics found</p>
					}
				</div>
			</div>

			<RelatedSongs 
				data={data}
				artistId=""
				isPlaying={isPlaying}
				activeSong={activeSong}
				handlePause={handlePauseClick}
				handlePlay={handlePlayClick}
			/>
		</div>
	)
}

export default SongDetails;
