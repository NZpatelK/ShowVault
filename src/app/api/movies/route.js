import axios from 'axios';
import { unstable_noStore as noStore } from 'next/cache';

const apiKey = process.env.TMDB_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

export async function GET(req) {
    noStore();
    const { searchParams } = req.nextUrl;
    const filterType = searchParams.get('filterType');
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
