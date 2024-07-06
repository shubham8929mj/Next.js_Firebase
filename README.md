# POC

This project is a Proof of Concept (POC) for a web application built with React, Next.js, Tailwind CSS, and RSuite components, integrated with Firebase for database and API functionalities.

## Features

- **Authentication:**
  - Signup with email, name, and password.
  - Signin with email and password.
  - Logout functionality.

- **Home Page:**
  - Banner with application branding.
  - Display of current date and time.
  - Welcome message for logged-in users.

- **Employee Management:**
  - Add new employees with auto-generated ID.
  - Fields for Employee Name, Email, Date of Birth.
  - Toggle button for employee status (At work/Off).
  - Decimal validation for entering salary.

- **Employee Listing:**
  - List employees with sorting by name.
  - Pagination for managing large lists.
  - Search functionality by email or name with debouncing (3 characters).

- **Employee Actions:**
  - Edit employee details (except Email) with pre-filled values.
  - View employee details with additional information (DOB, Salary).
  - Delete employee with confirmation dialogue.

## Technologies Used

- React
- Next.js
- Tailwind CSS
- RSuite
- Firebase (Firestore for database)

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository from GitHub.
2. Install dependencies using `npm install`.
3. Configure Firebase credentials in `.env.local` file.
4. Start the development server with `npm run dev`.
