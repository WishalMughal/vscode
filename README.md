# Islamic Academy Backend — Phase A (Complete Modules)

## Modules Included
- Auth (JWT), Students, Bayans, Announcements
- **Books** (CRUD)
- **Zikar / Duas** (Add/List)
- **Namaz Timing** (Karachi via Aladhan API)
- **Quran** (AlQuran API wrapper)
- **Contact Form** (Public submit, Admin listing)

## Quick Start
```
cp .env.example .env  # fill MySQL credentials
npm i
npm run dev
```

## Key Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/bayans, POST /api/bayans (admin)
- GET /api/announcements, POST /api/announcements (admin)
- GET /api/students, POST /api/students (admin)
- GET /api/books, POST/PUT/DELETE /api/books/:id (admin)
- GET /api/zikar, POST /api/zikar (admin)
- GET /api/namaz/karachi
- GET /api/quran/list, GET /api/quran/surah/:id
- POST /api/contact, GET /api/contact (admin)
```

# Notes
- This code uses `sequelize.sync({ alter: true })` for development.
- For production, add migrations and turn off `alter`.


## Student Admission Form Fields (Updated)
The student admission API now supports extended fields for درس نظامی admission, including:
- name, father_name, date_of_birth, age, gender, marital_status
- student_b_form_or_cnic, cnic
- guardian_name, guardian_profession, guardian_phone, guardian_cnic, guardian_relation
- guarantor_name, guarantor_profession, guarantor_phone
- phone, whatsapp_number, emergency_contact_name, emergency_contact_phone
- address, city, district, province
- dini_education, asri_education
- previous_dini_institute, previous_asri_institute, previous_class_or_degree
- course_applied_for, other_activities, medical_condition
- hostel_required, transport_required, passport_photo_url, document_notes, remarks

### Example POST `/api/students/admission`
```json
{
  "name": "Muhammad Ali",
  "father_name": "Muhammad Aslam",
  "date_of_birth": "2010-05-10",
  "age": 16,
  "student_b_form_or_cnic": "35202-1234567-1",
  "guardian_cnic": "35202-7654321-0",
  "phone": "03001234567",
  "whatsapp_number": "03001234567",
  "address": "Gujranwala, Punjab",
  "dini_education": "Nazra Quran",
  "asri_education": "Middle",
  "previous_dini_institute": "Jamia Example",
  "previous_asri_institute": "Govt School Example",
  "other_activities": "Part time helping in shop",
  "guardian_name": "Muhammad Aslam",
  "guardian_profession": "Business",
  "guardian_phone": "03001234567",
  "guardian_relation": "Father",
  "guarantor_name": "Hafiz Ahmad",
  "guarantor_profession": "Teacher",
  "guarantor_phone": "03111234567",
  "course_applied_for": "درس نظامی"
}
```
