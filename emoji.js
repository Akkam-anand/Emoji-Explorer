// emoji.js — All JavaScript logic for the Emoji Explorer project

// Stores all fetched emojis so search can filter them
let allEmojis = [];

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1: FETCH EMOJI DATA
// We use fetch() to get the .js file as plain text, then extract the
// JSON array from it using a regular expression.
// ─────────────────────────────────────────────────────────────────────────────
async function loadEmojiData() {
  const URL = 'https://akhil-06.github.io/emoji_project/emojiList.js';

  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error('Network response was not ok: ' + response.status);
  }

  // Get the file content as a string
  const text = await response.text();

  // The file looks like:  var emojiList = [ {...}, {...}, ... ]
  // We pull out the [...] part using a regular expression
  const match = text.match(/\[[\s\S]*\]/);

  if (!match) {
    throw new Error('Could not find emoji array in the source file.');
  }

  // Parse the extracted string into a real JavaScript array
  const data = JSON.parse(match[0]);
  return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2: RENDER EMOJIS
// Builds a card for each emoji and inserts it into the grid.
// Called on load (all emojis) and again on every search (filtered emojis).
// ─────────────────────────────────────────────────────────────────────────────
function renderEmojis(list) {
  const grid  = document.getElementById('emojiGrid');
  const stats = document.getElementById('stats');

  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <span class="big">🤷</span>
        No emojis found! Try a different search.
      </div>
    `;
    stats.innerHTML = 'No emojis matched your search.';
    return;
  }

  stats.innerHTML = `Showing <span>${list.length}</span> of <span>${allEmojis.length}</span> emojis`;

  list.forEach(function (emoji, index) {
    const card = document.createElement('div');
    card.className = 'emoji-card';
    card.style.animationDelay = `${Math.min(index * 0.03, 1)}s`;

    // Support different key names the data might use
    const character = emoji.character || emoji.emoji || emoji.char || '';
    const name      = emoji.name || emoji.description || emoji.label || 'emoji';

    card.innerHTML = `
      <span class="emoji-char">${character}</span>
      <span class="emoji-name">${name}</span>
    `;

    card.addEventListener('click', function () {
      copyToClipboard(character, name, card);
    });

    grid.appendChild(card);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3: COPY TO CLIPBOARD
// ─────────────────────────────────────────────────────────────────────────────
function copyToClipboard(character, name, card) {
  navigator.clipboard.writeText(character)
    .then(function () {
      card.classList.add('copied');
      showToast('Copied ' + character + ' ' + name + '!');
      setTimeout(function () { card.classList.remove('copied'); }, 1200);
    })
    .catch(function () {
      showToast(character + ' — right-click to copy!');
    });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 2200);
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4: SEARCH / FILTER
// - .toLowerCase()   → case-insensitive ("Smile" = "smile")
// - .includes(query) → partial matches ("sm" matches "smile")
// ─────────────────────────────────────────────────────────────────────────────
function handleSearch(query) {
  const q = query.toLowerCase().trim();

  if (q === '') {
    renderEmojis(allEmojis);
    return;
  }

  const filtered = allEmojis.filter(function (emoji) {
    const name = (emoji.name || emoji.description || emoji.label || '').toLowerCase();
    return name.includes(q);
  });

  renderEmojis(filtered);
}

document.getElementById('searchInput').addEventListener('input', function (e) {
  handleSearch(e.target.value);
});

// ─────────────────────────────────────────────────────────────────────────────
// STEP 5: INITIALISE
// ─────────────────────────────────────────────────────────────────────────────
window.addEventListener('load', async function () {
  try {
    allEmojis = await loadEmojiData();
    renderEmojis(allEmojis);
  } catch (err) {
    console.error(err);
    document.getElementById('emojiGrid').innerHTML = `
      <div class="no-results">
        <span class="big">😵</span>
        Could not load emoji data. Check the source URL.
      </div>
    `;
    document.getElementById('stats').textContent = 'Error: ' + err.message;
  }
});