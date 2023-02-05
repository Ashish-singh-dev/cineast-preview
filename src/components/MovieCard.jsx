import React from "react";

function MovieCard({ name, message, poster_url }) {
	return (
		<div className="h-full bg-[#1d1d1f] rounded flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left shadow-sm">
			<img
				alt="team"
				className="flex-shrink-0  w-48 h-48 rounded-l  object-cover object-center sm:mb-0 mb-4"
				src={poster_url}
				loading="lazy"
			/>
			<div className="flex-grow sm:pl-8 flex justify-between flex-col px-4">
				<h2 className="title-font text-lg dark:text-white font-bold">{name}</h2>
				<p className="mb-4">{message}</p>
				<p className="mb-4 text-end white italic">-mysterious</p>
			</div>
		</div>
	);
}

export default MovieCard;
