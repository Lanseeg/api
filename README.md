# api
Peran.dev API
Description
This API is designed to power a developer's portfolio, managing users, their skills, work experiences, and educational trainings. It allows for creating, retrieving, updating, and deleting records related to these entities.

#Key features:

User Authentication: Token-based authentication with JWT.
CRUD Operations: Manage skills, jobs, and trainings.
Public and Protected Routes: Certain routes are accessible without authentication.

#Installation
Prerequisites
Node.js
MongoDB
Yarn
Steps
Clone the repository:

git clone https://github.com/your-username/portfolio-api.git
cd portfolio-api
Install dependencies:

yarn install
Create a .env file at the root of the project with the following environment variables:

PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret
Start the server:

yarn dev
Access the API locally at:

http://localhost:5000

#API Routes and Requests
Authentication
Method	Endpoint	Description	Body Params	Requires Auth
POST	/api/auth/register	Register a new user	{ "name": "John", "email": "email", "password": "pass" }	No
POST	/api/auth/login	Log in and get a JWT token	{ "email": "email", "password": "pass" }	No
User Skills
Method	Endpoint	Description	Body Params	Requires Auth
GET	/api/user/skills	Get all skills (public route)	None	No
POST	/api/user/skills	Add a new skill	{ "name": "React", "level": "Advanced" }	Yes
PUT	/api/user/skills/:id	Update an existing skill	{ "name": "React", "level": "Expert" }	Yes
DELETE	/api/user/skills/:id	Delete a skill	None	Yes
User Jobs
Method	Endpoint	Description	Body Params	Requires Auth
GET	/api/user/jobs	Get all jobs (public route)	None	No
POST	/api/user/jobs	Add a new job	{ "title": "Dev", "company": "Company", ... }	Yes
PUT	/api/user/jobs/:id	Update an existing job	{ "title": "Dev", "company": "Company", ... }	Yes
DELETE	/api/user/jobs/:id	Delete a job	None	Yes
User Trainings
Method	Endpoint	Description	Body Params	Requires Auth
GET	/api/user/trainings	Get all trainings (public route)	None	No
POST	/api/user/trainings	Add a new training	{ "title": "Bootcamp", "startDate": "2023-01-01", ... }	Yes
PUT	/api/user/trainings/:id	Update an existing training	{ "title": "Bootcamp", "startDate": "2023-01-01", ... }	Yes
DELETE	/api/user/trainings/:id	Delete a training	None	Yes

#Example Requests
1. Register a User
POST /api/auth/register

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
2. Add a Skill
POST /api/user/skills

{
  "name": "React",
  "level": "Advanced"
}
3. Add a Training
POST /api/user/trainings

{
  "title": "Full-Stack Web Development",
  "institution": "OpenClassrooms",
  "startDate": "2022-01-01",
  "endDate": "2022-12-31",
  "keySkills": ["React", "Node.js", "MongoDB"]
}