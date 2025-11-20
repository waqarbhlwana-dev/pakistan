export async function onRequest(context: any) {
  const request = context.request;

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { password } = (await request.json()) as { password?: string };
    const expected = context.env.REPORT_EDIT_PASSWORD;

    if (!expected) {
      return new Response(
        JSON.stringify({ error: "Edit password not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    if (typeof password !== "string") {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (password === expected) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
