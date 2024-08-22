import axios from 'axios';

const apiKey = process.env.TMDB_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

export async function GET(req) {
    const filterType  = req.nextUrl.searchParams.get('filterType');
    const endpoint =  'movie/' + filterType;

    try {
        const response = await axios.get(`${baseUrl}/${endpoint}`, {
            params: {
                api_key: apiKey,
                language: 'en-US',
            },
        });

        return new Response(JSON.stringify(response.data.results), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}