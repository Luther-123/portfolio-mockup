fetch('projects.json')
    .then(response => response.json())
    .then(projects => {
        const grid = document.getElementById('project-grid');
        grid.innerHTML = projects.map(p => `
      <div class="project-card">
          <div class="card-thumb">
              <img src="${p.image}" alt="${p.title}" class="project-img">
          </div>
          <div class="card-info">
              <span class="tag">${p.tag}</span>
              <h3>
                <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                  ${p.title} <span class="arrow">&nearr;</span>
                </a>
              </h3>
              <p>${p.description}</p>
          </div>
      </div>
    `).join('');
    })
    .catch(error => console.error('Error loading projects:', error));