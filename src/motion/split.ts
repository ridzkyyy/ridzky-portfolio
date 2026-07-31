/** Wraps every word of an element in <span class="w"><span class="wi">…</span></span>,
 *  preserving inline children (strong / span / mark) so their styles still apply.
 *  The original text is kept readable for assistive tech via aria-label. */
export function splitWords(root: HTMLElement): HTMLElement[] {
  if (root.dataset.split === 'done') {
    return Array.from(root.querySelectorAll<HTMLElement>('.wi'));
  }

  const label = root.textContent?.replace(/\s+/g, ' ').trim();

  const walk = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? '';
      if (!text.trim()) return;
      const frag = document.createDocumentFragment();
      for (const part of text.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(' '));
        } else {
          const w = document.createElement('span');
          w.className = 'w';
          w.setAttribute('aria-hidden', 'true');
          const wi = document.createElement('span');
          wi.className = 'wi';
          wi.textContent = part;
          w.appendChild(wi);
          frag.appendChild(w);
        }
      }
      node.parentNode?.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(walk);
    }
  };

  Array.from(root.childNodes).forEach(walk);
  if (label) root.setAttribute('aria-label', label);
  root.dataset.split = 'done';
  return Array.from(root.querySelectorAll<HTMLElement>('.wi'));
}
