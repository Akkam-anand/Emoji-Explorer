# ✨ Emoji Explorer

A fun and interactive emoji browser built with ** HTML, CSS, and JavaScript** — no frameworks, no libraries. Search through hundreds of emojis and copy them to your clipboard with a single click!

---

## 🌐 Live Demo

🔗 [Click here to view the live project](https://github.com/Akkam-anand/Emoji-Explorer)

---

## 📸 Preview

![Emoji Explorer Preview](preview.png)

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🔍 Live Search | Filters emojis instantly as you type |
| 🔡 Case-Insensitive | "Smile" and "smile" both work |
| 🔤 Partial Matches | Type "sm" to match "smile", "smirk", etc. |
| 📋 Click to Copy | Copies emoji to clipboard on click |
| 🔢 Live Counter | Shows how many emojis match your search |
| 💫 Animations | Smooth hover, entrance, and copy effects |
| 📱 Responsive | Works on mobile and desktop |

---

## 📁 Project Structure

```
emoji-explorer/
│
├── index.html     → Page structure (HTML only)
├── style.css      → All styles and animations
├── emoji.js       → All JavaScript logic
└── README.md      → Project documentation
```

---

## 🧠 JavaScript Concepts Used

### 1. Fetching External Data
The emoji data comes from an external `.js` file. We load it by injecting a `<script>` tag dynamically:
```js
const script = document.createElement('script');
script.src = 'https://akhil-06.github.io/emoji_project/emojiList.js';
script.onload = () => { /* data is now available */ };
document.head.appendChild(script);
```

### 2. Rendering Emojis with the DOM
```js
list.forEach(emoji => {
  const card = document.createElement('div');
  card.innerHTML = `<span>${emoji.character}</span><span>${emoji.name}</span>`;
  grid.appendChild(card);
});
```

### 3. Live Search Filtering
```js
input.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  const filtered = allEmojis.filter(em =>
    em.name.toLowerCase().includes(q)
  );
  renderEmojis(filtered);
});
```

### 4. Copy to Clipboard
```js
navigator.clipboard.writeText(emoji.character);
```

---

## 🛠️ Tech Stack

- **HTML5** — Semantic page structure
- **CSS3** — Grid layout, animations, glassmorphism effects
- **Vanilla JavaScript** — Fetch, DOM manipulation, event listeners
- **Google Fonts** — Fredoka One + Nunito
- **Data Source** — [emojiList.js](https://akhil-06.github.io/emoji_project/emojiList.js)

---


## 📚 What I Learned

- How to structure a multi-file web project (HTML / CSS / JS separation)
- How to load and use data from an external JavaScript file
- How to use `Array.filter()` and `String.includes()` to implement search
- How to dynamically create and insert HTML elements with JavaScript
- How to use `addEventListener` for real-time user interaction
- CSS Grid for responsive layouts
- CSS `@keyframes` for animations and transitions
- The Clipboard API for copy-to-clipboard functionality

---


