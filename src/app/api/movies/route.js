import axios from 'axios';
import { unstable_noStore as noStore } from 'next/cache';

const apiKey = process.env.TMDB_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

export async function GET(req) {
    noStore();
    const { searchParams } = req.nextUrl;

    if (searchParams.get('logo')) {
        return getImage(searchParams.get('logo'));
    }
    else {
        const filterType = searchParams.get('filterType');
        return getList(filterType);
    }
}

const getImage = async (movieId) => {
    let logo = undefined;
    let poster = undefined;
    let video = undefined

    const logoResponse = await axios.get(`${baseUrl}/movie/${movieId}/images`, {
        params: { api_key: apiKey },
        responseType: 'json',
    });

    logo = logoResponse.data.logos.filter(logo => logo.iso_639_1 === 'en');

    const response = await axios.get(`${baseUrl}/movie/${movieId}/images`, {
        params: { api_key: apiKey },
        responseType: 'json',
    });

    poster = response.data.posters.filter(poster => poster.iso_639_1 === null);

    const videoResponse = await axios.get(`${baseUrl}/movie/${movieId}/videos`, {
        params: { api_key: apiKey, language: 'en-US' },
        responseType: 'json',
    });

    video = videoResponse.data.results.filter(video => video.type === 'Trailer' && video.site === 'YouTube');


    const preBody = {
        logo: logo[0]?.file_path || null,
        poster: poster[0]?.file_path || null,
        video: video[0]?.key || null
    };

    const body = JSON.stringify(preBody);

    return new Response(body, {
        headers: { 'Content-Type': 'application/json' },
    });
}

const getList = async (filterType) => {

    const endpoint = `movie/${filterType}`;
    const page = 2;
    let results = [];

    for (let i = 1; i <= page; i++) {
        const response = await axios.get(`${baseUrl}/${endpoint}`, {
            params: { api_key: apiKey, language: 'en-US', page: i },
            responseType: 'json',
        });

        results = results.concat(response.data.results);
    }

    // console.log(results);

    const body = JSON.stringify(results);

    return new Response(body, {
        headers: { 'Content-Type': 'application/json' },
    });

}

// https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=${env.apikey}
// https://image.tmdb.org/t/p/original/9xIpw0fws1OkMCBzHZh0PEZdgg9.png