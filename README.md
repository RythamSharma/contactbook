# ContactU - Web-Based Contact Book Application

ContactU is a web-based contact book application developed to help users manage their contacts efficiently. It allows users to store various contact information such as First Name, Middle Name, Last Name, Email, Phone Number 1, Phone Number 2, and Address. 

## Features

- **Add New Contact**: Users can add a new contact by providing the required information.
- **Edit Existing Contact**: Users can edit the details of an existing contact.
- **View Contacts**: All contacts are displayed in a paginated form with infinite scroll, sorted by Full Name by default.
- **Soft Delete**: Users can soft delete a contact, allowing them to retain the contact information without permanently removing it from the system.
- **Search Contacts**: Users can search through contacts by any field, ensuring a search operation completes within 1 second.
- **Authentication System**: ContactU includes an authentication system to secure user data and access.
- **Deployment**: The application is deployed using Docker on Render.com, with the frontend deployed on Vercel.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Deployment**: Docker, Render.com (Backend), Vercel (Frontend)

## Usage

1. Clone the repository: `git clone https://github.com/your-username/contactU.git`
2. Install dependencies for both frontend and backend.
3. Set up the MySQL database.
4. Configure the environment variables.
5. Run the application.

## Installation

### Frontend

1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`

### Backend

1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`

## Database Setup

1. Install MySQL if not already installed.
2. Create a new database named `contactbook`.
3. Set up the necessary tables for storing contact information.

## Configuration

1. Set up environment variables for backend configuration, including database connection details, Access token secret, etc.
2. Configure environment variables for frontend, including API endpoints.

## Deployment

1. Build the frontend application: `npm run build`
2. Dockerize the backend application.
3. Deploy the Docker container on Render.com.
4. Deploy the frontend application on Vercel.

## Contributors

- [Rytham Sharma](https://github.com/RythamSharma)

