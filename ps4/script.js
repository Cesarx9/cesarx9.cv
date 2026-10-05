document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('pkg-grid');
  const searchInput = document.getElementById('search-input');
  const modal = document.getElementById('links-modal');
  const modalTitle = document.getElementById('modal-title');
  const closeBtn = document.getElementById('modal-close');
  const rpiBtn = document.getElementById('btn-rpi-install');
  const ps4IpInput = document.getElementById('ps4-ip');
  const ps4PortInput = document.getElementById('ps4-port');

  const savedIP = localStorage.getItem('ps4_ip');
  const savedPort = localStorage.getItem('ps4_port');

  if (savedIP && ps4IpInput) ps4IpInput.value = savedIP;
  if (savedPort && ps4PortInput) ps4PortInput.value = savedPort;
  if (searchInput) searchInput.value = '';

  if (ps4IpInput) {
    ps4IpInput.addEventListener('input', () => localStorage.setItem('ps4_ip', ps4IpInput.value.trim()));
  }
  if (ps4PortInput) {
    ps4PortInput.addEventListener('input', () => localStorage.setItem('ps4_port', ps4PortInput.value.trim()));
  }

  // Lógica para alternar entre las pestañas (Juego - Update - DLCs)
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = '#21262d';
        b.style.color = '#8b949e';
      });
      document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');

      const targetTab = e.currentTarget.getAttribute('data-tab');
      e.currentTarget.classList.add('active');
      e.currentTarget.style.background = '#1f6feb';
      e.currentTarget.style.color = '#fff';
      
      const pane = document.getElementById(targetTab);
      if (pane) pane.style.display = 'block';
    });
  });

  function attachModalEvents() {
    document.querySelectorAll('.btn-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const title = e.currentTarget.getAttribute('data-title');
        const gameIndex = e.currentTarget.getAttribute('data-index');

        const statusElement = document.getElementById('rpi-status');
        if (statusElement) statusElement.textContent = '';

        if (modalTitle) modalTitle.textContent = title;

        const mirrorsContainer = document.getElementById('mirrors-container');
        const updatesContainer = document.getElementById('updates-container');
        const dlcsContainer = document.getElementById('dlcs-container');

        if (mirrorsContainer) mirrorsContainer.innerHTML = '';
        if (updatesContainer) updatesContainer.innerHTML = '';
        if (dlcsContainer) dlcsContainer.innerHTML = '';

        if (typeof gamesData !== 'undefined' && gamesData[gameIndex]) {
          const game = gamesData[gameIndex];

          // 1. Pestaña JUEGO (url)
          if (mirrorsContainer) {
            if (game.url && !game.url.includes('url-del-pkg.com')) {
              mirrorsContainer.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; background: #161b22; padding: 10px 12px; border-radius: 6px; border: 1px solid #30363d; margin-bottom: 6px;">
                  <span style="color: #f0f6fc; font-size: 0.9rem;">Servidor Principal (Archive.org)</span>
                  <div style="display: flex; gap: 6px;">
                    <a href="${game.url}" target="_blank" style="background: #1f6feb; color: #fff; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.8rem; text-decoration: none; display: flex; align-items: center; gap: 4px;">
                      <i class="fa-solid fa-download"></i> Descargar
                    </a>
                    <button class="btn-select-pkg" data-url="${game.url}" style="background: #238636; color: #fff; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Seleccionado</button>
                  </div>
                </div>`;
              if (rpiBtn) rpiBtn.setAttribute('data-url', game.url);
            } else {
              mirrorsContainer.innerHTML = '<p style="text-align: center; color: #8b949e; padding: 15px;">No hay enlace disponible para el juego base.</p>';
            }
          }

          // 2. Pestaña UPDATE (updUrl)
          if (updatesContainer) {
            if (game.updUrl && !game.updUrl.includes('placeholder.com')) {
              updatesContainer.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; background: #161b22; padding: 10px 12px; border-radius: 6px; border: 1px solid #30363d; margin-bottom: 6px;">
                  <span style="color: #f0f6fc; font-size: 0.9rem;">Actualización (Update)</span>
                  <div style="display: flex; gap: 6px;">
                    <a href="${game.updUrl}" target="_blank" style="background: #1f6feb; color: #fff; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.8rem; text-decoration: none; display: flex; align-items: center; gap: 4px;">
                      <i class="fa-solid fa-download"></i> Descargar
                    </a>
                    <button class="btn-select-pkg" data-url="${game.updUrl}" style="background: #21262d; color: #8b949e; border: 1px solid #30363d; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Seleccionar</button>
                  </div>
                </div>`;
            } else {
              updatesContainer.innerHTML = '<p style="text-align: center; color: #8b949e; padding: 15px;">No hay actualizaciones registradas para este juego.</p>';
            }
          }

          // 3. Pestaña DLCS (dlcUrl array)
          if (dlcsContainer) {
            if (game.dlcUrl && game.dlcUrl.length > 0 && !game.dlcUrl[0].includes('placeholder.com')) {
              dlcsContainer.innerHTML = ''; 
              game.dlcUrl.forEach((dlcLink, idx) => {
                const dlcName = `DLC #${idx + 1}`;
                dlcsContainer.innerHTML += `
                  <div style="display: flex; justify-content: space-between; align-items: center; background: #161b22; padding: 10px 12px; border-radius: 6px; border: 1px solid #30363d; margin-bottom: 6px;">
                    <span style="color: #f0f6fc; font-size: 0.9rem;">${dlcName}</span>
                    <div style="display: flex; gap: 6px;">
                      <a href="${dlcLink}" target="_blank" style="background: #1f6feb; color: #fff; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.8rem; text-decoration: none; display: flex; align-items: center; gap: 4px;">
                        <i class="fa-solid fa-download"></i> Descargar
                      </a>
                      <button class="btn-select-pkg" data-url="${dlcLink}" style="background: #21262d; color: #8b949e; border: 1px solid #30363d; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Seleccionar</button>
                    </div>
                  </div>`;
              });
            } else {
              dlcsContainer.innerHTML = '<p style="text-align: center; color: #8b949e; padding: 15px;">No hay DLCs disponibles para este juego.</p>';
            }
          }

          // Asignar eventos de selección a todos los botones internos del modal
          if (modal) {
            modal.querySelectorAll('.btn-select-pkg').forEach(b => {
              b.addEventListener('click', (ev) => {
                const selectedUrl = ev.currentTarget.getAttribute('data-url');
                if (rpiBtn) rpiBtn.setAttribute('data-url', selectedUrl);

                modal.querySelectorAll('.btn-select-pkg').forEach(btn => {
                  btn.style.background = '#21262d';
                  btn.style.color = '#8b949e';
                  btn.style.border = '1px solid #30363d';
                  btn.textContent = 'Seleccionar';
                });
                ev.currentTarget.style.background = '#238636';
                ev.currentTarget.style.color = '#fff';
                ev.currentTarget.style.border = 'none';
                ev.currentTarget.textContent = 'Seleccionado';
              });
            });
          }
        }

        if (modal) modal.classList.add('active');
      });
    });
  }

  function renderGames(gamesList, isSearching = false) {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    if (!gamesList || gamesList.length === 0) {
      gridContainer.innerHTML = '<div class="no-results" style="color: #8b949e; text-align: center; grid-column: 1/-1;">No se encontraron juegos.</div>';
      return;
    }

    const visibleGames = isSearching ? gamesList : gamesList.slice(0, 9);

    visibleGames.forEach(game => {
      const card = document.createElement('div');
      card.className = 'pkg-card';
      const originalIndex = gamesData.indexOf(game);

      card.innerHTML = `
        <div class="pkg-info">
          <img src="${game.thumb || 'assets/img/default.jpg'}" alt="${game.title}" class="pkg-thumb">
          <div class="pkg-details">
            <h3>${game.title}</h3>
            <span class="pkg-size">${game.size}</span>
          </div>
        </div>
        <button class="btn-link" data-index="${originalIndex}" data-title="${game.title}">VER ENLACES</button>
      `;
      gridContainer.appendChild(card);
    });

    attachModalEvents();
  }

  if (typeof gamesData !== 'undefined') {
    renderGames(gamesData, false);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      if (searchTerm.length > 0) {
        const filteredGames = gamesData.filter(game =>
          game.title.toLowerCase().includes(searchTerm)
        );
        const showAll = searchTerm.length >= 3;
        renderGames(filteredGames, showAll);
      } else {
        renderGames(gamesData, false);
      }
    });
  }

  if (rpiBtn) {
    rpiBtn.addEventListener('click', () => {
      const pkgUrl = rpiBtn.getAttribute('data-url');
      const statusElement = document.getElementById('rpi-status');

      if (!pkgUrl || pkgUrl.includes('url-del-pkg.com')) {
        if (statusElement) {
          statusElement.textContent = "Selecciona una URL de PKG válida.";
          statusElement.style.color = "#ff4d4d";
        }
        return;
      }

      installViaRPI(pkgUrl);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // --- CONTADOR EN VIVO: GUITAR HERO SESSIONS (24 de Octubre a las 6:00 PM) ---
  const eventDate = new Date('October 24, 2026 18:00:00').getTime();

  const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      clearInterval(timerInterval);
      const container = document.getElementById('event-countdown');
      if (container) {
        container.innerHTML = '<div style="color: #2ecc71; font-weight: bold; font-size: 0.9rem;"><i class="fa-solid fa-fire"></i> ¡El evento Guitar Hero Sessions ha comenzado!</div>';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }, 1000);
});

function installViaRPI(pkgUrl) {
  const ps4IP = document.getElementById('ps4-ip').value.trim();
  const ps4Port = document.getElementById('ps4-port').value.trim() || '12801';
  const statusElement = document.getElementById('rpi-status');

  if (!ps4IP) {
    if (statusElement) statusElement.textContent = "Ingresa la IP de tu PS4";
    return;
  }

  let finalUrl = pkgUrl.trim();

  if (finalUrl.includes('url-del-pkg.com')) {
    if (statusElement) {
      statusElement.textContent = "Error: Enlace de descarga no válido.";
      statusElement.style.color = "#ff4d4d";
    }
    return;
  }

  finalUrl = decodeURIComponent(finalUrl);
  finalUrl = finalUrl.replace('https://archive.org/download/', 'http://ia800100.us.archive.org/0/items/');
  finalUrl = finalUrl.replace('https://ia', 'http://ia');
  finalUrl = encodeURI(finalUrl);
  finalUrl = finalUrl.replace(/%5B/g, '[').replace(/%5D/g, ']');

  console.log("Enviando URL final a la PS4:", finalUrl);
  if (statusElement) {
    statusElement.textContent = "Enviando a la PS4...";
    statusElement.style.color = "#e6b800";
  }

  const endpoint = `http://${ps4IP}:${ps4Port}/api/install`;
  const payloadData = JSON.stringify({ type: 'direct', packages: [finalUrl] });

  const xhr = new XMLHttpRequest();
  xhr.open('POST', endpoint, true);
  const blob = new Blob([payloadData], { type: 'text/plain' });

  xhr.onload = function () {
    try {
      const res = JSON.parse(xhr.responseText);
      if (res.status === 'success') {
        if (statusElement) {
          statusElement.textContent = "¡Instalación iniciada! Revisa descargas en PS4.";
          statusElement.style.color = "#2ecc71";
        }
      } else {
        if (statusElement) {
          statusElement.textContent = "Respuesta PS4: " + (res.error || "Error al procesar.");
          statusElement.style.color = "#ff4d4d";
        }
      }
    } catch (e) {
      if (statusElement) {
        statusElement.textContent = "Petición enviada a la PS4.";
        statusElement.style.color = "#2ecc71";
      }
    }
  };

  xhr.onerror = function () {
    if (statusElement) {
      statusElement.textContent = "Sin respuesta de la PS4. Revisa si RPI sigue activo.";
      statusElement.style.color = "#ff4d4d";
    }
  };

  xhr.send(blob);
}