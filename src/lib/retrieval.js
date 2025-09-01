function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter(token => token.length > 2);
}

function scoreEntry(queryTerms, entry) {
  const haystack = `${entry.title} ${entry.content}`.toLowerCase();
  let score = 0;
  for (const term of queryTerms) {
    if (haystack.includes(term)) score += 1;
  }
  return score;
}

export function buildContextForQuery(query, knowledgeBase, maxChars = 1500) {
  const queryTerms = Array.from(new Set(tokenize(query)));
  const scored = knowledgeBase
    .map(entry => ({ entry, score: scoreEntry(queryTerms, entry) }))
    .sort((a, b) => b.score - a.score);

  const chunks = [];
  let total = 0;
  for (const { entry } of scored) {
    const chunk = `Title: ${entry.title}\nContent: ${entry.content}\n---\n`;
    if (total + chunk.length > maxChars) break;
    chunks.push(chunk);
    total += chunk.length;
  }

  if (chunks.length === 0) {
    // Fallback: include a small general chunk so the model has brand context
    const general = knowledgeBase[0];
    if (general) chunks.push(`Title: ${general.title}\nContent: ${general.content}\n---\n`);
  }

  return chunks.join('\n');
}


