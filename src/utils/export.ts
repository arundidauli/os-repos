import { Repo } from '../types';

export function exportToJson(repos: Repo[], filename = 'open-source-alternatives.json') {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(repos, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportToCsv(repos: Repo[], filename = 'open-source-alternatives.csv') {
  const headers = ['Name', 'Repository', 'Stars', 'Category', 'Replaces', 'Deployment & Value Notes', 'Website'];
  const rows = repos.map(r => [
    `"${r.name.replace(/"/g, '""')}"`,
    `"${r.repo.replace(/"/g, '""')}"`,
    `"${r.stars}"`,
    `"${r.cat}"`,
    `"${r.pays.replace(/"/g, '""')}"`,
    `"${r.note.replace(/"/g, '""')}"`,
    `"${r.website || `https://github.com/${r.repo}`}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', encodedUri);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportToMarkdown(repos: Repo[], filename = 'open-source-alternatives.md') {
  let md = `# Open-Source Software Alternatives & Deployment Blueprints\n\n`;
  md += `| Name | Repository | Stars | Category | Replaces | Deployment & Value Notes |\n`;
  md += `|------|------------|-------|----------|----------|--------------------------|\n`;

  for (const r of repos) {
    const link = `[${r.name}](https://github.com/${r.repo})`;
    md += `| ${link} | \`${r.repo}\` | ${r.stars} | ${r.cat} | ${r.pays} | ${r.note} |\n`;
  }

  const dataStr = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(md);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
