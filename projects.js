fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    const featuredProjects = data.featuredProjects || [];
    const container = document.getElementById('featured-projects-grid'); // or your grid container ID

    if (container && featuredProjects.length > 0) {
      container.innerHTML = featuredProjects.map(p => {
        const title = p.title || p.project || 'Untitled Project';
        const tag = p.tag || p.builtWith || '';
        const description = p.description || '';
        const image = p.image || p.img || p.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80';
        const link = p.link || '#';

        return `
          <div class="project-card">
            <div class="project-image-wrapper">
              <img src="${image}" alt="${title}" class="project-img">
            </div>
            <div class="project-info">
              <span class="project-tag">${tag}</span>
              <h3 class="project-title">${title} &nearr;</h3>
              <p class="project-desc">${description}</p>
              <a href="${link}" target="_blank" class="project-link"></a>
            </div>
          </div>
        `;
      }).join('');
    }

    // Keep your existing archive code below...
  })
  .catch(error => console.error('Error loading projects:', error));