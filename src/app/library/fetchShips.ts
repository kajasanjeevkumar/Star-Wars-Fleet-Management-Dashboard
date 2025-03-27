export const fetchStarships = async () => {
    const response = await fetch("https://swapi.dev/api/starships/");
    if (!response.ok) throw new Error("Failed to fetch starships");
    const data = await response.json();
    return data.results; // Return only the results array
  };
  