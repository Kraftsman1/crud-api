# Blog API

API documentation for the Blog API

## Base URL

- Base URL: `http://localhost:3000/api`

## Authentication

To access the protected endpoints, users need to include an authentication token in the request headers.

### Register a new user

- Endpoint: `/auth/register`
- Method: POST
- Request body:
  - `username` (string): The username for the new user.
  - `password` (string): The password for the new user.
- Response:
  - Status code 201: User registered successfully.
  - Status code 400: Username already exists.
  - Status code 500: Internal Server Error.

### Login

- Endpoint: `/auth/login`
- Method: POST
- Request body:
  - `username` (string): The username of the user.
  - `password` (string): The password of the user.
- Response:
  - Status code 200: Login successful. Returns the authentication token.
  - Status code 401: Invalid credentials.
  - Status code 404: User not found.
  - Status code 500: Internal Server Error.

## Blog Posts

### Create a new post

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

### Get all posts

- Endpoint: `/posts`
- Method: GET
- Response:
  - Status code 200: Returns an array of all blog posts.
  - Status code 500: Internal Server Error.

### Get a specific post

- Endpoint: `/posts/{postId}`
- Method: GET
- Response:
  - Status code 200: Returns the specified post.
  - Status code 404: Post not found.
  - Status code 500: Internal Server Error.

### Update a post

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

### Delete a post

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
