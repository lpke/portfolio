// SOURCE: https://github.com/vercel/next.js/blob/canary/examples/with-iron-session/lib/fetchJson.js
// Is basically a wrapper for "fetch" with built in error handling

export default async function fetchJson(...args) {
  try {
    const response = await fetch(...args);

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new Error(response.statusText);
    error.response = response;
    error.data = data;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message }
    }
    throw error
  }
}