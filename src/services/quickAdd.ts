import https from "https";

function httpsPost({ body, ...options }) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        method: "POST",
        ...options,
      },
      (res) => {
        const chunks = [];
        res.on("data", (data) => chunks.push(data));
        res.on("end", () => {
          let resBody = Buffer.concat(chunks) as unknown as string;
          switch (res.headers["content-type"]) {
            case "application/json":
              resBody = JSON.parse(resBody);
              break;
          }
          resolve(resBody);
        });
      }
    );
    req.on("error", reject);
    if (body) {
      req.write(body);
    }
    req.end();
  });
}

export const quickAdd = async (text: string, token: string) => {
  return await httpsPost({
    hostname: "api.todoist.com",
    path: `/sync/v8/quick/add`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
};
