import axios from "axios";

export default async function fetcher(url, data) {
  console.log(data, "errrm");
  const resp = data
    ? await axios.post(`${window.location.origin}/api/${url}`, data)
    : await axios.get(`${window.location.origin}/api/${url}`,         
    {headers: 
      {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }
    });
  
    console.log(resp.data, 'data returned from resp')
  if (resp.status === 200) return resp.data;
  else {
    throw new Error("login error");
  }
}
