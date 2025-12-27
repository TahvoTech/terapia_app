from flask import Flask, render_template, request, redirect, url_for, session
from datetime import datetime, timedelta
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')

# Mock data
therapists = [
    {'id': 1, 'name': 'Dr. Sarah Johnson', 'specialty': 'Cognitive Behavioral Therapy'},
    {'id': 2, 'name': 'Dr. Michael Chen', 'specialty': 'Family Therapy'},
    {'id': 3, 'name': 'Dr. Emily Rodriguez', 'specialty': 'Trauma Therapy'}
]

appointments = []
messages = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    role = request.form.get('role')
    name = request.form.get('name')
    session['role'] = role
    session['name'] = name
    
    if role == 'patient':
        return redirect(url_for('patient_dashboard'))
    else:
        return redirect(url_for('therapist_dashboard'))

@app.route('/patient/dashboard')
def patient_dashboard():
    if session.get('role') != 'patient':
        return redirect(url_for('index'))
    
    patient_name = session.get('name')
    patient_appointments = [apt for apt in appointments if apt['patient'] == patient_name]
    return render_template('patient_dashboard.html', 
                         therapists=therapists, 
                         appointments=patient_appointments,
                         name=patient_name)

@app.route('/patient/book', methods=['POST'])
def book_appointment():
    therapist_id = int(request.form.get('therapist_id'))
    date_str = request.form.get('date')
    time_str = request.form.get('time')
    
    therapist = next((t for t in therapists if t['id'] == therapist_id), None)
    
    appointment = {
        'id': len(appointments) + 1,
        'patient': session.get('name'),
        'therapist': therapist['name'],
        'date': date_str,
        'time': time_str,
        'status': 'scheduled'
    }
    appointments.append(appointment)
    
    return redirect(url_for('patient_dashboard'))

@app.route('/therapist/dashboard')
def therapist_dashboard():
    if session.get('role') != 'therapist':
        return redirect(url_for('index'))
    
    therapist_name = session.get('name')
    therapist_appointments = [apt for apt in appointments if apt['therapist'] == therapist_name]
    
    return render_template('therapist_dashboard.html', 
                         appointments=therapist_appointments,
                         name=therapist_name)

@app.route('/therapist/update/<int:apt_id>', methods=['POST'])
def update_appointment(apt_id):
    status = request.form.get('status')
    for apt in appointments:
        if apt['id'] == apt_id:
            apt['status'] = status
            break
    return redirect(url_for('therapist_dashboard'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
