const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const icon = (name) => window.airIcon(name);
const clone = (value) => JSON.parse(JSON.stringify(value));
let airDb;
function openAirDb() {
  if (!("indexedDB" in window)) return;
  const request = indexedDB.open("AirBoardDB", 1);
  request.onupgradeneeded = () => request.result.createObjectStore("state");
  request.onsuccess = () => { airDb = request.result; };
}
function dbPersist(key, value) {
  if (!airDb) return; const transaction = airDb.transaction("state", "readwrite"); transaction.objectStore("state").put(clone(value), key);
}
const persist = (key, value) => { try { localStorage.setItem(`airboard:${key}`, JSON.stringify(value)); dbPersist(key, value); } catch (error) { console.warn(`AirBoard storage limit reached for ${key}`, error); } };
const restore = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(`airboard:${key}`)) ?? fallback; } catch { return fallback; }
};
function track(name, properties = {}) {
  const events = restore("analytics", []);
  events.push({ name, properties, at: Date.now() });
  persist("analytics", events.slice(-200));
}

const today = new Date();
const iso = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const sampleImage = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80";
const sampleImage2 = "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80";
const sampleVideo = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const samplePdf = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const seedSchools = [
  { id: "seoul-daedo-elementary", name: "서울대도초등학교", location: "서울특별시 강남구", address: "서울특별시 강남구 도곡동 선릉로 209", lat: 37.494, lng: 127.063, members: 126, rating: 8.6, wiki: { description: "서울 강남구에 위치한 초등학교.", trivia: "학생 참여형 교내 활동이 꾸준히 운영된다.", extra: "학교별 소식과 커뮤니티 게시물을 확인할 수 있다." }, revisions: [] },
  { id: "busan-yeonpo-elementary", name: "연포초등학교", location: "부산광역시 남구", address: "부산광역시 남구 대연동 못골로 17", lat: 35.135, lng: 129.09, members: 94, rating: 8.3, wiki: { description: "부산 남구에 위치한 초등학교.", trivia: "지역 연계 활동과 학교 행사가 활발하다.", extra: "학교별 자료와 게시물을 한곳에서 확인할 수 있다." }, revisions: [] },
  { id: "daejeon-seongryong-elementary", name: "대전성룡초등학교", location: "대전광역시 서구", address: "대전광역시 서구 월평동 갈마역로 125", lat: 36.352, lng: 127.376, members: 108, rating: 8.5, wiki: { description: "대전 서구에 위치한 초등학교.", trivia: "다양한 체험 활동을 운영한다.", extra: "학교 정보는 학생들이 함께 보완할 수 있다." }, revisions: [] },
  { id: "jeju-dong-elementary", name: "제주동초등학교", location: "제주특별자치도 제주시", address: "제주특별자치도 제주시 건입동 동문로 65", lat: 33.513, lng: 126.53, members: 87, rating: 8.4, wiki: { description: "제주시에 위치한 초등학교.", trivia: "지역 특색을 살린 학교 활동이 운영된다.", extra: "학교 커뮤니티와 자료를 확인할 수 있다." }, revisions: [] },
  { id: "naejeong", name: "내정중학교", location: "경기도 성남시 분당구", address: "경기도 성남시 분당구 수내동 백현로 197", lat: 37.3713, lng: 127.1215, members: 218, rating: 8.7, wiki: { description: "성남시 분당구에 위치한 중학교.", trivia: "학생 주도 동아리 활동과 학교 행사가 활발하다.", extra: "학교별 시험 및 수행평가 정보는 AirBoard 학교 허브에서 공유된다." }, revisions: [] },
  { id: "yangyoung", name: "양영중학교", location: "경기도 성남시 분당구", address: "경기도 성남시 분당구 서현동 돌마로486번길 23", lat: 37.3658, lng: 127.1162, members: 174, rating: 8.4, wiki: { description: "분당 지역 학생들이 이용하는 학교 커뮤니티 허브.", trivia: "교내 체육 활동과 독서 행사가 꾸준히 운영된다.", extra: "학교 자료와 태그 게시물을 한 화면에서 확인할 수 있다." }, revisions: [] },
  { id: "seoul", name: "서울고등학교", location: "서울특별시 서초구", address: "서울특별시 서초구 서초동 효령로 197", lat: 37.4842, lng: 127.0049, members: 542, rating: 9.0, wiki: { description: "서울 서초구에 위치한 고등학교.", trivia: "다양한 교내 행사와 동아리 활동이 운영된다.", extra: "시험 자료와 자유게시판 활동이 활발하다." }, revisions: [] },
  { id: "busan", name: "부산중앙고등학교", location: "부산광역시 남구", address: "부산광역시 남구 대연동 진남로127번길 50", lat: 35.1333, lng: 129.0885, members: 361, rating: 8.5, wiki: { description: "부산 지역의 학교 커뮤니티 허브.", trivia: "학교 행사 관련 게시물이 자주 공유된다.", extra: "자료 평점 평균이 높은 학교 중 하나다." }, revisions: [] },
  { id: "daejeon", name: "대전과학고등학교", location: "대전광역시 유성구", address: "대전광역시 유성구 구성동 과학로 46", lat: 36.3772, lng: 127.3637, members: 447, rating: 9.2, wiki: { description: "과학 탐구와 연구 활동 중심의 학교.", trivia: "탐구 보고서 및 모의고사 자료 공유가 활발하다.", extra: "학교별 위키 문서는 모든 학생이 수정할 수 있다." }, revisions: [] }
];
const seedPosts = [
  { id: "p1", author: "서윤", school: "서울고등학교", followed: true, createdAt: Date.now() - 1000 * 60 * 3, title: "9모 오답 정리 PDF", body: "틀린 문제를 유형별로 정리했습니다.", tags: ["#9모", "#오답"], media: [{ type: "image", url: sampleImage, name: "오답 정리 미리보기" }, { type: "pdf", url: samplePdf, name: "9모 오답 정리.pdf" }], likes: 42, liked: false, saved: false, ratingScores: [9, 8, 10], comments: [{ id: "c1", author: "도현", body: "정리 진짜 깔끔하다!", likes: 4, liked: false, authorLiked: true, replies: [{ id: "r1", author: "서윤", body: "@도현 고마워!", likes: 1, liked: false, authorLiked: false }] }] },
  { id: "p2", author: "민재", school: "내정중학교", followed: true, createdAt: Date.now() - 1000 * 60 * 47, title: "수행평가 발표 참고 영상", body: "발표 흐름 잡을 때 참고하면 좋아요.", tags: ["#수행평가", "#발표"], media: [{ type: "video", url: sampleVideo, name: "발표 참고 영상" }], likes: 31, liked: false, saved: false, ratingScores: [8, 9], comments: [] },
  { id: "p3", author: "하린", school: "양영중학교", followed: false, createdAt: Date.now() - 1000 * 60 * 60 * 5, title: "중간고사 공부 기록", body: "일주일 동안 공부한 노트 일부를 공유합니다.", tags: ["#중간고사", "#필기"], media: [{ type: "image", url: sampleImage2, name: "공부 노트" }], likes: 18, liked: false, saved: false, ratingScores: [7, 8, 9], comments: [] },
  { id: "p4", author: "도현", school: "대전과학고등학교", followed: false, createdAt: Date.now() - 1000 * 60 * 60 * 26, title: "탐구 보고서 작성 체크리스트", body: "자료 조사부터 참고문헌 작성까지 확인할 수 있습니다.", tags: ["#수행평가", "#탐구"], media: [{ type: "pdf", url: samplePdf, name: "탐구 보고서 체크리스트.pdf" }], likes: 56, liked: false, saved: false, ratingScores: [10, 9, 9], comments: [] }
];
const userProfiles = {
  "서윤": { school: "서울고등학교", grade: "고2", className: "4반", role: "방송부", position: "부장", avatar: "", highlights: [{ id: "sy1", title: "공부", images: [sampleImage, sampleImage2] }] },
  "민재": { school: "내정중학교", grade: "중2", className: "1반", role: "축구부", position: "주장", avatar: "", highlights: [{ id: "mj1", title: "학교", images: [sampleImage2] }] },
  "하린": { school: "양영중학교", grade: "중3", className: "2반", role: "미술동아리", position: "부원", avatar: "", highlights: [] },
  "도현": { school: "대전과학고등학교", grade: "고2", className: "3반", role: "물리동아리", position: "회장", avatar: "", highlights: [{ id: "dh1", title: "탐구", images: [sampleImage] }] }
};

