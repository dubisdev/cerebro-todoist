export const quickAdd = (text: string, token: string) => {
  return fetch("https://api.todoist.com/sync/v8/quick/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  }).then((res) => (res.ok ? null : Promise.reject(res)));
};
