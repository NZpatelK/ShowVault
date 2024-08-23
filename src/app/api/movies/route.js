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


    // const endpoint = `movie/${filterType}`;

    // const response = await axios.get(`${baseUrl}/${endpoint}`, {
    //     params: { api_key: apiKey, language: 'en-US' },
    //     responseType: 'json',
    // });

    // const { results } = response.data;
    // const body = JSON.stringify(results);

    // return new Response(body, {
    //     headers: { 'Content-Type': 'application/json' },
    // });
}

const getImage = async (movieId) => {
    let logo = undefined;
    let poster = undefined;

    const logoResponse = await axios.get(`${baseUrl}/movie/${movieId}/images`, {
        params: { api_key: apiKey},
        responseType: 'json',
    });

    logo = logoResponse.data.logos.filter(logo => logo.iso_639_1 === 'en');

    const response = await axios.get(`${baseUrl}/movie/${movieId}/images`, {
        params: { api_key: apiKey},
        responseType: 'json',
    });

    poster = response.data.posters.filter(poster => poster.iso_639_1 === null);


    const preBody = {
        logo: logo[0]?.file_path || null,
        poster: poster[0]?.file_path || null
    };

    const body = JSON.stringify(preBody);

    return new Response(body, {
        headers: { 'Content-Type': 'application/json' },
    });
}


// const getLogo = async (movieId) => {

//     const response = await axios.get(`${baseUrl}/movie/${movieId}/images`, {
//         params: { api_key: apiKey},
//         responseType: 'json',
//     });

//     const engLogo = response.data.logos.filter(logo => logo.iso_639_1 === 'en');

    
//     const body = JSON.stringify(engLogo[0].file_path);
//     return new Response(body, {
//         headers: { 'Content-Type': 'application/json' },
//     });

// };

// const getPoster = async(movieId) => {
//     const response = await axios.get(`${baseUrl}/movie/${movieId}/images`, {
//         params: { api_key: apiKey},
//         responseType: 'json',
//     });

//     const nonTitlePoster = response.data.posters.filter(poster => poster.iso_639_1 === null);

//     const body = JSON.stringify(nonTitlePoster[0].file_path);

//     return new Response(body, {
//         headers: { 'Content-Type': 'application/json' },
//     });
// }

const getList = async(filterType) => {

    const endpoint = `movie/${filterType}`;

    const response = await axios.get(`${baseUrl}/${endpoint}`, {
        params: { api_key: apiKey, language: 'en-US' },
        responseType: 'json',
    });

    const { results } = response.data;
    const body = JSON.stringify(results);

    return new Response(body, {
        headers: { 'Content-Type': 'application/json' },
    });

}

// https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=${env.apikey}
// https://image.tmdb.org/t/p/original/9xIpw0fws1OkMCBzHZh0PEZdgg9.png