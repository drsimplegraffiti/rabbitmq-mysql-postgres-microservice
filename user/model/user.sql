CREATE TABLE
    users (
        id INT NOT NULL AUTO_INCREMENT,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(256) NOT NULL,
        role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
        PRIMARY KEY (id)
    );


CREATE TABLE
    products (
        id INT NOT NULL AUTO_INCREMENT,
        product_name VARCHAR(50) NOT NULL,
        available_quantity INT NOT NULL,
        price INT NOT NULL,
        user_id INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );