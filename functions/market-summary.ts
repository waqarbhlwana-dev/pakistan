export async function onRequest() {
  try {
    const res = await fetch("https://dps.psx.com.pk/market-summary", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; FusionBot/1.0; +https://builder.io)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });

    if (!res.ok) {
      return new Response(`Upstream error: ${res.status}`, { status: 502 });
    }

    const html = await res.text();

    const regex = /var\s+summaryData\s*=\s*(\[.*?\]);/s;
    const match = html.match(regex);

    if (!match) {
      return new Response("Data not found", { status: 500 });
    }

    const data = JSON.parse(match[1]);

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return new Response("Internal error", { status: 500 });
  }
}
