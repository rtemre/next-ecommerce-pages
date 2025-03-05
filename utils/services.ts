// function to post data
export async function postData(url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.message || "Something went wrong!");
    }
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
