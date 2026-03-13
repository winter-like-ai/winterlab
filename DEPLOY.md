# Deployment Guide for WinterLab

This guide will help you deploy the WinterLab Vue 3 application to your own server.

## Prerequisites

- A server (VPS) running Linux (Ubuntu/Debian/CentOS).
- **Node.js** (for building locally) or just the pre-built `dist` folder.
- **Nginx** (Web Server).

## Step 1: Build the Project

We have already run the build command for you. The production-ready files are located in the `dist` folder.

If you need to rebuild:
```bash
npm run build
```

## Step 2: Upload Files to Server

You need to upload the contents of the `dist` folder to your server. You can use `scp` or an FTP client like FileZilla.

**Example using SCP:**
```bash
# Run this from your local machine
scp -r dist/* user@your-server-ip:/var/www/winterlab
```
*Note: Make sure the directory `/var/www/winterlab` exists on your server.*

## Step 3: Configure Nginx

1.  **Install Nginx** (if not already installed):
    ```bash
    sudo apt update
    sudo apt install nginx
    ```

2.  **Create a Configuration File**:
    We have provided a sample `nginx.conf` in the project root. Copy its content to a new file in `/etc/nginx/sites-available/`.

    ```bash
    sudo nano /etc/nginx/sites-available/winterlab
    ```
    Paste the content from `nginx.conf` and update `server_name` and `root` path if necessary.

3.  **Enable the Site**:
    ```bash
    sudo ln -s /etc/nginx/sites-available/winterlab /etc/nginx/sites-enabled/
    ```

4.  **Test and Restart Nginx**:
    ```bash
    sudo nginx -t
    sudo systemctl restart nginx
    ```

## Step 4: Verify

Open your browser and navigate to your domain or server IP. You should see the WinterLab blog running!
