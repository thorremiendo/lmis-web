# User Management API Documentation

## Overview
The User Management API provides endpoints for Admin users to manage system users. All endpoints require JWT authentication and Admin role access.

**Base URL**: `http://localhost:3000/api/auth`

## Authentication
All endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Create User
Creates a new user in the system.

**Endpoint**: `POST /users`

**Headers**:
```
Content-Type: application/json
Authorization: Bearer <jwt-token>
```

**Request Body**:
```json
{
  "username": "string (required)",
  "password": "string (required)",
  "email": "string (optional)",
  "role": "Admin | LGU | LGA | Others (required)",
  "firstName": "string (required)",
  "lastName": "string (required)",
  "contactNumber": "string (required)",
  "municipalityId": "number (optional)",
  "barangayId": "number (optional)"
}
```

**Response (201 Created)**:
```json
{
  "id": 8,
  "username": "newuser",
  "email": "user@example.com",
  "role": "LGU",
  "firstName": "John",
  "lastName": "Doe",
  "contactNumber": "09123456789",
  "municipalityId": 1,
  "barangayId": 1,
  "createdAt": "2025-08-24T08:30:00.000Z"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: User does not have Admin role
- `409 Conflict`: Username or email already exists

**Example cURL**:
```bash
curl -X POST http://localhost:3000/api/auth/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt-token>" \
  -d '{
    "username": "newuser",
    "password": "password123",
    "email": "user@example.com",
    "role": "LGU",
    "firstName": "John",
    "lastName": "Doe",
    "contactNumber": "09123456789",
    "municipalityId": 1,
    "barangayId": 1
  }'
```

---

### 2. Get All Users
Retrieves a list of all users in the system.

**Endpoint**: `GET /users`

**Headers**:
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK)**:
```json
[
  {
    "id": 1,
    "username": "lmis-admin",
    "email": "lmis7@test.com",
    "role": "Admin",
    "firstName": "Admin",
    "lastName": "Admin",
    "contactNumber": "09123456789",
    "municipalityId": null,
    "barangayId": null,
    "createdAt": "2025-08-24T08:00:00.000Z"
  },
  {
    "id": 2,
    "username": "lmis-mayor",
    "email": "lmis1@test.com",
    "role": "LGU",
    "firstName": "Mayor",
    "lastName": "Mayor",
    "contactNumber": "09123456789",
    "municipalityId": null,
    "barangayId": null,
    "createdAt": "2025-08-24T08:00:00.000Z"
  }
]
```

**Error Responses**:
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: User does not have Admin role

**Example cURL**:
```bash
curl -X GET http://localhost:3000/api/auth/users \
  -H "Authorization: Bearer <jwt-token>"
```

---

### 3. Get User by ID
Retrieves a specific user by their ID.

**Endpoint**: `GET /users/{id}`

**Path Parameters**:
- `id`: User ID (integer)

**Headers**:
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK)**:
```json
{
  "id": 1,
  "username": "lmis-admin",
  "email": "lmis7@test.com",
  "role": "Admin",
  "firstName": "Admin",
  "lastName": "Admin",
  "contactNumber": "09123456789",
  "municipalityId": null,
  "barangayId": null,
  "createdAt": "2025-08-24T08:00:00.000Z"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid user ID
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: User does not have Admin role
- `404 Not Found`: User not found

**Example cURL**:
```bash
curl -X GET http://localhost:3000/api/auth/users/1 \
  -H "Authorization: Bearer <jwt-token>"
```

---

### 4. Update User
Updates an existing user's information.

**Endpoint**: `PUT /users/{id}`

**Path Parameters**:
- `id`: User ID (integer)

**Headers**:
```
Content-Type: application/json
Authorization: Bearer <jwt-token>
```

**Request Body** (all fields optional):
```json
{
  "username": "string (optional)",
  "email": "string (optional)",
  "role": "Admin | LGU | LGA | Others (optional)",
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "contactNumber": "string (optional)",
  "municipalityId": "number (optional)",
  "barangayId": "number (optional)"
}
```

**Response (200 OK)**:
```json
{
  "id": 1,
  "username": "updated-username",
  "email": "newemail@example.com",
  "role": "Admin",
  "firstName": "Updated",
  "lastName": "Name",
  "contactNumber": "09987654321",
  "municipalityId": 1,
  "barangayId": 1,
  "createdAt": "2025-08-24T08:00:00.000Z"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: User does not have Admin role
- `404 Not Found`: User not found
- `409 Conflict`: Username or email already exists

**Example cURL**:
```bash
curl -X PUT http://localhost:3000/api/auth/users/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt-token>" \
  -d '{
    "firstName": "Updated",
    "email": "newemail@example.com"
  }'