const state = {
  view: "home",
  calendarDate: new Date(today.getFullYear(), today.getMonth(), 1),
  selectedSchool: "naejeong",
  feedQuery: "",
  feedTags: [],
  activePost: null,
  replyTarget: null,
  dmOpen: false,
  dmTab: "messages",
  activeConversation: "서윤",
  map: null,
  mapView: restore("mapView", { center: [36.35, 127.8], zoom: 7 }),
  mapSchoolType: restore("mapSchoolType", "전체"),
  mapQuery: "",
  mapDetailOpen: false,
  schoolDataStatus: "sample",
  schoolPostLimit: 3,
  profile: restore("profile", { nickname: "민서", avatar: "", bio: "", school: "내정중학교", grade: "중2", className: "3반", role: "물리동아리", position: "부장", highlights: [] }),
  accounts: restore("accounts", [{ email: "demo@airboard.kr", password: "airboard123", nickname: "민서", verified: true }]),
  session: restore("session", { email: "demo@airboard.kr" }),
  verification: { email: "", code: "", verified: false },
  theme: restore("theme", "dark"),
  watchHistory: restore("watchHistory", []),
  following: restore("following", ["서윤", "민재"]),
  feedOrder: [],
  feedLimit: 6,
  justUploaded: null,
  viewedProfile: null,
  activeHighlight: { group: 0, image: 0 },
  schedules: restore("schedules", [
    { id: "s1", title: "영어 수행평가 초안", date: iso(today), start: "18:30", end: "19:20", memo: "발표 구조 정리" },
    { id: "s2", title: "수학 시험 대비", date: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)), start: "15:00", end: "17:00", memo: "오답 20문제" },
    { id: "s3", title: "동아리 회의", date: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10)), start: "17:00", end: "18:00", memo: "축제 부스" }
  ]),
  schools: restore("schools", seedSchools),
  posts: restore("posts", seedPosts),
  conversations: restore("conversations", [
    { user: "서윤", school: "서울고등학교", online: true, unread: 2, typing: false, messages: [{ id: "m1", from: "서윤", type: "text", content: "자료 확인했어?", time: "17:42", read: true }, { id: "m2", from: "me", type: "text", content: "응, 고마워!", time: "17:45", read: true }] },
    { user: "도현", school: "대전과학고등학교", online: true, unread: 0, typing: false, messages: [{ id: "m3", from: "도현", type: "text", content: "탐구 보고서 링크 보낼게.", time: "어제", read: true }] },
    { user: "하린", school: "양영중학교", online: false, unread: 1, typing: false, messages: [{ id: "m4", from: "하린", type: "text", content: "내일 학교에서 봐!", time: "월", read: false }] }
  ]),
  requests: restore("requests", [{ user: "준서", school: "내정중학교" }, { user: "유나", school: "부산중앙고등학교" }])
};
state.posts = state.posts.map((post, index) => ({ ...post, createdAt: post.createdAt || Date.now() - index * 1000 * 60 * 23 }));
state.profile.highlights = (state.profile.highlights || []).map((item, index) => typeof item === "string" ? { id: `h${index}`, title: `하이라이트 ${index + 1}`, images: [item] } : item);
state.schools = [
  ...state.schools,
  ...seedSchools.filter((seed) => !state.schools.some((school) => school.id === seed.id))
].map((school) => {
  const canonical = seedSchools.find((seed) => seed.id === school.id);
  return {
    ...school,
    name: canonical?.name || school.name,
    location: canonical?.location || school.location,
    address: canonical?.address || school.address || school.location || "",
    type: school.type || (school.name.includes("초등") ? "초등학교" : school.name.includes("중학교") ? "중학교" : "고등학교")
  };
});
const realtime = "BroadcastChannel" in window ? new BroadcastChannel("airboard-dm") : null;
const runtimeConfig = window.AIRBOARD_CONFIG || {};
const oauthConfig = {
  Google: { slug: "google" },
  Apple: { slug: "apple" },
  Kakao: { slug: "kakao" }
};

const dialogs = {
  schedule: $("#scheduleDialog"), login: $("#loginDialog"), signup: $("#signupDialog"), upload: $("#uploadDialog"),
  comments: $("#commentsDialog"), profileEdit: $("#profileEditDialog"), settings: $("#settingsDialog"), collection: $("#collectionDialog"),
  wikiEdit: $("#wikiEditDialog"), history: $("#historyDialog"), revision: $("#revisionDialog"), highlight: $("#highlightDialog"),
  command: $("#commandDialog")
};

