from flask import jsonify

def json_title_with_query_params(cursor, sql_query, query_params):
    cursor.execute(sql_query, query_params)
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    payload = []
    for result in data:
        payload.append(dict(zip(row_headers, result)))
    return jsonify(payload)

def json_title_without_query_params(cursor, sql_query):
    cursor.execute(sql_query)
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    payload = []
    for result in data:
        payload.append(dict(zip(row_headers, result)))
    return jsonify(payload)