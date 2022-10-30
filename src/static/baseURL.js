import axios from "axios";
// export default axios.create({ baseURL: "https://dev-api.unjani.co.id/pmb/" });
// export default axios.create({baseURL: 'http://localhost:8080/'})

export const url = 'http://localhost:7000/'
export default axios.create({baseURL: url})