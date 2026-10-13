# Comandos cURL - API Cielum

## 1. Inicio de Sesión (Login)
```bash
curl -X POST "http://localhost:3000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@correo.com", "password": "123456"}'

  curl -X GET "http://localhost:3000/productos" \
  -H "Authorization: Bearer TU_TOKEN_AQUI"

  curl -X POST "http://localhost:3000/productos" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{"nombre": "Laptop Lenovo", "precio": 2500000, "stock": 10}'