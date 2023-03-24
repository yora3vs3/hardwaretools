from flask import Flask, request, render_template, send_from_directory, jsonify
import csv

app = Flask(__name__)

# Define the path to the CSV file
CSV_FILE = 'tools.csv'


@app.route('/')
def home():
    return render_template('hardware.html')


@app.route('/js/<path:path>')
def serve_js(path):
    return send_from_directory('js', path)


# Define the route to handle POST requests to add a tool


@app.route('/tools', methods=['POST'])
def add_tool():
    # Get the tool data from the request body
    data = request.get_json()
    name = data['name']
    price = data['price']

    # Write the tool data to the CSV file
    with open(CSV_FILE, 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([name, price])

    # Return the new tool data as JSON
    return jsonify({'name': name, 'price': price})

# Define the route to handle GET requests to load the tools


@app.route('/tools', methods=['GET'])
def get_tools():
    # Read the tools from the CSV file
    tools = []
    with open(CSV_FILE, 'r', newline='') as file:
        reader = csv.reader(file)
        for row in reader:
            tools.append({'name': row[0], 'price': float(row[1])})

    # Return the tools as JSON
    return jsonify(tools)


if __name__ == '__main__':
    # Run the server
    app.run(debug=True)
