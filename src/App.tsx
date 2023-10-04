import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const ENDPOINT = "https://api.punkapi.com/v2/beers";
  const PERPAGE = 20;

  const [beers, setBeers] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTxt, setSearch] = useState<string>("");

  useEffect(() => {
    async function fetchAPI(page: number, PERPAGE: number, beer_name: string) {
      try {
        const res = await fetch(
          `${ENDPOINT}?page=${page}&per_page=${PERPAGE}${
            beer_name !== "" ? `&beer_name=${beer_name}` : ""
          }`,
        );
        setBeers(await res.json());
      } catch (ex) {
        console.log("Couldn't make API call:\n", ex);
      }
    }
    fetchAPI(page, PERPAGE, searchTxt);
  }, [page, searchTxt]);

  return (
    <div className="App">
      <h1>Beers</h1>
      <div>
        <input
          type="text"
          name="Search"
          id="search"
          value={searchTxt}
          placeholder="Search for a beer"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="page">Page</label>
        <select
          name="page"
          id="page"
          onChange={(e: any) => setPage(e.target.value)}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
        </select>
      </div>
      {beers.map((beer: any) => (
        <Beer key={beer.id} {...beer} />
      ))}
    </div>
  );
}

function Beer({
  name,
  tagline,
  image_url,
}: {
  name: string;
  tagline: string;
  image_url: string;
}) {
  return (
    <div className="beer">
      <div>
        <img src={image_url} alt={name} />
      </div>
      <div>
        <h2>{name}</h2>
        <p>{tagline}</p>
      </div>
    </div>
  );
}
