fetch('projects.json')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    // 1. Render Featured Projects on Homepage
    const featuredProjects = data.featuredProjects || [];
    const featuredContainer = document.getElementById('featured-projects-grid');

    if (featuredContainer && featuredProjects.length > 0) {
      featuredContainer.innerHTML = featuredProjects.map(p => {
        const title = p.title || p.project || 'Untitled Project';
        const tag = p.tag || p.builtWith || '';
        const description = p.description || '';
        const image = p.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80';
        const link = p.link || '#';

        return `
          <div class="project-card">
            <div class="project-image-wrapper">
              <img src="${image}" alt="${title}" class="project-img">
            </div>
            <div class="project-info">
              <span class="project-tag">${tag}</span>
              <h3 class="project-title">
                <a href="${link}" target="_blank" rel="noopener noreferrer" class="project-link">${title} &nearr;</a>
              </h3>
              <p class="project-desc">${description}</p>
            </div>
          </div>
        `;
      }).join('');
    }

    // 2. Render Archive Table
    const allProjects = data.allProjects || [];
    const tbody = document.getElementById('archive-grid');

    if (tbody) {
      if (allProjects.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #a0aec0; padding: 20px;">No archive projects found.</td></tr>`;
        return;
      }

      tbody.innerHTML = allProjects.map(p => {
        const year = p.year || '2026';
        const title = p.title || p.project || 'Untitled Project';
        const madeAt = p.madeAt || p.made_at || 'Independent';
        const tag = p.tag || p.builtWith || '';
        const link = p.link || '#';

        return `
          <tr>
            <td>${year}</td>
            <td class="font-semibold">${title}</td>
            <td>${madeAt}</td>
            <td>
              <div class="tag-flex">
                ${tag.split('/').map(t => `<span class="mini-tag">${t.trim()}</span>`).join('')}
              </div>
            </td>
            <td>
              <a href="${link}" target="_blank" rel="noopener noreferrer" class="table-link">
                ${link !== '#' ? link.replace(/^https?:\/\//, '') + ' &nearr;' : 'View'}
              </a>
            </td>
          </tr>
        `;
      }).join('');
    }
  })
  .catch(error => console.error('Error loading projects.json:', error));