-- Final Project Database --
CREATE TABLE customers (
	customer_id SERIAL PRIMARY KEY,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	email VARCHAR(30)
);

CREATE TABLE customers_finances (
	customer_id SERIAL REFERENCES customers (customer_id),
	budget NUMERIC(10,2),
	description VARCHAR(30),
	expenses NUMERIC(10,2)
);


