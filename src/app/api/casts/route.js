import axios from "axios";
const apiKey = process.env.TMDB_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

//https://api.themoviedb.org/3/movie/293660/credits?api_key=${env.apikey}&language=en-US

export async function GET(req) {
    const { searchParams } = req.nextUrl;
    const movieId = searchParams.get("movieId");
    const response = await axios.get(`${baseUrl}/movie/${movieId}/credits`, {
        params: { api_key: apiKey, language: "en-US"},
        responseType: "json",
    });
    const { cast } = response.data;
    console.log(cast);
    const body = JSON.stringify(cast);
    return new Response(body, {
        headers: { "Content-Type": "application/json" },
    });
}