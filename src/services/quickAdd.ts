export const quickAdd = async (text: string, token: string) => {
  return await fetch("https://api.todoist.com/sync/v8/quick/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
};
