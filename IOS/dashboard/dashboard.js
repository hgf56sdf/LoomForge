// DOM Elements - Global Access
const loginScreen = document.getElementById('login-screen');
const onboardingScreen = document.getElementById('onboarding-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const badgeOverlay = document.getElementById('badge-overlay');

// Workout Library Data
const workouts = [
    {
        id: 1,
        title: "Full Body HIIT",
        description: "(Dumbel Required!) 10-minute high intensity interval training to boost your metabolism and burn calories.",
        difficulty: "intermediate",
        duration: "10 min",
        calories: "300",
        thumbnail: "https://www.puregym.com/media/rhcdjrfv/hiit-workouts-for-men_blogheader-no-title.jpg",
        videoUrl: "https://www.youtube.com/watch?v=VF9JtlaunjE"
    },
    {
        id: 2,
        title: "Morning Yoga Flow",
        description: "Start your day with this energizing yoga flow to improve flexibility and focus.",
        difficulty: "beginner",
        duration: "22 min",
        calories: "120",
        thumbnail: "https://manflowyoga.com/wp-content/uploads/2022/02/15-Minute-Morning-Yoga-Routine-men-Deep-Squat-1024x576.jpg",
        videoUrl: "https://www.youtube.com/watch?v=3t50Sr-FATo"
    },
    {
        id: 3,
        title: "Core Crusher",
        description: "Strengthen your abs and improve posture with this targeted core workout.",
        difficulty: "intermediate",
        duration: "10 min",
        calories: "150",
        thumbnail: "https://sunnyhealthfitness.com/cdn/shop/articles/10-Minute-Core-Crusher-Workout.jpg",
        videoUrl: "https://www.youtube.com/watch?v=c1jCUf13Udo"
    },
    {
        id: 4,
        title: "Upper Body Strength",
        description: "(Dumbel Required!) Build strength in your arms, shoulders, and back with this dumbbell workout.",
        difficulty: "advanced",
        duration: "10 min",
        calories: "220",
        thumbnail: "https://hips.hearstapps.com/hmg-prod/images/gus-witfitness-173546894-499261391255959-7277244445477205499-n-1-1625137180.jpg",
        videoUrl: "https://www.youtube.com/watch?v=-prMeNxLB7E"
    },
    {
        id: 5,
        title: "Lower Body Burn",
        description: "Target your legs and glutes with this challenging lower body workout.",
        difficulty: "advanced",
        duration: "20 min",
        calories: "350",
        thumbnail: "https://hips.hearstapps.com/hmg-prod/images/mh-may-fitness-social-index-1556725054.png",
        videoUrl: "https://www.youtube.com/watch?v=-hSma-BRzoo"
    },
    {
        id: 6,
        title: "Cardio Blast",
        description: "Get your heart rate up with this no-equipment cardio workout.",
        difficulty: "intermediate",
        duration: "10 min",
        calories: "200",
        thumbnail: "https://cdn.muscleandstrength.com/sites/default/files/field/feature-wide-image/workout/3_fat_blasting_workouts_for_maximum_fat_loss_-_1000x500.jpg",
        videoUrl: "https://www.youtube.com/watch?v=c2aSpxlm0Mw"
    },
    {
        id: 7,
        title: "Mobility & Stretching",
        description: "Improve your range of motion and reduce stiffness with this mobility routine.",
        difficulty: "beginner",
        duration: "9 min",
        calories: "80",
        thumbnail: "https://www.trxtraining.com/cdn/shop/articles/man-stretching-hips-against-white-background.jpg",
        videoUrl: "https://www.youtube.com/watch?v=t2jel6q1GRk"
    },
    {
        id: 8,
        title: "Meditation & Breathwork",
        description: "Reduce stress and improve mental clarity with guided breathing exercises.",
        difficulty: "beginner",
        duration: "11 min",
        calories: "50",
        thumbnail: "https://cdn.yogajournal.com/wp-content/uploads/2017/05/man-meditating.jpg",
        videoUrl: "https://www.youtube.com/watch?v=tybOi4hjZFQ"
    }
];

// User Data
let userData = {
    username: "",
    isLoggedIn: false,
    goal: "",
    weight: 0,
    weightUnit: "kg",
    streak: 0,
    lastLogin: null,
    completedWorkouts: [],
    badges: {
        quickstarter: false
    }
};

// Check if user is already logged in
function checkLoginStatus() {
    const storedData = localStorage.getItem('quickFitUserData');
    
    if (storedData) {
        try {
            userData = JSON.parse(storedData);
            
            if (userData.isLoggedIn) {
                // Check if login was today
                const today = new Date().toDateString();
                const lastLogin = userData.lastLogin ? new Date(userData.lastLogin).toDateString() : null;
                
                if (lastLogin !== today) {
                    // Update streak if consecutive days
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayString = yesterday.toDateString();
                    
                    if (lastLogin === yesterdayString) {
                        userData.streak++;
                    } else if (lastLogin !== today) {
                        userData.streak = 1;
                    }
                    
                    // Update last login
                    userData.lastLogin = new Date().toISOString();
                    saveUserData();
                }
                
                // Go straight to dashboard
                showDashboard();
                return;
            }
        } catch (e) {
            console.error("Error parsing stored user data:", e);
            clearUserData();
        }
    }
    
    // Show login screen by default
    showLoginScreen();
}

// Save user data to localStorage
function saveUserData() {
    const encryptedData = JSON.stringify(userData);
    localStorage.setItem('quickFitUserData', encryptedData);
}

// Clear user data from localStorage
function clearUserData() {
    localStorage.removeItem('quickFitUserData');
    userData = {
        username: "",
        isLoggedIn: false,
        goal: "",
        weight: 0,
        weightUnit: "kg",
        streak: 0,
        lastLogin: null,
        completedWorkouts: [],
        badges: {
            quickstarter: false
        }
    };
}

// Show Login Screen
function showLoginScreen() {
    loginScreen.classList.remove('hidden');
    onboardingScreen.classList.add('hidden');
    dashboardScreen.classList.add('hidden');
}

// Show Onboarding Screen
function showOnboarding() {
    loginScreen.classList.add('hidden');
    onboardingScreen.classList.remove('hidden');
    dashboardScreen.classList.add('hidden');
    
    // Update user greeting
    document.getElementById('user-greeting').textContent = userData.username;
    
    // Show first step
    document.getElementById('goal-selection').classList.remove('hidden');
    document.getElementById('weight-input').classList.add('hidden');
}

// Show Dashboard Screen
function showDashboard() {
    loginScreen.classList.add('hidden');
    onboardingScreen.classList.add('hidden');
    dashboardScreen.classList.remove('hidden');
    
    // Update user data on dashboard
    updateDashboardData();
    
    // Load workouts
    loadWorkoutLibrary();
    
    // Set random daily workout
    setDailyWorkout();
}

// Update dashboard with user data
function updateDashboardData() {
    // Update user name
    document.getElementById('user-name').textContent = userData.username;
    document.getElementById('profile-name').textContent = userData.username;
    
    // Update weight display
    document.getElementById('display-weight').textContent = userData.weight;
    document.getElementById('display-unit').textContent = userData.weightUnit;
    
    // Update goal display
    document.getElementById('display-goal').textContent = 
        userData.goal === 'lose-weight' ? 'Lose Weight' : 'Build Muscle';
    
    // Update streak
    document.getElementById('streak-count').textContent = userData.streak;
    
    // Update badges
    updateBadgesDisplay();
}

// Update badges display
function updateBadgesDisplay() {
    if (userData.badges.quickstarter) {
        document.getElementById('quickstarter-badge').classList.remove('locked');
        document.querySelector('#quickstarter-badge .badge-icon').classList.remove('locked');
    }
}

// Load workout library
function loadWorkoutLibrary() {
    const workoutGrid = document.getElementById('workout-grid');
    workoutGrid.innerHTML = '';
    
    // Get the current filter
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    
    // Filter workouts
    const filteredWorkouts = activeFilter === 'all' 
        ? workouts 
        : workouts.filter(workout => workout.difficulty === activeFilter);
    
    // Create workout cards
    filteredWorkouts.forEach(workout => {
        const workoutCard = createWorkoutCard(workout);
        workoutGrid.appendChild(workoutCard);
    });
}

// Create workout card element
function createWorkoutCard(workout) {
    const card = document.createElement('div');
    card.className = 'workout-card';
    card.dataset.workoutId = workout.id;
    
    card.innerHTML = `
        <div class="workout-thumbnail">
            <img src="${workout.thumbnail}" alt="${workout.title}">
            <div class="workout-difficulty">${workout.difficulty}</div>
        </div>
        <div class="workout-content">
            <h3>${workout.title}</h3>
            <p>${workout.description}</p>
            <div class="workout-meta">
                <span>${workout.duration}</span>
                <span>${workout.calories} calories</span>
            </div>
        </div>
    `;
    
    // Add click event
    card.addEventListener('click', () => {
        showWorkoutDetails(workout);
    });
    
    return card;
}

setDailyWorkout();

function setDailyWorkout() {
    const today = new Date().toDateString();
    const seed = hashString(today);
    const randomIndex = seed % workouts.length;
    const dailyWorkout = workouts[randomIndex];

    document.getElementById('daily-workout-title').textContent = dailyWorkout.title;
    document.getElementById('daily-workout-desc').textContent = dailyWorkout.description;
    document.querySelector('.workout-of-day .video-placeholder').src = dailyWorkout.thumbnail;

    setupDailyWorkoutClick(dailyWorkout);
}


function setupDailyWorkoutClick(dailyWorkout) {
    const playButton = document.querySelector('.workout-of-day .play-button');
    
    playButton.addEventListener('click', () => {
        const embedUrl = dailyWorkout.videoUrl.replace("watch?v=", "embed/");
        const modal = document.getElementById('video-modal');
        const frame = document.getElementById('video-frame');
        
        frame.src = embedUrl;
        modal.classList.remove('hidden');
    });

    // Close modal
    document.getElementById('close-video').addEventListener('click', () => {
        document.getElementById('video-modal').classList.add('hidden');
        document.getElementById('video-frame').src = ''; // stop playback
    });
}


// Simple string hash function for deterministic random selection
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

function showWorkoutDetails(workout) {
    const embedUrl = workout.videoUrl.replace("watch?v=", "embed/");
    const modal = document.getElementById('video-modal');
    const frame = document.getElementById('video-frame');

    frame.src = embedUrl;
    modal.classList.remove('hidden');
}


// Show badge achievement
function showBadgeAchievement(badgeName, description) {
    // Update badge popup content
    document.getElementById('badge-name').textContent = badgeName;
    document.getElementById('badge-description').textContent = description;
    
    // Show badge overlay
    badgeOverlay.classList.remove('hidden');
}

// Complete workout and possibly award badge
function completeWorkout() {
    // Add current date to completed workouts
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    userData.completedWorkouts.push(today);
    
    // Award QuickStarter badge if first workout
    if (!userData.badges.quickstarter && userData.completedWorkouts.length === 1) {
        userData.badges.quickstarter = true;
        showBadgeAchievement('QuickStarter', 'You completed your first workout!');
    }
    
    // Save user data
    saveUserData();
    
    // Update dashboard
    updateDashboardData();
}

// Detect device type
function detectDevice() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isIPad = isIOS && /iPad/.test(navigator.userAgent);
    const isLandscape = window.innerWidth > window.innerHeight;
    
    document.body.classList.remove('device-iphone', 'device-ipad', 'orientation-landscape');
    
    if (isIPad || (window.innerWidth >= 768 && isLandscape)) {
        document.body.classList.add('device-ipad');
        if (isLandscape) {
            document.body.classList.add('orientation-landscape');
        }
    } else if (isIOS || window.innerWidth < 768) {
        document.body.classList.add('device-iphone');
    }
}

