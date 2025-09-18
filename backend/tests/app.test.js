import request from "supertest";
import app from "../index.js";
import mongoose from "../db.js";
import User from "../models/User.js";
import Query from "../models/Query.js";
import Result from "../models/Result.js";
import Location from "../models/Location.js";

let token = "";
let queryId = null;
let resultId = null;

beforeAll(async () => {
  // Clean DB
  await Location.deleteMany({});
  await Result.deleteMany({});
  await Query.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth Routes", () => {
  test("Register user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ name: "Test", email: "test@example.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("test@example.com");
  });

  test("Login user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@example.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });
});

describe("Query Routes", () => {
  test("Submit query", async () => {
    const res = await request(app)
      .post("/query")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Earthquake in Japan" });

    expect(res.statusCode).toBe(200);
    queryId = res.body._id;
  });
});

describe("Results Routes", () => {
  test("Insert result manually", async () => {
    const result = await Result.create({
      query: queryId,
      summary: "Detected earthquake",
      confidence: 0.95,
    });
    resultId = result._id;
  });

  test("Get results by queryId", async () => {
    const res = await request(app)
      .get(`/results/${queryId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body[0].summary).toBe("Detected earthquake");
  });
});

describe("Locations Routes", () => {
  test("Add new location", async () => {
    const res = await request(app)
      .post("/locations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        result_id: resultId,
        lat: 35.6895,
        lng: 139.6917,
        label: "Tokyo",
        score: 0.9,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.label).toBe("Tokyo");
    expect(res.body.lat).toBeCloseTo(35.6895);
    expect(res.body.lng).toBeCloseTo(139.6917);
    expect(res.body.score).toBeCloseTo(0.9);
  });

  test("Get all locations", async () => {
    const res = await request(app)
      .get("/locations")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body.some((loc) => loc.label === "Tokyo")).toBe(true);
  });

  test("Get location by id", async () => {
    // First, get all locations to find an id
    const allRes = await request(app)
      .get("/locations")
      .set("Authorization", `Bearer ${token}`);
    const locationId = allRes.body[0]._id;

    const res = await request(app)
      .get(`/locations/${locationId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(locationId);
    expect(res.body.label).toBeDefined();
  });

  test("Update location", async () => {
    const allRes = await request(app)
      .get("/locations")
      .set("Authorization", `Bearer ${token}`);
    const locationId = allRes.body[0]._id;

    const res = await request(app)
      .put(`/locations/${locationId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ label: "Tokyo Updated", score: 0.95 });

    expect(res.statusCode).toBe(200);
    expect(res.body.label).toBe("Tokyo Updated");
    expect(res.body.score).toBeCloseTo(0.95);
  });

  test("Delete location", async () => {
    const allRes = await request(app)
      .get("/locations")
      .set("Authorization", `Bearer ${token}`);
    const locationId = allRes.body[0]._id;

    const res = await request(app)
      .delete(`/locations/${locationId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);

    // Confirm deletion
    const confirmRes = await request(app)
      .get(`/locations/${locationId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(confirmRes.statusCode).toBe(404);
  });
});
