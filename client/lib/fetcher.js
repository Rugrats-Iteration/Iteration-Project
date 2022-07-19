import axios from "axios";

export default async function fetcher(url, data) {
  console.log(data, "errrm");
  const resp = data
    ? await axios.post(`${window.location.origin}/api/${url}`, data)
    : await axios.get(`${window.location.origin}/api/${url}`);

  return resp.data;
}
