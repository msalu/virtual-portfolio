def get_user_transactions(user_name):
    sql_query = (
        "SELECT "
        "c.user_name, s.stock_name, t.volume, t.stock_purchase_price, s.stock_current_price, t.created_at, "
        "(s.stock_current_price - t.stock_purchase_price) AS price_difference "
        "FROM "
        "transactions AS t "
        "INNER JOIN stocks AS s "
        "ON t.stock_id = s.stock_id "
        "INNER JOIN clients AS c "
        "ON t.client_id = c.client_id "
        "WHERE c.user_name = %s")
    
    query_params = (user_name,)
    return sql_query, query_params


def get_client_gain_and_loss(user_name):
    sql_query = (
        "SELECT "
        "c.user_name, SUM(s.stock_current_price - t.stock_purchase_price) AS total_gain_loss "
        "FROM transactions AS t "
        "INNER JOIN stocks AS s "
        "ON t.stock_id = s.stock_id "
        "INNER JOIN clients AS c "
        "ON t.client_id = c.client_id "
        "WHERE c.user_name = %s")

    query_params = (user_name,)
    return sql_query, query_params


def get_client_portfolio_value(user_name):
    sql_query = (
        "SELECT "
        "c.user_name, SUM(t.volume * s.stock_current_price) AS total_portfolio_value "
        "FROM transactions AS t "
        "INNER JOIN stocks AS s "
        "ON t.stock_id = s.stock_id "
        "INNER JOIN clients AS c "
        "ON t.client_id = c.client_id " 
        "WHERE c.user_name = %s")

    query_params = (user_name,)
    return sql_query, query_params


def get_client_balance(user_name):
    sql_query = (
        "SELECT "
        "c.balance "
        "FROM clients AS c "
        "WHERE c.user_name = %s")

    query_params = (user_name,)
    return sql_query, query_params


def get_recent_stocks():
    sql_query = (
        "SELECT "
        "s.stock_name, s.stock_current_price, s.stock_price_update_time "
        "FROM "
        "stocks AS s "
        "ORDER BY s.stock_price_update_time DESC "
        "LIMIT 3 ")
    
    return sql_query


def get_most_profitable_clients():
    sql_query = (
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
    
    return sql_query
    

def get_stocks():
    sql_query = (
        "SELECT "
        "* "
        "FROM stocks AS s ")
    return sql_query


def get_client_id(user_name):
    sql_query = (
        "SELECT c.client_id "
        "FROM clients AS c "
        "WHERE c.user_name = %s"
    )
    query_params = (user_name,)
    return sql_query, query_params


def post_transaction():
    sql_query = (
        "INSERT INTO transactions (client_id, stock_id, volume, stock_purchase_price, created_at) "
        "VALUES (%s, %s, %s, %s, %s)"
    )
    return sql_query



   