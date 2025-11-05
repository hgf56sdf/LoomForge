/* ========================================
   PERFORMANCE-OPTIMIZED JAVASCRIPT
   - RequestAnimationFrame for animations
   - Debouncing for expensive operations
   - Memoization for calculations
   - Event delegation
   - Minimal DOM manipulation
   ======================================== */

'use strict';

// ========================================
// PERIODIC TABLE DATA (Frozen for performance)
// ========================================
const ELEMENTS = Object.freeze({
    H: { n: 'Hydrogen', m: 1.008 }, He: { n: 'Helium', m: 4.003 },
    Li: { n: 'Lithium', m: 6.941 }, Be: { n: 'Beryllium', m: 9.012 },
    B: { n: 'Boron', m: 10.81 }, C: { n: 'Carbon', m: 12.01 },
    N: { n: 'Nitrogen', m: 14.01 }, O: { n: 'Oxygen', m: 16.00 },
    F: { n: 'Fluorine', m: 19.00 }, Ne: { n: 'Neon', m: 20.18 },
    Na: { n: 'Sodium', m: 22.99 }, Mg: { n: 'Magnesium', m: 24.31 },
    Al: { n: 'Aluminum', m: 26.98 }, Si: { n: 'Silicon', m: 28.09 },
    P: { n: 'Phosphorus', m: 30.97 }, S: { n: 'Sulfur', m: 32.07 },
    Cl: { n: 'Chlorine', m: 35.45 }, Ar: { n: 'Argon', m: 39.95 },
    K: { n: 'Potassium', m: 39.10 }, Ca: { n: 'Calcium', m: 40.08 },
    Sc: { n: 'Scandium', m: 44.96 }, Ti: { n: 'Titanium', m: 47.87 },
    V: { n: 'Vanadium', m: 50.94 }, Cr: { n: 'Chromium', m: 52.00 },
    Mn: { n: 'Manganese', m: 54.94 }, Fe: { n: 'Iron', m: 55.85 },
    Co: { n: 'Cobalt', m: 58.93 }, Ni: { n: 'Nickel', m: 58.69 },
    Cu: { n: 'Copper', m: 63.55 }, Zn: { n: 'Zinc', m: 65.39 },
    Ga: { n: 'Gallium', m: 69.72 }, Ge: { n: 'Germanium', m: 72.64 },
    As: { n: 'Arsenic', m: 74.92 }, Se: { n: 'Selenium', m: 78.96 },
    Br: { n: 'Bromine', m: 79.90 }, Kr: { n: 'Krypton', m: 83.80 },
    Rb: { n: 'Rubidium', m: 85.47 }, Sr: { n: 'Strontium', m: 87.62 },
    Y: { n: 'Yttrium', m: 88.91 }, Zr: { n: 'Zirconium', m: 91.22 },
    Nb: { n: 'Niobium', m: 92.91 }, Mo: { n: 'Molybdenum', m: 95.94 },
    Tc: { n: 'Technetium', m: 98.00 }, Ru: { n: 'Ruthenium', m: 101.1 },
    Rh: { n: 'Rhodium', m: 102.9 }, Pd: { n: 'Palladium', m: 106.4 },
    Ag: { n: 'Silver', m: 107.9 }, Cd: { n: 'Cadmium', m: 112.4 },
    In: { n: 'Indium', m: 114.8 }, Sn: { n: 'Tin', m: 118.7 },
    Sb: { n: 'Antimony', m: 121.8 }, Te: { n: 'Tellurium', m: 127.6 },
    I: { n: 'Iodine', m: 126.9 }, Xe: { n: 'Xenon', m: 131.3 },
    Cs: { n: 'Cesium', m: 132.9 }, Ba: { n: 'Barium', m: 137.3 },
    La: { n: 'Lanthanum', m: 138.9 }, Ce: { n: 'Cerium', m: 140.1 },
    Pr: { n: 'Praseodymium', m: 140.9 }, Nd: { n: 'Neodymium', m: 144.2 },
    Pm: { n: 'Promethium', m: 145.0 }, Sm: { n: 'Samarium', m: 150.4 },
    Eu: { n: 'Europium', m: 152.0 }, Gd: { n: 'Gadolinium', m: 157.3 },
    Tb: { n: 'Terbium', m: 158.9 }, Dy: { n: 'Dysprosium', m: 162.5 },
    Ho: { n: 'Holmium', m: 164.9 }, Er: { n: 'Erbium', m: 167.3 },
    Tm: { n: 'Thulium', m: 168.9 }, Yb: { n: 'Ytterbium', m: 173.0 },
    Lu: { n: 'Lutetium', m: 175.0 }, Hf: { n: 'Hafnium', m: 178.5 },
    Ta: { n: 'Tantalum', m: 180.9 }, W: { n: 'Tungsten', m: 183.8 },
    Re: { n: 'Rhenium', m: 186.2 }, Os: { n: 'Osmium', m: 190.2 },
    Ir: { n: 'Iridium', m: 192.2 }, Pt: { n: 'Platinum', m: 195.1 },
    Au: { n: 'Gold', m: 197.0 }, Hg: { n: 'Mercury', m: 200.6 },
    Tl: { n: 'Thallium', m: 204.4 }, Pb: { n: 'Lead', m: 207.2 },
    Bi: { n: 'Bismuth', m: 209.0 }, Po: { n: 'Polonium', m: 209.0 },
    At: { n: 'Astatine', m: 210.0 }, Rn: { n: 'Radon', m: 222.0 },
    Fr: { n: 'Francium', m: 223.0 }, Ra: { n: 'Radium', m: 226.0 },
    Ac: { n: 'Actinium', m: 227.0 }, Th: { n: 'Thorium', m: 232.0 },
    Pa: { n: 'Protactinium', m: 231.0 }, U: { n: 'Uranium', m: 238.0 }
});

