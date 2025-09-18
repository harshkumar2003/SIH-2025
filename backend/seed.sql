CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password_hash TEXT
);

CREATE TABLE queries (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  text TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  query_id INT REFERENCES queries(id),
  summary TEXT,
  confidence FLOAT
);

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  result_id INT REFERENCES results(id),
  lat FLOAT,
  lng FLOAT,
  label TEXT,
  score FLOAT
);

-- Seed data
INSERT INTO users (name, email, password_hash) VALUES
('Test User', 'test@example.com', 'hashedpassword');

INSERT INTO queries (user_id, text) VALUES
(1, 'Earthquake in California');

INSERT INTO results (query_id, summary, confidence) VALUES
(1, 'Detected earthquake near LA', 0.9);

INSERT INTO locations (result_id, lat, lng, label, score) VALUES
(1, 34.0522, -118.2437, 'Los Angeles', 0.95);