function saveAll() {
  persist("profile", state.profile); persist("schedules", state.schedules); persist("schools", state.schools);
  persist("posts", state.posts); persist("conversations", state.conversations); persist("requests", state.requests);
  persist("accounts", state.accounts); persist("session", state.session); persist("theme", state.theme); persist("watchHistory", state.watchHistory); persist("following", state.following); persist("mapView", state.mapView);
  persist("mapSchoolType", state.mapSchoolType);
}
function toast(message, type = "") {
  if (!type) type = /실패|오류|필요|일치하지|올바르지|늦어야|삭제|차단|신고/.test(message) ? "error" : /완료|저장|가입|로그인|반영|환영/.test(message) ? "success" : "message";
  const node = document.createElement("div"); node.className = `toast ${type}`; node.textContent = message; document.body.append(node);
  setTimeout(() => node.classList.add("leaving"), 1850); setTimeout(() => node.remove(), 2100);
}
function lucide() {
  $$("i[data-lucide]").forEach((node) => node.outerHTML = window.airIcon(node.dataset.lucide));
}
function sectionTitle(title, action = "") { return `<div class="section-title"><h1>${title}</h1><div class="toolbar">${action}</div></div>`; }
function empty(iconName, text) { return `<div class="empty-state">${icon(iconName)}<span>${text}</span></div>`; }
function formatDate(value) { const d = new Date(`${value}T00:00:00`); return `${d.getMonth() + 1}/${d.getDate()}`; }
function durationText(start, end) {
  const [sh, sm] = start.split(":").map(Number); const [eh, em] = end.split(":").map(Number); const minutes = eh * 60 + em - (sh * 60 + sm);
  if (minutes <= 0) return ""; const hours = Math.floor(minutes / 60); const rest = minutes % 60; return `${hours ? `${hours}시간` : ""}${hours && rest ? " " : ""}${rest ? `${rest}분` : ""}`;
}
function timeLabel(value) {
  const [hour, minute] = value.split(":").map(Number);
  const period = hour < 12 ? "오전" : "오후";
  const displayHour = hour % 12 || 12;
  return `${period} ${displayHour}:${String(minute).padStart(2, "0")}`;
}
function populateTimeSelects() {
  $$("select[data-time-select]").forEach((select) => {
    if (select.options.length) return;
    select.innerHTML = `<option value="">시간 선택</option>${["오전", "오후"].map((period, group) => {
      const start = group * 12 * 60;
      const options = Array.from({ length: 24 }, (_, index) => {
        const total = start + index * 30;
        const value = `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
        return `<option value="${value}">${timeLabel(value)}</option>`;
      }).join("");
      return `<optgroup label="${period}">${options}</optgroup>`;
    }).join("")}`;
  });
}
function scheduleTimeValue(item) { return `${item.date}T${item.start || "00:00"}`; }
function sortedSchedules(items) { return [...items].sort((a, b) => scheduleTimeValue(a).localeCompare(scheduleTimeValue(b))); }
function currentAgenda() {
  const now = new Date();
  const todayKey = iso(now);
  const weekEndKey = iso(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7));
  const active = sortedSchedules(state.schedules.filter((item) => item.date >= todayKey));
  return {
    today: now,
    todayKey,
    weekEndKey,
    active,
    week: active.filter((item) => item.date <= weekEndKey),
    upcoming: active.filter((item) => item.date > weekEndKey)
  };
}
function avg(scores) { return scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0; }
function profileScore(author = state.profile.nickname) {
  const scores = state.posts.filter((post) => post.author === author).flatMap((post) => post.ratingScores);
  return avg(scores).toFixed(1);
}
function getUserProfile(author) { return author === state.profile.nickname ? state.profile : (userProfiles[author] || { school: state.posts.find((post) => post.author === author)?.school || "", grade: "", className: "", role: "", position: "", avatar: "", highlights: [] }); }
function totalUnread() { return state.conversations.reduce((sum, item) => sum + Math.max(0, Number(item.unread) || 0), 0); }
function unreadLabel(count) { return count > 99 ? "99+" : String(count); }
function markConversationRead(conversation) {
  if (!conversation || !conversation.unread) return false;
  conversation.lastUnreadCount = conversation.unread;
  conversation.unread = 0; conversation.messages.forEach((message) => { if (message.from !== "me") message.read = true; }); saveAll(); return true;
}
function updateChrome() {
  $("#homeToolbar").classList.toggle("hidden", state.view !== "home");
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === state.view));
  const badge = $("#dmBadge"); const unread = totalUnread(); const previous = Number(badge.dataset.count || 0);
  badge.textContent = unreadLabel(unread); badge.dataset.count = unread; badge.classList.toggle("show", unread > 0);
  badge.setAttribute("aria-label", unread ? `읽지 않은 메시지 ${unreadLabel(unread)}개` : "읽지 않은 메시지 없음");
  if (unread > previous) { badge.classList.remove("badge-pop"); requestAnimationFrame(() => badge.classList.add("badge-pop")); }
  $(".profile-button span").textContent = state.session?.email ? state.profile.nickname : "로그인";
  document.body.classList.toggle("light-mode", state.theme === "light");
  document.body.classList.toggle("map-active", state.view === "map");
}

function render() {
  updateChrome();
  try {
    ({ home: renderHome, map: renderMap, feed: renderFeed, profile: renderProfile }[state.view] || renderHome)();
  } catch (error) {
    $("#app").innerHTML = `<div class="error-state"><div><h2>화면을 불러오지 못했습니다.</h2><button class="primary" data-action="retry">다시 시도</button></div></div>`;
    console.error(error);
  }
  lucide();
  $("#app").classList.remove("view-enter"); requestAnimationFrame(() => $("#app").classList.add("view-enter"));
}
function navigate(view) {
  track("navigation", { from: state.view, to: view });
  const change = () => { state.view = view; render(); };
  if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) document.startViewTransition(change);
  else change();
}
function openCommand() {
  dialogs.command.showModal(); $("#commandSearch").value = ""; $$(".command-item").forEach((item) => item.hidden = false);
  lucide(); requestAnimationFrame(() => $("#commandSearch").focus());
}
function runCommand(command) {
  track("quick_command", { command });
  dialogs.command.close();
  if (["home", "map", "feed", "profile"].includes(command)) return navigate(command);
  if (command === "schedule") return dialogs.schedule.showModal();
  if (command === "post") return requireAuthenticated() && dialogs.upload.showModal();
  if (command === "messages") return openDm();
}

function renderHome() {
  const agenda = currentAgenda();
  const dateTitle = new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "long" }).format(agenda.today);
  $("#app").innerHTML = `
    ${sectionTitle(dateTitle, `<button class="primary icon-primary" data-action="open-schedule" aria-label="일정 등록">${icon("plus")}</button>`)}
    <section class="schedule-columns home-agenda">
      <article class="panel"><div class="section-title"><h2>이번주</h2></div>${scheduleList(agenda.week)}</article>
      <article class="panel"><div class="section-title"><h2>다가오는 일정</h2></div>${scheduleList(agenda.upcoming)}</article>
    </section>
    <section class="panel calendar-panel">${calendarMarkup()}</section>`;
}
function scheduleList(items) {
  return items.length ? `<div class="schedule-list">${items.map((item) => `<div class="schedule-item"><span class="date-chip">${formatDate(item.date)}</span><span><strong>${item.title}</strong><br><small>${item.start} - ${item.end} <span class="duration">${durationText(item.start, item.end)}</span>${item.memo ? ` · ${item.memo}` : ""}</small></span><button class="icon-button" data-action="delete-schedule" data-id="${item.id}" aria-label="일정 삭제">${icon("trash-2")}</button></div>`).join("")}</div>` : empty("calendar-x", "등록된 일정이 없습니다.");
}
function calendarMarkup() {
  const current = state.calendarDate; const year = current.getFullYear(); const month = current.getMonth();
  const start = new Date(year, month, 1); const first = start.getDay(); const end = new Date(year, month + 1, 0).getDate();
  const prevEnd = new Date(year, month, 0).getDate(); const cells = [];
  const agenda = currentAgenda();
  for (let i = first - 1; i >= 0; i--) cells.push({ day: prevEnd - i, outside: true, date: new Date(year, month - 1, prevEnd - i) });
  for (let day = 1; day <= end; day++) cells.push({ day, outside: false, date: new Date(year, month, day) });
  while (cells.length < 42) { const day = cells.length - first - end + 1; cells.push({ day, outside: true, date: new Date(year, month + 1, day) }); }
  return `<div class="calendar-head"><button class="icon-button" data-action="prev-month" aria-label="이전 달">${icon("chevron-left")}</button><h2>${year}년 ${month + 1}월</h2><button class="icon-button" data-action="next-month" aria-label="다음 달">${icon("chevron-right")}</button><input class="year-select" type="number" data-action="change-year" value="${year}" aria-label="연도 변경" /></div>
    <div class="weekday-row">${["일", "월", "화", "수", "목", "금", "토"].map((day) => `<span>${day}</span>`).join("")}</div>
    <div class="calendar-grid">${cells.map((cell) => { const dateKey = iso(cell.date); const events = agenda.active.filter((item) => item.date === dateKey); return `<div class="calendar-day ${cell.outside ? "outside" : ""} ${dateKey === agenda.todayKey ? "today" : ""}"><strong>${cell.day}</strong>${events.map((event) => `<span class="event-pill">${event.title}</span>`).join("")}</div>`; }).join("")}</div>`;
}

function filteredMapSchools() {
  const query = state.mapQuery.trim().toLowerCase().replace(/\s+/g, "");
  return state.schools.filter((school) => {
    const matchesType = state.mapSchoolType === "전체" || school.type === state.mapSchoolType;
    const text = `${school.name} ${school.type} ${school.location} ${school.address}`.toLowerCase().replace(/\s+/g, "");
    return matchesType && (!query || text.includes(query));
  });
}

function schoolAreaParts(school) {
  const parts = (school.address || school.location || "").trim().split(/\s+/).filter(Boolean);
  const province = parts[0] || "지역 미상";
  const cityIndex = parts.findIndex((part, index) => index > 0 && /(시|군)$/.test(part));
  const districtIndex = parts.findIndex((part, index) => index > 0 && /(구)$/.test(part));
  const neighborhoodIndex = parts.findIndex((part, index) => index > 0 && /(동|읍|면|리|가)$/.test(part.replace(/\d+가$/, "가")));
  return {
    province,
    city: cityIndex > 0 ? parts[cityIndex] : province,
    district: districtIndex > 0 ? parts[districtIndex] : (cityIndex > 0 ? parts[cityIndex] : province),
    neighborhood: neighborhoodIndex > 0 ? parts[neighborhoodIndex] : (districtIndex > 0 ? parts[districtIndex] : (cityIndex > 0 ? parts[cityIndex] : province))
  };
}

function clusterSchoolsByArea(schools, level) {
  const groups = new Map();
  schools.forEach((school) => {
    const areas = schoolAreaParts(school);
    const key = [areas.province, level === "province" ? "" : areas.city, ["district", "neighborhood"].includes(level) ? areas.district : "", level === "neighborhood" ? areas.neighborhood : ""].filter(Boolean).join(" ");
    const group = groups.get(key) || { name: areas[level], schools: [], lat: 0, lng: 0 };
    group.schools.push(school);
    group.lat += school.lat;
    group.lng += school.lng;
    groups.set(key, group);
  });
  return [...groups.values()].map((group) => ({ ...group, count: group.schools.length, lat: group.lat / group.schools.length, lng: group.lng / group.schools.length }));
}

function renderMap() {
  const schools = filteredMapSchools();
  const school = state.mapDetailOpen ? schools.find((item) => item.id === state.selectedSchool) : null;
  const schoolPosts = school ? state.posts.filter((post) => post.school === school.name) : [];
  const dataStatus = state.schoolDataStatus === "official" ? "전국 데이터" : state.schoolDataStatus === "loading" ? "전국 데이터 로딩 중" : "샘플 데이터";
  $("#app").innerHTML = `<section class="map-layout">
    <div id="realMap"></div>
    <div class="map-command">
      <label class="map-search">${icon("search")}<input id="mapSearch" value="${state.mapQuery}" placeholder="학교 또는 지역 검색" aria-label="학교 또는 지역 검색" autocomplete="off" />${state.mapQuery ? `<button type="button" class="icon-button map-search-clear" data-action="clear-map-search" aria-label="검색 지우기">${icon("x")}</button>` : ""}</label>
      <div class="map-filters">${["전체", "초등학교", "중학교", "고등학교"].map((type) => `<button type="button" class="map-filter ${state.mapSchoolType === type ? "active" : ""}" data-action="map-school-filter" data-type="${type}">${type}</button>`).join("")}</div>
      <span class="map-result-count">${dataStatus} · 표시 중 ${schools.length}개</span>
    </div>
    ${school ? `<aside class="school-detail"><div class="school-preview">${schoolDetailMarkup(school, schoolPosts)}</div></aside>` : ""}
  </section>`;
  setTimeout(initMap, 0);
}
function schoolDetailMarkup(school, posts) {
  const shown = posts.slice(0, state.schoolPostLimit);
  return `<article class="panel"><div class="school-detail-head"><div><h1>${school.name}</h1><p class="muted">${school.address || school.location}</p></div><button class="icon-button" data-action="close-school-detail" aria-label="학교 정보 닫기">${icon("x")}</button></div><span class="school-member">${school.members}명 가입</span>
    <div class="school-review-summary"><strong>${school.rating.toFixed(1)}</strong><span>학교 리뷰 평점</span><small>${posts.length}개의 학교 활동 리뷰</small></div>
    <div class="school-reviews"><strong>학생 리뷰</strong>${posts.length ? posts.slice(0, 3).map((post) => `<button class="school-review" data-action="open-post" data-id="${post.id}"><span class="avatar">${post.author.slice(0, 1)}</span><span><strong>${post.author}</strong><small>${post.body}</small></span></button>`).join("") : empty("message-circle", "아직 등록된 리뷰가 없습니다.")}</div>
    <div class="wiki-panel"><div class="wiki-actions"><strong>학교 위키</strong><div class="toolbar"><button class="tiny" data-action="edit-wiki">${icon("pencil")}수정</button><button class="tiny" data-action="wiki-history">${icon("history")}기록</button></div></div>
      <div class="wiki-section"><strong>학교 설명</strong><p>${school.wiki.description}</p></div>
      <div class="wiki-section"><strong>학교 평점</strong><p class="rating">${school.rating.toFixed(1)} / 10</p></div>
      <div class="wiki-section"><strong>여담</strong><p>${school.wiki.trivia}</p></div>
      <div class="wiki-section"><strong>기타 정보</strong><p>${school.wiki.extra}</p></div>
    </div>
    <div class="school-content"><strong>학교 게시글 및 자료</strong>${shown.length ? shown.map((post) => `<div class="school-content-item"><button class="author-button" data-action="view-author" data-author="${post.author}"><span class="avatar">${post.author.slice(0, 1)}</span><span><strong>${post.author}</strong><br><small>${post.school}</small></span></button><button class="text-button" data-action="open-post" data-id="${post.id}"><strong>${post.title}</strong></button></div>`).join("") : empty("inbox", "이 학교의 게시물이 없습니다.")}${posts.length > shown.length ? `<button class="tiny" data-action="more-school-posts">${icon("chevron-down")}더보기</button>` : ""}</div></article>`;
}
function initMap() {
  if (!window.L || !$("#realMap")) return;
  if (state.map) { state.mapView = { center: [state.map.getCenter().lat, state.map.getCenter().lng], zoom: state.map.getZoom() }; state.map.remove(); state.map = null; }
  state.map = L.map("realMap", { zoomControl: false, preferCanvas: true, zoomSnap: 1, zoomAnimation: true, zoomAnimationThreshold: 8, fadeAnimation: true, markerZoomAnimation: true, inertia: true, easeLinearity: .18, wheelDebounceTime: 20, wheelPxPerZoomLevel: 90 }).setView(state.mapView.center, state.mapView.zoom);
  L.control.zoom({ position: "topright" }).addTo(state.map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap" }).addTo(state.map);
  state.map._airMarkers = L.layerGroup().addTo(state.map);
  let drawFrame = 0;
  const draw = () => {
    cancelAnimationFrame(drawFrame);
    const zoom = state.map.getZoom();
    state.mapView = { center: [state.map.getCenter().lat, state.map.getCenter().lng], zoom }; persist("mapView", state.mapView);
    drawFrame = requestAnimationFrame(() => {
      const visibleBounds = state.map.getBounds().pad(.28); state.map._airMarkers.clearLayers();
      const visible = (item) => visibleBounds.contains([item.lat, item.lng]);
      const schools = filteredMapSchools().filter(visible);
      if (zoom < 8) clusterSchoolsByArea(schools, "province").forEach((item) => addCluster(item, 9, "region"));
      else if (zoom < 10) clusterSchoolsByArea(schools, "city").forEach((item) => addCluster(item, 11, "city"));
      else if (zoom < 13) clusterSchoolsByArea(schools, "district").forEach((item) => addCluster(item, 14, "district"));
      else if (zoom < 15) clusterSchoolsByArea(schools, "neighborhood").forEach((item) => addCluster(item, 16, "neighborhood"));
      else drawSchools(schools, zoom);
    });
  };
  const addCluster = (item, targetZoom, tier = "") => {
    const label = `${item.name} ${item.count}`;
    const marker = L.marker([item.lat, item.lng], { icon: L.divIcon({ className: "", html: `<div class="cluster-pin cluster-${tier}"><strong>${item.count}</strong><span>${item.name}</span></div>`, iconSize: [66, 50], iconAnchor: [33, 25] }) }).addTo(state.map._airMarkers);
    marker.bindTooltip(`${item.name} · 학교 ${item.count}개`, { direction: "top", offset: [0, -22] });
    marker.on("click", () => state.map.flyTo([item.lat, item.lng], Math.max(targetZoom, state.map.getZoom() + 2), { duration: .78, easeLinearity: .2 }));
    marker.getElement()?.setAttribute("aria-label", label);
  };
  const addSchoolMarker = (school) => {
    const marker = L.marker([school.lat, school.lng], { icon: L.divIcon({ className: "", html: `<div class="school-pin"></div>`, iconSize: [32, 32], iconAnchor: [16, 16] }) }).addTo(state.map._airMarkers);
    marker.bindTooltip(school.name, { direction: "top", offset: [0, -14] });
    marker.on("click", () => selectSchool(school.id));
    marker.getElement()?.setAttribute("aria-label", school.name);
  };
  const drawSchools = (schools, zoom) => {
    if (zoom >= 17) return schools.forEach(addSchoolMarker);
    const buckets = new Map();
    schools.forEach((school) => {
      const point = state.map.project([school.lat, school.lng], zoom); const key = `${Math.round(point.x / 44)}:${Math.round(point.y / 44)}`;
      const bucket = buckets.get(key) || []; bucket.push(school); buckets.set(key, bucket);
    });
    buckets.forEach((bucket) => {
      if (bucket.length === 1) return addSchoolMarker(bucket[0]);
      const center = bucket.reduce((value, school) => ({ lat: value.lat + school.lat / bucket.length, lng: value.lng + school.lng / bucket.length }), { lat: 0, lng: 0 });
      addCluster({ ...center, name: "인근 학교", count: bucket.length }, Math.min(18, zoom + 2), "nearby");
    });
  };
  state.map.on("zoomend moveend", draw); draw();
}
function selectSchool(id) {
  state.selectedSchool = id; state.schoolPostLimit = 3; state.mapDetailOpen = true;
  const school = state.schools.find((item) => item.id === id); const posts = state.posts.filter((post) => post.school === school.name);
  $(".school-detail")?.remove();
  $(".map-layout")?.insertAdjacentHTML("beforeend", `<aside class="school-detail"><div class="school-preview">${schoolDetailMarkup(school, posts)}</div></aside>`);
  lucide();
}

function orderedPosts() {
  const ids = state.posts.map((post) => post.id);
  if (!state.feedOrder.length || state.feedOrder.some((id) => !ids.includes(id)) || ids.some((id) => !state.feedOrder.includes(id))) {
    const randomWeight = new Map(state.posts.map((post) => [post.id, Math.random()]));
    state.feedOrder = [...state.posts].sort((a, b) => Number(state.following.includes(b.author)) - Number(state.following.includes(a.author)) || randomWeight.get(a.id) - randomWeight.get(b.id)).map((post) => post.id);
  }
  if (state.justUploaded) state.feedOrder = [state.justUploaded, ...state.feedOrder.filter((id) => id !== state.justUploaded)];
  return state.feedOrder.map((id) => state.posts.find((post) => post.id === id)).filter(Boolean);
}
function timeAgo(timestamp) {
  const seconds = Math.max(1, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 60) return `${seconds}초 전`; if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`; return `${Math.floor(seconds / 86400)}일 전`;
}
function renderFeed() {
  const query = state.feedQuery.toLowerCase().trim();
  const allPosts = orderedPosts().filter((post) => {
    const searchable = `${post.title} ${post.body} ${post.tags.join(" ")} ${post.author} ${post.school}`.toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesTags = !state.feedTags.length || state.feedTags.some((tag) => post.tags.includes(tag));
    return matchesQuery && matchesTags;
  });
  const posts = allPosts.slice(0, state.feedLimit);
  $("#app").innerHTML = `
    <div class="feed-search">${icon("search")}<input id="feedSearch" value="${state.feedQuery}" placeholder="검색" /><button class="icon-button" data-action="open-saved" aria-label="저장한 목록">${icon("bookmark")}</button><button class="icon-button" data-action="open-watch-history" aria-label="시청 기록">${icon("history")}</button><button class="primary icon-primary" data-action="open-upload" aria-label="작성">${icon("plus")}</button></div>
    <div class="tag-row feed-tags">${["#중간고사", "#9모", "#수행평가", "#기말고사", "#필기", "#탐구"].map((tag) => `<button class="tag ${state.feedTags.includes(tag) ? "active" : ""}" data-action="filter-tag" data-tag="${tag}" aria-pressed="${state.feedTags.includes(tag)}">${tag}</button>`).join("")}${state.feedTags.length ? `<button class="tag tag-clear" data-action="clear-tags" aria-label="추천 태그 선택 해제">${icon("x")}</button>` : ""}</div>
    <section class="feed-layout"><div class="post-list">${posts.length ? posts.map(postMarkup).join("") : empty("search-x", "검색 결과가 없습니다.")}${allPosts.length > posts.length ? `<button class="tiny wide" data-action="more-feed">${icon("chevron-down")}</button>` : ""}</div></section>`;
}
function postMarkup(post) {
  const own = post.author === state.profile.nickname; const following = state.following.includes(post.author);
  return `<article class="post-card" id="${post.id}">
    <div class="post-body post-header"><div class="author-line"><button class="author-button" data-action="view-author" data-author="${post.author}"><span class="avatar">${post.author.slice(0, 1)}</span><span><strong>${post.author}</strong><br><small>${post.school} · ${timeAgo(post.createdAt)}</small></span></button>${!own ? `<button class="tiny follow-icon ${following ? "active" : ""}" data-action="toggle-follow" data-author="${post.author}" aria-label="${following ? "팔로우 취소" : "팔로우"}">${icon(following ? "user-check" : "user-plus")}</button>` : ""}</div></div>
    ${mediaMarkup(post)}
    <div class="post-body"><div class="post-actions"><button class="tiny ${post.liked ? "liked" : ""}" data-action="like-post" data-id="${post.id}" aria-label="좋아요">${icon("heart")}<span>${post.likes}</span></button><button class="tiny" data-action="open-comments" data-id="${post.id}" aria-label="댓글">${icon("message-circle")}<span>${commentCount(post)}</span></button><button class="tiny" data-action="download-post" data-id="${post.id}" aria-label="다운로드">${icon("download")}</button><button class="tiny" data-action="save-post" data-id="${post.id}" aria-label="저장">${icon(post.saved ? "bookmark-check" : "bookmark")}</button>${!own ? `<label class="score-control"><select data-action="rate-post" data-id="${post.id}" aria-label="자료 평가"><option value="">평가</option>${Array.from({ length: 10 }, (_, i) => 10 - i).map((score) => `<option>${score}</option>`).join("")}</select><strong>${avg(post.ratingScores).toFixed(1)}</strong></label>` : ""}</div><h3>${post.title}</h3><p>${post.body}</p><div class="tag-row">${post.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div><div class="comments-preview">${post.comments[0] ? `<strong>${post.comments[0].author}</strong> ${post.comments[0].body}` : ""}</div></div>
  </article>`;
}
function mediaMarkup(post) {
  if (!post.media.length) return "";
  return `<div class="media-carousel" data-carousel="${post.id}" data-index="0" data-action="watch-post" data-id="${post.id}"><div class="media-track">${post.media.map((media) => `<div class="media-slide">${media.type === "image" ? `<img loading="lazy" src="${media.url}" alt="${media.name}" />` : media.type === "video" ? `<video controls preload="metadata" src="${media.url}"></video>` : `<div class="file-slide">${icon("file-text")}<h3>${media.name}</h3><a class="primary" href="${media.url}" download target="_blank">열기</a></div>`}</div>`).join("")}</div>${post.media.length > 1 ? `<div class="media-controls"><button class="icon-button" data-action="media-prev" data-id="${post.id}" aria-label="이전 미디어">${icon("chevron-left")}</button><button class="icon-button" data-action="media-next" data-id="${post.id}" aria-label="다음 미디어">${icon("chevron-right")}</button></div>` : ""}</div>`;
}
function commentCount(post) { return post.comments.reduce((sum, comment) => sum + 1 + comment.replies.length, 0); }
function moveCarousel(id, direction) {
  const carousel = $(`[data-carousel="${id}"]`); if (!carousel) return; const post = state.posts.find((item) => item.id === id); let index = Number(carousel.dataset.index) + direction; index = (index + post.media.length) % post.media.length; carousel.dataset.index = index; $(".media-track", carousel).style.transform = `translateX(-${index * 100}%)`;
}
function refreshPostCard(id) {
  const post = state.posts.find((item) => item.id === id); const card = document.getElementById(id);
  if (post && card) { card.outerHTML = postMarkup(post); lucide(); }
}
function showCollection(type) {
  const posts = type === "saved" ? state.posts.filter((post) => post.saved) : state.watchHistory.map((id) => state.posts.find((post) => post.id === id)).filter(Boolean);
  $("#collectionTitle").textContent = type === "saved" ? "저장한 목록" : "시청 기록";
  $("#collectionList").innerHTML = posts.length ? posts.map((post) => `<button class="collection-item" data-action="open-post" data-id="${post.id}"><span><strong>${post.title}</strong><br><small>${post.author} · ${post.school}</small></span>${icon("chevron-right")}</button>`).join("") : empty(type === "saved" ? "bookmark" : "history", "목록이 비어 있습니다.");
  dialogs.collection.showModal(); lucide();
}

