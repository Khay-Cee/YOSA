# YOSA — Youth Space Afrika

A charity/NGO web platform for Youth Space Afrika, built with React and Django REST Framework. The platform handles volunteer registration, contact forms, financial and in-kind donations (via Paystack), news/blog posts, a gallery, and a popular-causes tracking system.

---

## Project Structure

```
YOSA/
├── frontend/          # React app (Create React App)
└── backend/           # Django REST Framework API
```

---

## Frontend

### Requirements
- Node.js 18+

### Setup & Run

```bash
cd frontend
npm install
npm start          # dev server at http://localhost:3000
npm run build      # production build
npm test           # run tests
```

### Key Pages & Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/outreach` | Outreach & Gallery |
| `/contact` | Contact Us |
| `/faq` | FAQ |
| `/donate` | Donate (Money / Food / Clothing) |
| `/volunteer` | Volunteer Registration |
| `/thank-you` | Post-submission Thank You page |

### Donations & Paystack

- Financial donations use [Paystack](https://paystack.com/) (test keys in use — swap before going live).
- The `/donate` page accepts an optional `?causeId=&causeName=&category=` query string when linking from the Causes section, so the donation is tied to a specific cause and updates its `raised` amount on payment verification.

---

## Backend

### Requirements
- Python 3.11+
- pip

### Setup & Run

```bash
cd backend
python -m venv myenv
myenv\Scripts\activate        # Windows
# source myenv/bin/activate   # Mac/Linux

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver    # API at http://localhost:8000
```

Django admin is at `http://localhost:8000/admin/`.

### Seed Initial Data

```bash
python manage.py seed_causes   # creates the 4 default donation causes
```

### API Endpoints

Base URL: `http://localhost:8000/api/`

| Endpoint | Description |
|---|---|
| `POST /api/volunteers/` | Register a volunteer |
| `POST /api/contactus/` | Submit a contact message |
| `POST /api/donations/` | Create a donation record & get Paystack reference |
| `GET  /api/causes/` | List active donation causes |
| `POST /api/newsletter/` | Subscribe to newsletter |
| `GET  /api/news/` | List published news posts |
| `GET  /api/gallery/` | List gallery images |
| `GET  /verify-payment/?reference=` | Verify Paystack payment & update cause raised amount |

### Models

| Model | Purpose |
|---|---|
| `Volunteer` | Volunteer registrations |
| `ContactUs` | Contact form submissions |
| `Donation` | Donation records (Money / Food / Clothing), linked to optional Cause |
| `Cause` | Fundraising causes with goal/raised tracking |
| `Newsletter` | Newsletter subscribers |
| `News` | Blog/news posts (Markdown body via django-mdeditor) |
| `Gallery` | Photo gallery items |

---

## Configuration Notes

> Before deploying to production:

- Move Paystack keys out of `settings.py` into environment variables.
- Set `CORS_ORIGIN_ALLOW_ALL = False` and whitelist specific origins.
- Update the `Dockerfile` — it currently references `core.wsgi` but the project module is `backend`.
- Switch from SQLite to a production database (PostgreSQL recommended).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Axios, react-paystack v5, MUI, Tailwind CSS |
| Backend | Django 6, Django REST Framework 3, django-mdeditor |
| Payments | Paystack |
| Database | SQLite (dev) |
