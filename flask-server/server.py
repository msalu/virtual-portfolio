from flask import Flask, jsonify

import mysql.connector

app = Flask(__name__)

#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:p2hk3l08@mysql-db/virtual_portfolio'


db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="p2hk3l08",
    database="virtual_portfolio"
)

cursor = db.cursor()


#GET call for selection transactions per user
@app.route('/transactions/client/<user_name>', methods=['GET'])
def get_user_transactions(user_name):
    cursor.execute(
        "SELECT "
        "c.user_name, s.stock_name, t.volume, t.stock_purchase_price, s.stock_current_price, t.created_at, "
        "(s.stock_current_price - t.stock_purchase_price) AS price_difference "
        "FROM "
        "transactions AS t "
        "INNER JOIN stocks AS s "
        "ON t.stock_id = s.stock_id "
        "INNER JOIN clients AS c "
        "ON t.client_id = c.client_id "
        "WHERE c.user_name = %s", (user_name,))
    
    row_headers = [x[0] for x in cursor.description]
    transactions = cursor.fetchall()
    payload = []
    for result in transactions:
        payload.append(dict(zip(row_headers, result)))
    return jsonify(payload)


#GET call for displaying the three most recent stocks and sorting them by creation time
@app.route('/transactions/recent_stocks', methods=['GET'])
def get_recent_stocks():
    cursor.execute(
        "SELECT "
        "s.stock_name, s.stock_current_price, s.stock_price_update_time "
        "FROM "
        "stocks AS s "
        "ORDER BY s.stock_price_update_time DESC "
        "LIMIT 3 ")

    row_headers = [x[0] for x in cursor.description]
    stocks = cursor.fetchall()
    payload = []
    for result in stocks:
        payload.append(dict(zip(row_headers, result)))
    return jsonify(payload)

#GET call for calculating the most profitable clients and showing top three 
@app.route('/transactions/most_profitable_clients', methods=['GET'])
def get_most_profitable_clients():
    cursor.execute(
        "SELECT "
        "c.user_name, (t.volume * s.stock_current_price) AS portfolio_value "
        "FROM "
        "transactions AS t "
        "INNER JOIN stocks AS s "
        "ON t.stock_id = s.stock_id "
        "INNER JOIN clients AS c "
        "ON t.client_id = c.client_id "
        "GROUP BY "
        "c.user_name, "
        "t.volume, "
        "s.stock_current_price "
        "ORDER BY portfolio_value DESC "
        "LIMIT 3 ")

    row_headers = [x[0] for x in cursor.description]
    top_clients = cursor.fetchall()
    payload = []
    for result in top_clients:
        payload.append(dict(zip(row_headers, result)))
    return jsonify(payload)

#GET call for calculating a total gain/loss per user
@app.route('/transactions/client/gain_and_loss/<user_name>', methods=['GET'])
def get_client_gain_and_loss(user_name):
    cursor.execute(
        "SELECT "
        "c.user_name, SUM(s.stock_current_price - t.stock_purchase_price) AS total_gain_loss "
        "FROM transactions AS t "
        "INNER JOIN stocks AS s "
        "ON t.stock_id = s.stock_id "
        "INNER JOIN clients AS c "
        "ON t.client_id = c.client_id "
         "WHERE c.user_name = %s", (user_name,))

    row_headers = [x[0] for x in cursor.description]
    gain_loss = cursor.fetchall()
    payload = []
    for result in gain_loss:
        payload.append(dict(zip(row_headers, result)))
    return jsonify(payload)


#GET call for calculating a portfolio value per user
@app.route('/transactions/client/portfolio_value/<user_name>', methods=['GET'])
def get_client_portfolio_value(user_name):
    cursor.execute(
        "SELECT "
        " c.user_name, SUM(t.volume * s.stock_current_price) AS total_portfolio_value "
        "FROM transactions AS t "
        "INNER JOIN stocks AS s "
        "ON t.stock_id = s.stock_id "
        "INNER JOIN clients AS c "
        "ON t.client_id = c.client_id " 
        "WHERE c.user_name = %s", (user_name,))

    row_headers = [x[0] for x in cursor.description]
    portfolio_value = cursor.fetchall()
    payload = []
    for result in portfolio_value:
        payload.append(dict(zip(row_headers, result)))
    return jsonify(payload)      


if __name__ == '__main__':
    app.run(debug=True)