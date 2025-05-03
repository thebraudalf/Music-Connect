import { request } from "undici";

// Function to fetch a requested playlist from the API
async function searchaPlaylist(playlistName) {
	try {
		const searchPlaylist = await request(`https://saavn.dev/api/search/playlists?query=${playlistName.toLowerCase().replaceAll(" ", "-")}`);
		//console.log(playlistName.toLowerCase().replaceAll(" ", "-"));
		const getplaylist = await searchPlaylist.body.json();

		//console.log(getplaylist.data.results);
		return getplaylist.data.results;
	} catch (error) {
		console.error("Error searching playlist:", error);
		throw new Error("Failed to search playlist data");
	}
}


async function fetchPlaylist(playlistId) {
	try {
		const fetchPlaylistData = await request(`https://saavn.dev/api/playlists?id=${playlistId}`);
		const getPlaylistData = await fetchPlaylistData.body.json();

		//console.log(getPlaylistData);
		return getPlaylistData.data;
	} catch (error) {
		console.error("Error fetching playlist:", error);
		throw new Error("Failed to fetch playlist data");
	}
}

export { searchaPlaylist, fetchPlaylist }


// async function fetchPlaylist(playlistName) {
// 	try {
// 		const fetchPlaylistId = await request(`https://saavn.dev/api/search/playlists?query=${playlistName.toLowerCase().replaceAll(" ", "-")}`);
// 		//console.log(playlistName.toLowerCase().replaceAll(" ", "-"));

// 		const getplaylistId = await fetchPlaylistId.body.json();

// 		const playlistData = [];
// 		await Promise.all(
// 			getplaylistId.data.results.map(async (playlistId) => {
// 				const fetchPlaylistData = await request(`https://saavn.dev/api/playlists?id=${playlistId.id}`);
// 				const getPlaylistData = await fetchPlaylistData.body.json();
// 				playlistData.push(getPlaylistData);
// 			}));
// 		//console.log(playlistData);
// 		return playlistData;
// 	} catch (error) {
// 		console.error("Error fetching playlist:", error);
// 		throw new Error("Failed to fetch playlist data");
// 	}
// }

