export async function fetchStarshipByName(name: string) {
    if (!name) return null; // Prevent fetching empty input
  
    const res = await fetch(`https://swapi.dev/api/starships/?search=${name}`);
    const data = await res.json();
  
    return data.results.length ? data.results[0] : null; // Return first result or null
  }
  