function renderComments() {
  const post = state.posts.find((item) => item.id === state.activePost);
  $("#commentsList").innerHTML = post.comments.length ? post.comments.map((comment) => `<div class="comment"><div class="comment-head"><strong>${comment.author}</strong>${comment.authorLiked ? `<span class="author-liked">작성자 좋아요</span>` : ""}</div><p>${comment.body}</p><div class="toolbar"><button class="tiny" data-action="like-comment" data-comment="${comment.id}">${icon("heart")}${comment.likes}</button><button class="tiny" data-action="reply-comment" data-comment="${comment.id}" data-user="${comment.author}">답글</button></div>${comment.replies.map((reply) => `<div class="comment reply"><div class="comment-head"><strong>${reply.author}</strong>${reply.authorLiked ? `<span class="author-liked">작성자 좋아요</span>` : ""}</div><p>${reply.body}</p><div class="toolbar"><button class="tiny" data-action="like-reply" data-comment="${comment.id}" data-reply="${reply.id}">${icon("heart")}${reply.likes}</button><button class="tiny" data-action="reply-comment" data-comment="${comment.id}" data-user="${reply.author}">답글</button></div></div>`).join("")}</div>`).join("") : empty("message-circle", "첫 댓글을 남겨보세요.");
  lucide();
}

