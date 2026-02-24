<<<<<<< HEAD
# N.O.E. - Manual de Usuario  
**Detector Avanzado de Fuerza de Contraseñas**  
*Versión 1.0 *  
Autor: Abdias Samurl R. Ch.

<p align="center">
  <img src="static/image/logo.png" alt="N.O.E. Logo" width="150" style="border-radius: 50%; box-shadow: 0 0 20px #00ffc0;">
</p>

---

## Índice

1. [Introducción](#introducción)
2. [Requisitos del Sistema](#requisitos-del-sistema)
3. [Instalación](#instalación)
4. [Primeros Pasos](#primeros-pasos)
5. [Uso de la Aplicación](#uso-de-la-aplicación)
   - [Pantalla Principal](#pantalla-principal)
   - [Evaluación de Contraseñas](#evaluación-de-contraseñas)
   - [Interpretación de Resultados](#interpretación-de-resultados)
   - [Generador de Contraseñas](#generador-de-contraseñas)
6. [Criterios de Evaluación](#criterios-de-evaluación)
7. [Preguntas Frecuentes (FAQ)](#preguntas-frecuentes-faq)
8. [Solución de Problemas](#solución-de-problemas)
9. [Soporte y Contacto](#soporte-y-contacto)
10. [Glosario](#glosario)
11. [Notas Legales](#notas-legales)

---

## 1. Introducción

**N.O.E.** (Neural Oracle of Encryption) es una herramienta web futurista diseñada para ayudarte a crear y evaluar contraseñas seguras. Utiliza algoritmos avanzados como **zxcvbn** para estimar la fortaleza de tus contraseñas y verifica si han sido expuestas en filtraciones conocidas a través de la API de **Have I Been Pwned (HIBP)**.

Con una interfaz inspirada en el año 3000, colores neón, animaciones suaves y mensajes motivadores, N.O.E. no solo analiza, sino que te acompaña en tu camino hacia una mejor higiene de seguridad digital.

---

## 2. Requisitos del Sistema

### Para ejecutar la aplicación localmente:
- **Python** 3.8 o superior
- **pip** (gestor de paquetes)
- Navegador web moderno (Chrome, Firefox, Edge, Safari)

### Para acceder a la versión en línea (si está desplegada):
- Cualquier navegador web con conexión a Internet.

---

## 3. Instalación

Sigue estos pasos para instalar y ejecutar N.O.E. en tu propio equipo:

### Paso 1: Clonar o descargar el proyecto
```bash
git clone https://github.com/anonimous264/noe.git
cd noe
```

### Paso 2: Crear un entorno virtual (recomendado)
```bash
python -m venv venv
source venv/bin/activate   # En Linux/Mac
venv\Scripts\activate      # En Windows
```

### Paso 3: Instalar dependencias
```bash
pip install -r requirements.txt
```

### Paso 4: Añadir un logo (opcional)
Coloca una imagen `logo.png` en la carpeta `static/image/`. El logo se mostrará redondeado con un efecto de brillo.

### Paso 5: Ejecutar la aplicación
```bash
python app.py
```
Verás un mensaje como:
```
Servidor iniciado en http://127.0.0.1:8000
```

### Paso 6: Abrir en el navegador
Ve a `http://127.0.0.1:8000` y comienza a usar N.O.E.

---

## 4. Primeros Pasos

Una vez que la aplicación esté corriendo, verás la pantalla principal con los siguientes elementos:

- **Logo central** (si lo has añadido)
- **Título** "N.O.E. 3000"
- **Campo de entrada** para la contraseña
- **Botón para mostrar/ocultar** la contraseña
- **Barra de fortaleza** que se llena según la puntuación
- **Sección de resultados** (tiempo estimado, estado de filtración, advertencias)
- **Cuadrícula de criterios** (longitud, mayúsculas, etc.)
- **Sugerencias** para mejorar
- **Generador de contraseñas** con control de longitud
- **Pie de página** con información técnica

---

## 5. Uso de la Aplicación

### Pantalla Principal
La interfaz está dividida en áreas funcionales claramente identificadas. El diseño es oscuro con acentos neón verdes, lo que reduce la fatiga visual y resalta la información importante.

### Evaluación de Contraseñas
1. **Escribe o pega una contraseña** en el campo central.
2. La evaluación comienza automáticamente al escribir.
3. Observa cómo la barra de fortaleza se llena en tiempo real, mostrando el porcentaje.
4. Los resultados se actualizan instantáneamente debajo de la barra.

### Interpretación de Resultados

| Elemento | Descripción | Ejemplo |
|----------|-------------|---------|
| **Fortaleza** | Texto con la puntuación y mensaje motivador. | "Buena · Casi perfecto. Eres muy consciente de tu seguridad." |
| **Tiempo estimado** | Tiempo que tomaría crackear la contraseña. | "Tiempo estimado: 3 horas" |
| **Estado de filtración** | Indica si la contraseña ha aparecido en brechas. | "No encontrada en filtraciones. Buen trabajo." |
| **Advertencia** | Mensaje específico de zxcvbn (si aplica). | "Esta es una contraseña muy común." |
| **Cuadrícula** | Seis criterios básicos con ✓ o ✗. | Longitud: ✓, Mayúsculas: ✓, etc. |
| **Sugerencias** | Consejos para mejorar la contraseña. | "Añade una palabra poco común." |

### Generador de Contraseñas
1. **Ajusta la longitud** deseada (entre 8 y 64 caracteres) usando el campo numérico.
2. **Haz clic en "Generar"**.
3. Aparecerá una contraseña segura y aleatoria en el recuadro inferior.
4. **Haz clic en la contraseña generada** para copiarla al portapapeles automáticamente.

---

## 6. Criterios de Evaluación

N.O.E. utiliza dos sistemas complementarios:

### A. Criterios clásicos (cuadrícula)
- **Longitud**: mínimo 8 caracteres.
- **Mayúsculas**: al menos una letra mayúscula.
- **Minúsculas**: al menos una letra minúscula.
- **Dígitos**: al menos un número.
- **Especiales**: al menos un carácter especial (`!@#$%^&*()_+-=[]{}|;:,.<>?/`).
- **Patrones comunes**: evita palabras como "123456", "password", "qwerty", etc.

### B. Análisis zxcvbn (avanzado)
- **Puntuación**: de 0 (muy débil) a 4 (excelente).
- **Tiempo de crackeo**: estimación realista basada en ataques de fuerza bruta.
- **Advertencias**: identifica patrones peligrosos (secuencias, repeticiones, fechas).
- **Sugerencias**: consejos específicos para mejorar.

### C. Verificación HIBP
- Comprueba si la contraseña ha sido expuesta en filtraciones conocidas mediante un método seguro (k-anonimato). No se envía la contraseña real, solo un fragmento de su hash.

---

## 7. Preguntas Frecuentes (FAQ)

### ¿N.O.E. guarda mis contraseñas?
No. La contraseña se evalúa en tiempo real en tu propio navegador y se envía al servidor únicamente para el análisis, pero **no se almacena en ningún lado**. El servidor la procesa y descarta inmediatamente.

### ¿Es seguro usar la verificación HIBP?
Sí. N.O.E. utiliza el método de **k-anonimato**: solo envía los primeros 5 caracteres del hash SHA-1 de tu contraseña, por lo que tu contraseña nunca sale de tu ordenador.

### ¿Qué hago si mi contraseña aparece como filtrada?
Si N.O.E. te indica que tu contraseña ha aparecido en filtraciones, **cámbiala inmediatamente** por una nueva y única. Usa el generador de N.O.E. para crear una segura.

### ¿Puedo confiar en la estimación de tiempo de crackeo?
El tiempo es una **estimación estadística** basada en la capacidad de cómputo actual. No es un valor exacto, pero es una buena referencia para comparar contraseñas.

### ¿N.O.E. funciona sin conexión?
La versión local funciona sin conexión excepto la verificación HIBP, que requiere acceso a Internet. El análisis zxcvbn es completamente local.

### ¿Cómo puedo contribuir al proyecto?
Visita el repositorio en GitHub y sigue las instrucciones de contribución.

---

## 8. Solución de Problemas

### Error "No se proporcionó contraseña"
- Asegúrate de escribir algo en el campo antes de enviar (aunque la evaluación es automática, este error aparece si hay problemas de red).

### La barra no se actualiza o los resultados no aparecen
- Verifica que el servidor Flask esté corriendo (consola).
- Abre las herramientas de desarrollo del navegador (F12) y revisa la pestaña "Consola" en busca de errores de red.
- Comprueba que el endpoint `/check` responde correctamente (puedes probar con `curl`).

### El logo no se ve
- Asegúrate de que el archivo `logo.png` esté en `static/image/` y tenga permisos de lectura.
- Si no tienes logo, la aplicación funciona igual, solo se verá el título.

### La generación de contraseñas no funciona
- Verifica que el endpoint `/generate` esté disponible (prueba con `curl http://127.0.0.1:8000/generate?length=16`).
- Revisa la consola del navegador por errores de JavaScript.

### Error de conexión con HIBP
- Si no hay Internet, la verificación HIBP se omite y se muestra "No encontrada en filtraciones" (por defecto). No afecta al análisis principal.

---

## 9. Soporte y Contacto

- **Repositorio oficial**: [GitHub - N.O.E.](https://github.com/anonimous264/noe.git)
- **Reportar problemas**: Abre un issue en GitHub.
- **Correo electrónico**: abdiassamuel15@gmail.com
- **Twitter**: @abdias

---

## 10. Glosario

| Término | Definición |
|--------|------------|
| **zxcvbn** | Librería de estimación de fortaleza de contraseñas desarrollada por Dropbox. |
| **HIBP** | Have I Been Pwned, servicio que permite verificar si una cuenta ha sido comprometida en filtraciones. |
| **k-anonimato** | Técnica de privacidad que permite consultar una base de datos sin revelar el dato exacto. |
| **Hash SHA-1** | Función criptográfica que convierte un texto en una cadena de 40 caracteres hexadecimales. |
| **Crackeo** | Proceso de adivinar una contraseña mediante fuerza bruta o diccionario. |
| **Filtración** | Publicación no autorizada de datos de usuarios (contraseñas, correos, etc.). |

---

## 11. Notas Legales

- **Privacidad**: N.O.E. no recopila ni almacena ninguna contraseña. El análisis se realiza en tiempo real y los datos se descartan inmediatamente.
- **Licencia**: Este proyecto se distribuye bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente, siempre que se mantenga el aviso de copyright.
- **Exención de responsabilidad**: N.O.E. es una herramienta de ayuda, no una garantía de seguridad. El autor no se hace responsable del mal uso de la misma ni de daños derivados de su uso.

---
=======
# noe
Es una herramienta web futurista diseñada para ayudarte a crear y evaluar contraseñas seguras
>>>>>>> 32177ca7aa6000b8ec4c012b9becb6e5bcce863b
