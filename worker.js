const BIO_STORAGE = BIO_STORAGE; // KV Namespace Binding

// Handle the signup POST request
async function handleSignup(request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return new Response("Username and password are required", { status: 400 });
  }

  // Check if the username already exists in the KV store
  const existingUser = await BIO_STORAGE.get(username);
  if (existingUser) {
    return new Response("Username already taken", { status: 400 });
  }

  // Save the user to KV store
  await BIO_STORAGE.put(username, password);

  return new Response("Sign-up successful! Log in", { status: 200 });
}

// Handle the requests
async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname === "/signup" && request.method === "POST") {
    return handleSignup(request);
  }

  return new Response("Not Found", { status: 404 });
}

// Event listener to handle the requests
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
