# 🧭 Employee Management System — Frontend
This repository contains the React-based frontend for the Employee Management System, a full-stack web application designed to manage departments, employees, and tasks within an organization.
The system provides a secure, role-based experience with separate views for Admins and Employees.
Admins have full CRUD (Create, Read, Update, Delete) privileges over departments, employees, and tasks, while employees can view and manage only their assigned tasks and profile

#### Backend Repository Link: [https://github.com/Deem02/capstone-project-backend]

## 🛠Tech stack
| Category                | Technology                               |
| ----------------------- | ---------------------------------------- |
| **Framework / Library** | React                                    |
| **Build Tool**          | Vite                                     |
| **Routing**             | React Router                             |
| **API Client**          | Axios                                    |
| **Styling**             | SCSS (Sass), TailwindCSS, and Global CSS |
| **Authentication**      | JWT (JSON Web Tokens) with `jwt-decode`  |




## 🚀 Getting Started
To set up the project locally, follow these steps:
### 1. Clone the repositires:

```bash
 git clone https://github.com/Deem02/capstone-project-frontend.git
  ```
### 2. Install backend dependencies:

```bash
cd capstone-project-backend
pipenv install
```

### 3. Start the react development server:

```bash
cd  capstone-project-frontend/
npm install
npm run dev
```
The frontend will run on: http://localhost:5173/



## ✨Features
- **Role-Based Access Control (RBAC):**
  - **Admin:** Admins can create, edit, and delete departments, employees, and tasks.
  - **Employee:** View and complete assigned tasks, and view their profile.

- **Authentication:** Secure login/logout using JWT with automatic token refresh.
- **Department Management (Admin):** Full CRUD operations.
- **Employee Management (Admin):** Full CRUD for employees, including creating their user accounts and assigning roles/departments.
- **Task Management:** 
  - **Admin:** Full CRUD. 
  - **Employee:** View assigned tasks, view task details, and mark tasks as complete.
- **Reusable UI Components:** Modals, tables, and shared styles.




## Future Goals
- **Admin Analytics Dashboard:**
View company-wide statistics (e.g., total employees, completed tasks, etc.)
- **Task Filtering & Sorting:**
 Filter the task list by status, due date, or assignee.

