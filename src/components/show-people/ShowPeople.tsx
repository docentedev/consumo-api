import useGetPeople from "../../client/get-people/useGetPeople";

const ShowPeople = () => {
  const getPeople = useGetPeople();

  if (getPeople.loading) {
    return <p>Loading people...</p>;
  }

  if (getPeople.error) {
    return <p>Error: {getPeople.error.message}</p>;
  }

  if (getPeople.data) {
    return (
      <ul>
        {getPeople.data.results.map((person) => (
          <li key={person.url}>{person.name}</li>
        ))}
      </ul>
    );
  }

  return null;
};

export default ShowPeople;
