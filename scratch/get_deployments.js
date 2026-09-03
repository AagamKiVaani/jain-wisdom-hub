async function getLatest() {
  const res = await fetch("https://api.github.com/repos/AagamKiVaani/jain-wisdom-hub/deployments?per_page=3", {
    headers: { "User-Agent": "AntigravityAgent" }
  });
  const data = await res.json();
  if (Array.isArray(data)) {
    for (const d of data) {
      const s = await (await fetch(d.statuses_url, { headers: { "User-Agent": "AntigravityAgent" } })).json();
      console.log(d.ref.slice(0, 7), s[0]?.state, s[0]?.environment_url);
    }
  } else {
    console.log("GitHub Response:", data);
  }
}
getLatest().catch(console.error);
