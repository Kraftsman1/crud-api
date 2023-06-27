# Blog API

API documentation for the Crud API Challenge - Slightly Techie

## Base URL

- Base URL: `http://localhost:3000/api`

## Authentication

An authentication token needs to be added to the request headers to access protected endpoints.

### Register New User

- Endpoint: `/auth/register`
- Method: POST
- Request body:
  - `username` (string): The username for the new user.
  - `email` (string): The email for the new user.
  - `password` (string): The password for the new user.
- Response:
  - Status code 201: User registered successfully.
  - Status code 400: Email already exists.
  - Status code 500: Internal Server Error.
  - Status code 501: Email Required.

### Login

- Endpoint: `/auth/login`
- Method: POST
- Request body:
  - `username` (string): The username of the user.
  - `password` (string): The password of the user.
- Response:
  - Status code 200: Login successful. Returns the authentication token and username.
  - Status code 401: Invalid credentials.
  - Status code 404: User not found.
  - Status code 500: Internal Server Error.

## Blog Posts

### Create New Post

- Endpoint: `/posts`
- Method: POST
- Protected: Yes (Requires authentication token in headers)
- Request body:
  - `title` (string): The title of the blog post.
  - `content` (string): The content of the blog post.
- Response:
  - Status code 201: Post created successfully. Returns the created post.
  - Status code 401: Unauthorized (Invalid or missing authentication token).
  - Status code 500: Internal Server Error.

### Get all Posts

- Endpoint: `/posts`
- Method: GET
- Response:
  - Status code 200: Returns an array of all blog posts.
  - Status code 500: Internal Server Error.

### Get specific Post

- Endpoint: `/posts/{postId}`
- Method: GET
- Response:
  - Status code 200: Returns the specified post.
  - Status code 404: Post not found.
  - Status code 500: Internal Server Error.

### Update Post

- Endpoint: `/posts/{postId}`
- Method: PUT
- Protected: Yes (Requires authentication token in headers)
- Request body:
  - `title` (string): The updated title of the blog post.
  - `content` (string): The updated content of the blog post.
- Response:
  - Status code 200: Post updated successfully. Returns the updated post.
  - Status code 401: Unauthorized (Invalid or missing authentication token).
  - Status code 404: Post not found.
  - Status code 500: Internal Server Error.

### Delete Post

- Endpoint: `/posts/{postId}`
- Method: DELETE
- Protected: Yes (Requires authentication token in headers)
- Response:
  - Status code 200: Post deleted successfully.
  - Status code 401: Unauthorized (Invalid or missing authentication token).
  - Status code 404: Post not found.
  - Status code 500: Internal Server Error.

## Error Handling

The API may return various status codes and error messages in case of errors. The common error codes are:

- 400: Bad Request - The request is malformed or missing required parameters.
- 401: Unauthorized - Authentication is required or the provided token is invalid.
- 404: Not Found - The requested resource was not found.
- 500: Internal Server Error - An unexpected error occurred on the server.
