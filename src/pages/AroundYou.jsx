import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

import { Error, Loader, SongCard } from '../components';

const CountryTracks = () => {
	const [country, setCountry] = useState('');
	const [loading, setLoading] = useState(true);
	const {activeSong, isPlaying} = useSelector((state) => state.player);

	useEffect(() => {
		axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_GEO_API_KEY}`)
			.then((res) => setCountry(res?.data?.location?.country))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [country]);

	const {data, error, isFetching} = useGetSongsByCountryQuery(country);

	if (isFetching) return <Loader title='Loading songs around you' />;

	if (error && country) return <Error />;

	return (
		<div className="flex flex-col">
			<h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
				Around You:
				<span className='font-black'> {country}</span>
			</h2>

			<div className="flex flex-wrap sm:justify-start justify-center gap-8">
				{data?.map((song, idx) => (
					<SongCard 
						key={song?.key}
						song={song}
						i={idx}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data}
					/>
				))}
			</div>
		</div>
	)
}

export default CountryTracks;
