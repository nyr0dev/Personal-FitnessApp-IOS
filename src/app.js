// NYR0 Personal Fitness - v2.0
// iPhone 16 Pro Max optimized

// ─── i18n ───
const TRANSLATIONS = {
    en: {
        days: {
            "Monday": "Monday", "Tuesday": "Tuesday", "Wednesday": "Wednesday",
            "Thursday": "Thursday", "Friday": "Friday", "Saturday": "Saturday", "Sunday": "Sunday"
        },
        months: ["January", "February", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November", "December"],
        streakLabel: "days",
        headerTitle: "DAILY WORKOUT",
        statCompleted: "COMPLETED",
        statMoves: "MOVES",
        statTotal: "TOTAL",
        navToday: "TODAY",
        navWeek: "WEEK",
        navProfile: "PROFILE",
        restDay: "REST DAY",
        restSubtitle: "Rest today, come back stronger tomorrow",
        allDoneText: "TODAY'S WORKOUT COMPLETED",
        weeklyPlan: "WEEKLY PLAN",
        weekRest: "REST",
        weekDone: "DONE",
        weekToday: "TODAY",
        profileTitle: "PROFILE",
        profileTier: "PLATINUM ATHLETE",
        profileStreak: "Streak",
        profileWorkouts: "Workouts",
        profileExercises: "Exercises",
        btnNotifications: "ENABLE NOTIFICATIONS",
        btnReset: "RESET DATA",
        confirmTitle: "Reset Data",
        confirmMsg: "All your workout data will be deleted. This action cannot be undone.",
        confirmCancel: "Cancel",
        confirmReset: "Reset",
        notifNotSupported: "Your browser does not support notifications.",
        notifGranted: "Notifications enabled!",
        notifDenied: "Notification permission denied.",
        programTitles: {
            "Monday": "LOWER BODY + CORE",
            "Tuesday": "UPPER BODY + CORE",
            "Wednesday": "ACTIVE RECOVERY",
            "Thursday": "LEG SCULPT",
            "Friday": "CORE INTENSE",
            "Saturday": "FULL BODY",
            "Sunday": "REST DAY"
        },
        exerciseNames: {
            "Tempolu Yürüyüş": "Brisk Walking",
            "Esneme": "Stretching"
        }
    },
    tr: {
        days: {
            "Monday": "Pazartesi", "Tuesday": "Salı", "Wednesday": "Çarşamba",
            "Thursday": "Perşembe", "Friday": "Cuma", "Saturday": "Cumartesi", "Sunday": "Pazar"
        },
        months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
                 "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        streakLabel: "gün",
        headerTitle: "GÜNLÜK ANTRENMAN",
        statCompleted: "TAMAMLANAN",
        statMoves: "HAREKET",
        statTotal: "TOPLAM",
        navToday: "BUGÜN",
        navWeek: "HAFTA",
        navProfile: "PROFİL",
        restDay: "DİNLENME GÜNÜ",
        restSubtitle: "Bugün dinlen, yarın daha güçlü gel",
        allDoneText: "BUGÜNKÜ ANTRENMAN TAMAMLANDI",
        weeklyPlan: "HAFTALIK PLAN",
        weekRest: "DİNLENME",
        weekDone: "TAMAM",
        weekToday: "BUGÜN",
        profileTitle: "PROFİL",
        profileTier: "PLATINUM ATHLETE",
        profileStreak: "Seri",
        profileWorkouts: "Antrenman",
        profileExercises: "Hareket",
        btnNotifications: "BİLDİRİMLERİ AÇ",
        btnReset: "VERİLERİ SIFIRLA",
        confirmTitle: "Verileri Sıfırla",
        confirmMsg: "Tüm antrenman verilerin silinecek. Bu işlem geri alınamaz.",
        confirmCancel: "İptal",
        confirmReset: "Sıfırla",
        notifNotSupported: "Tarayıcın bildirimleri desteklemiyor.",
        notifGranted: "Bildirimler aktif!",
        notifDenied: "Bildirim izni reddedildi.",
        programTitles: {
            "Monday": "ALT GÖV + CORE",
            "Tuesday": "ÜST GÖV + CORE",
            "Wednesday": "AKTİF DİNLENME",
            "Thursday": "BACAK SCULPT",
            "Friday": "CORE YOĞUN",
            "Saturday": "TÜM VÜCUT",
            "Sunday": "DİNLENME GÜNÜ"
        },
        exerciseNames: {}
    }
};

let currentLang = localStorage.getItem('nyr0_lang') || 'en';

function t(key) {
    return TRANSLATIONS[currentLang][key] || key;
}

function getLocalizedDay(dayName) {
    return TRANSLATIONS[currentLang].days[dayName] || dayName;
}

function getLocalizedMonth(monthIdx) {
    return TRANSLATIONS[currentLang].months[monthIdx];
}

function getLocalizedTitle(dayName) {
    return TRANSLATIONS[currentLang].programTitles[dayName] || PROGRAM[dayName].title;
}

function getLocalizedExercise(name) {
    return TRANSLATIONS[currentLang].exerciseNames[name] || name;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('nyr0_lang', lang);
    document.documentElement.lang = lang;
    // Update static HTML elements
    document.querySelector('.streak-label').textContent = t('streakLabel');
    document.querySelector('[data-view="today"] .nav-label').textContent = t('navToday');
    document.querySelector('[data-view="week"] .nav-label').textContent = t('navWeek');
    document.querySelector('[data-view="profile"] .nav-label').textContent = t('navProfile');
    document.querySelectorAll('.stat-label')[0].textContent = t('statCompleted');
    document.querySelectorAll('.stat-label')[1].textContent = t('statMoves');
    document.querySelectorAll('.stat-label')[2].textContent = t('statTotal');
    renderDate();
    renderView();
    updateStats();
}

const PROGRAM = {
    "Monday": {
        title: "ALT GÖV + CORE",
        emoji: "🦵",
        items: [
            { n: "Squat", s: "4x15" },
            { n: "Bulgarian Split", s: "3x12" },
            { n: "Glute Bridge", s: "4x15" },
            { n: "Wall Sit", s: "3x MAX" },
            { n: "Plank", s: "3x45s" },
            { n: "Leg Raise", s: "3x12" }
        ]
    },
    "Tuesday": {
        title: "ÜST GÖV + CORE",
        emoji: "💪",
        items: [
            { n: "Push Ups", s: "4x MAX" },
            { n: "Pike Pushup", s: "3x10" },
            { n: "Chair Dips", s: "3x12" },
            { n: "Side Plank", s: "3x30s" },
            { n: "Dead Bug", s: "3x12" }
        ]
    },
    "Wednesday": {
        title: "AKTİF DİNLENME",
        emoji: "🧘",
        items: [
            { n: "Tempolu Yürüyüş", s: "30 DK" },
            { n: "Esneme", s: "10 DK" }
        ]
    },
    "Thursday": {
        title: "BACAK SCULPT",
        emoji: "🔥",
        items: [
            { n: "Jump Squat", s: "3x15" },
            { n: "Reverse Lunge", s: "3x12" },
            { n: "Hip Thrust", s: "3x12" },
            { n: "Calf Raise", s: "4x20" },
            { n: "Hollow Hold", s: "3x30s" }
        ]
    },
    "Friday": {
        title: "CORE YOĞUN",
        emoji: "🎯",
        items: [
            { n: "Plank", s: "3x1 DK" },
            { n: "Leg Raise", s: "4x12" },
            { n: "Mountain Climber", s: "3x30s" },
            { n: "Russian Twist", s: "3x20" }
        ]
    },
    "Saturday": {
        title: "TÜM VÜCUT",
        emoji: "⚡",
        items: [
            { n: "Squat", s: "3x20" },
            { n: "Push Ups", s: "3x MAX" },
            { n: "Walking Lunge", s: "3x20" },
            { n: "Glute Bridge", s: "3x20" },
            { n: "Plank", s: "3x45s" }
        ]
    },
    "Sunday": {
        title: "DİNLENME GÜNÜ",
        emoji: "😴",
        items: []
    }
};

const DAY_MAP = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


let currentView = 'today';

// ─── Init ───
function init() {
    document.documentElement.lang = currentLang;
    // Set static labels from translations
    document.querySelector('.streak-label').textContent = t('streakLabel');
    document.querySelector('[data-view="today"] .nav-label').textContent = t('navToday');
    document.querySelector('[data-view="week"] .nav-label').textContent = t('navWeek');
    document.querySelector('[data-view="profile"] .nav-label').textContent = t('navProfile');
    document.querySelectorAll('.stat-label')[0].textContent = t('statCompleted');
    document.querySelectorAll('.stat-label')[1].textContent = t('statMoves');
    document.querySelectorAll('.stat-label')[2].textContent = t('statTotal');
    renderDate();
    renderView();
    updateStats();
}

// ─── Date (Localized) ───
function renderDate() {
    const d = new Date();
    const day = d.getDate();
    const month = getLocalizedMonth(d.getMonth());
    const year = d.getFullYear();
    const dayName = getLocalizedDay(DAY_MAP[d.getDay()]);

    document.getElementById('current-date').textContent = `${day} ${month} ${year}`;
    document.getElementById('current-day').textContent = dayName;
}

// ─── Views ───
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
    document.getElementById('main-heading').textContent = getLocalizedTitle(dayName);

    if (data.items.length === 0) {
        container.innerHTML = `
            <div class="rest-day">
                <div class="rest-emoji">${data.emoji}</div>
                <div class="rest-title">${t('restDay')}</div>
                <div class="rest-subtitle">${t('restSubtitle')}</div>
            </div>
        `;
        return;
    }

    const done = getDone(dayName);
    const group = document.createElement('div');
    group.className = 'exercise-group';

    data.items.forEach((item, i) => {
        const isDone = done.includes(i);
        const card = document.createElement('div');
        card.className = `ex-card${isDone ? ' done' : ''}`;
        card.style.animationDelay = `${i * 0.06}s`;
        card.innerHTML = `
            <div class="ex-info">
                <span class="ex-name">${getLocalizedExercise(item.n)}</span>
                <span class="ex-meta">${item.s}</span>
            </div>
            <div class="ex-check">
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <path d="M1 5.5L5.5 10L15 1" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        `;
        card.addEventListener('click', () => toggle(dayName, i, card));
        group.appendChild(card);
    });

    container.appendChild(group);

    // Show "all done" if everything is completed
    if (done.length === data.items.length) {
        const allDone = document.createElement('div');
        allDone.className = 'all-done';
        allDone.innerHTML = `
            <div class="all-done-emoji">🏆</div>
            <div class="all-done-text">${t('allDoneText')}</div>
        `;
        container.appendChild(allDone);
    }
}