function renderProfile(author = state.profile.nickname) {
  const own = author === state.profile.nickname; const uploaded = state.posts.filter((post) => post.author === author); const user = getUserProfile(author); state.viewedProfile = author;
  $("#app").innerHTML = `<section class="profile-page"><div class="profile-tools">${own ? `<button class="icon-button" data-action="open-settings" aria-label="설정">${icon("settings")}</button>` : `<div class="toolbar"><button class="icon-button follow-icon ${state.following.includes(author) ? "active" : ""}" data-action="toggle-follow" data-author="${author}" aria-label="팔로우">${icon(state.following.includes(author) ? "user-check" : "user-plus")}</button><button class="icon-button" data-action="dm-author" data-author="${author}" aria-label="메시지">${icon("send")}</button></div>`}</div>
    <div class="profile-main">${user.avatar ? `<img class="avatar profile-avatar" src="${user.avatar}" alt="${author}" />` : `<span class="avatar profile-avatar">${author.slice(0, 1)}</span>`}<h1>${author}</h1><strong>${user.school} · ${user.grade} ${user.className}</strong><small>${user.role}${user.position ? ` · ${user.position}` : ""}</small>
      <div class="stat-row"><div class="stat"><strong>${uploaded.length}</strong><small>자료 수</small></div><div class="stat"><strong>${profileScore(author)}</strong><small>자료 평판 / 10</small></div></div>
    </div>
    <div class="highlights">${own && user.highlights.length < 20 ? `<label class="highlight highlight-add" aria-label="하이라이트 추가">${icon("plus")}<input id="highlightFilesCircle" class="hidden-file" type="file" accept="image/*" multiple /></label>` : ""}${user.highlights.map((group, index) => `<button class="highlight" data-action="view-highlight" data-author="${author}" data-index="${index}"><img src="${group.images[0]}" alt="${group.title}" /></button>`).join("")}</div>
    <div class="post-list">${uploaded.map(postMarkup).join("") || empty("upload-cloud", "업로드한 자료가 없습니다.")}</div></section>`;
}

