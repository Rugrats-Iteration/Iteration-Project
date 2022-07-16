export default async function fetcher(url, data) {
  const resp = await fetch(`${window.location.origin}/api/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status > 399 && res.status < 200) {
        throw new Error();
      }
      return res.json();
    })
    .then((data) => {
      return data;
    });
  return resp;
}
