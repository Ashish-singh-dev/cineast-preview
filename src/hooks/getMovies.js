import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function getMovies() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const moviecol = collection(db, "movies");
		const unsubscribe = onSnapshot(moviecol, (docsSnap) => {
			const data = [];
			docsSnap.forEach((doc) => {
				data.push(doc.data());
			});
			setData(data);
		});
		return unsubscribe;
	}, []);
	return { data };
}
