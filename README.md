# 🚀 Taskly — SaaS Task Management System

## 📌 Overview

Taskly is a **team-based task management system** (like Trello/Jira) where:

* Multiple users collaborate
* Work is organized by teams
* Teams contain projects
* Projects contain tasks
* Tasks support comments, assignment, and activity tracking

---

## 🧠 Core Idea

```
User → Team → Project → Task → Comment
```

This is a **multi-tenant SaaS architecture**

---

## 🔁 Full Application Flow

### 1️⃣ Authentication

* User signs up / logs in
* JWT token is generated
* Token stored in frontend (localStorage)
* All APIs use this token

---

### 2️⃣ Team Creation (ENTRY POINT)

```
User → Create Team → Becomes Owner
```

* A user must create or join a team before doing anything
* Team is the **workspace**

---

### 3️⃣ Team Membership

```
Owner → Invite Member → User joins → becomes TeamMember
```

Roles:

* `owner`
* `admin`
* `member`

---

### 4️⃣ Team Selection (IMPORTANT)

* User can belong to multiple teams
* Sidebar shows:

```
[ Team Switcher ⌄ ]
```

* Selected team → stored as `activeTeamId`

---

### 5️⃣ Project Management

```
Team → Create Projects
```

* Projects belong to a team
* Example:

  * Website Redesign
  * Mobile App

---

### 6️⃣ Task Management

```
Project → Create Tasks
```

Each task has:

* title
* description
* status (todo / in-progress / done)
* assigned user

---

### 7️⃣ Task Assignment

```
Assign task → only team members allowed
```

---

### 8️⃣ Kanban System

Tasks move through:

```
Todo → In Progress → Done
```

Supports:

* Drag & Drop
* Status update

---

### 9️⃣ Comments System

```
User → Add comment → Stored per task
```

---

### 🔟 Activity Logs

Track:

* Task created
* Task updated
* Task assigned
* Comment added

---

## 🧱 Database Architecture

### User

```
id
email
password
createdAt
```

---

### Team

```
id
name
ownerId
createdAt
```

---

### TeamMember

```
id
userId
teamId
role
```

---

### Project

```
id
name
teamId
```

---

### Task

```
id
title
description
status
projectId
assignedToId
```

---

### Comment

```
id
text
taskId
userId
```

---

## 🔐 Access Control Rules

* Only team members can:

  * view projects
  * create tasks

* Only team members can be assigned tasks

* Only owner/admin can:

  * invite members

---

## 🧠 Backend Logic

### Key Rule

```
Everything is filtered by teamId
```

---

### Example

#### ❌ Wrong

```
Get all projects of user
```

#### ✅ Correct

```
Get projects of selected team (teamId)
```

---

## 🎯 APIs

### Auth

```
POST /auth/signup
POST /auth/login
```

---

### Team

```
POST /team
GET /teams
POST /team/invite
GET /team/members
```

---

### Project

```
POST /projects
GET /projects?teamId=
```

---

### Task

```
POST /tasks
GET /tasks?teamId=
PATCH /tasks/:id
DELETE /tasks/:id
```

---

### Comment

```
POST /comments
GET /comments?taskId=
```

---

## 🎨 Frontend Architecture

### Structure

```
src/
 ├── app/
 ├── features/
 │    ├── auth/
 │    ├── team/
 │    ├── project/
 │    ├── task/
 │    ├── comment/
 │
 ├── components/
 │    ├── layout/
 │    ├── common/
 │
 ├── pages/
 ├── lib/
```

---

## 🧩 Layout System

### Public Layout

* Navbar
* Landing page

---

### App Layout

* Sidebar
* Topbar
* Main content

---

## 🧭 Sidebar Structure

```
[ Team Switcher ⌄ ]

Dashboard
My Tasks
Activity
Teams
Projects

Settings
Logout
```

---

## 🔄 Data Flow

```
Login
→ Fetch teams
→ Select active team
→ Store activeTeamId
→ Fetch projects/tasks based on teamId
```

---

## ⚡ Key Concepts Learned

### 1️⃣ Multi-Tenant System

```
One app → multiple teams → isolated data
```

---

### 2️⃣ Context-Based Data

```
activeTeamId controls everything
```

---

### 3️⃣ Role-Based Access

```
Owner / Admin / Member
```

---

### 4️⃣ Feature-Based Architecture

Clean separation:

```
task/
team/
project/
```

---

## 🚀 Features Built

✅ Auth system
✅ Team system
✅ Invite members
✅ Kanban board
✅ Drag & Drop
✅ Task modal
✅ Edit task
✅ Comments UI
✅ Sidebar + Topbar
✅ Protected routes

---

## 🔥 Future Improvements

* Assign user dropdown (team members)
* Backend integration for comments
* Real-time updates (WebSockets)
* Notifications
* Project-level permissions
* File uploads

---

## 👊 Final Thought

This project is not just CRUD.

It is a:

```
Real SaaS system
```

You have implemented:

* Multi-user architecture
* Team-based collaboration
* Real product UI/UX
* Scalable backend design

---

## 🧠 Mental Model

```
Team = Workspace
Project = Container
Task = Work Unit
```

---

## 🚀 Status

```
MVP Completed ✅
```

---

Built by Shiv 🚀
