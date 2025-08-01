# CRM

## Instalasi

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan aplikasi:

1.  **Kloning Repositori:**
    ```bash
    git clone https://github.com/kevindwi/kevin_crm
    cd kevin_crm
    ```

2.  **Instal Dependensi Backend (PHP):**
    ```bash
    composer install
    ```

3.  **Instal Dependensi Frontend (JavaScript):**
    ```bash
    npm install
    ```

## Konfigurasi

### Konfigurasi Database

Buka file `.env` dan sesuaikan koneksi database.

**Untuk PostgreSQL:**
```dotenv
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

BCRYPT_ROUNDS=12

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5332
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=12345
```

**Import kevin_crm.sql ke PostgreSQL dengan psql**

```bash
psql -U postgres -d nama_database -f ./kevin_crm.sql
```

### Menjalankan

```bash
php artisan serve

npm run dev
```

## Login
Email             | Password  
------------------|-----------
manager@email.com | manager123
sales@example.com | 12345678
