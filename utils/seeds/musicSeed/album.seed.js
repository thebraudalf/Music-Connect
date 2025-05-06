import { request } from "undici";

// Function to search a requested album from the API
async function searchaAlbum(albumName) {
	try {
		const searchAlbum = await request(`https://jiosaavn-api-wbnc.vercel.app/api/search/albums?query=${albumName.toLowerCase().replaceAll(" ", "-")}`);
		//console.log(albumName.toLowerCase().replaceAll(" ", "-"));
		const getalbum = await searchAlbum.body.json();

		//console.log(getalbum.data.results);
		return getalbum.data.results;
	} catch (error) {
		console.error("Error searhing album:", error);
		throw new Error("Failed to search album data");
	}
}

// Function to fetch a requested album from the API
async function fetchAlbum(albumId) {
	try {
		const fetchAlbumData = await request(`https://jiosaavn-api-wbnc.vercel.app/api/albums?id=${albumId}`);
		const getAlbumData = await fetchAlbumData.body.json();

		//console.log(getAlbumData);
		return getAlbumData.data;
	} catch (error) {
		console.error("Error fetching album:", error);
		throw new Error("Failed to fetch album data");
	}
}

export { searchaAlbum, fetchAlbum }


// async function fetchAlbum(albumName) {
// 	try {
// 		const fetchAlbumId = await request(`https://saavn.dev/api/search/albums?query=${albumName.toLowerCase().replaceAll(" ", "-")}`);
// 		//console.log(albumName.toLowerCase().replaceAll(" ", "-"));

// 		const getalbumId = await fetchAlbumId.body.json();

// 		const albumData = [];
// 		await Promise.all(
// 			getalbumId.data.results.map(async (albumId) => {
// 				const fetchAlbumData = await request(`https://saavn.dev/api/albums?id=${albumId.id}`);
// 				const getAlbumData = await fetchAlbumData.body.json();
// 				albumData.push(getAlbumData);
// 			}));
// 		console.log(albumData);
// 		return albumData;
// 	} catch (error) {
// 		console.error("Error fetching album:", error);
// 		throw new Error("Failed to fetch album data");
// 	}
// }

