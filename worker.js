const BIO_STORAGE = BIO_STORAGE;  // This binds to your KV storage namespace

async function handleSignup(request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return new Response("Username and password are required", { status: 400 });
  }

  // Check if the user already exists in KV storage
  const existingUser = await BIO_STORAGE.get(username);
  if (existingUser) {
    return new Response("Username already taken", { status: 400 });
  }

  // Store the new user in KV
  await BIO_STORAGE.put(username, password);

  return new Response("Sign-up successful! Log in", { status: 200 });
}

async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname === "/signup" && request.method === "POST") {
    return handleSignup(request);
  }

  return new Response("Not Found", { status: 404 });
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
