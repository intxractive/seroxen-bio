document.getElementById("signup-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill in all fields");
    return;
  }

  // Sending the POST request to the Cloudflare Worker (assuming Worker is set up for signup)
  const response = await fetch("https://seroxen.us/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (response.ok) {
    alert("Sign-up successful!");
  } else {
    alert(data.message || "Error signing up");
  }
});
