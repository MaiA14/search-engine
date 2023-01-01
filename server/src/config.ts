const SERVER_PORT = 4000;
const SERVER_IP = '127.0.0.1'; // localhost
const ORIGIN = '*'

const SERVER = {
    port: SERVER_PORT,
    ip: SERVER_IP,
    origin: ORIGIN
}

const config = {
    server: SERVER
}

// APIS_URLS
export const APIS = {
    FILMS_API:
        'https://swapi.dev/api/films'
};

export default config;