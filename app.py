from flask import Flask, render_template, request, redirect, session, url_for
from pymongo import MongoClient

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client['EcoHabitApp']
users = db['users']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if users.find_one({'username': username}):
            return "Username already exists!"
        users.insert_one({'username': username, 'password': password, 'eco_points': 0})
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = users.find_one({'username': username})
        if user:
            session['user'] = username
            return redirect(url_for('dashboard'))
        return "Invalid credentials, please try again."
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))
    user = users.find_one({'username': session['user']})
    return render_template('dashboard.html', username=user['username'], eco_points=user['eco_points'])

@app.route('/add_points', methods=['POST'])
def add_points():
    if 'user' not in session:
        return redirect(url_for('login'))

    username = session['user']
    action = request.form['action']

    # Assign eco-points per action
    points_dict = {
        'carpooling': 2,
        'reused_container': 1,
        'skipped_meat': 2,
        'public_transport': 1.5,
        'no_plastic': 2,
        'custom': 1
    }

    points = points_dict.get(action, 0)
    users.update_one({'username': username}, {'$inc': {'eco_points': points}})
    return redirect(url_for('dashboard'))

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
