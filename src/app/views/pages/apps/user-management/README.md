# User Management Feature

## Overview
The User Management feature allows Admin users to create, edit, and manage system users. This feature is integrated into the main applications module and follows the existing codebase patterns.

## Features
- **Create Users**: Add new users with roles (LGU, LGA, Others)
- **Edit Users**: Modify existing user information
- **View Users**: Display all users in a table format
- **Delete Users**: Remove users (Admin users cannot be deleted)
- **Role Management**: Assign different roles to users
- **Form Validation**: Comprehensive form validation with error messages

## Components

### UserManagementComponent
- Main component handling user management operations
- Form handling with Reactive Forms
- User CRUD operations
- Error handling and success messages

### UserManagementService
- Service layer for API communication
- Uses the centralized ApiService
- Handles all user-related HTTP operations

## API Integration
The feature integrates with the User Management API endpoints:
- `POST /auth/users` - Create user
- `GET /auth/users` - Get all users
- `GET /auth/users/{id}` - Get user by ID
- `PUT /auth/users/{id}` - Update user

## Usage

### Access
Navigate to `/apps/user-management` in the application.

### Creating a User
1. Fill in the required fields (username, password, role, first name, last name, contact number)
2. Optional fields: email, municipality ID, barangay ID
3. Click "Create User" button

### Editing a User
1. Click the edit button (pencil icon) next to a user
2. Modify the desired fields
3. Click "Update User" button

### Deleting a User
1. Click the delete button (trash icon) next to a user
2. Confirm the deletion
3. Note: Admin users cannot be deleted

## Form Validation
- **Username**: Required, minimum 3 characters
- **Password**: Required for new users, minimum 6 characters
- **Email**: Optional, must be valid email format
- **Role**: Required, must be LGU, LGA, or Others
- **First Name**: Required
- **Last Name**: Required
- **Contact Number**: Required, must match pattern 09XXXXXXXXX

## Security
- Only Admin users can access this feature
- Admin users cannot be deleted
- JWT authentication required for all API calls

## Dependencies
- Angular Reactive Forms
- ng-bootstrap for UI components
- Feather icons for icons
- Bootstrap for styling

## Testing
Basic unit tests are included in `user-management.component.spec.ts` covering:
- Component creation
- User loading
- Error handling

## Future Enhancements
- Bulk user operations
- User search and filtering
- User activity logging
- Password reset functionality
- User import/export
