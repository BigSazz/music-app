import  SongBar  from './SongBar';

const RelatedSongs = ({ data, artistId, isPlaying, activeSong, handlePause, handlePlay}) => {

  return (
    <div className='flex flex-col'>
      <h2 className='text-white text-3xl font-bold'>Related Songs:</h2>

      <div className='mt-6 w-full flex flex-col'>
        {data?.map((song, idx) => (
          <SongBar
            key={`${song.key}-${artistId}`}
            song={song}
            i={idx}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePause}
            handlePlayClick={handlePlay}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedSongs;
