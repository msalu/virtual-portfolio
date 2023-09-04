CREATE DATABASE virtual_portfolio;

USE virtual_portfolio;

CREATE TABLE clients (
    client_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    user_name VARCHAR(100) NOT NULL
);

CREATE TABLE stocks (
    stock_id INT PRIMARY KEY AUTO_INCREMENT,
    stock_name VARCHAR(100) NOT NULL,
    stock_current_price FLOAT NOT NULL,
    stock_price_update_time TIMESTAMP NOT NULL
);

CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    stock_id INT NOT NULL,
    volume INT NOT NULL,
    stock_purchase_price FLOAT NOT NULL,
    created_at TIMESTAMP NOT NULL
);


ALTER TABLE transactions ADD CONSTRAINT transactions_client_id_fk FOREIGN KEY (client_id) REFERENCES clients(client_id);
ALTER TABLE transactions ADD CONSTRAINT transactions_stock_id_fk FOREIGN KEY (stock_id) REFERENCES stocks(stock_id);


INSERT INTO clients (first_name, last_name, user_name)
VALUES
("Siim", "Kuusk", "Siim"),
("Kaan", "Akbas", "Kaan"),
("Anthony", "Bernard", "Anthony"),
("Shota", "Abkhazi", "Shota"),
("Jan-Hendrik", "Tamm", "Jan-Hendrik"),
("Mark", "Võru", "Mark"),
("Martin", "McDoe", "Martin");

INSERT INTO stocks (stock_name, stock_current_price, stock_price_update_time)
VALUES
("Adcasch OÜ","5.00", CURRENT_TIMESTAMP()),
("Google","0.20",CURRENT_TIMESTAMP()),
("Tesla Inc","21.00",CURRENT_TIMESTAMP()),
("Apple", "160.00",CURRENT_TIMESTAMP()),
("NASDAQ","8.00",CURRENT_TIMESTAMP()),
("MICROSOFT","328.80",CURRENT_TIMESTAMP()),
("Samsung","40.60",CURRENT_TIMESTAMP());


INSERT INTO transactions (client_id, stock_id, volume, stock_purchase_price, created_at)
VALUES
("1", "1","10", "1.00",CURRENT_TIMESTAMP()),
("2", "2","20", "3.00", CURRENT_TIMESTAMP()),
("3", "3","70", "21.00", CURRENT_TIMESTAMP()),
("4", "4","100", "150.00", CURRENT_TIMESTAMP()),
("5", "5", "1", "8.00",CURRENT_TIMESTAMP()),
("6", "6", "50", "40.60", CURRENT_TIMESTAMP()),
("7", "7", "30", "5.00", CURRENT_TIMESTAMP());



