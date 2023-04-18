-- Active: 1681403748337@@127.0.0.1@3306@rabbitmq_user
CREATE TABLE
    users (
        id INT NOT NULL AUTO_INCREMENT,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(256) NOT NULL,
        PRIMARY KEY (id)
    );

-- refer to the user table

CREATE TABLE
    products (
        id INT NOT NULL AUTO_INCREMENT,
        product_name VARCHAR(50) NOT NULL,
        price INT NOT NULL,
        user_id INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

CREATE TABLE 
    orders (
        id INT NOT NULL AUTO_INCREMENT,
        product_id INT NOT NULL,
        user_id INT NOT NULL,
        quantity INT NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );