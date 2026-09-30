document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('pkg-grid');
  const searchInput = document.getElementById('search-input');
  const modal = document.getElementById('links-modal');
  const modalTitle = document.getElementById('modal-title');
  const closeBtn = document.getElementById('modal-close');
  const downloadBtn = document.querySelector('.download-link');
  const rpiBtn = document.getElementById('btn-rpi-install');
  const ps4IpInput = document.getElementById('ps4-ip');
  const ps4PortInput = document.getElementById('ps4-port');

  const savedIP = localStorage.getItem('ps4_ip');
  const savedPort = localStorage.getItem('ps4_port');

  if (savedIP && ps4IpInput) ps4IpInput.value = savedIP;
  if (savedPort && ps4PortInput) ps4PortInput.value = savedPort;
  if (searchInput) searchInput.value = '';

  function attachModalEvents() {
    document.querySelectorAll('.btn-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const title = e.currentTarget.getAttribute('data-title');
        const url = e.currentTarget.getAttribute('data-url');

        const statusElement = document.getElementById('rpi-status');
        if (statusElement) statusElement.textContent = '';

        if (modalTitle) modalTitle.textContent = title;
        if (downloadBtn) downloadBtn.href = url;

        if (rpiBtn && url) {
          rpiBtn.setAttribute('data-url', url);
        }

        if (modal) modal.classList.add('active');
      });
    });
  }

  function renderGames(gamesList, isSearching = false) {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    if (!gamesList || gamesList.length === 0) {
      gridContainer.innerHTML = '<div class="no-results">No se encontraron juegos.</div>';
      return;
    }

    const visibleGames = isSearching ? gamesList : gamesList.slice(0, 9);

    visibleGames.forEach(game => {
      const card = document.createElement('div');
      card.className = 'pkg-card';
      const targetUrl = game.url || game.downloadUrl || '';

      card.innerHTML = `
        <div class="pkg-info">
          <img src="${game.thumb}" alt="${game.title}" class="pkg-thumb">
          <div class="pkg-details">
            <h3>${game.title}</h3>
            <span class="pkg-size">${game.size}</span>
          </div>
        </div>
        <button class="btn-link" data-url="${targetUrl}" data-title="${game.title}">VER ENLACES</button>
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
        const showAll = searchTerm.length >= 5;
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
          statusElement.textContent = "Este juego no tiene una URL válida asignada.";
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
      statusElement.textContent = "Error: Recarga la página (Ctrl+F5).";
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