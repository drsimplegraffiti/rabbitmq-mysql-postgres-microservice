-- Active: 1681825107401@@127.0.0.1@5432@rabbitmq_order
CREATE TABLE
    orders(
        order_id SERIAL PRIMARY KEY,
        amount DECIMAL(10, 2) NOT NULL,
        quantity INT NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        product_id INT NOT NULL,
        customer_id INT NOT NULL
    );