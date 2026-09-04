fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    const allProjects = data.allProjects || [];
    const tbody = document.getElementById('archive-grid');

    if (tbody) {
      if (allProjects.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #a0aec0; padding: 20px;">No archive projects found.</td></tr>`;
        return;
      }

      tbody.innerHTML = allProjects.map(p => {
        // Fallback checks for different possible Decap CMS field key names
        const year = p.year || '2026';
        const title = p.title || p.project || p.name || 'Untitled Project';
        const madeAt = p.madeAt || p.made_at || 'Independent';
        const tag = p.tag || p.builtWith || p.built_with || '';
        const link = p.link || p.url || '#';

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
  .catch(error => console.error('Error loading archive projects:', error));