function openDm(author) {
  track("dm_opened", { source: author ? "profile" : "launcher" });
  if (author && !state.conversations.some((item) => item.user === author)) state.conversations.unshift({ user: author, school: "AirBoard", online: true, unread: 0, typing: false, messages: [] });
  state.activeConversation = author || null;
  state.dmOpen = true; renderDm();
}
function renderDm() {
  const conversation = state.conversations.find((item) => item.user === state.activeConversation);
  const showConversation = state.dmTab === "messages" && Boolean(conversation);
  let overlay = $(".dm-overlay"); let shell = overlay?.querySelector(".dm-shell");
  if (!overlay) {
    overlay = document.createElement("div"); overlay.className = "dm-overlay";
    shell = document.createElement("div"); shell.className = "dm-shell";
    overlay.append(shell); document.body.append(overlay);
  }
  shell.innerHTML = `<aside class="dm-sidebar ${showConversation ? "chat-open" : ""}"><div class="dm-head"><strong>메시지</strong><button class="icon-button" data-action="close-dm" aria-label="닫기">${icon("x")}</button></div><div class="dm-tabs"><button class="tiny dm-tab ${state.dmTab === "messages" ? "active" : ""}" data-action="dm-tab" data-tab="messages">대화</button><button class="tiny dm-tab ${state.dmTab === "requests" ? "active" : ""}" data-action="dm-tab" data-tab="requests">친구 요청</button></div><div class="conversation-list">${state.dmTab === "messages" ? state.conversations.map(conversationMarkup).join("") : requestMarkup()}</div></aside>${showConversation ? chatMarkup(conversation) : `<section class="chat-pane open">${empty("send", "대화를 선택하세요.")}</section>`}`;
  lucide(); setTimeout(() => { const box = $(".chat-messages"); if (box) box.scrollTop = box.scrollHeight; }, 0); updateChrome();
}
function conversationMarkup(item) {
  const last = item.messages.at(-1); return `<button class="conversation-row ${item.user === state.activeConversation ? "active" : ""} ${item.unread ? "has-unread" : ""}" data-action="open-conversation" data-user="${item.user}"><span class="avatar">${item.user.slice(0, 1)}</span><span class="conversation-copy"><strong>${item.user} <i class="status-dot ${item.online ? "online" : ""}"></i></strong><small>${last?.type === "text" ? last.content : last ? "첨부 파일" : "새 대화"}</small></span><span><small>${last?.time || ""}</small>${item.unread ? `<span class="unread">${unreadLabel(item.unread)}</span>` : ""}</span></button>`;
}
function requestMarkup() {
  return state.requests.length ? state.requests.map((item, index) => `<div class="conversation-row"><span class="avatar">${item.user.slice(0, 1)}</span><span class="conversation-copy"><strong>${item.user}</strong><small>${item.school}</small></span><div class="toolbar"><button class="tiny" data-action="accept-request" data-index="${index}">${icon("check")}</button><button class="tiny" data-action="decline-request" data-index="${index}">${icon("x")}</button></div></div>`).join("") : empty("user-check", "새 친구 요청이 없습니다.");
}
function chatMarkup(item) {
  return `<section class="chat-pane open"><div class="dm-head"><button class="icon-button mobile-back" data-action="dm-back" aria-label="대화 목록">${icon("chevron-left")}</button><span class="avatar">${item.user.slice(0, 1)}</span><span><strong>${item.user}</strong><br><small>${item.online ? "온라인" : "오프라인"}</small></span><div class="toolbar" style="margin-left:auto"><div class="menu-wrap"><button class="icon-button" data-action="toggle-chat-menu" aria-label="더보기">${icon("more-horizontal")}</button><div class="chat-menu"><button class="menu-button" data-action="mark-unread">읽지 않음으로 표시</button><button class="menu-button" data-action="block-user">차단</button><button class="menu-button" data-action="report-user">신고</button></div></div><button class="icon-button" data-action="close-dm" aria-label="메시지 닫기">${icon("x")}</button></div></div>
    <div class="chat-messages">${item.messages.map(messageMarkup).join("")}</div><div class="typing">${item.typing ? `${item.user}님이 입력 중...` : ""}</div>
    <form id="chatForm" class="chat-compose"><label class="tiny" aria-label="파일 첨부">${icon("paperclip")}<input id="chatFile" class="hidden-file" type="file" /></label><input id="chatInput" placeholder="메시지 입력" autocomplete="off" /><button class="primary" aria-label="전송">${icon("send")}</button></form></section>`;
}
function messageMarkup(message) {
  const content = message.type === "text" ? message.content : message.type === "image" ? `<img src="${message.content}" alt="${message.name || "사진"}" />` : message.type === "video" ? `<video src="${message.content}" controls></video>` : `<a href="${message.content}" download="${message.name}" class="tiny">${icon("file")} ${message.name}</a>`;
  return `<div class="bubble ${message.from === "me" ? "me" : ""}">${content}<div class="message-meta">${message.time} · ${message.from === "me" ? (message.read ? "읽음" : "전송됨") : ""}</div></div>`;
}
function refreshConversationRow(item) {
  const row = $$(".conversation-row").find((node) => node.dataset.user === item.user);
  if (row) row.outerHTML = conversationMarkup(item);
  else $(".conversation-list")?.insertAdjacentHTML("afterbegin", conversationMarkup(item));
  lucide();
}
function appendOpenMessage(item, message) {
  if (!state.dmOpen || state.dmTab !== "messages" || state.activeConversation !== item.user) return false;
  const messages = $(".chat-messages"); if (!messages) return false;
  messages.insertAdjacentHTML("beforeend", messageMarkup(message)); messages.scrollTop = messages.scrollHeight; lucide(); return true;
}
function sendMessage(type, content, name = "") {
  const item = state.conversations.find((entry) => entry.user === state.activeConversation); if (!item) return;
  const time = new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
  const message = { id: crypto.randomUUID(), from: "me", type, content, name, time, read: true };
  item.messages.push(message); realtime?.postMessage({ kind: "message", conversation: item.user, message }); saveAll();
  appendOpenMessage(item, message); refreshConversationRow(item); $("#chatInput")?.focus();
}
function startOauth(provider) {
  const config = oauthConfig[provider]; const authBaseUrl = String(runtimeConfig.authBaseUrl || "").replace(/\/$/, "");
  if (!config || !authBaseUrl) return toast("소셜 로그인 서버 설정이 필요합니다.");
  const oauthState = crypto.randomUUID(); const redirectUri = runtimeConfig.authRedirectUri || `${location.origin}${location.pathname}`;
  sessionStorage.setItem("airboard:oauthState", oauthState); sessionStorage.setItem("airboard:oauthReturnView", state.view);
  const params = new URLSearchParams({ redirect_uri: redirectUri, state: oauthState });
  window.location.href = `${authBaseUrl}/oauth/${config.slug}/start?${params}`;
}
async function handleOauthCallback() {
  const params = new URLSearchParams(location.search); const ticket = params.get("oauth_ticket"); const error = params.get("oauth_error");
  if (!ticket && !error) return;
  const cleanUrl = new URL(location.href); ["oauth_ticket", "oauth_error", "state"].forEach((key) => cleanUrl.searchParams.delete(key));
  history.replaceState({}, "", `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);
  if (error) { setFormError("#loginError", decodeURIComponent(error)); dialogs.login.showModal(); return; }
  const expectedState = sessionStorage.getItem("airboard:oauthState"); const returnedState = params.get("state");
  if (!expectedState || expectedState !== returnedState) { setFormError("#loginError", "로그인 요청을 확인할 수 없습니다. 다시 시도해주세요."); dialogs.login.showModal(); return; }
  const authBaseUrl = String(runtimeConfig.authBaseUrl || "").replace(/\/$/, "");
  try {
    const response = await fetch(`${authBaseUrl}/oauth/session?ticket=${encodeURIComponent(ticket)}`, { credentials: "include", headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("소셜 로그인 세션을 확인하지 못했습니다.");
    const payload = await response.json(); const user = payload.user || payload;
    if (!validEmail(user.email) || !user.provider || !user.subject) throw new Error("소셜 계정 정보가 올바르지 않습니다.");
    let account = state.accounts.find((item) => item.provider === user.provider && item.providerSubject === user.subject) || state.accounts.find((item) => item.email.toLowerCase() === user.email.toLowerCase());
    if (!account) {
      account = { email: user.email, nickname: user.name || user.email.split("@")[0], verified: true, provider: user.provider, providerSubject: user.subject };
      state.accounts.push(account);
      state.profile = { ...state.profile, nickname: account.nickname, avatar: user.avatar || state.profile.avatar };
    } else {
      account.provider = account.provider || user.provider; account.providerSubject = account.providerSubject || user.subject;
    }
    state.session = { email: account.email, provider: user.provider }; state.view = sessionStorage.getItem("airboard:oauthReturnView") || "home";
    sessionStorage.removeItem("airboard:oauthState"); sessionStorage.removeItem("airboard:oauthReturnView"); saveAll(); toast(`${account.nickname}님, 환영합니다.`);
  } catch (oauthError) {
    setFormError("#loginError", oauthError.message || "소셜 로그인에 실패했습니다."); dialogs.login.showModal();
  }
}
function requireAuthenticated() {
  if (state.session?.email) return true;
  dialogs.login.showModal(); toast("로그인이 필요합니다."); return false;
}
function endRemoteSession() {
  const authBaseUrl = String(runtimeConfig.authBaseUrl || "").replace(/\/$/, "");
  if (authBaseUrl) fetch(`${authBaseUrl}/oauth/logout`, { method: "POST", credentials: "include", keepalive: true }).catch(() => {});
}

function openProfileEdit() {
  const form = $("#profileEditForm"); ["nickname", "bio", "school", "grade", "className", "role", "position"].forEach((name) => { form.elements[name].value = state.profile[name] || ""; }); dialogs.profileEdit.showModal();
}
async function handleHighlights(files) {
  const urls = await Promise.all([...files].slice(0, 20 - state.profile.highlights.length).map(fileToDataUrl));
  if (urls.length) state.profile.highlights.push({ id: crypto.randomUUID(), title: `하이라이트 ${state.profile.highlights.length + 1}`, images: urls });
  saveAll(); renderProfile();
}
function openWikiEdit() {
  const school = state.schools.find((item) => item.id === state.selectedSchool); const form = $("#wikiEditForm");
  form.elements.description.value = school.wiki.description; form.elements.trivia.value = school.wiki.trivia; form.elements.extra.value = school.wiki.extra; form.elements.summary.value = ""; dialogs.wikiEdit.showModal();
}
function showHistory() {
  const school = state.schools.find((item) => item.id === state.selectedSchool);
  $("#historyList").innerHTML = school.revisions.length ? [...school.revisions].reverse().map((revision, index) => `<button class="history-item" data-action="view-revision" data-index="${school.revisions.length - 1 - index}"><strong>${revision.time}</strong></button>`).join("") : empty("history", "수정 기록이 없습니다.");
  dialogs.history.showModal(); lucide();
}
function showRevision(index) {
  const school = state.schools.find((item) => item.id === state.selectedSchool); const revision = school.revisions[index]; if (!revision) return;
  $("#revisionTitle").textContent = revision.time; $("#revisionDocument").innerHTML = `<div class="wiki-section"><strong>학교 설명</strong><p>${revision.wiki.description}</p></div><div class="wiki-section"><strong>여담</strong><p>${revision.wiki.trivia}</p></div><div class="wiki-section"><strong>기타 정보</strong><p>${revision.wiki.extra}</p></div><button class="primary wide" data-action="restore-wiki" data-index="${index}">${icon("rotate-ccw")}이 버전 복구</button>`;
  dialogs.revision.showModal(); lucide();
}
function showHighlight(author, groupIndex, imageIndex = 0) {
  const groups = getUserProfile(author).highlights || []; const group = groups[groupIndex]; if (!group) return;
  state.activeHighlight = { author, group: groupIndex, image: (imageIndex + group.images.length) % group.images.length };
  $("#highlightImage").src = group.images[state.activeHighlight.image]; dialogs.highlight.showModal(); lucide();
}
function setFormError(id, message) { const node = $(id); node.textContent = message; node.classList.remove("state-pop"); if (message) requestAnimationFrame(() => node.classList.add("state-pop")); }
function validEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

document.addEventListener("click", (event) => {
  if (event.target.matches("dialog[open]")) {
    event.target.close();
    return;
  }
  if (event.target.classList.contains("dm-overlay")) {
    state.dmOpen = false;
    event.target.remove();
    return;
  }
  const target = event.target.closest("[data-action]"); if (!target) return; const action = target.dataset.action;
  if (action === "go") return navigate(target.dataset.view);
  if (action === "open-command") return openCommand();
  if (action === "run-command") return runCommand(target.dataset.command);
  if (action === "close-command") return dialogs.command.close();
  if (action === "retry") return render();
  if (action === "open-schedule") return dialogs.schedule.showModal();
  if (action === "close-schedule") return dialogs.schedule.close();
  if (action === "delete-schedule") { state.schedules = state.schedules.filter((item) => item.id !== target.dataset.id); saveAll(); return render(); }
  if (action === "prev-month" || action === "next-month") { state.calendarDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() + (action === "next-month" ? 1 : -1), 1); return renderHome(); }
  if (action === "open-login") { if (state.session?.email) { state.view = "profile"; return render(); } return dialogs.login.showModal(); }
  if (action === "close-login") return dialogs.login.close();
  if (action === "close-signup") return dialogs.signup.close();
  if (action === "close-upload") return dialogs.upload.close();
  if (action === "close-profile-edit") return dialogs.profileEdit.close();
  if (action === "close-wiki-edit") return dialogs.wikiEdit.close();
  if (action === "toggle-password") { const input = target.closest(".password-field")?.querySelector("input"); if (input) input.type = input.type === "password" ? "text" : "password"; return; }
  if (action === "send-verification") {
    const email = $("#signupForm").elements.email.value.trim(); if (!validEmail(email)) return setFormError("#signupError", "이메일 형식이 올바르지 않습니다.");
    state.verification = { email, code: String(Math.floor(100000 + Math.random() * 900000)), verified: false }; setFormError("#signupError", ""); return toast(`인증 코드: ${state.verification.code}`);
  }
  if (action === "verify-email") {
    const form = $("#signupForm"); const email = form.elements.email.value.trim(); const code = form.elements.verificationCode.value.trim();
    state.verification.verified = email === state.verification.email && code === state.verification.code; setFormError("#signupError", state.verification.verified ? "" : "인증 코드가 일치하지 않습니다."); return toast(state.verification.verified ? "이메일 인증이 완료되었습니다." : "인증에 실패했습니다.");
  }
  if (action === "switch-signup") { dialogs.login.close(); return dialogs.signup.showModal(); }
  if (action === "switch-login") { dialogs.signup.close(); return dialogs.login.showModal(); }
  if (action === "oauth") return startOauth(target.dataset.provider);
  if (action === "open-upload") { if (!requireAuthenticated()) return; return dialogs.upload.showModal(); }
  if (action === "filter-tag") {
    const tag = target.dataset.tag;
    state.feedTags = state.feedTags.includes(tag) ? state.feedTags.filter((item) => item !== tag) : [...state.feedTags, tag];
    state.feedLimit = 6;
    return renderFeed();
  }
  if (action === "clear-tags") { state.feedTags = []; state.feedLimit = 6; return renderFeed(); }
  if (action === "more-feed") { state.feedLimit += 6; return renderFeed(); }
  if (action === "like-post") { const post = state.posts.find((item) => item.id === target.dataset.id); post.liked = !post.liked; post.likes += post.liked ? 1 : -1; saveAll(); return refreshPostCard(post.id); }
  if (action === "save-post") { const post = state.posts.find((item) => item.id === target.dataset.id); post.saved = !post.saved; saveAll(); return refreshPostCard(post.id); }
  if (action === "download-post") { const post = state.posts.find((item) => item.id === target.dataset.id); post.media.forEach((media) => { const a = document.createElement("a"); a.href = media.url; a.download = media.name; a.target = "_blank"; a.click(); }); return toast("다운로드를 시작했습니다."); }
  if (action === "media-prev" || action === "media-next") return moveCarousel(target.dataset.id, action === "media-next" ? 1 : -1);
  if (action === "watch-post") { if (!state.watchHistory.includes(target.dataset.id)) state.watchHistory.unshift(target.dataset.id); state.watchHistory = state.watchHistory.slice(0, 100); saveAll(); return; }
  if (action === "open-comments") { state.activePost = target.dataset.id; state.replyTarget = null; renderComments(); return dialogs.comments.showModal(); }
  if (action === "close-comments") return dialogs.comments.close();
  if (action === "reply-comment") { state.replyTarget = { comment: target.dataset.comment, user: target.dataset.user }; $("#commentInput").value = `@${target.dataset.user} `; return $("#commentInput").focus(); }
  if (action === "like-comment") { const post = state.posts.find((item) => item.id === state.activePost); const comment = post.comments.find((item) => item.id === target.dataset.comment); comment.liked = !comment.liked; comment.likes += comment.liked ? 1 : -1; saveAll(); return renderComments(); }
  if (action === "like-reply") { const post = state.posts.find((item) => item.id === state.activePost); const comment = post.comments.find((item) => item.id === target.dataset.comment); const reply = comment.replies.find((item) => item.id === target.dataset.reply); reply.liked = !reply.liked; reply.likes += reply.liked ? 1 : -1; saveAll(); return renderComments(); }
  if (action === "view-author") { state.view = "profile"; updateChrome(); return renderProfile(target.dataset.author); }
  if (action === "toggle-follow") { const author = target.dataset.author; state.following = state.following.includes(author) ? state.following.filter((item) => item !== author) : [...state.following, author]; saveAll(); return state.view === "profile" ? renderProfile(author) : refreshPostCard(target.closest(".post-card")?.id); }
  if (action === "dm-author") return openDm(target.dataset.author);
  if (action === "open-post") { dialogs.collection.open && dialogs.collection.close(); state.view = "feed"; state.feedQuery = ""; state.feedTags = []; updateChrome(); renderFeed(); setTimeout(() => document.getElementById(target.dataset.id)?.scrollIntoView({ behavior: "smooth" }), 0); return; }
  if (action === "edit-profile") { dialogs.settings.open && dialogs.settings.close(); return openProfileEdit(); }
  if (action === "open-settings") { if (!requireAuthenticated()) return; $("#themeLabel").textContent = state.theme === "dark" ? "다크" : "라이트"; return dialogs.settings.showModal(); }
  if (action === "close-settings") return dialogs.settings.close();
  if (action === "open-saved") { dialogs.settings.open && dialogs.settings.close(); return showCollection("saved"); }
  if (action === "open-watch-history") { dialogs.settings.open && dialogs.settings.close(); return showCollection("history"); }
  if (action === "close-collection") return dialogs.collection.close();
  if (action === "toggle-theme") { state.theme = state.theme === "dark" ? "light" : "dark"; saveAll(); updateChrome(); $("#themeLabel").textContent = state.theme === "dark" ? "다크" : "라이트"; return; }
  if (action === "language-setting") return toast("현재 언어: 한국어");
  if (action === "logout") { endRemoteSession(); state.session = null; state.view = "home"; saveAll(); dialogs.settings.close(); render(); return toast("로그아웃되었습니다."); }
  if (action === "delete-account") { if (!confirm("계정을 삭제하시겠습니까?")) return; state.accounts = state.accounts.filter((account) => account.email !== state.session?.email); state.session = null; state.view = "home"; saveAll(); dialogs.settings.close(); render(); return toast("회원 탈퇴가 완료되었습니다."); }
  if (action === "view-highlight") return showHighlight(target.dataset.author, Number(target.dataset.index));
  if (action === "highlight-prev" || action === "highlight-next") return showHighlight(state.activeHighlight.author, state.activeHighlight.group, state.activeHighlight.image + (action === "highlight-next" ? 1 : -1));
  if (action === "close-highlight") return dialogs.highlight.close();
  if (action === "edit-wiki") { if (!requireAuthenticated()) return; return openWikiEdit(); }
  if (action === "wiki-history") return showHistory();
  if (action === "close-history") return dialogs.history.close();
  if (action === "view-revision") return showRevision(Number(target.dataset.index));
  if (action === "close-revision") return dialogs.revision.close();
  if (action === "restore-wiki") { const school = state.schools.find((item) => item.id === state.selectedSchool); const revision = school.revisions[Number(target.dataset.index)]; school.revisions.push({ time: new Date().toLocaleString("ko-KR"), summary: "이전 버전 복구", wiki: clone(school.wiki) }); school.wiki = clone(revision.wiki); saveAll(); dialogs.history.close(); dialogs.revision.close(); return selectSchool(school.id); }
  if (action === "more-school-posts") { state.schoolPostLimit += 3; return selectSchool(state.selectedSchool); }
  if (action === "map-school-filter") {
    state.mapSchoolType = target.dataset.type;
    state.selectedSchool = null;
    state.mapDetailOpen = false;
    persist("mapSchoolType", state.mapSchoolType);
    return renderMap();
  }
  if (action === "clear-map-search") { state.mapQuery = ""; state.selectedSchool = null; state.mapDetailOpen = false; return renderMap(); }
  if (action === "close-school-detail") { state.mapDetailOpen = false; return $(".school-detail")?.remove(); }
  if (action === "select-map-school") { selectSchool(target.dataset.id); $$(".map-school-row").forEach((row) => row.classList.toggle("selected", row.dataset.id === target.dataset.id)); return; }
  if (action === "view-school") { state.map?.closePopup(); return selectSchool(target.dataset.id); }
  if (action === "open-dm") return openDm();
  if (action === "close-dm") { state.dmOpen = false; $(".dm-overlay")?.remove(); return; }
  if (action === "dm-tab") { state.dmTab = target.dataset.tab; if (state.dmTab !== "messages") state.activeConversation = null; return renderDm(); }
  if (action === "open-conversation") { state.dmTab = "messages"; state.activeConversation = target.dataset.user; markConversationRead(state.conversations.find((item) => item.user === state.activeConversation)); return renderDm(); }
  if (action === "dm-back") { state.activeConversation = null; return renderDm(); }
  if (action === "toggle-chat-menu") return $(".chat-menu")?.classList.toggle("open");
  if (action === "mark-unread") {
    const conversation = state.conversations.find((item) => item.user === state.activeConversation); if (!conversation) return;
    conversation.unread = Math.max(1, Number(conversation.lastUnreadCount) || 1); saveAll(); updateChrome(); refreshConversationRow(conversation); $(".chat-menu")?.classList.remove("open"); return toast("읽지 않음으로 표시했습니다.");
  }
  if (action === "block-user" || action === "report-user") return toast(action === "block-user" ? "사용자를 차단했습니다." : "신고가 접수되었습니다.");
  if (action === "accept-request" || action === "decline-request") { const index = Number(target.dataset.index); const request = state.requests[index]; if (action === "accept-request") state.conversations.unshift({ user: request.user, school: request.school, online: false, unread: 0, typing: false, messages: [] }); state.requests.splice(index, 1); saveAll(); return renderDm(); }
});

document.addEventListener("change", async (event) => {
  const target = event.target;
  if (target.matches('[data-action="change-year"]')) { state.calendarDate = new Date(Number(target.value), state.calendarDate.getMonth(), 1); return renderHome(); }
  if (target.matches('[data-action="rate-post"]')) { const post = state.posts.find((item) => item.id === target.dataset.id); post.ratingScores.push(Number(target.value)); saveAll(); toast("자료 평가가 반영되었습니다."); return refreshPostCard(post.id); }
  if (target.id === "postFiles") return previewUpload(target.files);
  if (target.id === "chatFile") { const file = target.files[0]; if (!file) return; const type = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "file"; return sendMessage(type, await fileToDataUrl(file), file.name); }
  if (target.matches('#profileEditForm [name="avatar"]')) { const file = target.files[0]; if (file) state.pendingAvatar = await fileToDataUrl(file); return; }
  if (target.id === "highlightFiles" || target.id === "highlightFilesCircle") return handleHighlights(target.files);
});

document.addEventListener("input", (event) => {
  if (event.target.id === "feedSearch") { state.feedQuery = event.target.value; clearTimeout(window.feedSearchTimer); window.feedSearchTimer = setTimeout(() => { renderFeed(); const input = $("#feedSearch"); input?.focus(); input?.setSelectionRange(input.value.length, input.value.length); }, 120); return; }
  if (event.target.id === "mapSearch") {
    state.mapQuery = event.target.value;
    clearTimeout(window.mapSearchTimer);
    window.mapSearchTimer = setTimeout(() => {
      const first = filteredMapSchools()[0];
      if (first) state.mapView = { center: [first.lat, first.lng], zoom: Math.max(14, state.mapView.zoom || 7) };
      state.selectedSchool = null; state.mapDetailOpen = false; renderMap();
      const input = $("#mapSearch"); input?.focus(); input?.setSelectionRange(input.value.length, input.value.length);
    }, 120);
    return;
  }
  if (event.target.id === "schoolAutocomplete") { clearTimeout(window.schoolTimer); window.schoolTimer = setTimeout(() => searchSchools(event.target.value), 120); }
  if (event.target.id === "commandSearch") {
    const query = event.target.value.trim().toLowerCase();
    $$(".command-item").forEach((item) => item.hidden = Boolean(query) && !item.textContent.toLowerCase().includes(query));
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); return dialogs.command.open ? dialogs.command.close() : openCommand(); }
  if (!dialogs.command.open || ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) return;
  const shortcuts = { n: "schedule", p: "post", m: "messages" };
  if (shortcuts[event.key.toLowerCase()]) { event.preventDefault(); runCommand(shortcuts[event.key.toLowerCase()]); }
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.id === "scheduleForm") {
    const data = Object.fromEntries(new FormData(event.target)); if (!data.title || !data.date || !data.start || !data.end) return toast("일정 제목, 날짜, 시작 시간, 종료 시간을 입력해주세요."); if (data.end <= data.start) return toast("종료 시간은 시작 시간보다 늦어야 합니다.");
    state.schedules.push({ id: crypto.randomUUID(), ...data }); saveAll(); dialogs.schedule.close(); event.target.reset(); return renderHome();
  }
  if (event.target.id === "loginForm") {
    const data = Object.fromEntries(new FormData(event.target)); if (!data.email || !data.password) return setFormError("#loginError", "이메일과 비밀번호를 입력해주세요."); if (!validEmail(data.email)) return setFormError("#loginError", "이메일 형식이 올바르지 않습니다."); const account = state.accounts.find((item) => item.email.toLowerCase() === data.email.trim().toLowerCase());
    if (!account) return setFormError("#loginError", "존재하지 않는 계정입니다.");
    if (account.password !== data.password) return setFormError("#loginError", "비밀번호가 일치하지 않습니다.");
    state.session = { email: account.email }; setFormError("#loginError", ""); saveAll(); dialogs.login.close(); updateChrome(); return toast("로그인되었습니다.");
  }
  if (event.target.id === "signupForm") {
    const data = Object.fromEntries(new FormData(event.target)); const required = ["email", "password", "confirm", "nickname", "school", "grade", "className", "role", "position"];
    if (required.some((key) => !String(data[key] || "").trim())) return setFormError("#signupError", "필수 항목이 비어 있습니다. 반, 역할, 직책을 모두 입력해주세요.");
    if (!validEmail(data.email)) return setFormError("#signupError", "이메일 형식이 올바르지 않습니다.");
    if (data.password !== data.confirm) return setFormError("#signupError", "비밀번호 확인이 일치하지 않습니다.");
    if (data.password.length < 8) return setFormError("#signupError", "비밀번호는 8자 이상이어야 합니다.");
    if (!state.verification.verified || state.verification.email !== data.email) return setFormError("#signupError", "이메일 인증을 완료해주세요.");
    if (state.accounts.some((item) => item.email.toLowerCase() === data.email.toLowerCase())) return setFormError("#signupError", "이미 가입된 이메일입니다.");
    state.accounts.push({ email: data.email, password: data.password, nickname: data.nickname, verified: true }); state.session = { email: data.email };
    state.profile = { ...state.profile, ...data, avatar: state.profile.avatar || "", highlights: state.profile.highlights || [] }; setFormError("#signupError", ""); saveAll(); dialogs.signup.close(); updateChrome(); return toast("가입되었습니다.");
  }
  if (event.target.id === "uploadForm") return createPost(event.target);
  if (event.target.id === "commentForm") return createComment(event.target);
  if (event.target.id === "profileEditForm") { const data = Object.fromEntries(new FormData(event.target)); delete data.avatar; state.profile = { ...state.profile, ...data, avatar: state.pendingAvatar || state.profile.avatar }; state.pendingAvatar = null; saveAll(); dialogs.profileEdit.close(); return renderProfile(); }
  if (event.target.id === "wikiEditForm") return saveWiki(event.target);
  if (event.target.id === "chatForm") { const input = $("#chatInput"); if (!input.value.trim()) return; sendMessage("text", input.value.trim()); input.value = ""; }
});

let stagedMedia = [];
function fileToDataUrl(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); }); }
async function previewUpload(files) {
  stagedMedia = await Promise.all([...files].map(async (file) => ({ type: file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : file.type === "application/pdf" ? "pdf" : "file", url: await fileToDataUrl(file), name: file.name })));
  $("#uploadPreview").innerHTML = stagedMedia.map((media) => media.type === "image" ? `<img src="${media.url}" alt="${media.name}" />` : media.type === "video" ? `<video src="${media.url}"></video>` : `<span class="tiny">${icon("file")}${media.name}</span>`).join(""); lucide();
}
function createPost(form) {
  const data = Object.fromEntries(new FormData(form)); const id = crypto.randomUUID();
  state.posts.unshift({ id, author: state.profile.nickname, school: state.profile.school, followed: true, createdAt: Date.now(), title: data.title, body: data.body, tags: data.tags.split(/\s+/).filter(Boolean), media: stagedMedia, likes: 0, liked: false, saved: false, ratingScores: [], comments: [] });
  state.justUploaded = id; state.feedOrder = [id, ...state.feedOrder.filter((item) => item !== id)];
  saveAll(); stagedMedia = []; form.reset(); $("#uploadPreview").innerHTML = ""; dialogs.upload.close(); state.view = "feed"; updateChrome(); renderFeed(); toast("게시글과 자료가 저장되었습니다.");
}
function createComment(form) {
  const post = state.posts.find((item) => item.id === state.activePost); const body = $("#commentInput").value.trim(); if (!body) return;
  const entry = { id: crypto.randomUUID(), author: state.profile.nickname, body, likes: 0, liked: false, authorLiked: state.profile.nickname === post.author, replies: [] };
  if (state.replyTarget) post.comments.find((item) => item.id === state.replyTarget.comment).replies.push({ ...entry, replies: undefined }); else post.comments.push(entry);
  state.replyTarget = null; form.reset(); saveAll(); renderComments();
}
function saveWiki(form) {
  const school = state.schools.find((item) => item.id === state.selectedSchool); const data = Object.fromEntries(new FormData(form));
  school.revisions.push({ time: new Date().toLocaleString("ko-KR"), summary: data.summary, wiki: clone(school.wiki) }); school.wiki = { description: data.description, trivia: data.trivia, extra: data.extra }; saveAll(); dialogs.wikiEdit.close(); renderMap(); toast("학교 문서가 저장되었습니다.");
}
async function searchSchools(query) {
  const box = $("#schoolSuggestions"); const q = query.trim().toLowerCase().replace(/\s+/g, ""); if (!q) return box.classList.remove("open");
  const localMatches = state.schools.filter((school) => school.name.toLowerCase().replace(/\s+/g, "").includes(q)).map((school) => school.name);
  let names = [...localMatches];
  try {
    const response = await fetch(`https://open.neis.go.kr/hub/schoolInfo?Type=json&pIndex=1&pSize=1000&SCHUL_NM=${encodeURIComponent(query.trim())}`);
    const rows = (await response.json()).schoolInfo?.[1]?.row || [];
    names.push(...rows.filter((row) => ["중학교", "고등학교"].includes(row.SCHUL_KND_SC_NM) && row.SCHUL_NM.replace(/\s+/g, "").toLowerCase().includes(q)).map((row) => row.SCHUL_NM));
  } catch {}
  names = [...new Set(names)].slice(0, 12); box.innerHTML = names.length ? names.map((name) => `<button type="button" class="suggestion" data-school="${name}">${name}</button>`).join("") : `<div class="suggestion">검색 결과가 없습니다.</div>`; box.classList.add("open");
}
$("#schoolSuggestions")?.addEventListener("click", (event) => { const button = event.target.closest("[data-school]"); if (!button) return; $("#schoolAutocomplete").value = button.dataset.school; $("#schoolSuggestions").classList.remove("open"); });

