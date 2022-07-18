export default async function fetcher(url, data) {
  const resp = await fetch(`${window.location.origin}/api/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  }).then((response) => response.json());

  return resp;
}
