#!/usr/bin/env python3
"""
VISHWAS ENTERPRISES - PYTHON BACKEND SERVER
Zero external pip dependencies required (built with Python standard library).
Optionally supports Flask if installed.
Run with: python app.py
"""

import http.server
import json
import os
import sys
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse

PORT = int(os.environ.get("PORT", 3000))
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
ENQUIRIES_FILE = DATA_DIR / "enquiries.json"

# Ensure data directory and file exist
DATA_DIR.mkdir(parents=True, exist_ok=True)
if not ENQUIRIES_FILE.exists():
    ENQUIRIES_FILE.write_text("[]", encoding="utf-8")


class VishwasRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/enquiry":
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length > 1_000_000:
                self.send_error(413, "Payload too large")
                return

            body = self.rfile.read(content_length).decode("utf-8")
            try:
                enquiry = json.loads(body)
                if not enquiry.get("orgName") or not enquiry.get("email") or not enquiry.get("phone"):
                    self.send_response(400)
                    self.send_header("Content-Type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"success": False, "message": "Missing required fields"}).encode("utf-8"))
                    return

                enquiry["serverReceivedAt"] = datetime.utcnow().isoformat() + "Z"

                # Persist to data/enquiries.json
                with open(ENQUIRIES_FILE, "r", encoding="utf-8") as f:
                    try:
                        current_data = json.load(f)
                    except Exception:
                        current_data = []

                current_data.insert(0, enquiry)
                with open(ENQUIRIES_FILE, "w", encoding="utf-8") as f:
                    json.dump(current_data, f, indent=2, ensure_ascii=False)

                print(f"[Enquiry Logged] Ref: {enquiry.get('refId')} | Org: {enquiry.get('orgName')} | Service: {enquiry.get('service')}")

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                response_payload = {
                    "success": True,
                    "refId": enquiry.get("refId"),
                    "message": "Enquiry securely recorded. Our team will contact you shortly."
                }
                self.wfile.write(json.dumps(response_payload).encode("utf-8"))

            except Exception as err:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(err)}).encode("utf-8"))
        else:
            self.send_error(404, "Endpoint not found")

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/enquiries":
            try:
                with open(ENQUIRIES_FILE, "r", encoding="utf-8") as f:
                    data = json.load(f)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"total": len(data), "enquiries": data}, indent=2).encode("utf-8"))
            except Exception as e:
                self.send_error(500, f"Error: {e}")
        else:
            super().do_GET()


def run():
    server_address = ("", PORT)
    httpd = http.server.HTTPServer(server_address, VishwasRequestHandler)
    print("====================================================")
    print(f" VISHWAS ENTERPRISES - PYTHON SERVER")
    print(f" Running at: http://localhost:{PORT}")
    print(f" Enquiries file: {ENQUIRIES_FILE}")
    print("====================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.server_close()


if __name__ == "__main__":
    run()

