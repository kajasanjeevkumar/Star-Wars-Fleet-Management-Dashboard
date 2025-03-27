export async function fetchAllStarshipNames() {
    const res = await fetch("https://swapi.dev/api/starships/");
    if (!res.ok) throw new Error("Failed to fetch starship names");
    const data = await res.json();
    return data.results.map((ship: { name: string }) => ship.name);
  }
  