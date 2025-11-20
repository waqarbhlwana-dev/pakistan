// In-memory storage for Cloudflare Pages
let companyReportsMemory: Record<string, any> = {};
let reportsMemory: Record<string, any> = {};
let manualAssetInfoMemory: Record<string, any> = {};

const jsonResponse = (
  data: any,
  status = 200,
  headers: Record<string, string> = {},
) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      ...headers,
    },
  });
};

const readRequestBody = async (request: Request): Promise<any> => {
  try {
    const text = await request.text();
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error("Error parsing request body:", error);
    return {};
  }
};

export const onRequest = async (context: any) => {
  const { request } = context;
  const url = new URL(request.url);
  const method = request.method;

  // Handle CORS preflight
  if (method === "OPTIONS") {
    return jsonResponse({}, 200);
  }

  // Extract the API route from the pathname
  // /api/company-report -> company-report
  // /api/stocks/search -> stocks/search
  const pathname = url.pathname;
  const apiPrefix = "/api/";
  if (!pathname.startsWith(apiPrefix)) {
    return jsonResponse({ error: "Not Found" }, 404);
  }

  const route = pathname.slice(apiPrefix.length);
  const searchParams = url.searchParams;

  try {
    // ===== Company Report Routes =====
    if (route === "company-report" && method === "GET") {
      const symbol = searchParams.get("symbol");
      if (!symbol) {
        return jsonResponse({ error: "Symbol is required" }, 400);
      }
      const report = companyReportsMemory[symbol.toUpperCase()] || null;
      return jsonResponse({ data: report });
    }

    if (route === "company-report" && method === "POST") {
      const body = await readRequestBody(request);
      const { symbol, data } = body;

      if (!symbol) {
        return jsonResponse({ error: "Symbol is required" }, 400);
      }
      if (!data) {
        return jsonResponse({ error: "Report data is required" }, 400);
      }

      companyReportsMemory[symbol.toUpperCase()] = data;
      return jsonResponse({ ok: true, message: "Report saved successfully" });
    }

    // ===== Manual Asset Info Routes =====
    if (route === "manual-asset-info" && method === "GET") {
      const assetSymbol = searchParams.get("assetSymbol");
      if (!assetSymbol) {
        return jsonResponse({ error: "Asset symbol is required" }, 400);
      }
      const info = manualAssetInfoMemory[assetSymbol.toUpperCase()] || null;
      return jsonResponse({ data: info }, info ? 200 : 404);
    }

    if (route === "manual-asset-info" && method === "POST") {
      const body = await readRequestBody(request);
      const { assetSymbol, data } = body;

      if (!assetSymbol) {
        return jsonResponse({ error: "Asset symbol is required" }, 400);
      }
      if (!data) {
        return jsonResponse({ error: "Manual info data is required" }, 400);
      }

      manualAssetInfoMemory[assetSymbol.toUpperCase()] = data;
      return jsonResponse({
        ok: true,
        message: "Manual asset info saved successfully",
      });
    }

    if (route === "manual-asset-info" && method === "DELETE") {
      const assetSymbol = searchParams.get("assetSymbol");
      if (!assetSymbol) {
        return jsonResponse({ error: "Asset symbol is required" }, 400);
      }

      const upperSymbol = assetSymbol.toUpperCase();
      if (manualAssetInfoMemory[upperSymbol]) {
        delete manualAssetInfoMemory[upperSymbol];
      }

      return jsonResponse({
        ok: true,
        message: "Manual asset info deleted successfully",
      });
    }

    // ===== Reports Routes =====
    if (route === "reports" && method === "GET") {
      const reportsList = Object.values(reportsMemory);
      return jsonResponse({ data: reportsList });
    }

    if (route === "reports" && method === "POST") {
      const body = await readRequestBody(request);
      const { title, content } = body;

      if (!title) {
        return jsonResponse({ error: "Report title is required" }, 400);
      }
      if (!content) {
        return jsonResponse({ error: "Report content is required" }, 400);
      }

      const reportId = Date.now().toString();
      const now = new Date().toISOString();

      const newReport = {
        id: reportId,
        title,
        content,
        createdAt: now,
        updatedAt: now,
      };

      reportsMemory[reportId] = newReport;

      return jsonResponse(
        {
          ok: true,
          message: "Report created successfully",
          data: newReport,
        },
        201,
      );
    }

    if (route === "reports" && method === "PUT") {
      const reportId = searchParams.get("reportId");
      if (!reportId) {
        return jsonResponse({ error: "Report ID is required" }, 400);
      }

      const body = await readRequestBody(request);
      const { title, content } = body;

      const report = reportsMemory[reportId];
      if (!report) {
        return jsonResponse({ error: "Report not found" }, 404);
      }

      if (title) report.title = title;
      if (content) report.content = content;
      report.updatedAt = new Date().toISOString();

      reportsMemory[reportId] = report;

      return jsonResponse({
        ok: true,
        message: "Report updated successfully",
        data: report,
      });
    }

    if (route === "reports" && method === "DELETE") {
      const reportId = searchParams.get("reportId");
      if (!reportId) {
        return jsonResponse({ error: "Report ID is required" }, 400);
      }

      if (!reportsMemory[reportId]) {
        return jsonResponse({ error: "Report not found" }, 404);
      }

      delete reportsMemory[reportId];

      return jsonResponse({
        ok: true,
        message: "Report deleted successfully",
      });
    }

    // ===== Account Opening Route =====
    if (route === "account-opening" && method === "POST") {
      const body = await readRequestBody(request);
      const { fullName, email, phone, motherName } = body;

      if (!fullName || !email || !phone || !motherName) {
        return jsonResponse({ error: "Missing required fields" }, 400);
      }

      console.log("Account opening request:", { fullName, email, phone });

      return jsonResponse({
        success: true,
        message: "Account opening request submitted successfully",
      });
    }

    // ===== Portfolio Management Route =====
    if (route === "portfolio-management" && method === "POST") {
      const body = await readRequestBody(request);
      const { fullName, email, phone } = body;

      if (!fullName || !email || !phone) {
        return jsonResponse({ error: "Missing required fields" }, 400);
      }

      console.log("Portfolio management request:", { fullName, email, phone });

      return jsonResponse({
        success: true,
        message: "Portfolio management request submitted successfully",
      });
    }

    // ===== Order Book Route =====
    if (route === "order-book" && method === "POST") {
      const body = await readRequestBody(request);
      const { fullName, email, phone } = body;

      if (!fullName || !email || !phone) {
        return jsonResponse({ error: "Missing required fields" }, 400);
      }

      console.log("Order book request:", { fullName, email, phone });

      return jsonResponse({
        success: true,
        message: "Order book request submitted successfully",
      });
    }

    // ===== Research Edit Auth Route =====
    if (route === "research/edit-auth" && method === "POST") {
      const body = await readRequestBody(request);
      const { password } = body;
      const expected = context.env?.REPORT_EDIT_PASSWORD;

      if (!expected) {
        return jsonResponse({ error: "Edit password not configured" }, 500);
      }

      if (typeof password !== "string") {
        return jsonResponse({ error: "Invalid request" }, 400);
      }

      if (password === expected) {
        return jsonResponse({ ok: true });
      }

      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    // Default 404
    return jsonResponse({ error: "Not Found" }, 404);
  } catch (err) {
    console.error("API error:", err);
    return jsonResponse({ error: "Internal server error" }, 500);
  }
};
