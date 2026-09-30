const guidesData = [
  {
    id: "rpi-tutorial",
    title: "[RPI] Cómo instalar juegos directamente",
    category: "Tutorial",
    readTime: "5 min",
    icon: "fa-gamepad",
    summary: "Guía paso a paso para instalar juegos desde Cesarx9.cv",
    content: `
      <h3>Requisitos</h3>
      <ul>
        <li>PS4 con GoldHen</li>
        <li>RPI instalado en tu consola</li>
        <li>Navegador Firefox (de preferencia)
          <details style="display: inline-block; vertical-align: middle; margin-left: 5px; color: #38bdf8; cursor: pointer;">
            <summary style="font-size: 0.85rem; text-decoration: underline; display: inline;">¿Por qué?</summary>
            <p style="color: #cbd5e1; font-size: 0.85rem; margin-top: 5px; line-height: 1.4; background: #0d1117; padding: 8px; border-radius: 4px; display: block;">
              Firefox es necesario porque la instalación por RPI requiere una comunicación directa por protocolo <strong>HTTP</strong>. Chrome o Edge fuerzan HTTPS localmente y bloquean la conexión con la consola.
            </p>
          </details>
        </li>
      </ul>
      <h3>Pasos a seguir</h3>
      <ol>
        <li>Abre RPI en tu PS4</li>
        <li>Apunta la direccion IP y el puerto de tu PS4</li>
        <li>Ingresa a <a href="http://www.cesarx9.cv/ps4/index.html">Cesarx9.cv</a></li>
        <li>Busca el juego de tu agrado</li>
        <li>Da click en Ver Enlaces</li>
        <li>Ingresa la IP y puerto de tu PS4</li>
        <li>Da click en Instalar Directo en PS4</li>
        <li>El proceso tardara en comenzar, no te desesperes deja que la instalacion comience en tu PS4</li>
        <li>(no opcional) Seguir a <a href="https://www.facebook.com/cesarinx9/">Cesarx9</a> en facebook!</li>
      </ol>
    `
  },
  {
    id: "rpi-install",
    title: "[USB] Como instalar RPI",
    category: "Tutorial",
    readTime: "5 min",
    icon: "fa-moon",
    summary: "Guía paso a paso para instalar RPI en tu PS4 GoldHEN",
    content: `
      <h3>Requisitos</h3>
      <ul>
        <li>PS4 con GoldHen</li>
        <li>USB en formato exFAT</li>
        <li>Descargar <a href="../recursos/pkg/PS4_FLTZ00003_v1.02.pkg">RPI</a></li>
      </ul>
      <h3>Pasos a seguir</h3>
      <ol>
        <li>Conecta tu USB a tu PC</li>
        <li>Carga el archivo de RPI .pkg</li>
        <li>Conecta tu USB a tu PS4</li>
        <li>Abre el menu de GoldHEN</li>
        <li>Ingresa al menu Debug Settings</li>
        <li>Verifica que este seleccionado "usb:/" en Package source</li>
        <li>Ingresa a Package Installer</li>
        <li>Selecciona RPI</li>
        <li>Esperar a que termine la instalacion.</li>
        <li>(no opcional) Seguir a <a href="https://www.facebook.com/cesarinx9/">Cesarx9</a> en facebook!</li>
      </ol>
    `
  },
  {
    id: "themes-install",
    title: "[USB] Cómo instalar temas permanentes en PS4 GoldHEN",
    category: "Personalizacion",
    readTime: "5 min",
    icon: "fa-moon",
    summary: "Guía paso a paso para instalar temas permanentes en tu PS4 GoldHEN.",
    content: `
      Los temas se componen de dos archivos .pkg, uno es el tema y otro es la licencia.
      <h3>Requisitos</h3>
      <ul>
        <li>PS4 con GoldHen</li>
        <li>USB en formato exFAT</li>
        <li>Tema en formato .pkg en tu USB (2 archivos) <a href="">Temas</a></li>
      </ul>
      <h3>Pasos a seguir</h3>
      <ol>
        <li>Conecta tu USB a tu PS4</li>
        <li>Abre el menu de GoldHEN</li>
        <li>Ingresa al menu Debug Settings</li>
        <li>Verifica que este seleccionado "usb:/" en Package source</li>
        <li>Ingresa a Package Installer</li>
        <li>Selecciona el primer archivo</li>
        <li>Una vez se termine de instalar, borra la notificacion de la instalacion</li>
        <li>Entra nuevamente al menu e instala el segundo archivo</li>
        <p>
        <li>(opcional) Presionar x sobre la segunda notificacion de instalacion e instalar el tema</li>
      </ol>
    `
  },
  // {
  //   id: "goldhen-install",
  //   title: "Cómo Activar GoldHEN en PS4 (FW 9.00 / 11.00)",
  //   category: "Jailbreak",
  //   readTime: "5 min",
  //   icon: "fa-bolt",
  //   summary: "Guía paso a paso para ejecutar el exploit GoldHEN y habilitar el menú de Homebrew y PKGs.",
  //   content: `
  //     <h3>Requisitos Previos</h3>
  //     <ul>
  //       <li>PS4 en versión de firmware compatible.</li>
  //       <li>Memoria USB formateada en exFAT.</li>
  //     </ul>
  //     <h3>Pasos a seguir</h3>
  //     <ol>
  //       <li>Abre el navegador web de la PS4.</li>
  //       <li>Ingresa al host de exploits configurado.</li>
  //       <li>Inserta la USB cuando el sistema lo solicite.</li>
  //       <li>Espera la notificación de <strong>GoldHEN Loaded</strong>.</li>
  //     </ol>
  //   `
  // },
  // {
  //   id: "pkg-installer",
  //   title: "Instalación de Juegos y PKGs vía Red (Direct Package Installer)",
  //   category: "Tutoriales",
  //   readTime: "8 min",
  //   icon: "fa-download",
  //   summary: "Aprende a enviar archivos PKG directamente desde tu PC a la PS4 sin usar discos duros externos.",
  //   content: `
  //     <h3>Configuración en PC</h3>
  //     <p>Instala y ejecuta la herramienta Remote Package Installer en tu PC en la misma red local.</p>
  //     <h3>Configuración en PS4</h3>
  //     <p>Abre Installer App dentro de GoldHEN en la PS4 y asegúrate de apuntar a la IP de tu PC.</p>
  //   `
  // },
  // {
  //   id: "rest-mode",
  //   title: "Configuración Correcta del Modo Reposo con GoldHEN",
  //   category: "Ajustes",
  //   readTime: "3 min",
  //   icon: "fa-moon",
  //   summary: "Evita apagaos repentinos o pánicos de kernel al dejar la consola en modo reposo.",
  //   content: `
  //     <h3>Pasos Recomendados</h3>
  //     <p>Ve a Ajustes > Ajustes de ahorro de energía > Establecer funciones disponibles en modo reposo y activa <strong>Mantener aplicaciones suspendidas</strong>.</p>
  //   `
  // },

];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('guides-grid');
  const searchInput = document.getElementById('search-guides');
  const modal = document.getElementById('guide-modal');
  const modalTitle = document.getElementById('guide-modal-title');
  const modalBody = document.getElementById('guide-modal-body');
  const closeBtn = document.getElementById('modal-close');

  function renderGuides(list) {
    grid.innerHTML = '';
    if (list.length === 0) {
      grid.innerHTML = '<div class="no-results">No se encontraron guías.</div>';
      return;
    }

    list.forEach(guide => {
      const card = document.createElement('div');
      card.className = 'guide-card';
      card.innerHTML = `
            <div class="guide-header">
              <i class="fa-solid ${guide.icon} guide-icon"></i>
              <span class="guide-badge">${guide.category}</span>
            </div>
            <h3>${guide.title}</h3>
            <p>${guide.summary}</p>
            <div class="guide-footer">
              <span class="read-time"><i class="fa-regular fa-clock"></i> ${guide.readTime}</span>
              <button class="btn-link btn-read" data-id="${guide.id}">LEER GUÍA</button>
            </div>
          `;
      grid.appendChild(card);
    });

    document.querySelectorAll('.btn-read').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const item = guidesData.find(g => g.id === id);
        if (item) {
          modalTitle.textContent = item.title;
          modalBody.innerHTML = item.content;
          modal.classList.add('active');
        }
      });
    });
  }

  renderGuides(guidesData);

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const filtered = guidesData.filter(g =>
      g.title.toLowerCase().includes(term) ||
      g.summary.toLowerCase().includes(term) ||
      g.category.toLowerCase().includes(term)
    );
    renderGuides(filtered);
  });

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
});