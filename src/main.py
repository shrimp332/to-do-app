from flask import Flask, jsonify, request, make_response
from werkzeug.exceptions import BadRequest

app = Flask(__name__, static_url_path='')

tasks = []


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api', methods=['GET', 'POST', 'DELETE'])
def handler():
    match request.method:
        case "GET":
            return make_response(jsonify(tasks=tasks), 200)
        case "POST":
            try:
                json = request.get_json()
            except BadRequest as e:
                return make_response(e, 400)
            tasks.append(json['task'])
            return make_response(jsonify(tasks=tasks), 201)
        case "DELETE":
            try:
                json = request.get_json()
            except BadRequest as e:
                return make_response(e, 400)
            tasks[:] = [task for task in tasks if task != json['task']]
            return make_response(jsonify(tasks=tasks), 204)


if __name__ == '__main__':
    app.run()
