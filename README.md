# Terapia App

A simple therapy appointment booking web app for patients and therapists (mockup/prototype version).

## Features

- **Patient Dashboard**: Book appointments with therapists, view scheduled sessions
- **Therapist Dashboard**: View and manage patient appointments
- **Simple Authentication**: Role-based login (patient/therapist)
- **Mock Data**: In-memory storage for quick prototyping

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py
```

Visit `http://localhost:5000`

## Deploy to Render

1. Push this code to GitHub
2. Connect your GitHub repo to Render
3. Render will automatically use the `render.yaml` configuration
4. Your app will be live!

Alternatively, use the Render dashboard to create a new Web Service pointing to this repo.

## Usage

1. Enter your name and select role (Patient or Therapist)
2. **As a Patient**: Browse therapists and book appointments
3. **As a Therapist**: View and update appointment statuses

## Tech Stack

- Flask (Python web framework)
- HTML/CSS (Frontend)
- Gunicorn (Production server)

## License

MIT
