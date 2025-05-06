import { request } from "undici";

// Function to search a requested song from the API
async function searchaSong(songName) {
	try {
		const { body }= await request(`https://jiosaavn-api-wbnc.vercel.app/api/search/songs?query=${songName.toLowerCase().replaceAll(" ", "-")}`);
		//console.log(songName.toLowerCase().replaceAll(" ", "-"));
		const getSong = await body.json();

		//console.log(result.data.results);
		return getSong.data.results;
	} catch (error) {
		console.error("Error searching song:", error);
		throw new Error("Failed to search song data");
	}
}

// Function to fetch a requested song from the API
async function fetchSong(songId) {
	try {
		const fetchSongData = await request(`https://jiosaavn-api-wbnc.vercel.app/api/songs/${songId}`);
		const getSongData = await fetchSongData.body.json();
		
		//console.log(getSongData);
		return getSongData.data;
	} catch (error) {
		console.error("Error fetching song:", error);
		throw new Error("Failed to fetch song data");
	}
}

export { searchaSong, fetchSong }


// Function to fetch a requested song from the API
// async function fetchSong(songName) {
// 	try {
// 		const { statusCode, body }= await request(`https://saavn.dev/api/search/songs?query=${songName.toLowerCase().replaceAll(" ", "-")}`);
// 		//console.log(songName.toLowerCase().replaceAll(" ", "-"));
// 		const result = await body.json();
// 		//console.log(result.data.results);
// 		return result.data.results;
// 	} catch (error) {
// 		console.error("Error fetching song:", error);
// 		throw new Error("Failed to fetch song data");
// 	}
// }
