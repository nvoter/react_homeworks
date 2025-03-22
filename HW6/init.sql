CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    "group" VARCHAR(50) NOT NULL DEFAULT 'user'
);

INSERT INTO accounts(name, email, password, "group") VALUES
('user', 'user@example.com', '$2b$10$k3hqWW4XjG1NG0Ypwlaofe9tI4C775Y0UkVGQjw34uqLiK3zY6ruW', 'user'),
('admin', 'admin@example.com', '$2b$10$k3hqWW4XjG1NG0Ypwlaofe9tI4C775Y0UkVGQjw34uqLiK3zY6ruW', 'admin');

CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    "tokenHash" VARCHAR(255) UNIQUE NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    allowed_groups TEXT[] DEFAULT ARRAY['admin']::TEXT[]
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES categories(id),
    quantity INTEGER NOT NULL,
    unit VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT
);