const COMMON = ['H₂O', 'CO₂', 'NaCl', 'H₂SO₄', 'CaCO₃', 'NH₃', 'CH₄', 'C₆H₁₂O₆'];

// ========================================
// STATE MANAGEMENT
// ========================================
const state = {
    theme: localStorage.getItem('theme') || 'light',
    history: JSON.parse(localStorage.getItem('history') || '[]'),
    cache: new Map()
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce for performance
const debounce = (fn, ms) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
};

// Convert subscript numbers
const toNormal = str => str.replace(/[₀-₉]/g, c => '0123456789'[c.charCodeAt(0) - 8320]);

// Show toast notification
const toast = (msg, err = false) => {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.style.background = err ? '#ef4444' : 'var(--text-1)';
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
};

// ========================================
// CANVAS PARTICLE ANIMATION (RAF-based)
// ========================================
const initCanvas = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d', { alpha: true });
    
    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resize();
    
    // Throttled resize
    let resizing;
    window.addEventListener('resize', () => {
        clearTimeout(resizing);
        resizing = setTimeout(resize, 200);
    }, { passive: true });
    
    // Particle system
    const count = Math.min(30, Math.floor(window.innerWidth / 40));
    const particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        r: Math.random() * 3 + 1.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.2),
        o: Math.random() * 0.3 + 0.1
    }));
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.y += p.vy;
            p.x += p.vx;
            
            if (p.y < -10) {
                p.y = canvas.height + Math.random() * 100;
                p.x = Math.random() * canvas.width;
            }
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(37, 99, 235, ${p.o})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    };
    
    animate();
};

