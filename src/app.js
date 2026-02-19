const PROGRAM = {
    "Monday": { title: "LOWER + CORE", items: [{ n: "Squat", s: "4x15" }, { n: "Bulgarian Split", s: "3x12" }, { n: "Glute Bridge", s: "4x15" }, { n: "Wall Sit", s: "3x MAX" }, { n: "Plank", s: "3x45s" }, { n: "Leg Raise", s: "3x12" }] },
    "Tuesday": { title: "UPPER + CORE", items: [{ n: "Push Ups", s: "4x MAX" }, { n: "Pike Pushup", s: "3x10" }, { n: "Chair Dips", s: "3x12" }, { n: "Side Plank", s: "3x30s" }, { n: "Dead Bug", s: "3x12" }] },
    "Wednesday": { title: "ACTIVE RECOVERY", items: [{ n: "Brisk Walk", s: "30 MIN" }, { n: "Stretching", s: "10 MIN" }] },
    "Thursday": { title: "LEG SCULPT", items: [{ n: "Jump Squat", s: "3x15" }, { n: "Reverse Lunge", s: "3x12" }, { n: "Hip Thrust", s: "3x12" }, { n: "Calf Raise", s: "4x20" }, { n: "Hollow Hold", s: "3x30s" }] },
    "Friday": { title: "CORE INTENSE", items: [{ n: "Plank", s: "3x1 MIN" }, { n: "Leg Raise", s: "4x12" }, { n: "Mountain Climber", s: "3x30s" }, { n: "Russian Twist", s: "3x20" }] },
    "Saturday": { title: "FULL BODY", items: [{ n: "Squat", s: "3x20" }, { n: "Push Ups", s: "3x MAX" }, { n: "Walking Lunge", s: "3x20" }, { n: "Glute Bridge", s: "3x20" }, { n: "Plank", s: "3x45s" }] },
    "Sunday": { title: "REST DAY", items: [] }
};

const DAY_MAP = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentView = 'today';

function init() {
    renderDate();
    renderView();
    updateGlobalStats();
}

function renderDate() {
    const d = new Date();
    const options = { month: 'short', day: 'numeric', weekday: 'long' };
    document.getElementById('current-date').textContent = d.toLocaleDateString('en-US', options).toUpperCase();
}

function renderView() {
    const container = document.getElementById('view-container');
    container.innerHTML = '';

    if (currentView === 'today') {
        renderToday(container);
    } else if (currentView === 'week') {
        renderWeek(container);
    } else if (currentView === 'profile') {
        renderProfile(container);
    }
}

function renderToday(container) {
    const dayName = DAY_MAP[new Date().getDay()];
    const data = PROGRAM[dayName];
    document.getElementById('main-heading').textContent = data.title;

    const group = document.createElement('div');
    group.className = 'exercise-group';

    if (data.items.length === 0) {
        group.innerHTML = `<div style="text-align:center; padding:100px 0; opacity:0.3;">NO WORKOUT TODAY</div>`;
    } else {
        const done = getDone(dayName);
        data.items.forEach((item, i) => {
            const isDone = done.includes(i);
            const card = document.createElement('div');
            card.className = `ex-card ${isDone ? 'done' : ''}`;
            card.style.animationDelay = `${i * 0.05}s`;
            card.innerHTML = `
                <div class="ex-info">
                    <h3>${item.n}</h3>
                    <div class="meta">${item.s}</div>
                </div>
                <div class="check-circ">
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M1 7L6 12L17 1" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
            `;
            card.onclick = () => toggle(dayName, i);
            group.appendChild(card);
        });
    }
    container.appendChild(group);
}

function renderWeek(container) {
    document.getElementById('main-heading').textContent = "WEEKLY FLOW";
    const grid = document.createElement('div');
    grid.className = 'week-grid';

    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].forEach(day => {
        const isToday = DAY_MAP[new Date().getDay()] === day;
        grid.innerHTML += `
            <div class="day-bar ${isToday ? 'today' : ''}">
                <span style="font-weight:900;">${day.substring(0, 3).toUpperCase()}</span>
                <span style="color:var(--text-dim); font-size:0.8rem;">${PROGRAM[day].title}</span>
            </div>
        `;
    });
    container.appendChild(grid);
}

function renderProfile(container) {
    document.getElementById('main-heading').textContent = "MY STATUS";
    container.innerHTML = `
        <div class="profile-view">
            <div class="p-avatar">N</div>
            <h2 class="p-name">STAY HARD, NYR0</h2>
            <span class="p-tier">PLATINUM ATHELTE</span>
            
            <button class="p-btn" onclick="requestNotif()">ACTIVATE PUSH ALERTS</button>
            <div style="margin-top: 20px; color: var(--text-dim); font-size: 0.8rem;">V1.0.0 PREMIUM BUILD</div>
        </div>
    `;
}

function toggle(day, idx) {
    const key = `done_${day}_${new Date().toDateString()}`;
    let done = JSON.parse(localStorage.getItem(key) || '[]');
    if (done.includes(idx)) done = done.filter(v => v !== idx);
    else done.push(idx);
    localStorage.setItem(key, JSON.stringify(done));
    renderView();
    updateGlobalStats();
}

function getDone(day) {
    return JSON.parse(localStorage.getItem(`done_${day}_${new Date().toDateString()}`) || '[]');
}

function updateGlobalStats() {
    const dayName = DAY_MAP[new Date().getDay()];
    const done = getDone(dayName);
    const total = PROGRAM[dayName].items.length;

    const progress = total > 0 ? Math.round((done.length / total) * 100) : 0;
    document.getElementById('stat-progress').textContent = `${progress}%`;

    // Simple streak
    let streak = 0;
    for (let i = 0; i < 30; i++) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const dName = DAY_MAP[d.getDay()];
        const key = `done_${dName}_${d.toDateString()}`;
        if (localStorage.getItem(key) || PROGRAM[dName].items.length === 0) streak++;
        else if (i > 0) break;
    }
    document.getElementById('streak-count').textContent = streak;
}

function switchView(v) {
    currentView = v;
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    // Button mapping based on index (0:today, 1:week, 2:profile)
    const idx = v === 'today' ? 0 : (v === 'week' ? 1 : 2);
    document.querySelectorAll('.nav-item')[idx].classList.add('active');
    renderView();
}

function requestNotif() {
    Notification.requestPermission().then(p => {
        if (p === 'granted') alert("Alerts set for 17:00 daily!");
    });
}

init();
