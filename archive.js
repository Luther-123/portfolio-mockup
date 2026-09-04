fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        const allProjects = data.allProjects || [];
        const tbody = document.getElementById('archive-grid');

        if (tbody) {
            tbody.innerHTML = allProjects.map(p => `
        <tr>
          <td class="year-col">${p.year || '2026'}</td>
          <td class="project-col font-semibold">${p.title}</td>
          <td class="made-col">${p.madeAt || 'Independent'}</td>
          <td class="built-col">
            <div class="tag-flex">
              ${p.tag.split(',').map(t => `<span class="mini-tag">${t.trim()}</span>`).join('')}
            </div>
          </td>
          <td class="link-col">
            <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="table-link">
              ${p.link.replace(/^https?:\/\//, '')} &nearr;
            </a>
          </td>
        </tr>
      `).join('');
        }
    })
    .catch(error => console.error('Error loading archive:', error));