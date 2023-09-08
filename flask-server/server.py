from flask import Flask, jsonify, g, request
import mysql.connector
import datetime
from DB.sql_queries import (get_user_transactions, get_client_gain_and_loss,
get_client_portfolio_value, get_client_balance, get_recent_stocks,
get_most_profitable_clients, get_stocks, get_client_id, post_transaction)
from DB.database_utils import (json_title_with_query_params, json_title_without_query_params)

app = Flask(__name__)

def create_db_connection():
    db = mysql.connector.connect(
        host="localhost",
        port=3306,
        user="root",
        password="p2hk3l08",
        database="virtual_portfolio"
    )
    return db    


@app.teardown_appcontext
def close_db(error):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()


#GET method for selection transactions per user
@app.route('/transactions/client/<user_name>', methods=['GET'])
def get_user_transactions_route(user_name):
    db = create_db_connection()
    cursor = db.cursor()
    sql_query, query_params = get_user_transactions(user_name)
    result = json_title_with_query_params(cursor, sql_query, query_params)
    cursor.close()
    db.close()
    return result


#GET method for calculating a total gain/loss per user
@app.route('/transactions/client/gain_and_loss/<user_name>', methods=['GET'])
def get_client_gain_and_loss_route(user_name):
    db = create_db_connection()
    cursor = db.cursor()
    sql_query, query_params = get_client_gain_and_loss(user_name)
    result = json_title_with_query_params(cursor, sql_query, query_params)
    cursor.close()
    db.close()
    return result


#GET method for calculating a portfolio value per user
@app.route('/transactions/client/portfolio_value/<user_name>', methods=['GET'])
def get_client_portfolio_value_route(user_name):
    db = create_db_connection()
    cursor = db.cursor()
    sql_query, query_params = get_client_portfolio_value(user_name)
    result = json_title_with_query_params(cursor, sql_query, query_params)
    cursor.close()
    db.close()
    return result


#GET method for displaying user's current balance
@app.route('/transactions/client/balance/<user_name>', methods=['GET'])
def get_client_balance_route(user_name):
    db = create_db_connection()
    cursor = db.cursor()
    sql_query, query_params = get_client_balance(user_name)
    result = json_title_with_query_params(cursor, sql_query, query_params)
    cursor.close()
    db.close()
    return result


#GET method for displaying the three most recent stocks and sorting them by creation time
@app.route('/transactions/recent_stocks', methods=['GET'])
def get_recent_stocks_route():
    db = create_db_connection()
    cursor = db.cursor()
    sql_query = get_recent_stocks()
    result = json_title_without_query_params(cursor, sql_query)
    cursor.close()
    db.close()
    return result


#GET method for calculating the most profitable clients and showing top three 
@app.route('/transactions/most_profitable_clients', methods=['GET'])
def get_most_profitable_clients_route():
    db = create_db_connection()
    cursor = db.cursor()
    sql_query = get_most_profitable_clients()
    result = json_title_without_query_params(cursor, sql_query)
    cursor.close()
    db.close()
    return result

#GET method for displaying all stocks
@app.route('/transactions/stocks', methods=['GET'])
def get_stocks_route():
    db = create_db_connection()
    cursor = db.cursor()
    sql_query = get_stocks()
    result = json_title_without_query_params(cursor, sql_query)
    cursor.close()
    db.close()
    return result


#POST method for inserting data into transactions table - NOT WORKING!
@app.route('/transactions/add_transaction/<user_name>', methods=['POST'])
def add_transaction(user_name):
    data = request.get_json()
    stock_id = data.get('stock_id')
    volume = data.get('volume')
    stock_purchase_price = data.get('stock_purchase_price') 
    created_at = datetime.datetime.now() 

    client_id = get_client_id(user_name)  
    add_transaction_query = post_transaction()
    
    db = create_db_connection()
    cursor = db.cursor()

    cursor.execute(add_transaction_query, (client_id, stock_id, volume, stock_purchase_price, created_at))
    
    db.commit()
    cursor.close()
    db.close()

    response = {
            'message': 'Transaction added successfully',
            'stock_id': stock_id,
            'volume': volume,
            'stock_purchase_price': stock_purchase_price,
            'created_at': created_at
        }
    return jsonify(response), 201  
    

if __name__ == '__main__':
    app.run()