function renderWeek(container) {
    document.getElementById('main-heading').textContent = t('weeklyPlan');

    const grid = document.createElement('div');
    grid.className = 'week-grid';

    const today = new Date();
    const todayDayName = DAY_MAP[today.getDay()];
    const todayIdx = today.getDay();

    const weekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const dayIndices = { "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6 };

    weekOrder.forEach((day, i) => {
        const data = PROGRAM[day];
        const isToday = day === todayDayName;
        const dayIdx = dayIndices[day];
        const isPast = dayIdx < todayIdx && dayIdx !== 0 || (todayIdx === 0 && dayIdx !== 0);

        // Get completion status for this day
        let statusClass = 'upcoming';
        let statusText = '';

        if (data.items.length === 0) {
            statusClass = 'rest';
            statusText = t('weekRest');
        } else if (isToday) {
            const done = getDone(day);
            const pct = Math.round((done.length / data.items.length) * 100);
            if (pct === 100) {
                statusClass = 'completed';
                statusText = t('weekDone');
            } else if (pct > 0) {
                statusClass = 'partial';
                statusText = `%${pct}`;
            } else {
                statusClass = 'upcoming';
                statusText = t('weekToday');
            }
        } else if (isPast) {
            const done = getDoneForWeekDay(day);
            const pct = data.items.length > 0 ? Math.round((done.length / data.items.length) * 100) : 0;
            if (pct === 100) {
                statusClass = 'completed';
                statusText = t('weekDone');
            } else if (pct > 0) {
                statusClass = 'partial';
                statusText = `%${pct}`;
            }
        }

        const localDay = getLocalizedDay(day);
        const card = document.createElement('div');
        card.className = `week-card${isToday ? ' is-today' : ''}${isPast && !isToday ? ' is-past' : ''}`;
        card.style.animationDelay = `${i * 0.05}s`;
        card.innerHTML = `
            <div class="week-left">
                <div class="week-day-num">${localDay.substring(0, 2).toUpperCase()}</div>
                <div class="week-day-info">
                    <span class="week-day-name">${localDay}</span>
                    <span class="week-day-workout">${data.emoji} ${getLocalizedTitle(day)}</span>
                </div>
            </div>
            ${statusText ? `<span class="week-status ${statusClass}">${statusText}</span>` : ''}
        `;
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

function renderProfile(container) {
    document.getElementById('main-heading').textContent = t('profileTitle');

    const streak = getStreak();
    const totalWorkouts = getTotalWorkouts();
    const totalExercises = getTotalExercises();

    container.innerHTML = `
        <div class="profile-view">
            <div class="profile-avatar">N</div>
            <h2 class="profile-name">NYR0</h2>
            <span class="profile-tier">${t('profileTier')}</span>

            <div class="profile-stats">
                <div class="profile-stat">
                    <span class="profile-stat-val">${streak}</span>
                    <span class="profile-stat-label">${t('profileStreak')}</span>
                </div>
                <div class="profile-stat">
                    <span class="profile-stat-val">${totalWorkouts}</span>
                    <span class="profile-stat-label">${t('profileWorkouts')}</span>
                </div>
                <div class="profile-stat">
                    <span class="profile-stat-val">${totalExercises}</span>
                    <span class="profile-stat-label">${t('profileExercises')}</span>
                </div>
            </div>

            <div class="lang-toggle-wrapper">
                <button class="lang-toggle" onclick="setLanguage(currentLang === 'en' ? 'tr' : 'en')">
                    <span class="lang-option ${currentLang === 'en' ? 'active' : ''}">EN</span>
                    <span class="lang-option ${currentLang === 'tr' ? 'active' : ''}">TR</span>
                </button>
            </div>

            <div class="profile-actions">
                <button class="profile-btn primary" onclick="requestNotif()">${t('btnNotifications')}</button>
                <button class="profile-btn danger" onclick="confirmReset()">${t('btnReset')}</button>
            </div>

            <div class="profile-version">V2.0 NYR0 BUILD</div>
        </div>
    `;
}

// ─── Toggle Exercise ───
function toggle(day, idx, cardEl) {
    const key = `done_${day}_${new Date().toDateString()}`;
    let done = JSON.parse(localStorage.getItem(key) || '[]');

    if (done.includes(idx)) {
        done = done.filter(v => v !== idx);
    } else {
        done.push(idx);
        if (cardEl) {
            cardEl.classList.add('completing');
            setTimeout(() => cardEl.classList.remove('completing'), 400);
        }
    }

    localStorage.setItem(key, JSON.stringify(done));
    renderView();
    updateStats();
}

// ─── Data Helpers ───
function getDone(day) {
    return JSON.parse(localStorage.getItem(`done_${day}_${new Date().toDateString()}`) || '[]');
}

function getDoneForWeekDay(day) {
    // Check this week's data for a past day
    const today = new Date();
    const todayIdx = today.getDay();
    const dayIndices = { "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6 };
    const targetIdx = dayIndices[day];
    const diff = todayIdx - targetIdx;
    if (diff <= 0) return [];

    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - diff);
    return JSON.parse(localStorage.getItem(`done_${day}_${targetDate.toDateString()}`) || '[]');
}

function getStreak() {
    let streak = 0;
    for (let i = 0; i < 60; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dName = DAY_MAP[d.getDay()];
        const key = `done_${dName}_${d.toDateString()}`;
        const data = PROGRAM[dName];

        if (data.items.length === 0) {
            streak++;
        } else {
            const done = JSON.parse(localStorage.getItem(key) || '[]');
            if (done.length === data.items.length) {
                streak++;
            } else if (i > 0) {
                break;
            }
        }
    }
    return streak;
}

function getTotalWorkouts() {
    let count = 0;
    for (let i = 0; i < 60; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dName = DAY_MAP[d.getDay()];
        const key = `done_${dName}_${d.toDateString()}`;
        const data = PROGRAM[dName];

        if (data.items.length > 0) {
            const done = JSON.parse(localStorage.getItem(key) || '[]');
            if (done.length > 0) count++;
        }
    }
    return count;
}

function getTotalExercises() {
    let count = 0;
    for (let i = 0; i < 60; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dName = DAY_MAP[d.getDay()];
        const key = `done_${dName}_${d.toDateString()}`;
        const done = JSON.parse(localStorage.getItem(key) || '[]');
        count += done.length;
    }
    return count;
}

// ─── Stats Update ───
function updateStats() {
    const dayName = DAY_MAP[new Date().getDay()];
    const done = getDone(dayName);
    const total = PROGRAM[dayName].items.length;

    const progress = total > 0 ? Math.round((done.length / total) * 100) : 0;

    document.getElementById('stat-progress').textContent = `${progress}%`;
    document.getElementById('ring-fill').setAttribute('stroke-dasharray', `${progress}, 100`);
    document.getElementById('stat-done-count').textContent = done.length;
    document.getElementById('stat-total').textContent = total;
    document.getElementById('streak-count').textContent = getStreak();
}

// ─── Navigation ───
function switchView(v) {
    currentView = v;
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.nav-btn[data-view="${v}"]`).classList.add('active');
    renderDate();
    renderView();
    updateStats();

    // Scroll to top on view change
    document.getElementById('view-container').scrollTop = 0;
}

// ─── Notifications ───
function requestNotif() {
    if (!('Notification' in window)) {
        alert(t('notifNotSupported'));
        return;
    }
    Notification.requestPermission().then(p => {
        if (p === 'granted') {
            alert(t('notifGranted'));
        } else {
            alert(t('notifDenied'));
        }
    });
}

// ─── Reset Data ───
function confirmReset() {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
        <div class="confirm-box">
            <div class="confirm-title">${t('confirmTitle')}</div>
            <div class="confirm-msg">${t('confirmMsg')}</div>
            <div class="confirm-actions">
                <button class="confirm-btn cancel" onclick="this.closest('.confirm-overlay').remove()">${t('confirmCancel')}</button>
                <button class="confirm-btn confirm" onclick="resetData()">${t('confirmReset')}</button>
            </div>
        </div>
    `;
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
    document.body.appendChild(overlay);
}

function resetData() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('done_'));
    keys.forEach(k => localStorage.removeItem(k));
    document.querySelector('.confirm-overlay')?.remove();
    renderView();
    updateStats();
}

// ─── Start ───
init();