// ========================================
// THEME MANAGEMENT
// ========================================
const setTheme = theme => {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

const toggleTheme = () => {
    requestAnimationFrame(() => {
        setTheme(state.theme === 'light' ? 'dark' : 'light');
    });
};

// ========================================
// FORMULA PARSING (Memoized)
// ========================================
const parse = formula => {
    // Check cache
    if (state.cache.has(formula)) return state.cache.get(formula);
    
    const f = toNormal(formula).replace(/\s/g, '');
    const elems = {};
    const regex = /([A-Z][a-z]?)(\d*)|(\()|(\))(\d*)/g;
    let match, stack = [];
    
    while ((match = regex.exec(f))) {
        if (match[3]) {
            stack.push({});
        } else if (match[4]) {
            const mult = +match[5] || 1;
            const temp = stack.pop();
            for (let e in temp) {
                const cnt = temp[e] * mult;
                const tgt = stack.length ? stack[stack.length - 1] : elems;
                tgt[e] = (tgt[e] || 0) + cnt;
            }
        } else if (match[1]) {
            const el = match[1];
            const cnt = +match[2] || 1;
            if (!ELEMENTS[el]) throw new Error(`Unknown: ${el}`);
            const tgt = stack.length ? stack[stack.length - 1] : elems;
            tgt[el] = (tgt[el] || 0) + cnt;
        }
    }
    
    let mass = 0;
    const breakdown = [];
    for (let el in elems) {
        const cnt = elems[el];
        const m = ELEMENTS[el].m * cnt;
        mass += m;
        breakdown.push({ el, cnt, m: ELEMENTS[el].m, total: m });
    }
    
    const result = { mass, breakdown, elems };
    
    // Cache with limit
    if (state.cache.size > 50) state.cache.clear();
    state.cache.set(formula, result);
    
    return result;
};

// ========================================
// POPULATE ELEMENTS SIDEBAR
// ========================================
const initElements = () => {
    const container = document.getElementById('elements');
    const frag = document.createDocumentFragment();
    
    Object.entries(ELEMENTS).forEach(([sym, { n, m }]) => {
        const div = document.createElement('div');
        div.className = 'element';
        div.innerHTML = `
            <div>
                <div class="element-symbol">${sym}</div>
                <div class="element-name">${n}</div>
            </div>
            <div class="element-mass">${m.toFixed(2)}</div>
        `;
        div.addEventListener('click', () => {
            document.getElementById('formula').value += sym;
            toast(`Added ${sym}`);
        }, { passive: true });
        frag.appendChild(div);
    });
    
    container.appendChild(frag);
};

// Element search (debounced)
const searchElements = debounce(term => {
    const lower = term.toLowerCase();
    document.querySelectorAll('.element').forEach(el => {
        const text = el.textContent.toLowerCase();
        el.style.display = text.includes(lower) ? '' : 'none';
    });
}, 150);

// ========================================
// FORMULA SUGGESTIONS
// ========================================
const initChips = () => {
    const container = document.getElementById('chips');
    const frag = document.createDocumentFragment();
    
    COMMON.forEach(f => {
        const span = document.createElement('span');
        span.className = 'chip';
        span.textContent = f;
        span.addEventListener('click', () => {
            document.getElementById('formula').value = toNormal(f);
            calculate();
        }, { passive: true });
        frag.appendChild(span);
    });
    
    container.appendChild(frag);
};

// ========================================
// MOLAR MASS CALCULATION
// ========================================
const calculate = () => {
    const input = document.getElementById('formula');
    const f = input.value.trim();
    
    if (!f) return toast('Enter a formula', true);
    
    try {
        const result = parse(f);
        showResults(f, result);
        addHistory(f, result.mass);
        toast('Calculated!');
    } catch (e) {
        toast(e.message, true);
    }
};

const showResults = (f, { mass, breakdown }) => {
    const card = document.getElementById('results');
    const data = document.getElementById('resultData');
    
    let html = `
        <div class="result-item">
            <div class="result-label">Formula</div>
            <div class="result-value">${f}</div>
        </div>
        <div class="result-item">
            <div class="result-label">Molar Mass</div>
            <div class="result-value">${mass.toFixed(4)} g/mol</div>
            <div class="result-breakdown">
    `;
    
    breakdown.forEach(({ el, cnt, m, total }) => {
        html += `${el}${cnt > 1 ? '₍' + cnt + '₎' : ''}: ${cnt} × ${m.toFixed(2)} = ${total.toFixed(2)} g/mol<br>`;
    });
    
    html += `
            </div>
            <div class="result-note">
                💡 1 mole of ${f} weighs ${mass.toFixed(2)} grams (6.022 × 10²³ molecules)
            </div>
        </div>
    `;
    
    data.innerHTML = html;
    card.classList.remove('hidden');
    
    requestAnimationFrame(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
};

// ========================================
// STOICHIOMETRY CONVERTER (Debounced)
// ========================================
const initConverter = () => {
    const formula = document.getElementById('convFormula');
    const moles = document.getElementById('moles');
    const grams = document.getElementById('grams');
    const result = document.getElementById('convResult');
    
    const molesCalc = debounce(() => {
        const f = formula.value.trim();
        const m = parseFloat(moles.value);
        if (!f || isNaN(m)) return grams.value = '', result.innerHTML = '';
        
        try {
            const { mass } = parse(f);
            const g = m * mass;
            grams.value = g.toFixed(4);
            result.innerHTML = `<strong>${m} mol</strong> = <strong>${g.toFixed(4)} g</strong> (MM: ${mass.toFixed(4)} g/mol)`;
        } catch (e) {
            result.innerHTML = e.message;
        }
    }, 200);
    
    const gramsCalc = debounce(() => {
        const f = formula.value.trim();
        const g = parseFloat(grams.value);
        if (!f || isNaN(g)) return moles.value = '', result.innerHTML = '';
        
        try {
            const { mass } = parse(f);
            const m = g / mass;
            moles.value = m.toFixed(4);
            result.innerHTML = `<strong>${g} g</strong> = <strong>${m.toFixed(4)} mol</strong> (MM: ${mass.toFixed(4)} g/mol)`;
        } catch (e) {
            result.innerHTML = e.message;
        }
    }, 200);
    
    moles.addEventListener('input', molesCalc);
    grams.addEventListener('input', gramsCalc);
    formula.addEventListener('input', () => {
        if (moles.value) molesCalc();
        else if (grams.value) gramsCalc();
    });
};

// ========================================
// RATIO CALCULATOR
// ========================================
const calcRatio = () => {
    const c1 = document.getElementById('comp1').value.trim();
    const n1 = +document.getElementById('coef1').value;
    const c2 = document.getElementById('comp2').value.trim();
    const n2 = +document.getElementById('coef2').value;
    const result = document.getElementById('ratioResult');
    
    if (!c1 || !c2) return toast('Enter both compounds', true);
    
    try {
        const r1 = parse(c1);
        const r2 = parse(c2);
        const ratio = (n1 * r1.mass) / (n2 * r2.mass);
        const gcd = (a, b) => b ? gcd(b, a % b) : a;
        const d = gcd(n1, n2);
        
        result.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <strong>Molar Ratio:</strong> ${n1}:${n2} → ${n1/d}:${n2/d}
            </div>
            <div style="padding: 1rem; background: var(--bg-1); border-radius: var(--radius);">
                ${n1} mol ${c1} (${(n1 * r1.mass).toFixed(2)} g)<br>
                reacts with<br>
                ${n2} mol ${c2} (${(n2 * r2.mass).toFixed(2)} g)<br><br>
                <strong>Mass Ratio:</strong> ${ratio.toFixed(4)}:1
            </div>
            <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-2);">
                💡 ${n1} mol ${c1} needs ${n2} mol ${c2}
            </div>
        `;
    } catch (e) {
        toast(e.message, true);
    }
};

// ========================================
// HISTORY MANAGEMENT
// ========================================
const addHistory = (f, m) => {
    state.history.unshift({
        formula: f,
        mass: m,
        time: new Date().toLocaleString()
    });
    
    if (state.history.length > 15) state.history.pop();
    
    localStorage.setItem('history', JSON.stringify(state.history));
    renderHistory();
};

const renderHistory = () => {
    const container = document.getElementById('history');
    
    if (!state.history.length) {
        container.innerHTML = '<p class="empty">No calculations yet</p>';
        return;
    }
    
    container.innerHTML = state.history.map(({ formula, mass, time }) => `
        <div class="history-item">
            <div class="history-formula">${formula}</div>
            <div class="history-result">Molar Mass: ${mass.toFixed(4)} g/mol</div>
            <div class="history-time">${time}</div>
        </div>
    `).join('');
};

const clearHistory = () => {
    if (!confirm('Clear all history?')) return;
    state.history = [];
    localStorage.removeItem('history');
    renderHistory();
    toast('History cleared');
};

// ========================================
// EVENT LISTENERS (Efficient delegation)
// ========================================
const initEvents = () => {
    // Theme toggle
    document.getElementById('themeBtn').addEventListener('click', toggleTheme);
    
    // Calculate button
    document.getElementById('calcBtn').addEventListener('click', calculate);
    
    // Enter key for formula
    document.getElementById('formula').addEventListener('keypress', e => {
        if (e.key === 'Enter') calculate();
    });
    
    // Search elements
    document.getElementById('search').addEventListener('input', e => {
        searchElements(e.target.value);
    });
    
    // Ratio calculator
    document.getElementById('ratioBtn').addEventListener('click', calcRatio);
    
    // Clear history
    document.getElementById('clearBtn').addEventListener('click', clearHistory);
};

// ========================================
// INITIALIZATION
// ========================================
const init = () => {
    // Set initial theme
    setTheme(state.theme);
    
    // Initialize components
    initCanvas();
    initElements();
    initChips();
    initConverter();
    renderHistory();
    initEvents();
    
    // Service worker for offline support (optional)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
};

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Cleanup
window.addEventListener('beforeunload', () => {
    state.cache.clear();
});

// Console message
console.log('%c🧪 Virtual Chemistry Lab', 'font-size: 20px; font-weight: bold; color: #2563eb');
console.log('%cOptimized for performance!', 'color: #64748b');