function normalizeOfficialSchool(row) {
  const lat = Number(row.latitude || row.LATITUDE); const lng = Number(row.longitude || row.LONGITUDE);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const name = row.schoolNm || row.SCHOOL_NM || row.학교명;
  const type = row.schoolSe || row.SCHOOL_SE || row.학교급구분;
  const address = row.rdnmadr || row.RDNMADR || row.lnmadr || row.LNMADR || "";
  if (!name || !type || !/(초등학교|중학교|고등학교)/.test(type)) return null;
  return {
    id: `official-${row.schoolId || name}-${lat}-${lng}`.replace(/\s+/g, "-"),
    name,
    type,
    location: address.split(/\s+/).slice(0, 3).join(" ") || address,
    address,
    lat,
    lng,
    members: 0,
    rating: 0,
    wiki: { description: `${name} 학교 정보입니다.`, trivia: "학생 리뷰와 학교 게시물을 모아볼 수 있습니다.", extra: "공식 학교 위치 데이터를 기준으로 표시됩니다." },
    revisions: []
  };
}
async function loadNationalSchools() {
  const key = runtimeConfig.schoolLocationServiceKey || "";
  if (!key) return;
  state.schoolDataStatus = "loading";
  try {
    const base = runtimeConfig.schoolLocationApiUrl || "https://api.data.go.kr/openapi/tn_pubr_public_elesch_mskul_lc_api";
    const numOfRows = Number(runtimeConfig.schoolLocationPageSize || 5000);
    const firstUrl = `${base}?serviceKey=${encodeURIComponent(key)}&pageNo=1&numOfRows=${numOfRows}&type=json`;
    const first = await (await fetch(firstUrl)).json();
    const body = first.response?.body || {};
    const total = Number(body.totalCount || 0);
    const collect = (json) => {
      const item = json.response?.body?.items?.item || json.response?.body?.items || [];
      return (Array.isArray(item) ? item : [item]).map(normalizeOfficialSchool).filter(Boolean);
    };
    let schools = collect(first);
    const pages = Math.min(8, Math.ceil(total / numOfRows));
    for (let pageNo = 2; pageNo <= pages; pageNo++) {
      const json = await (await fetch(`${base}?serviceKey=${encodeURIComponent(key)}&pageNo=${pageNo}&numOfRows=${numOfRows}&type=json`)).json();
      schools.push(...collect(json));
    }
    if (schools.length) {
      const byId = new Map(state.schools.map((school) => [school.id, school]));
      schools.forEach((school) => byId.set(school.id, { ...school, ...(byId.get(school.id) || {}) }));
      state.schools = [...byId.values()];
      state.schoolDataStatus = "official";
    } else state.schoolDataStatus = "sample";
  } catch (error) {
    console.warn("Failed to load national school locations", error);
    state.schoolDataStatus = "sample";
  }
}

