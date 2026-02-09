import { createClient } from "@supabase/supabase-js";

export async function runImport() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const now = new Date().toISOString();

  const { error } = await supabase
    .from("meta")
    .upsert({
      key: "last_update",
      value: now
    });

  if (error) {
    console.error("Import error:", error);
    throw error;
  }

  return { updatedAt: now };
}
