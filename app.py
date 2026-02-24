#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
N.O.E. - Neural Oracle of Encryption
Autor: Abdias Samurl R. Ch. 
Versión avanzada con zxcvbn y HIBP
"""

import os
import hashlib
import requests
import zxcvbn
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# ------------------------------------------------------------
# FUNCIONES AUXILIARES
# ------------------------------------------------------------
def check_pwned(password: str) -> tuple:
    """
    Verifica si la contraseña ha sido expuesta usando la API de HIBP (k-anonimato).
    Retorna (bool, int): (está_filtrada?, número_de_apariciones)
    """
    sha1 = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
    prefix, suffix = sha1[:5], sha1[5:]
    try:
        response = requests.get(f"https://api.pwnedpasswords.com/range/{prefix}", timeout=3)
        if response.status_code == 200:
            hashes = (line.split(':') for line in response.text.splitlines())
            for h, count in hashes:
                if h == suffix:
                    return True, int(count)
        return False, 0
    except Exception:
        return False, 0

def generate_secure_password(length=16):
    """Genera una contraseña segura aleatoria."""
    import secrets
    import string
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*()"
    return ''.join(secrets.choice(alphabet) for _ in range(length))

# ------------------------------------------------------------
# CLASE NOE 
# ------------------------------------------------------------
class NOE:
    def __init__(self, password: str):
        self.password = password
        self.zxcvbn_result = zxcvbn.zxcvbn(password)
        self.pwned, self.pwned_count = check_pwned(password)

    def feedback(self) -> dict:
        score = self.zxcvbn_result['score']  # 0-4
        crack_time = self.zxcvbn_result['crack_times_display']['offline_slow_hashing_1e4_per_second']
        warning = self.zxcvbn_result['feedback']['warning'] or ''
        suggestions = self.zxcvbn_result['feedback']['suggestions']

        # Traducir score a texto
        strength_map = {
            0: "Muy débil",
            1: "Débil",
            2: "Regular",
            3: "Buena",
            4: "Excelente"
        }
        strength = strength_map[score]

        # Construir respuesta enriquecida
        return {
            "score": score,
            "strength": strength,
            "crack_time": crack_time,
            "pwned": self.pwned,
            "pwned_count": self.pwned_count,
            "warning": warning,
            "suggestions": suggestions,
            # Mantenemos también los criterios clásicos para la cuadrícula
            "classic": {
                "longitud": len(self.password) >= 8,
                "mayusculas": any(c.isupper() for c in self.password),
                "minusculas": any(c.islower() for c in self.password),
                "digitos": any(c.isdigit() for c in self.password),
                "especiales": any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?/" for c in self.password),
                "patrones_comunes": not any(p in self.password.lower() for p in ["123456", "password", "qwerty", "abc123", "admin", "iloveyou", "monkey", "dragon"])
            }
        }

# ------------------------------------------------------------
# RUTAS
# ------------------------------------------------------------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check', methods=['POST'])
def check():
    data = request.get_json()
    if not data or 'password' not in data:
        return jsonify({"error": "No se proporcionó contraseña"}), 400
    password = data['password']
    analyzer = NOE(password)
    return jsonify(analyzer.feedback())

@app.route('/generate', methods=['GET'])
def generate():
    length = int(request.args.get('length', 16))
    if length < 8 or length > 64:
        length = 16
    pwd = generate_secure_password(length)
    return jsonify({"password": pwd})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    print("=" * 60)
    print("N.O.E. ADVANCED - Password Strength Detector")
    print("Autor: ABDIAS")
    print(f"Servidor iniciado en http://127.0.0.1:{port}")
    print("=" * 60)
    app.run(host='0.0.0.0', port=port, debug=debug)