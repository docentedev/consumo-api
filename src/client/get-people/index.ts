import type { ResponsePeople } from "./types";

const URL = "https://xj5mvjz831.execute-api.us-east-2.amazonaws.com/api/personajes";

export const getPeople = async (): Promise<ResponsePeople> => {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error("Failed to fetch people");
  }
  const data = await response.json();
  return data;
};