```

---

## Data Models

### User Role Enum
```typescript
enum Role {
  Admin = "Admin",    // System administrator
  LGU = "LGU",        // Local Government Unit
  LGA = "LGA",        // Local Government Agency
  Others = "Others"   // Community members
}
```

### User Response Object
```typescript
interface UserResponse {
  id: number;
  username: string;
  email: string | null;
  role: Role;
  firstName: string;
  lastName: string;
  contactNumber: string;
  municipalityId: number | null;
  barangayId: number | null;
  createdAt: Date;
}
```

---

## Error Handling

### Common Error Responses

**401 Unauthorized**:
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**403 Forbidden**:
```json
{
  "statusCode": 403,
  "message": "Forbidden"
}
```

**404 Not Found**:
```json
{
  "statusCode": 404,
  "message": "User not found"
}
```

**409 Conflict**:
```json
{
  "statusCode": 409,
  "message": "Username already exists"
}
```

**422 Validation Error**:
```json
{
  "statusCode": 422,
  "message": "Validation failed",
  "errors": [
    {
      "field": "username",
      "message": "Username is required"
    }
  ]
}
```

---

## Frontend Integration Examples

### Angular Service Example

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private baseUrl = 'http://localhost:3000/api/auth';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.getToken()}`
  });

  constructor(private http: HttpClient) {}

  private getToken(): string {
    return localStorage.getItem('jwt_token') || '';
  }

  // Create User
  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, userData, { headers: this.headers });
  }

  // Get All Users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`, { headers: this.headers });
  }

  // Get User by ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${id}`, { headers: this.headers });
  }

  // Update User
  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, userData, { headers: this.headers });
  }
}
```

### Angular Component Example

```typescript
import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';

@Component({
  selector: 'app-user-management',
  template: `
    <div>
      <h2>User Management</h2>
      
      <!-- Create User Form -->
      <form (ngSubmit)="createUser()">
        <input [(ngModel)]="newUser.username" placeholder="Username" required>
        <input [(ngModel)]="newUser.password" type="password" placeholder="Password" required>
        <select [(ngModel)]="newUser.role" required>
          <option value="LGU">LGU</option>
          <option value="LGA">LGA</option>
          <option value="Others">Others</option>
        </select>
        <button type="submit">Create User</button>
      </form>

      <!-- Users List -->
      <div *ngFor="let user of users">
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
        <p>Username: {{ user.username }}</p>
        <p>Role: {{ user.role }}</p>
        <button (click)="editUser(user)">Edit</button>
      </div>
    </div>
  `
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  newUser: any = {};

  constructor(private userService: UserManagementService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      users => this.users = users,
      error => console.error('Error loading users:', error)
    );
  }

  createUser() {
    this.userService.createUser(this.newUser).subscribe(
      user => {
        this.users.push(user);
        this.newUser = {};
      },
      error => console.error('Error creating user:', error)
    );
  }

  editUser(user: any) {
    // Implement edit functionality
  }
}
```

---

## Testing

### Test Users
Use these default users for testing:

| Username | Password | Role |
|----------|----------|------|
| `lmis-admin` | `testpassword` | Admin |
| `lmis-mayor` | `testpassword` | LGU |
| `lmis-drrmo` | `testpassword` | LGA |

### Testing Flow
1. **Login as Admin**: Use `lmis-admin` credentials
2. **Get JWT Token**: Extract from login response
3. **Test Endpoints**: Use the token in Authorization header
4. **Verify Access Control**: Try with non-admin users (should get 403)

---

## Notes

- **Password Security**: Passwords are hashed using bcrypt before storage
- **Role-Based Access**: Only Admin users can access these endpoints
- **Data Validation**: All input is validated using class-validator
- **Swagger Documentation**: Available at `/api` endpoint
- **CORS**: API supports cross-origin requests
- **Rate Limiting**: Not implemented (consider adding for production)

---

## Support

For API issues or questions, check the Swagger documentation at:
`http://localhost:3000/api`

Or refer to the server logs for detailed error information.
