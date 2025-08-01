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
    # atau
    # yarn install
    ```

## Konfigurasi

### Konfigurasi Database

Buka file `.env` dan sesuaikan koneksi database.

**Untuk PostgreSQL:**
```dotenv
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nama_database
DB_USERNAME=nama_pengguna
DB_PASSWORD=kata_sandi
```

## Login
Email             | Password  
------------------|-----------
manager@email.com | manager123
sales@example.com | 12345678
