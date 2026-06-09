import { describe, it, expect } from "vitest";
import { resolveApiBaseUrl } from "../services/apiInstance";

describe("resolveApiBaseUrl", () => {
  it("uses a same-origin API path for production deployments when no explicit URL is configured", () => {
    expect(
      resolveApiBaseUrl({} as ImportMetaEnv, { hostname: "meadgreenautos.com" } as Location)
    ).toBe("https://monkfish-app-en3sj.ondigitalocean.app/api/v1");
  });

  it("uses the local backend URL for development hosts", () => {
    expect(
      resolveApiBaseUrl({} as ImportMetaEnv, { hostname: "localhost" } as Location)
    ).toBe("http://localhost:8080/api/v1");
  });

  it("prefers an explicit environment override when one is provided", () => {
    expect(
      resolveApiBaseUrl(
        { VITE_API_BASE_URL: "https://monkfish-app-en3sj.ondigitalocean.app/api/v1" } as Record<string, string | undefined>,
        { hostname: "meadgreenautos.com" } as Location
      )
    ).toBe("https://monkfish-app-en3sj.ondigitalocean.app/api/v1");
  });
});
