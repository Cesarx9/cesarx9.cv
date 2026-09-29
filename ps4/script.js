document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('pkg-grid');
  const searchInput = document.getElementById('search-input');
  const modal = document.getElementById('links-modal');
  const modalTitle = document.getElementById('modal-title');
  const closeBtn = document.getElementById('modal-close');
  const downloadBtn = document.querySelector('.download-link');

  function attachModalEvents() {
    document.querySelectorAll('.btn-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const title = e.currentTarget.getAttribute('data-title');
        const url = e.currentTarget.getAttribute('data-url');

        if (modalTitle) modalTitle.textContent = title;
        if (downloadBtn) downloadBtn.href = url;
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
      card.innerHTML = `
        <div class="pkg-info">
          <img src="${game.thumb}" alt="${game.title}" class="pkg-thumb">
          <div class="pkg-details">
            <h3>${game.title}</h3>
            <span class="pkg-size">${game.size}</span>
          </div>
        </div>
        <button class="btn-link" data-url="${game.url}" data-title="${game.title}">VER ENLACES</button>
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

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
});