# VISHWAS ENTERPRISES - CORPORATE WEBSITE
### Premium Bank Collection & Recovery Agency | Hyderabad & Secunderabad, Telangana

![Vishwas Enterprises](https://img.shields.io/badge/Established-2019-0B1C32?style=for-the-badge)
![Awards](https://img.shields.io/badge/Awards-8%20Platinum%20%7C%204%20Gold-C9A96E?style=for-the-badge)
![Compliance](https://img.shields.io/badge/Compliance-100%25%20RBI%20Code%20of%20Conduct-173B63?style=for-the-badge)
![Coverage](https://img.shields.io/badge/Coverage-Telangana%20%26%20Andhra%20Pradesh-25D366?style=for-the-badge)

---

## 1. Project Overview

This repository contains the complete, production-grade corporate website for **Vishwas Enterprises**, a premier bank collection and recovery agency established in 2019 and headquartered in Hyderabad, Telangana. Led by **Mr. R. Srinivas** (Proprietor & Managing Director with 17+ years of retail banking recovery expertise), Vishwas Enterprises delivers compliant, high-velocity debt resolution solutions for leading Indian commercial banks, regional rural banks, NBFCs, and institutional lenders across **Telangana and Andhra Pradesh**.

---

## 2. Company Information & Credentials

| Field | Details |
|---|---|
| **Company Name** | **Vishwas Enterprises** |
| **Established** | 2019 |
| **Proprietor** | **Mr. R. Srinivas** |
| **Proprietor Experience** | 17+ years of banking & retail portfolio recovery experience |
| **Registered Head Office** | Suchitra, Hyderabad, Telangana, India |
| **Strategic Branch Office** | Navaketan Complex, Sarojini Devi Road, Secunderabad, Telangana, India |
| **Direct Mobile & WhatsApp** | `+91 90525 35999` |
| **Landline Office** | `040 46033662` |
| **Official Corporate Email** | `vishwas.enterprises74@gmail.com` |
| **Operating Regions** | Telangana and Andhra Pradesh |
| **Industry Awards** | **Eight (8) Platinum Awards** & **Four (4) Gold Awards** |
| **Compliance Standard** | 100% RBI Fair Practice Code, IBA recovery guidelines, and DRA certification standards |

---

## 3. Architecture & File Structure

```
aishwaryaaa/
├── index.html           # Main semantic HTML5 corporate portal with rich SEO metadata & Schema.org JSON-LD
├── css/
│   └── style.css        # Premium banking CSS design system (Navy #0B1C32, Royal Blue #173B63, Gold #C9A96E)
├── js/
│   └── main.js          # Client-side interactivity, navigation, map tabs, FAQ accordion, validation & WhatsApp sync
├── server.js            # Zero-dependency Node.js production server (serves static assets & handles /api/enquiry)
├── app.py               # Zero-dependency Python server (built with standard library http.server)
├── data/
│   └── enquiries.json   # Local secure store for audit-logged institutional B2B inquiries
└── README.md            # Complete deployment, configuration, and custom domain documentation
```

---

## 4. Key Design & Technical Features

- **Corporate Banking Aesthetic**: Strict adherence to the corporate color palette: Deep Navy Blue (`#0B1C32`), Royal Blue (`#173B63`), and Elegant Gold (`#C9A96E`) with clean typography (`Plus Jakarta Sans`).
- **Interactive Map Module**: Dual location tabs allowing institutional risk managers to view both the **Suchitra Registered Head Office** and the **Navaketan Complex, Secunderabad Branch** on Google Maps.
- **Institutional B2B Enquiry Form**:
  - Full client-side validation for Organization Name, Official Email, Direct Mobile, Service selection, and Region.
  - **Compliance Safeguard**: Active check to prevent submission of confidential borrower loan accounts, card numbers, or sensitive PAN/Aadhaar data.
  - Multi-tier submission: dispatches to `/api/enquiry`, caches in `localStorage`, and provides instant **one-click WhatsApp pre-fill** to connect with our corporate desk directly at `+91 90525 35999`.
- **Seven Core Portfolio Services**:
  1. *Personal Loan Collections* (Soft, hard & NPA resolution)
  2. *Credit Card Collections* (Revolving credit recovery & dispute reconciliation)
  3. *Business Loan Collections* (SME/MSME promoter consultation & cash flow recovery)
  4. *Consumer Loan Collections* (Retail durables & vehicle loan recoveries)
  5. *Skip Tracing* (Advanced lawful address, neighborhood & employer tracing)
  6. *Outstation Field Visits* (Pan-Telangana & Andhra Pradesh ground connectivity)
  7. *Portfolio Monitoring & Supervision* (Daily automated MIS, call audit reviews & PTP surveillance)
- **Infrastructure & Human Capital Breakdown**: Showcases leadership, supervisors, MIS specialists, bilingual telecallers (Telugu, Hindi, English, Urdu), and verified field executives.
- **Verified Achievements**: Prominently highlights **8 Platinum Awards** and **4 Gold Awards**.
- **SEO & Search Visibility**: Optimized for key search terms including *Vishwas Enterprises Hyderabad*, *Collection Agency Hyderabad*, *Bank Recovery Agency Secunderabad*, *Loan Collection Services Telangana*, and *Collection and Recovery Services Andhra Pradesh*. Includes JSON-LD structured data for `FinancialService` and `LocalBusiness`.

---

## 5. Local Execution Guide

You can run this project locally using any of the following methods:

### Option A: Open Directly in Any Web Browser (Pure Static)
Simply double-click `index.html` or open it with Google Chrome, Microsoft Edge, Firefox, or Safari. All styles, SVG icons, and client interactions work completely offline and standalone.

### Option B: Run with Node.js (Zero external dependencies)
No `npm install` needed! Run directly using Node's built-in modules:
```powershell
node server.js
```
Open your browser and navigate to:
```
http://localhost:3000
```
Inquiries submitted via the form will be logged directly to `data/enquiries.json`.

### Option C: Run with Python 3 (Zero external dependencies)
Run directly using Python's standard library:
```powershell
python app.py
```
Open your browser and navigate to:
```
http://localhost:3000
```

---

## 6. Production Deployment Instructions

### 1. Deploying to Netlify (Recommended for Instant SSL & CDN)
1. Log in to [Netlify](https://app.netlify.com/).
2. Drag and drop the `aishwaryaaa` project folder directly into the Netlify dashboard under **Sites > Add new site > Deploy manually**.
3. Your website will be live in 10 seconds with free global CDN and HTTPS.
4. (Optional) For automated Git deployment, push this repository to GitHub/GitLab and connect it via Netlify dashboard with publish directory set to `./`.

### 2. Deploying to Vercel
1. Install Vercel CLI (`npm i -g vercel`) or log in to [Vercel](https://vercel.com/).
2. Run `vercel` in the project root directory or import your GitHub repository.
3. Keep default settings (Static site) and deploy.

### 3. Deploying to GitHub Pages
1. Push this project to a GitHub repository (e.g. `https://github.com/<username>/vishwas-enterprises`).
2. Go to repository **Settings > Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. GitHub Pages will build and publish your site at `https://<username>.github.io/vishwas-enterprises/`.

### 4. Deploying to a Linux VPS (Ubuntu / Debian with Nginx)
1. Copy project files to `/var/www/vishwasenterprises`:
   ```bash
   sudo mkdir -p /var/www/vishwasenterprises
   sudo cp -r * /var/www/vishwasenterprises/
   sudo chown -R www-data:www-data /var/www/vishwasenterprises
   ```
2. Configure Nginx:
   ```nginx
   server {
       listen 80;
       server_name vishwasenterprises.com www.vishwasenterprises.com;

       root /var/www/vishwasenterprises;
       index index.html;

       location / {
           try_files $uri $uri/ =404;
       }

       # If running the Node backend on port 3000 for /api/enquiry:
       location /api/ {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
3. Enable HTTPS with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d vishwasenterprises.com -d www.vishwasenterprises.com
   ```

### 5. Deploying to cPanel / Shared Web Hosting
1. Compress all files (`index.html`, `css/`, `js/`, `assets/`, `data/`) into a `.zip` archive.
2. Log in to cPanel and open **File Manager**.
3. Navigate to `public_html` (or your subdomain directory).
4. Upload the `.zip` archive and click **Extract**.
5. Ensure `index.html` is in the root of `public_html`.

---

## 7. Custom Domain Connection Guide

To link your custom domain (e.g. `vishwasenterprises.com` or `vishwasenterprises.in`) purchased through GoDaddy, Namecheap, Hostinger, or Google Domains:

### Step 1: Configure DNS Records
Log in to your domain registrar's DNS Management Console and add the following records:

#### If Hosted on Netlify:
| Type | Host / Name | Value / Destination | TTL |
|---|---|---|---|
| **A** | `@` | `75.2.60.5` | Automatic / 3600 |
| **CNAME** | `www` | `<your-site-name>.netlify.app` | Automatic / 3600 |

#### If Hosted on Vercel:
| Type | Host / Name | Value / Destination | TTL |
|---|---|---|---|
| **A** | `@` | `76.76.21.21` | Automatic / 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | Automatic / 3600 |

#### If Hosted on Linux VPS / Static IP:
| Type | Host / Name | Value / Destination | TTL |
|---|---|---|---|
| **A** | `@` | `<YOUR_SERVER_PUBLIC_IP>` | Automatic / 3600 |
| **CNAME** | `www` | `vishwasenterprises.com` | Automatic / 3600 |

### Step 2: Enable SSL / HTTPS
- On Netlify/Vercel: Click **Domain Management > SSL/TLS > Verify DNS & Provision Let's Encrypt Certificate**.
- On Linux VPS: Run `sudo certbot --nginx -d vishwasenterprises.com -d www.vishwasenterprises.com`.

---

## 8. Security & Regulatory Compliance

- **Borrower Privacy Guarantee**: This website is strictly intended for institutional B2B communication with Banks, NBFCs, and Financial Institutions. It does not publish individual debtor records, nor does it collect consumer account numbers online.
- **Fair Practices Code**: Vishwas Enterprises strictly complies with the Reserve Bank of India’s Fair Practice Code and Guidelines on Debt Recovery Agents (DRA), ensuring that all customer interactions are ethical, dignified, and conducted within statutory hours.
- **Data Protection**: Client contact submissions are treated with strict confidentiality.

---

## 9. Direct Contact Details

**Vishwas Enterprises**  
- **Proprietor:** Mr. R. Srinivas  
- **Mobile / WhatsApp:** [+91 90525 35999](tel:+919052535999)  
- **Landline:** [040 46033662](tel:04046033662)  
- **Email:** [vishwas.enterprises74@gmail.com](mailto:vishwas.enterprises74@gmail.com)  
- **Registered Head Office:** Suchitra, Hyderabad, Telangana, India  
- **Branch Office:** Navaketan Complex, Sarojini Devi Road, Secunderabad, Telangana, India  

