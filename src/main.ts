// api/actresses.ts
import type { Actress, Nationality } from "./types";

export async function getActress(id: number): Promise<Actress | null> {
  try {
    const res = await fetch(`http://localhost:3333/actresses/${id}`);
    const data = await res.json();
    return isActress(data) ? data : null;
  } catch (error) {
    console.error(`Errore nel recuperare l'attrice con id ${id}:`, error);
    return null;
  }
}

function isActress(data: any): data is Actress {
  const nationalities: Nationality[] = [
    "American",
    "British",
    "Australian",
    "Israeli-American",
    "South African",
    "French",
    "Indian",
    "Israeli",
    "Spanish",
    "South Korean",
    "Chinese"
  ];

  return (
    data &&
    typeof data.id === "number" &&
    typeof data.name === "string" &&
    typeof data.birth_year === "number" &&
    (typeof data.death_year === "undefined" || typeof data.death_year === "number") &&
    typeof data.biography === "string" &&
    typeof data.image === "string" &&
    Array.isArray(data.most_famous_movies) &&
    data.most_famous_movies.length === 3 &&
    data.most_famous_movies.every((m: any) => typeof m === "string") &&
    typeof data.awards === "string" &&
    typeof data.nationality === "string" &&
    nationalities.includes(data.nationality as Nationality)
  );
}
