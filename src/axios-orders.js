import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});
// Discount Jonas gebruikt Firebase. Wat alleen toegankelijk is als je je gegevens uitlevert aan google. Moet ik nog even over nadenken. Misschien een account strikt voor developen? Maar ja, ze trekken sowieso al je data naar zich toe
export default instance;