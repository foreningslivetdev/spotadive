"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import data from "../data/diving.json";

// Supabase client (read-only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Trigga manuell uppdatering
async function triggerUpdate() {
  const res = await fetch("/api/import", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMPORT_TOKEN}`,
    },
  });

  if (res.ok) {
    alert("Uppdatering startad");
  } else {
    alert("Kunde inte uppdatera");
  }
}

export default function Home() {
  const [lastUpdated, setLastUpdated] = useState(null);

  // Hämta "senast uppdaterad" från Supabase
  useEffect(() => {
    async function fetchLastUpdated() {
      const { data, error } = await supabase
        .from("meta")
        .select("value")
        .eq("key", "last_update")
        .single();

      if (!error) {
        setLastUpdated(data.value);
      }
    }

    fetchLastUpdated();
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Spotadive</h1>

      <button
        onClick={triggerUpdate}
        className="px-4 py-2 bg-cyan-500 text-black rounded-lg text-sm font-semibold"
      >
        Uppdatera data
      </button>

      <p className="text-xs text-gray-500" style={{ marginTop: "0.5rem" }}>
        Senast uppdaterad:{" "}
        {lastUpdated
          ? new Date(lastUpdated).toLocaleString("sv-SE")
          : "okänd"}
      </p>

      <p style={{ marginTop: "1.5rem" }}>
        En öppen sammanställning av utdömda utvisningar för diving inom hockey,
        baserad på öppet matchdata.
      </p>

      <h2>Säsong {data.season}</h2>

      <p>
        Totalt antal utdömda utvisningar för diving:{" "}
        <strong>{data.total}</strong>
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
