(() => {
  const paths = {
    home: '<path d="M4.5 11.2 12 4.8l7.5 6.4v7.3a1.7 1.7 0 0 1-1.7 1.7H6.2a1.7 1.7 0 0 1-1.7-1.7z"/><path d="M9.3 20.2v-5.4h5.4v5.4"/>',
    map: '<path d="M12 21s6.2-5.4 6.2-11.1a6.2 6.2 0 1 0-12.4 0C5.8 15.6 12 21 12 21Z"/><circle cx="12" cy="9.8" r="2.2"/>',
    "layers-3": '<path d="m4.2 8.2 7.8-4 7.8 4-7.8 4z"/><path d="m5.4 12.3 6.6 3.4 6.6-3.4M5.4 16.2l6.6 3.4 6.6-3.4"/>',
    user: '<circle cx="12" cy="8.2" r="3.4"/><path d="M5.5 20c.7-4 3-6 6.5-6s5.8 2 6.5 6"/>',
    send: '<path d="m3.8 11.5 16-7-5.1 15-3.2-6.4z"/><path d="m11.5 13.1 8.3-8.6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    "chevron-left": '<path d="m15 5-7 7 7 7"/>',
    "chevron-right": '<path d="m9 5 7 7-7 7"/>',
    "chevron-down": '<path d="m5 9 7 7 7-7"/>',
    search: '<circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5"/>',
    heart: '<path d="M20 8.7c0 5-8 10.3-8 10.3S4 13.7 4 8.7A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 8 1.7Z"/>',
    "message-circle": '<path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-3.2-.6L4 20l1.6-4.1A7.5 7.5 0 1 1 20 11.5Z"/>',
    bookmark: '<path d="M6.5 4.5h11v15l-5.5-3-5.5 3z"/>',
    "bookmark-check": '<path d="M6.5 4.5h11v15l-5.5-3-5.5 3z"/><path d="m9 10 2 2 4-4"/>',
    download: '<path d="M12 4v11m-4-4 4 4 4-4M5 19.5h14"/>',
    upload: '<path d="M12 20V9m-4 4 4-4 4 4M5 4.5h14"/>',
    "upload-cloud": '<path d="M7 18H5.8A3.8 3.8 0 0 1 6 10.4 6 6 0 0 1 17.5 9a4.5 4.5 0 0 1 .5 9h-1M12 19V11m-3 3 3-3 3 3"/>',
    paperclip: '<path d="m9 12.5 5.7-5.7a3 3 0 1 1 4.3 4.3l-8 8a5 5 0 0 1-7-7l8-8"/><path d="m7.5 15 7.8-7.8"/>',
    pencil: '<path d="m5 16.5-.8 3.3 3.3-.8L18.8 7.7l-2.5-2.5zM14.8 6.7l2.5 2.5"/>',
    history: '<path d="M4.5 9A8 8 0 1 1 6 16.7M4.5 9V4.5M4.5 9H9"/><path d="M12 7.5v5l3 2"/>',
    "rotate-ccw": '<path d="M5 8V4m0 4h4M5.5 8a7.5 7.5 0 1 1-1 6"/>',
    "trash-2": '<path d="M5 7h14M9 7V4.5h6V7m-8 0 1 13h8l1-13M10 10.5v6M14 10.5v6"/>',
    "more-horizontal": '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    check: '<path d="m5 12 4.2 4.2L19 6.8"/>',
    eye: '<path d="M3.5 12s3.2-5.2 8.5-5.2 8.5 5.2 8.5 5.2-3.2 5.2-8.5 5.2S3.5 12 3.5 12Z"/><circle cx="12" cy="12" r="2.2"/>',
    settings: '<path d="M12 2.8h1.1l.7 2.5c.6.2 1.2.4 1.7.7l2.3-1.2.8.8-1.2 2.3c.3.5.6 1.1.7 1.7l2.5.7v1.1l-2.5.7c-.2.6-.4 1.2-.7 1.7l1.2 2.3-.8.8-2.3-1.2c-.5.3-1.1.6-1.7.7l-.7 2.5H12l-.7-2.5c-.6-.2-1.2-.4-1.7-.7l-2.3 1.2-.8-.8 1.2-2.3c-.3-.5-.6-1.1-.7-1.7l-2.5-.7v-1.1l2.5-.7c.2-.6.4-1.2.7-1.7L6.5 5.6l.8-.8L9.6 6c.5-.3 1.1-.6 1.7-.7z"/><circle cx="12.55" cy="10.85" r="3.05"/>',
    "user-plus": '<circle cx="10" cy="8" r="3"/><path d="M4.5 19c.6-3.6 2.5-5.4 5.5-5.4 1.6 0 2.9.5 3.8 1.4M18 10v6m-3-3h6"/>',
    "user-check": '<circle cx="9.5" cy="8" r="3"/><path d="M4 19c.6-3.6 2.5-5.4 5.5-5.4 1.5 0 2.7.4 3.6 1.3m2.2-.5 1.8 1.8 3.2-3.5"/>',
    file: '<path d="M7 3.8h7l4 4V20H7zM14 3.8V8h4"/>',
    "file-text": '<path d="M7 3.8h7l4 4V20H7zM14 3.8V8h4M9.5 12h5M9.5 15.5h5"/>',
    image: '<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m5 17 4.5-4 3 2.5 2-2 4.5 3.5"/>',
    inbox: '<path d="M5 5h14l2 10v4H3v-4z"/><path d="M3 15h5l1.5 2h5L16 15h5"/>',
    "log-out": '<path d="M10 5H5v14h5m4-3 4-4-4-4m4 4H9"/>',
    "sun-moon": '<circle cx="8" cy="8" r="3"/><path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14M15 8.5a5.5 5.5 0 1 0 5.5 7.5A6 6 0 0 1 15 8.5Z"/>'
  };
  const aliases = { "calendar-plus": "plus", "calendar-x": "x", "search-x": "search", "user-cog": "settings", languages: "file-text", "user-x": "x" };
  window.airIcon = (name) => {
    const key = paths[name] ? name : aliases[name];
    return `<svg class="air-icon air-icon-${name}" viewBox="0 0 24 24" aria-hidden="true">${paths[key] || '<path d="m12 4 8 8-8 8-8-8z"/>'}</svg>`;
  };
})();
