"use strict";

const { app } = require("../src/server");
const supertest = require("supertest");
const mockRequest = supertest(app);
const { db } = require("../src/models/index");

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe("API Server Testing", () => {
  test("if there is a home route", async () => {
    const response = await mockRequest.get("/");
    expect(response.status).toEqual(200);
    expect(response.text).toEqual("Welcome to express home! 🏡 ");
  });

  test("404 on a bad route", async () => {
    const response = await mockRequest.get("/bad");
    expect(response.status).toEqual(404);
  });

  test("404 on a bad method", async () => {
    const response = await mockRequest.post("/person");
    expect(response.status).toBe(404);
  });

  // test if can create a food

  it("can add a food", async () => {
    const response = await mockRequest.post("/food").send({
      name: "test",
      price: 0,
    });

    expect(response.status).toBe(201);
  });

  it("can add a clothes", async () => {
    const response = await mockRequest.post("/clothes").send({
      name: "jacket",
      price: 25,
      season: "winter",
    });

    expect(response.status).toBe(201);
  });

  // test if can read

  it("can get all food", async () => {
    const response = await mockRequest.get("/food");

    expect(response.status).toBe(200);
  });

  it("can get all clothes", async () => {
    const response = await mockRequest.get("/clothes");

    expect(response.status).toBe(200);
  });

  // test if can read one person
  it("can get one food item", async () => {
    const response = await mockRequest.get("/food/2");

    expect(response.status).toBe(200);
  });

  it("can get one clothes item", async () => {
    const response = await mockRequest.get("/clothes/3");

    expect(response.status).toBe(200);
  });

  // test if can update a person
  it("can update one food item", async () => {
    const response = await mockRequest.put("/food/1").send({
      name: "Burger",
      price: 15,
    });

    expect(response.status).toBe(201);
  });

  it("can update one clothes item", async () => {
    const response = await mockRequest.put("/clothes/1").send({
      name: "jacket",
      price: 25,
      season: "winter",
    });

    expect(response.status).toBe(201);
  });
  // test if can delete a person
  it("should delete a food item", async () => {
    const food = await mockRequest.delete("/food/1");
    expect(food.status).toBe(204);
  });

  it("should delete a clothes item", async () => {
    const clothes = await mockRequest.delete("/clothes/1");
    expect(clothes.status).toEqual(204);
  });
});
