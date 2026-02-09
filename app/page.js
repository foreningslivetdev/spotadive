import data from "../data/diving.json";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Spotadive</h1>

      <p>
        En öppen sammanställning av utdömda utvisningar för diving inom hockey,
        baserad på öppet matchdata.
      </p>

      <h2>Säsong {data.season}</h2>

      <p>
        Totalt antal utdömda utvisningar för diving: <strong>{data.total}</strong>
      </p>

      <h3>Per lag</h3>
      <ul>
        {data.teams.map((team) => (
          <li key={team.team}>
            {team.team}: {team.count}
          </li>
        ))}
      </ul>
    </main>
  );
}
