const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let columns;
const fontSize = 16;
const drops = [];
const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]~`";

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    columns = Math.floor(width / fontSize);
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -height);
    }
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
setInterval(drawMatrix, 40);

// --- Elementos del DOM ---
const input = document.getElementById('password');
const toggleBtn = document.getElementById('togglePassword');
const bar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const crackTimeDiv = document.getElementById('crack-time');
const pwnedDiv = document.getElementById('pwned-status');
const warningDiv = document.getElementById('warning');
const detailGrid = document.getElementById('detail-grid');
const suggestionsDiv = document.getElementById('suggestions');
const generateBtn = document.getElementById('generate-btn');
const lengthInput = document.getElementById('password-length');
const generatedDiv = document.getElementById('generated-password');

// Mostrar/ocultar contraseña (con iconos micro)
toggleBtn.addEventListener('click', () => {
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    toggleBtn.innerHTML = type === 'password'
        ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="20" height="20"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /><path fill-rule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.56 7.6 7.6 0 0 1 2.96-4.44A7.56 7.56 0 0 1 8 2c1.4 0 2.73.37 3.87 1.06A7.6 7.6 0 0 1 14.8 7.3a.87.87 0 0 1 0 .4 7.6 7.6 0 0 1-2.93 4.24A7.56 7.56 0 0 1 8 13a7.56 7.56 0 0 1-3.87-1.06A7.6 7.6 0 0 1 1.2 7.72a.87.87 0 0 1 .18-.44ZM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" /></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="20" height="20"><path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.322a10.463 10.463 0 0 0 2.18-2.478.87.87 0 0 0 0-.56 7.6 7.6 0 0 0-2.93-4.24A7.56 7.56 0 0 0 8 2c-1.4 0-2.73.37-3.87 1.06L3.28 2.22Zm3.197 3.197A3 3 0 0 1 11 8c0 .418-.082.814-.236 1.18l-2.677-2.677c.365-.154.762-.236 1.18-.236ZM8 11c-.673 0-1.288-.212-1.79-.573l2.094-2.095c.361.502.573 1.117.573 1.79 0 1.242-1.01 2.25-2.252 2.25Z" clip-rule="evenodd" /><path d="M6.5 8c0-.746.27-1.427.718-1.959L2.584 3.307A7.62 7.62 0 0 0 1.2 7.72a.87.87 0 0 0 0 .4 7.6 7.6 0 0 0 2.93 4.24A7.56 7.56 0 0 0 8 13c1.4 0 2.73-.37 3.87-1.06l-1.482-1.482A3.5 3.5 0 0 1 6.5 8Z" /></svg>';
});

// Función para formatear tiempo
function formatCrackTime(crackTimeString) {
    if (crackTimeString.includes('century')) return 'siglos';
    if (crackTimeString.includes('year')) return 'años';
    if (crackTimeString.includes('month')) return 'meses';
    if (crackTimeString.includes('day')) return 'días';
    if (crackTimeString.includes('hour')) return 'horas';
    if (crackTimeString.includes('minute')) return 'minutos';
    if (crackTimeString.includes('second')) return 'segundos';
    if (crackTimeString === 'instant') return 'instantáneo';
    return crackTimeString;
}

// Mensajes motivadores según el score
function getMotivationalMessage(score) {
    const messages = {
        0: "¡Vamos! Puedes crear una contraseña mucho más segura. Confía en ti.",
        1: "Estás en el camino, pero aún es vulnerable. ¡Mejórala y estarás protegido!",
        2: "Bien, pero no te confíes. Un pequeño esfuerzo más y será robusta.",
        3: "Casi perfecto. Eres muy consciente de tu seguridad. ¡Sigue así!",
        4: "Excelente trabajo. Tu contraseña es digna del futuro. Eres un líder en seguridad."
    };
    return messages[score] || messages[0];
}

// Evaluación en tiempo real
input.addEventListener('input', async function() {
    const password = this.value;
    if (password.length === 0) {
        resetUI();
        return;
    }

    try {
        const response = await fetch('/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        const data = await response.json();

        // Actualizar barra y porcentaje
        const percent = (data.score / 4) * 100;
        bar.style.width = percent + '%';
        const colors = ['#ff4d4d', '#ffaa00', '#ffff00', '#80ff80', '#00ff80'];
        bar.style.backgroundColor = colors[data.score];

        let meterText = document.querySelector('.meter-text');
        if (!meterText) {
            meterText = document.createElement('span');
            meterText.className = 'meter-text';
            document.querySelector('.meter').appendChild(meterText);
        }
        meterText.textContent = `${Math.round(percent)}%`;

        // Mostrar fortaleza con mensaje motivador
        strengthText.innerHTML = `${data.strength} · ${getMotivationalMessage(data.score)}`;

        // Tiempo de crackeo
        const formattedTime = formatCrackTime(data.crack_time);
        crackTimeDiv.innerHTML = `
            <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.5a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.5a.75.75 0 0 0 0-1.5h-2.75V3.5Z" clip-rule="evenodd" />
                </svg>
            </span>
            Tiempo estimado: <strong>${formattedTime}</strong>
        `;

        // Estado HIBP
        if (data.pwned) {
            pwnedDiv.innerHTML = `
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
                        <path fill-rule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                    </svg>
                </span>
                ¡Aparece en <strong>${data.pwned_count}</strong> filtraciones! Mejor cámbiala.
            `;
            pwnedDiv.className = 'pwned-status pwned';
        } else {
            pwnedDiv.innerHTML = `
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
                        <path fill-rule="evenodd" d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm3.53 5.53a.75.75 0 0 0-1.06-1.06L7 7.94 5.53 6.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4-4Z" clip-rule="evenodd" />
                    </svg>
                </span>
                No encontrada en filtraciones. Buen trabajo.
            `;
            pwnedDiv.className = 'pwned-status';
        }

        // Advertencia
        if (data.warning) {
            warningDiv.innerHTML = `
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
                        <path fill-rule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                    </svg>
                </span>
                ${data.warning}
            `;
            warningDiv.style.display = 'block';
        } else {
            warningDiv.style.display = 'none';
        }

        // Cuadrícula de criterios
        const c = data.classic;
        detailGrid.innerHTML = `
            <div class="detail-item"><span class="${c.longitud ? 'valid' : 'invalid'}">${c.longitud ? '✓' : '✗'}</span><div class="detail-label">Longitud</div></div>
            <div class="detail-item"><span class="${c.mayusculas ? 'valid' : 'invalid'}">${c.mayusculas ? 'A' : 'a'}</span><div class="detail-label">Mayúsculas</div></div>
            <div class="detail-item"><span class="${c.minusculas ? 'valid' : 'invalid'}">${c.minusculas ? 'a' : '_'}</span><div class="detail-label">Minúsculas</div></div>
            <div class="detail-item"><span class="${c.digitos ? 'valid' : 'invalid'}">${c.digitos ? '1' : '0'}</span><div class="detail-label">Dígitos</div></div>
            <div class="detail-item"><span class="${c.especiales ? 'valid' : 'invalid'}">${c.especiales ? '!@' : '··'}</span><div class="detail-label">Especiales</div></div>
            <div class="detail-item"><span class="${c.patrones_comunes ? 'valid' : 'invalid'}">${c.patrones_comunes ? '✓' : '⚠'}</span><div class="detail-label">Patrón común</div></div>
        `;

        // Sugerencias con icono
        if (data.suggestions && data.suggestions.length > 0) {
            let html = '<h4><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="18" height="18"><path fill-rule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" /></svg></span> Sugerencias</h4><ul>';
            data.suggestions.forEach(s => html += `<li>${s}</li>`);
            html += '</ul>';
            suggestionsDiv.innerHTML = html;
        } else {
            suggestionsDiv.innerHTML = '';
        }

    } catch (error) {
        console.error('Error:', error);
    }
});

function resetUI() {
    bar.style.width = '0%';
    const meterText = document.querySelector('.meter-text');
    if (meterText) meterText.remove();
    strengthText.innerHTML = '';
    crackTimeDiv.innerHTML = '';
    pwnedDiv.innerHTML = '';
    warningDiv.style.display = 'none';
    detailGrid.innerHTML = '';
    suggestionsDiv.innerHTML = '';
}

// Generador de contraseñas
generateBtn.addEventListener('click', async () => {
    const length = lengthInput.value;
    try {
        const response = await fetch(`/generate?length=${length}`);
        const data = await response.json();
        generatedDiv.innerHTML = data.password;
        generatedDiv.style.cursor = 'pointer';
        generatedDiv.title = 'Haz clic para copiar';
        generatedDiv.onclick = () => {
            navigator.clipboard.writeText(data.password);
            alert('Contraseña copiada al portapapeles');
        };
    } catch (error) {
        console.error('Error al generar contraseña:', error);
    }
});