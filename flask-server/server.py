from flask import Flask, jsonify
import mysql.connector
from DB.sql_queries import (get_user_transactions, get_client_gain_and_loss,
get_client_portfolio_value, get_client_balance, get_recent_stocks,
get_most_profitable_clients, get_stocks)
from DB.database_utils import (json_title_with_query_params, json_title_without_query_params)

app = Flask(__name__)


db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="p2hk3l08",
    database="virtual_portfolio"
)

cursor = db.cursor()


#GET call for selection transactions per user
@app.route('/transactions/client/<user_name>', methods=['GET'])
def get_user_transactions_route(user_name):
    sql_query, query_params = get_user_transactions(user_name)
    return json_title_with_query_params(cursor, sql_query, query_params)


#GET call for calculating a total gain/loss per user
@app.route('/transactions/client/gain_and_loss/<user_name>', methods=['GET'])
def get_client_gain_and_loss_route(user_name):
    sql_query, query_params = get_client_gain_and_loss(user_name)
    return json_title_with_query_params(cursor, sql_query, query_params)


#GET call for calculating a portfolio value per user
@app.route('/transactions/client/portfolio_value/<user_name>', methods=['GET'])
def get_client_portfolio_value_route(user_name):
    sql_query, query_params = get_client_portfolio_value(user_name)
    return json_title_with_query_params(cursor, sql_query, query_params)


#GET call for displaying user's current balance
@app.route('/transactions/client/balance/<user_name>', methods=['GET'])
def get_client_balance_route(user_name):
    sql_query, query_params = get_client_balance(user_name)
    return json_title_with_query_params(cursor, sql_query, query_params)


#GET call for displaying the three most recent stocks and sorting them by creation time
@app.route('/transactions/recent_stocks', methods=['GET'])
def get_recent_stocks_route():
    sql_query = get_recent_stocks()
    return json_title_without_query_params(cursor, sql_query)


#GET call for calculating the most profitable clients and showing top three 
@app.route('/transactions/most_profitable_clients', methods=['GET'])
def get_most_profitable_clients_route():
    sql_query = get_most_profitable_clients()
    return json_title_without_query_params(cursor, sql_query)

#GET call for displaying all stocks
@app.route('/transactions/stocks', methods=['GET'])
def get_stocks_route():
    sql_query = get_recent_stocks()
    return json_title_without_query_params(cursor, sql_query)


if __name__ == '__main__':
    app.run()