// Toggle theme (dark/light mode)
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    
    // Update theme icon
    const themeIcon = document.querySelector('#theme-toggle i');
    themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    
    // Save theme preference
    localStorage.setItem('quickFitTheme', isDarkMode ? 'dark' : 'light');
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('quickFitTheme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('#theme-toggle i').className = 'fas fa-sun';
    }
}

// Sanitize user input
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check login status
    checkLoginStatus();
    
    // Load saved theme
    loadTheme();
    
    // Detect device on load
    detectDevice();
    
    // Login button event
    document.getElementById('login-btn').addEventListener('click', () => {
        const username = sanitizeInput(document.getElementById('username').value.trim());
        const password = document.getElementById('password').value;
        
        if (username && password) {
            // In a real app, you would validate credentials server-side
            // For this demo, we'll just accept any input
            
            userData.username = username;
            userData.isLoggedIn = true;
            userData.lastLogin = new Date().toISOString();
            
            // Check if user has previous data
            const storedData = localStorage.getItem('quickFitUserData');
            if (storedData) {
                try {
                    const parsedData = JSON.parse(storedData);
                    if (parsedData.username === username) {
                        // Use stored data
                        userData = parsedData;
                        userData.isLoggedIn = true;
                        userData.lastLogin = new Date().toISOString();
                        saveUserData();
                        showDashboard();
                        return;
                    }
                } catch (e) {
                    console.error("Error parsing stored user data:", e);
                }
            }
            
            // New user, go to onboarding
            saveUserData();
            showOnboarding();
        }
    });
    
    // Goal selection event
    document.querySelectorAll('.goal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.goal-btn').forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Save selected goal
            userData.goal = btn.dataset.goal;
            
            // Show weight input
            document.getElementById('goal-selection').classList.add('hidden');
            document.getElementById('weight-input').classList.remove('hidden');
        });
    });
    
    // Weight submit event
    document.getElementById('weight-submit').addEventListener('click', () => {
        const weight = parseFloat(document.getElementById('current-weight').value);
        const unit = document.getElementById('weight-unit').value;
        
        if (weight && weight > 0) {
            userData.weight = weight;
            userData.weightUnit = unit;
            
            // Save user data
            saveUserData();
            
            // Show dashboard
            showDashboard();
        }
    });
    
    // Theme toggle event
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Filter buttons event
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Reload workout library
            loadWorkoutLibrary();
        });
    });
    
    // Complete workout button event
    document.getElementById('complete-workout').addEventListener('click', completeWorkout);
    
    // Close badge overlay button event
    document.getElementById('close-badge').addEventListener('click', () => {
        badgeOverlay.classList.add('hidden');
    });
    
    // Refresh workout button event
    document.getElementById('refresh-workout').addEventListener('click', setDailyWorkout);
    
    // Window resize event for device detection
    window.addEventListener('resize', detectDevice);
    
    // Window orientation change event
    window.addEventListener('orientationchange', detectDevice);
});

// Security measure: prevent direct access to dashboard in browser console
(function preventConsoleAccess() {
    const originalGetItem = Storage.prototype.getItem;
    Storage.prototype.getItem = function(key) {
        const value = originalGetItem.call(this, key);
        
        if (key === 'quickFitUserData' && value) {
            try {
                const data = JSON.parse(value);
                // Return only non-sensitive data
                return JSON.stringify({
                    isLoggedIn: data.isLoggedIn,
                    username: data.username ? '****' : null,
                    streak: data.streak,
                    badges: data.badges
                });
            } catch (e) {
                return value;
            }
        }
        
        return value;
    };
})();