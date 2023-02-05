import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { db } from "../../firebase";
import { nanoid } from "nanoid";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

export default function AddMovieModal({ isOpen, closeModal }) {
	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const moviesCol = collection(db, "movies");
		const addMovie = addDoc(moviesCol, {
			id: nanoid(),
			...Object.fromEntries(formData),
		});
		toast.promise(addMovie, {
			pending: "Adding...",
			success: "Movie added 👌",
			error: "Failed to add 🤯",
		});
		closeModal();
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-[#1d1d1f] p-6 text-left align-middle shadow-xl transition-all">
								<form onSubmit={onSubmit}>
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
									>
										Add Movie Recommendation
									</Dialog.Title>
									<div className="mt-4" onSubmit={onSubmit}>
										<div className="relative mb-4">
											<label
												htmlFor="name"
												className="leading-7 text-sm text-gray-600 dark:text-gray-50"
											>
												Movie Name
											</label>
											<input
												type="text"
												id="name"
												name="name"
												required
												className="w-full bg-white dark:bg-gray-600 dark:caret-white dark:text-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
											/>
										</div>
										<div className="relative mb-4">
											<label
												htmlFor="url"
												className="leading-7 text-sm text-gray-600 dark:text-gray-50"
											>
												Movie poster url
											</label>
											<input
												type="url"
												id="url"
												name="poster_url"
												required
												className="w-full bg-white dark:bg-gray-600 dark:caret-white dark:text-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
											/>
										</div>

										<div className="relative mb-4">
											<label
												htmlFor="message"
												className="leading-7 text-sm text-gray-600 dark:text-gray-50"
											>
												Message
											</label>
											<textarea
												id="message"
												name="message"
												required
												className="w-full bg-white dark:bg-gray-600 dark:caret-white dark:text-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
											/>
										</div>
									</div>

									<div className="mt-4 flex items-center justify-end">
										<button className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
											Submit
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