window.addEventListener("load", async () => { openAirDb(); populateTimeSelects(); await handleOauthCallback(); render(); setTimeout(() => $("#loading").classList.add("done"), 350); await loadNationalSchools(); if (state.view === "map") renderMap(); });
window.addEventListener("scroll", () => {
  if (state.view !== "feed" || innerHeight + scrollY < document.documentElement.scrollHeight - 240) return;
  const available = orderedPosts().length; if (state.feedLimit >= available) return; state.feedLimit += 6; renderFeed();
}, { passive: true });
realtime?.addEventListener("message", (event) => {
  if (event.data?.kind !== "message") return;
  let conversation = state.conversations.find((item) => item.user === event.data.conversation);
  if (!conversation) { conversation = { user: event.data.conversation, school: "AirBoard", online: true, unread: 0, typing: false, messages: [] }; state.conversations.unshift(conversation); }
  const isNew = !conversation.messages.some((item) => item.id === event.data.message.id); if (!isNew) return;
  conversation.messages.push(event.data.message);
  if (!state.dmOpen || state.activeConversation !== conversation.user || state.dmTab !== "messages") conversation.unread += 1;
  else event.data.message.read = true;
  saveAll(); updateChrome();
  if (state.dmOpen) { appendOpenMessage(conversation, event.data.message); refreshConversationRow(conversation); }
  toast(`${conversation.user}님의 새 메시지`, "message");
});
if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {});
