import { useState } from "react";
import MovieCard from "src/components/MovieCard";
import getMovies from "src/hooks/getMovies";
import AddMovieModal from "../components/AddMovieModal";

export default function Home() {
	const [isOpen, setIsOpen] = useState(false);
	const { data } = getMovies();

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	return (
		<main className="max-w-2xl mx-auto py-6 px-4">
			<h1 className="text-2xl dark:text-white text-center font-bold">
				Recommended
			</h1>

			{!data.length ? (
				<section className="h-[calc(100vh-10rem)] grid place-items-center">
					<h4 className="text-xl dark:text-white text-center m-auto">
						No recommendations yet
					</h4>
				</section>
			) : (
				<div className="py-8 flex flex-col gap-8">
					{data.map((item) => (
						<MovieCard key={item.id} {...item} />
					))}
				</div>
			)}
			<button
				onClick={openModal}
				className="px-8 py-2 bg-blue-600 text-white rounded-md fixed right-7 bottom-7"
			>
				Add
			</button>
			<AddMovieModal isOpen={isOpen} closeModal={closeModal} />
		</main>
	);
}
