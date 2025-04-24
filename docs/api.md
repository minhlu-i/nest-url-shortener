# API Documentation

## Endpoints

### Create Short URL

```http
POST /api/urls
Content-Type: application/json

{
  "longUrl": "https://example.com/very/long/url",
  "customShortUrl": "optional-custom-url", // Optional
  "password": "optional-password", // Optional
  "expiresAt": "2024-12-31T23:59:59Z" // Optional
}
```

### Redirect URL

```http
GET /:shortUrl
```

### Get URL Information

```http
GET /api/urls/:shortUrl
```

### Delete URL

```http
DELETE /api/urls/:shortUrl
```

### Generate QR Code

```http
GET /api/urls/:shortUrl/qr
```

## Error Handling

### Error Codes and Messages

- 400 Bad Request: Invalid URL or missing required information
- 401 Unauthorized: Invalid password or no access rights
- 404 Not Found: URL does not exist
- 409 Conflict: Short URL already exists
- 429 Too Many Requests: Rate limit exceeded
- 500 Internal Server Error: Server error
- 503 Service Unavailable: Service temporarily unavailable

### Error Response Structure

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Detailed error description",
    "details": {
      // Additional error details (if any)
    }
  }
}
```

## API Versioning

- URL versioning (/v1/api/urls)
- Support minimum 2 API versions simultaneously
- 6-month notice before deprecating old versions
- Deprecation notice in response header
- Fallback version support for legacy clients
- Database schema versioning strategy
