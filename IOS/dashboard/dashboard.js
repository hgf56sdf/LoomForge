// DOM Elements - Global Access
const loginScreen = document.getElementById('login-screen');
const onboardingScreen = document.getElementById('onboarding-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const badgeOverlay = document.getElementById('badge-overlay');
const videoModal = document.getElementById('video-modal');

// Navigation state management
let currentSection = 'home';

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
        videoUrl: "https://www.youtube.com/embed/VF9JtlaunjE",
        // NEW PROPERTY - Goal specific flag
        goalType: "lose-weight"
    },
    {
        id: 2,
        title: "Morning Yoga Flow",
        description: "Start your day with this energizing yoga flow to improve flexibility and focus.",
        difficulty: "beginner",
        duration: "22 min",
        calories: "120",
        thumbnail: "https://manflowyoga.com/wp-content/uploads/2022/02/15-Minute-Morning-Yoga-Routine-men-Deep-Squat-1024x576.jpg",
        videoUrl: "https://www.youtube.com/embed/3t50Sr-FATo",
        // NEW PROPERTY - Goal specific flag
        goalType: "both"
    },
    {
        id: 3,
        title: "Core Crusher",
        description: "Strengthen your abs and improve posture with this targeted core workout.",
        difficulty: "intermediate",
        duration: "10 min",
        calories: "150",
        thumbnail: "https://sunnyhealthfitness.com/cdn/shop/articles/10-Minute-Core-Crusher-Workout.jpg",
        videoUrl: "https://www.youtube.com/embed/c1jCUf13Udo",
        // NEW PROPERTY - Goal specific flag  
        goalType: "both"
    },
    {
        id: 4,
        title: "Upper Body Strength",
        description: "(Dumbel Required!) Build strength in your arms, shoulders, and back with this dumbbell workout.",
        difficulty: "advanced",
        duration: "10 min",
        calories: "220",
        thumbnail: "https://hips.hearstapps.com/hmg-prod/images/gus-witfitness-173546894-499261391255959-7277244445477205499-n-1-1625137180.jpg",
        videoUrl: "https://www.youtube.com/embed/-prMeNxLB7E",
        // NEW PROPERTY - Goal specific flag
        goalType: "build-muscle"
    },
    {
        id: 5,
        title: "Lower Body Burn",
        description: "Target your legs and glutes with this challenging lower body workout.",
        difficulty: "advanced",
        duration: "20 min",
        calories: "350",
        thumbnail: "https://hips.hearstapps.com/hmg-prod/images/mh-may-fitness-social-index-1556725054.png",
        videoUrl: "https://www.youtube.com/embed/-hSma-BRzoo",
        // NEW PROPERTY - Goal specific flag
        goalType: "build-muscle"
    },
    {
        id: 6,
        title: "Cardio Blast",
        description: "Get your heart rate up with this no-equipment cardio workout.",
        difficulty: "intermediate",
        duration: "10 min",
        calories: "200",
        thumbnail: "https://cdn.muscleandstrength.com/sites/default/files/field/feature-wide-image/workout/3_fat_blasting_workouts_for_maximum_fat_loss_-_1000x500.jpg",
        videoUrl: "https://www.youtube.com/embed/c2aSpxlm0Mw",
        // NEW PROPERTY - Goal specific flag
        goalType: "lose-weight"
    },
    {
        id: 7,
        title: "Mobility & Stretching",
        description: "Improve your range of motion and reduce stiffness with this mobility routine.",
        difficulty: "beginner",
        duration: "9 min",
        calories: "80",
        thumbnail: "https://www.trxtraining.com/cdn/shop/articles/man-stretching-hips-against-white-background.jpg",
        videoUrl: "https://www.youtube.com/embed/t2jel6q1GRk",
        // NEW PROPERTY - Goal specific flag
        goalType: "both"
    },
    {
        id: 8,
        title: "Meditation & Breathwork",
        description: "Reduce stress and improve mental clarity with guided breathing exercises.",
        difficulty: "beginner",
        duration: "11 min",
        calories: "50",
        thumbnail: "https://cdn.yogajournal.com/wp-content/uploads/2017/05/man-meditating.jpg",
        videoUrl: "https://www.youtube.com/embed/tybOi4hjZFQ",
        // NEW PROPERTY - Goal specific flag
        goalType: "both"
    },
    // NEW WORKOUTS WITH GOAL-SPECIFIC CONTENT
    {
        id: 9,
        title: "High Intensity Fat Burner",
        description: "Maximize calorie burn with this intense circuit training session focused on weight loss.",
        difficulty: "advanced",
        duration: "10 min",
        calories: "280",
        thumbnail: "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/08/Overweight-Guy-Bike-Bicycle-Spin-Sweat.jpg",
        videoUrl: "https://www.youtube.com/embed/uTo2m16eJqI",
        goalType: "lose-weight"
    },
    {
        id: 11,
        title: "Quick Metabolic Booster",
        description: "Short but effective workout to boost your metabolism for hours after completion.",
        difficulty: "beginner",
        duration: "10 min",
        calories: "150",
        thumbnail: "https://www.mensfitness.com/.image/t_share/MTk2MTM2MTgyMjc0NDY3MzMz/man-pushing-prowler.jpg",
        videoUrl: "https://www.youtube.com/embed/FAtTZ0VgsRM",
        goalType: "lose-weight"
    },
    {
        id: 12,
        title: "Full Body Muscle Builder",
        description: "Build balanced muscle across your entire body with this comprehensive strength workout.",
        difficulty: "advanced",
        duration: "32 min",
        calories: "310",
        thumbnail: "https://cdn.muscleandstrength.com/sites/default/files/advanced_bodybuilder_workout_-_1200x630.jpg",
        videoUrl: "https://www.youtube.com/embed/UIPvIYsjfpo",
        goalType: "build-muscle"
    }
];

// Common food items with calories (for calorie tracker)
const commonFoods = [
    { name: "Apple", calories: 95, category: "Fruit", serving: "1 medium", protein: 0.5, carbs: 25, fat: 0.3 },
    { name: "Banana", calories: 105, category: "Fruit", serving: "1 medium", protein: 1.3, carbs: 27, fat: 0.4 },
    { name: "Chicken Breast", calories: 165, category: "Protein", serving: "100g", protein: 31, carbs: 0, fat: 3.6 },
    { name: "Brown Rice", calories: 215, category: "Grain", serving: "1 cup cooked", protein: 5, carbs: 45, fat: 1.8 },
    { name: "Egg", calories: 70, category: "Protein", serving: "1 large", protein: 6, carbs: 0.6, fat: 5 },
    { name: "Salmon", calories: 206, category: "Protein", serving: "100g", protein: 22, carbs: 0, fat: 13 },
    { name: "Broccoli", calories: 55, category: "Vegetable", serving: "1 cup", protein: 3.7, carbs: 11, fat: 0.6 },
    { name: "Avocado", calories: 234, category: "Fruit", serving: "1 medium", protein: 2.9, carbs: 12, fat: 21 },
    { name: "Greek Yogurt", calories: 100, category: "Dairy", serving: "100g", protein: 10, carbs: 3.6, fat: 5 },
    { name: "Oatmeal", calories: 150, category: "Grain", serving: "1 cup cooked", protein: 6, carbs: 27, fat: 2.5 },
    { name: "Almonds", calories: 164, category: "Nuts", serving: "1/4 cup", protein: 6, carbs: 6, fat: 14 },
    { name: "Sweet Potato", calories: 115, category: "Vegetable", serving: "1 medium", protein: 2, carbs: 27, fat: 0.1 },
    { name: "Spinach", calories: 41, category: "Vegetable", serving: "100g", protein: 5, carbs: 6.5, fat: 0.5 },
    { name: "Quinoa", calories: 222, category: "Grain", serving: "1 cup cooked", protein: 8, carbs: 39, fat: 3.6 },
    { name: "Cottage Cheese", calories: 206, category: "Dairy", serving: "1 cup", protein: 28, carbs: 8, fat: 9 },
    // NEW FOOD ITEMS WITH MACROS
    { name: "Protein Shake", calories: 120, category: "Protein", serving: "1 scoop", protein: 24, carbs: 3, fat: 1 },
    { name: "Peanut Butter", calories: 190, category: "Spread", serving: "2 tbsp", protein: 7, carbs: 7, fat: 16 },
    { name: "Lentils", calories: 230, category: "Legume", serving: "1 cup cooked", protein: 18, carbs: 40, fat: 1 },
    { name: "Whole Wheat Bread", calories: 80, category: "Grain", serving: "1 slice", protein: 4, carbs: 15, fat: 1 },
    { name: "Milk", calories: 122, category: "Dairy", serving: "1 cup", protein: 8, carbs: 12, fat: 5 },
    { name: "Tuna", calories: 154, category: "Protein", serving: "1 can", protein: 34, carbs: 0, fat: 1 },
    { name: "Mixed Nuts", calories: 173, category: "Nuts", serving: "1/4 cup", protein: 5, carbs: 5, fat: 16 },
    { name: "Tofu", calories: 144, category: "Protein", serving: "1 cup", protein: 16, carbs: 4, fat: 8 },
    { name: "Olive Oil", calories: 119, category: "Oil", serving: "1 tbsp", protein: 0, carbs: 0, fat: 14 }
];

// Recipe data for diet section
const recipes = {
    keto: [
        {
            title: "Keto Avocado Eggs",
            ingredients: [
                "2 eggs",
                "1/2 avocado, sliced",
                "Salt and pepper to taste"
            ],
            instructions: "1. Fry eggs to desired doneness.\n2. Plate with sliced avocado and bacon.\n3. Season with salt and pepper.",
            calories: 350,
            prepTime: "10 min",
            image: "https://heretocook.com/wp-content/uploads/2020/05/Keto-egg-salad-recipe-with-avocado-thumbnail.jpg",
            // NEW PROPERTY - Recipe macros
            macros: {
                protein: 15,
                carbs: 5,
                fat: 30
            }
        },
        {
            title: "Cauliflower Crust Pizza",
            ingredients: [
                "1 head cauliflower, riced",
                "1 egg",
                "1 cup mozzarella, divided",
                "Pepperoni, bell peppers (toppings)",
                "1/4 cup low-carb marinara"
            ],
            instructions: "1. Rice cauliflower and squeeze out moisture.\n2. Mix with egg and half the cheese to form crust.\n3. Bake until golden, then add toppings and remaining cheese.\n4. Bake until cheese melts.",
            calories: 420,
            prepTime: "30 min",
            image: "https://hips.hearstapps.com/hmg-prod/images/cauliflower-crust-pizza-index-6778185ec3d1e.jpg",
            // NEW PROPERTY - Recipe macros
            macros: {
                protein: 25,
                carbs: 12,
                fat: 32
            }
        },
        // NEW KETO RECIPE
        {
            title: "Keto Cheese Omelette",
            ingredients: [
                "3 large eggs",
                "1/3 cup shredded cheddar cheese",
                "1 tablespoon butter",
                "Salt and pepper to taste",
                "1 tablespoon chopped chives (optional)"
            ],
            instructions: "1. Whisk eggs in a bowl with salt and pepper.\n2. Melt butter in a non-stick pan over medium heat.\n3. Pour in eggs and cook until almost set.\n4. Sprinkle bacon and cheese over half the omelette.\n5. Fold over and cook until cheese melts.\n6. Garnish with chives if desired.",
            calories: 480,
            prepTime: "15 min",
            image: "https://sportsnacklove.com/wp-content/uploads/cheese_omelette-2-uai-2880x2160.jpg",
            macros: {
                protein: 30,
                carbs: 2,
                fat: 38
            }
        }
    ],
    mediterranean: [
        {
            title: "Greek Salad",
            ingredients: [
                "2 cups romaine lettuce, chopped",
                "1 cucumber, diced",
                "1 cup cherry tomatoes, halved",
                "1/2 red onion, thinly sliced",
                "1/2 cup feta cheese, crumbled",
                "1/4 cup kalamata olives",
                "2 tbsp olive oil",
                "1 tbsp lemon juice",
                "1 tsp oregano"
            ],
            instructions: "1. Combine all vegetables in a large bowl.\n2. Whisk together olive oil, lemon juice, and oregano.\n3. Toss salad with dressing.\n4. Top with feta cheese and olives.",
            calories: 320,
            prepTime: "15 min",
            image: "https://www.simplyrecipes.com/thmb/0NrKQlJ691l6L9tZXpL06uOuWis=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Easy-Greek-Salad-LEAD-2-4601eff771fd4de38f9722e8cafc897a.jpg",
            // NEW PROPERTY - Recipe macros
            macros: {
                protein: 8,
                carbs: 12,
                fat: 28
            }
        },
        {
            title: "Grilled Mediterranean Chicken",
            ingredients: [
                "2 chicken breasts",
                "2 tbsp olive oil",
                "2 cloves garlic, minced",
                "1 tbsp lemon juice",
                "1 tsp dried oregano",
                "1 tsp dried basil",
                "Salt and pepper to taste"
            ],
            instructions: "1. Mix olive oil, garlic, lemon juice, and herbs.\n2. Marinate chicken for at least 30 minutes.\n3. Grill chicken until internal temperature reaches 165°F.\n4. Let rest 5 minutes before serving.",
            calories: 380,
            prepTime: "45 min",
            image: "https://www.realfoodwithsarah.com/wp-content/uploads/2024/05/mediterranean-grilled-chicken.jpg",
            // NEW PROPERTY - Recipe macros
            macros: {
                protein: 42,
                carbs: 2,
                fat: 22
            }
        },
        // NEW MEDITERRANEAN RECIPE
        {
            title: "Mediterranean Quinoa Bowl",
            ingredients: [
                "1 cup cooked quinoa",
                "1/2 cup chickpeas, drained and rinsed",
                "1/2 cucumber, diced",
                "10 cherry tomatoes, halved",
                "1/4 cup red onion, finely diced",
                "2 tbsp fresh parsley, chopped",
                "2 tbsp olive oil",
                "1 tbsp lemon juice",
                "1/4 cup feta cheese, crumbled",
                "6 kalamata olives, sliced"
            ],
            instructions: "1. Place cooked quinoa in a bowl.\n2. Top with chickpeas, cucumber, tomatoes, and red onion.\n3. Whisk together olive oil, lemon juice, salt, and pepper.\n4. Drizzle dressing over bowl.\n5. Sprinkle with feta, olives, and parsley.",
            calories: 420,
            prepTime: "20 min",
            image: "https://www.fitmittenkitchen.com/wp-content/uploads/2022/02/Greek-Mediterranean-Quinoa-Power-Bowl-18.jpg",
            macros: {
                protein: 14,
                carbs: 45,
                fat: 22
            }
        }
    ],
    vegan: [
        {
            title: "Chickpea Buddha Bowl",
            ingredients: [
                "1 cup roasted chickpeas",
                "1 cup cooked quinoa",
                "1 avocado, sliced",
                "1 cup roasted sweet potatoes",
                "2 cups mixed greens",
                "2 tbsp tahini",
                "1 tbsp lemon juice",
                "1 tsp maple syrup"
            ],
            instructions: "1. Arrange quinoa, chickpeas, sweet potatoes, and greens in a bowl.\n2. Top with avocado slices.\n3. Whisk together tahini, lemon juice, and maple syrup.\n4. Drizzle dressing over bowl.",
            calories: 450,
            prepTime: "25 min",
            image: "https://www.simplyorganic.com/media/wysiwyg/tmp/simply-organic-recipe-roasted-chickpea-buddha-bowls-with-avocado-dressing-finished-1000x1000.jpg",
            // NEW PROPERTY - Recipe macros
            macros: {
                protein: 12,
                carbs: 65,
                fat: 18
            }
        },
        {
            title: "Vegan Lentil Soup",
            ingredients: [
                "1 cup dried lentils",
                "1 onion, diced",
                "2 carrots, diced",
                "2 celery stalks, diced",
                "3 cloves garlic, minced",
                "1 can diced tomatoes",
                "4 cups vegetable broth",
                "1 tsp cumin",
                "1 tsp paprika"
            ],
            instructions: "1. Sauté onion, carrots, celery, and garlic until soft.\n2. Add lentils, tomatoes, broth, and spices.\n3. Bring to a boil, then simmer for 25 minutes until lentils are tender.\n4. Season with salt and pepper to taste.",
            calories: 320,
            prepTime: "40 min",
            image: "https://www.eatingwell.com/thmb/AZdGSagOj8VtZPnpcVdD8ttRk3k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/vegan-lentil-stew-0b016185b40446ba98409c75dfeaef7f.jpg",
            // NEW PROPERTY - Recipe macros
            macros: {
                protein: 18,
                carbs: 52,
                fat: 2
            }
        },
        // NEW VEGAN RECIPE
        {
            title: "Vegan Protein Power Smoothie",
            ingredients: [
                "1 scoop vegan protein powder (vanilla)",
                "1 banana",
                "1 cup spinach",
                "1 tbsp almond butter",
                "1/2 cup frozen berries",
                "1 cup almond milk",
                "1 tsp chia seeds",
                "Ice cubes (optional)"
            ],
            instructions: "1. Add all ingredients to a blender.\n2. Blend until smooth and creamy.\n3. Add ice for a thicker consistency if desired.\n4. Pour into a glass and top with additional berries or chia seeds.",
            calories: 340,
            prepTime: "5 min",
            image: "https://www.wearesovegan.com/wp-content/uploads/2019/06/veganpeaproteinsmoothies.jpg",
            macros: {
                protein: 25,
                carbs: 42,
                fat: 10
            }
        }
    ],
    // NEW DIET TYPE - LOW CARB
    lowCarb: [
        {
            title: "Zucchini Noodles with Pesto",
            ingredients: [
                "3 medium zucchini",
                "2 tbsp olive oil",
                "2 cloves garlic, minced",
                "1/2 cup basil pesto",
                "1/4 cup pine nuts",
                "1/4 cup grated parmesan (optional)",
                "Salt and pepper to taste"
            ],
            instructions: "1. Spiralize zucchini to create zoodles.\n2. Heat olive oil in a pan over medium heat.\n3. Add garlic and sauté for 30 seconds.\n4. Add zoodles and cook for 2-3 minutes until slightly tender.\n5. Mix in pesto and toss to coat.\n6. Top with pine nuts and parmesan if using.",
            calories: 320,
            prepTime: "15 min",
            image: "https://www.eatingwell.com/thmb/L7-wBx0puzOiO8F-k6FoWxrdq1Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5528725-0a8046e2f56446e9b9b946161d74454c.jpg",
            macros: {
                protein: 8,
                carbs: 7,
                fat: 30
            }
        },
        {
            title: "Turkey Lettuce Wraps",
            ingredients: [
                "1 lb ground turkey",
                "1 tbsp olive oil",
                "1 small onion, diced",
                "2 cloves garlic, minced",
                "1 red bell pepper, diced",
                "1 tbsp soy sauce",
                "1 tbsp hoisin sauce",
                "1 tsp sriracha",
                "8 large lettuce leaves",
                "1/4 cup chopped peanuts",
                "2 green onions, sliced"
            ],
            instructions: "1. Heat oil in a large pan over medium heat.\n2. Add onion and garlic, sauté until fragrant.\n3. Add ground turkey and cook until browned.\n4. Add bell pepper and sauces, cook for 2-3 more minutes.\n5. Spoon mixture into lettuce leaves.\n6. Top with peanuts and green onions.",
            calories: 280,
            prepTime: "20 min",
            image: "https://www.allrecipes.com/thmb/xljKFByG0L_jNabAYS2eASQMAIE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/270054ground-turkey-lettuce-wrapsFranceC4x3-eb927d7ba68d4dd6847b8b43b1865ad1.jpg",
            macros: {
                protein: 25,
                carbs: 8,
                fat: 18
            }
        }
    ],
    // NEW DIET TYPE - HIGH PROTEIN
    highProtein: [
        {
            title: "Protein-Packed Chicken Meal Prep",
            ingredients: [
                "2 lbs chicken breast",
                "2 tbsp olive oil",
                "2 tsp garlic powder",
                "2 tsp paprika",
                "1 tsp oregano",
                "Salt and pepper to taste",
                "2 cups brown rice, cooked",
                "4 cups broccoli florets, steamed"
            ],
            instructions: "1. Preheat oven to 425°F.\n2. Season chicken with oil and spices.\n3. Bake for 20-25 minutes until internal temperature reaches 165°F.\n4. Divide cooked chicken, rice, and broccoli into meal prep containers.\n5. Refrigerate for up to 4 days.",
            calories: 430,
            prepTime: "35 min",
            image: "https://beatthebudget.com/wp-content/uploads/2021/02/best-chicken-meal-prep-main-featured-image-1.jpg",
            macros: {
                protein: 45,
                carbs: 30,
                fat: 12
            }
        },
        {
            title: "Triple Protein Smoothie Bowl",
            ingredients: [
                "1 scoop whey protein powder",
                "1/2 cup Greek yogurt",
                "1/2 cup cottage cheese",
                "1 frozen banana",
                "1/2 cup frozen berries",
                "1 tbsp chia seeds",
                "1 tbsp almond butter",
                "Toppings: nuts, seeds, berries"
            ],
            instructions: "1. Blend protein powder, yogurt, cottage cheese, banana, and berries until smooth.\n2. Pour into a bowl.\n3. Top with chia seeds, almond butter, and additional toppings.\n4. Serve immediately.",
            calories: 480,
            prepTime: "10 min",
            image: "https://fedandfit.com/wp-content/uploads/2021/11/211112_Protein-Smoothie-Bowl-7-500x375.jpg",
            macros: {
                protein: 42,
                carbs: 45,
                fat: 16
            }
        }
    ]
};

// Quick tips data
const quickTips = [
    "Stay hydrated! Aim to drink at least 8 glasses of water daily.",
    "Consistency is key. Even a 10-minute workout is better than no workout.",
    "Sleep is crucial for recovery. Aim for 7-8 hours each night.",
    "Add protein to every meal to support muscle growth and repair.",
    "Take rest days. Your body needs time to recover and grow stronger.",
    "Simple nutrition rule: eat real food, mostly plants, not too much.",
    "Track your progress, not just your weight. Note how you feel and perform.",
    "Pre-plan your meals for the week to avoid unhealthy last-minute choices.",
    "Focus on compound exercises for maximum efficiency.",
    "Reduce stress with meditation, deep breathing, or yoga.",
    "Small, consistent changes lead to sustainable results.",
    "Remember to warm up before and cool down after your workouts.",
    // NEW QUICK TIPS
    "Aim for a protein intake of about 1.6-2.2g per kg of body weight if building muscle.",
    "For weight loss, create a moderate calorie deficit of 500 calories per day.",
    "Try intermittent fasting: restrict eating to an 8-hour window for potential metabolic benefits.",
    "Eat slowly and mindfully - it takes about 20 minutes for your brain to register fullness.",
    "Progressive overload is essential - gradually increase weight, reps, or sets for continued progress.",
    "Consume complex carbs like whole grains, sweet potatoes, and oats for sustained energy.",
"A balanced diet should typically include 45-65% carbs, 10-35% protein, and 20-35% fat for general health.",
    "Include healthy fats from sources like avocados, nuts, and olive oil in your diet.",
    "To reduce soreness, try foam rolling or gentle stretching after intense workouts.",
    "Smoothies are a convenient way to increase protein and nutrient intake in a hurry.",
    "Women generally need about 46g of protein daily, while men need about 56g as a minimum."
];

// NEW DATA - Diet plan templates based on goal
const dietPlans = {
    "lose-weight": {
        dailyCalorieAdjustment: -500, // Calorie deficit
        macroRatio: {
            protein: 35, // Higher protein for satiety and muscle preservation
            carbs: 30,   // Lower carbs
            fat: 35      // Moderate fat
        },
        mealStructure: [
            { name: "Breakfast", portion: 0.25 },
            { name: "Lunch", portion: 0.35 },
            { name: "Dinner", portion: 0.3 },
            { name: "Snack", portion: 0.1 }
        ],
        recommendations: [
            "Focus on high-protein meals to maintain muscle and increase satiety",
            "Include plenty of fiber-rich vegetables to feel fuller longer",
            "Limit processed carbohydrates and added sugars",
            "Stay hydrated - sometimes thirst can be mistaken for hunger"
        ]
    },
    "build-muscle": {
        dailyCalorieAdjustment: 500, // Calorie surplus
        macroRatio: {
            protein: 30, // High protein for muscle building
            carbs: 50,   // Higher carbs for energy and recovery
            fat: 20      // Lower fat
        },
        mealStructure: [
            { name: "Breakfast", portion: 0.2 },
            { name: "Mid-Morning Snack", portion: 0.1 },
            { name: "Lunch", portion: 0.25 },
            { name: "Pre-Workout Snack", portion: 0.1 },
            { name: "Post-Workout Meal", portion: 0.2 },
            { name: "Dinner", portion: 0.15 }
        ],
        recommendations: [
            "Consume 1.6-2.2g of protein per kg of bodyweight",
            "Eat carbohydrates before and after workouts to fuel performance and recovery",
            "Include 3-6 meals per day to maintain positive protein balance",
            "Consider a protein shake within 30 minutes after your workout"
        ]
    },
    "maintain": {
        dailyCalorieAdjustment: 0, // Maintenance calories
        macroRatio: {
            protein: 25,
            carbs: 45,
            fat: 30
        },
        mealStructure: [
            { name: "Breakfast", portion: 0.25 },
            { name: "Lunch", portion: 0.3 },
            { name: "Dinner", portion: 0.3 },
            { name: "Snack", portion: 0.15 }
        ],
        recommendations: [
            "Maintain a balanced approach to macronutrients",
            "Practice portion control and mindful eating",
            "Include a variety of foods to ensure adequate micronutrient intake",
            "Adjust calorie intake based on activity level each day"
        ]
    }
};

// NEW DATA - Workout plans based on goal
const workoutPlans = {
    "lose-weight": {
        focus: "Cardiovascular and high-intensity training with strength components",
        weeklyStructure: [
            { day: "Monday", workout: "Cardio Blast", type: "High-intensity cardio" },
            { day: "Tuesday", workout: "Full Body HIIT", type: "Circuit training" },
            { day: "Wednesday", workout: "Active Recovery", type: "Light walking or yoga" },
            { day: "Thursday", workout: "Metabolic Conditioning", type: "Interval training" },
            { day: "Friday", workout: "Core Crusher", type: "Core-focused" },
            { day: "Saturday", workout: "High Intensity Fat Burner", type: "Cardio intervals" },
            { day: "Sunday", workout: "Rest or Mobility", type: "Recovery" }
        ],
        recommendations: [
            "Focus on high-intensity interval training (HIIT) to maximize calorie burn",
            "Include strength training to preserve muscle mass during weight loss",
            "Aim for 3-5 cardio sessions per week, 20-45 minutes each",
            "Add regular low-intensity activity like walking throughout the day"
        ]
    },
    "build-muscle": {
        focus: "Progressive resistance training with adequate recovery",
        weeklyStructure: [
            { day: "Monday", workout: "Upper Body Strength", type: "Push muscles" },
            { day: "Tuesday", workout: "Lower Body Burn", type: "Legs and core" },
            { day: "Wednesday", workout: "Active Recovery", type: "Light cardio or mobility" },
            { day: "Thursday", workout: "Full Body Muscle Builder", type: "Compound lifts" },
            { day: "Friday", workout: "Upper Body Strength", type: "Pull muscles" },
            { day: "Saturday", workout: "Progressive Muscle Builder", type: "Hypertrophy focus" },
            { day: "Sunday", workout: "Complete Rest", type: "Recovery" }
        ],
        recommendations: [
            "Focus on progressive overload - gradually increasing weights or reps",
            "Prioritize compound movements like squats, deadlifts, and presses",
            "Allow 48 hours of recovery between training the same muscle group",
            "Include both strength (heavy weight, lower reps) and hypertrophy (moderate weight, higher reps) training"
        ]
    }
};

// NEW CODE START - Enhanced userData with additional fields for calorie reset
let userData = {
    username: "",
    isLoggedIn: false,
    goal: "",
    weight: 0,
    weightUnit: "kg",
    // NEW PROPERTY - For BMI calculation
    height: 0,
    heightUnit: "cm",
    streak: 0,
    lastLogin: null,
    completedWorkouts: [],
    badges: {
        quickstarter: false,
        onFire: false,
        powerUser: false
    },
    // New properties for calorie tracking feature
    calorieGoal: 2000,
    calorieData: {
        consumed: 0,
        burned: 0
    },
    // NEW PROPERTY - For tracking macros
    macroGoals: {
        protein: 30, // Percentage
        carbs: 40,   // Percentage
        fat: 30      // Percentage
    },
    // NEW PROPERTY - For tracking daily macros
    dailyMacros: {
        protein: 0,
        carbs: 0,
        fat: 0
    },
    meals: [],
    // Meal history for archiving past days
    mealHistory: {},
    // Last updated date for calorie reset (YYYY-MM-DD format)
    lastUpdatedDate: new Date().toISOString().split('T')[0],
    // New properties for workout calendar feature
    events: [],
    // New properties for workout detection
    workoutDetection: {
        isActive: false,
        startTime: null,
        duration: 0,
        lastUpdate: null,
        detectedMovements: 0
    },
    // NEW PROPERTY - Weight history for goal prediction
    weightHistory: [],
    // NEW PROPERTY - Selected diet type
    selectedDiet: "balanced",
    // NEW PROPERTY - Personal meal plan
    mealPlan: []
};
// NEW CODE END

// NEW CODE START - Enhanced checkLoginStatus with improved username handling
function checkLoginStatus() {
    try {
        const storedData = localStorage.getItem('quickFitUserData');
        
        if (storedData) {
            // Try to decode the data first
            let parsedData;
            try {
                const dataString = atob(storedData);
                parsedData = JSON.parse(dataString);
            } catch (e) {
                // For backward compatibility with non-encoded data
                parsedData = JSON.parse(storedData);
            }
            
            userData = parsedData;
            
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
                        
                        // Check for Power User badge (10-day streak)
                        if (userData.streak >= 10 && !userData.badges.powerUser) {
                            userData.badges.powerUser = true;
                            
                            // Show badge after dashboard loads
                            setTimeout(() => {
                                showBadgeAchievement('Power User', 'You\'ve logged in for 10 consecutive days!');
                            }, 1000);
                        }
                        
                        // NEW CODE - Show streak fire if streak > 0
                        const streakFire = document.getElementById('streak-fire');
                        if (streakFire && userData.streak > 0) {
                            streakFire.classList.remove('hidden');
                            
                            // Add extra classes for longer streaks
                            if (userData.streak >= 30) {
                                streakFire.classList.add('inferno');
                            } else if (userData.streak >= 20) {
                                streakFire.classList.add('blazing');
                            } else if (userData.streak >= 10) {
                                streakFire.classList.add('hot');
                            } else {
                                streakFire.classList.add('active');
                            }
                        }
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
        }
    } catch (e) {
        console.error("Error parsing stored user data:", e);
        clearUserData();
    }
    
    // Show login screen by default
    showLoginScreen();
}
// NEW CODE END

// NEW CODE START - Enhanced saveUserData with lastUpdatedDate
function saveUserData() {
    try {
        // Add last updated date for calorie tracking
        if (!userData.lastUpdatedDate) {
            userData.lastUpdatedDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        }
        
        // Convert to JSON string
        const dataString = JSON.stringify(userData);
        
        // Simple encoding (not truly secure but better than plaintext)
        const encodedData = btoa(dataString);
        
        localStorage.setItem('quickFitUserData', encodedData);
    } catch (e) {
        console.error("Error saving user data:", e);
        // Show error notification to user
        showNotification('Error saving your data. Please try again.', 'error');
    }
}
// NEW CODE END

// Load user data from localStorage with decryption
function loadUserData() {
    try {
        const encodedData = localStorage.getItem('quickFitUserData');
        
        if (encodedData) {
            // Decode the data
            const dataString = atob(encodedData);
            
            // Parse the JSON
            const parsedData = JSON.parse(dataString);
            
            // Validate data structure before assigning
            if (parsedData && typeof parsedData === 'object' && parsedData.username) {
                userData = parsedData;
                return true;
            }
        }
        return false;
    } catch (e) {
        console.error("Error loading user data:", e);
        return false;
    }
}

// NEW CODE START - Updated clearUserData with new fields
function clearUserData() {
    localStorage.removeItem('quickFitUserData');
    userData = {
        username: "",
        isLoggedIn: false,
        goal: "",
        weight: 0,
        weightUnit: "kg",
        height: 0,
        heightUnit: "cm",
        streak: 0,
        lastLogin: null,
        completedWorkouts: [],
        badges: {
            quickstarter: false,
            onFire: false,
            powerUser: false
        },
        calorieGoal: 2000,
        calorieData: {
            consumed: 0,
            burned: 0
        },
        macroGoals: {
            protein: 30,
            carbs: 40,
            fat: 30
        },
        dailyMacros: {
            protein: 0,
            carbs: 0,
            fat: 0
        },
        meals: [],
        mealHistory: {},
        lastUpdatedDate: new Date().toISOString().split('T')[0],
        events: [],
        workoutDetection: {
            isActive: false,
            startTime: null,
            duration: 0,
            lastUpdate: null,
            detectedMovements: 0
        },
        weightHistory: [],
        selectedDiet: "balanced",
        mealPlan: []
    };
}
// NEW CODE END

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
    document.getElementById('user-greeting').textContent = userData.username || 'there';
    
    // Show first step
    document.getElementById('goal-selection').classList.remove('hidden');
    document.getElementById('weight-input').classList.add('hidden');
    document.getElementById('calorie-goal-input').classList.add('hidden');
    
    // NEW CODE - Also hide height input initially
    document.getElementById('height-input').classList.add('hidden');
}

// Show Dashboard Screen
function showDashboard() {
    loginScreen.classList.add('hidden');
    onboardingScreen.classList.add('hidden');
    dashboardScreen.classList.remove('hidden');
    
    // Update user data on dashboard
    updateDashboardData();
    
    // Initialize navigation
    initNavigation();
    
    // Load workouts
    loadWorkoutLibrary();
    
    // Set random daily workout
    setDailyWorkout();

    // Initialize calorie tracker
    initCalorieTracker();
    
    // Initialize calendar
    initCalendar();
    
    // Initialize diet section
    loadDietSection();
    
    // Initialize workout detection
    initWorkoutDetection();
    
    // Load random quick tip
    loadRandomQuickTip();
    
    // NEW CODE - Initialize meal plan
    initializeMealPlan();
    
    // NEW CODE - Calculate and display BMI
    calculateAndDisplayBMI();
    
    // NEW CODE - Initialize weight goal prediction
    initializeWeightPrediction();
    
    // Set current section to home
    navigateToSection('home');
    
    // NEW CODE - Show streak fire if applicable
    updateStreakFire();
}

// Initialize navigation tabs
function initNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    if (navTabs.length === 0) return; // Navigation not yet implemented in HTML
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const sectionId = e.currentTarget.dataset.section;
            navigateToSection(sectionId);
        });
    });
}

// Navigate to specific section
function navigateToSection(sectionId) {
    if (!sectionId) return;
    
    // Update current section
    currentSection = sectionId;
    
    // Update active tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
        if (tab.dataset.section === sectionId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show current section
    const currentSectionElement = document.getElementById(`${sectionId}-section`);
    if (currentSectionElement) {
        currentSectionElement.classList.remove('hidden');
    }
}

// Load random quick tip
function loadRandomQuickTip() {
    const tipContainer = document.querySelector('.tip-container');
    if (!tipContainer) return;
    
    // Get a random tip
    const randomIndex = Math.floor(Math.random() * quickTips.length);
    const randomTip = quickTips[randomIndex];
    
    // Create tip element
    const tipElement = document.createElement('div');
    tipElement.className = 'tip';
    tipElement.innerHTML = `
        <i class="fas fa-lightbulb"></i>
        <p>${randomTip}</p>
    `;
    
    // Clear existing tips and add new one
    tipContainer.innerHTML = '';
    tipContainer.appendChild(tipElement);
}

// Update dashboard with user data
function updateDashboardData() {
    // Update user name
    const userNameElements = document.querySelectorAll('.user-name-display');
    userNameElements.forEach(el => {
        el.textContent = userData.username || 'Fitness Fan';
    });
    
    document.getElementById('profile-name').textContent = userData.username || 'User';
    
    // Update weight display
    document.getElementById('display-weight').textContent = userData.weight;
    document.getElementById('display-unit').textContent = userData.weightUnit;
    
    // Update goal display
    document.getElementById('display-goal').textContent = 
        userData.goal === 'lose-weight' ? 'Lose Weight' : 'Build Muscle';
    
    // Update streak
    document.getElementById('streak-count').textContent = userData.streak;
    
    // Update weekly progress (simulate based on completed workouts)
    updateWeeklyProgress();
    
    // Update badges
    updateBadgesDisplay();
    
    // Update calorie displays
    updateCalorieDisplays();
    
    // Update upcoming schedule
    updateUpcomingSchedule();
    
    // NEW CODE - Update BMI display
    updateBMIDisplay();
    
    // NEW CODE - Update streak fire display
    updateStreakFire();
}

// NEW CODE - Update streak fire based on streak count
function updateStreakFire() {
    const streakFire = document.getElementById('streak-fire');
    if (!streakFire) return;
    
    if (userData.streak > 0) {
        streakFire.classList.remove('hidden');
        
        // Reset all classes first
        streakFire.classList.remove('active', 'hot', 'blazing', 'inferno');
        
        // Add appropriate class based on streak length
        if (userData.streak >= 30) {
            streakFire.classList.add('inferno');
        } else if (userData.streak >= 20) {
            streakFire.classList.add('blazing');
        } else if (userData.streak >= 10) {
            streakFire.classList.add('hot');
        } else {
            streakFire.classList.add('active');
        }
    } else {
        streakFire.classList.add('hidden');
    }
}

// Update weekly progress
function updateWeeklyProgress() {
    const progressFill = document.getElementById('weekly-progress');
    const progressPercentage = document.querySelector('.progress-percentage');
    
    if (!progressFill || !progressPercentage) return;
    
    // Calculate progress based on completed workouts this week
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Count workouts from this week
    const workoutsThisWeek = userData.completedWorkouts.filter(dateStr => {
        const workoutDate = new Date(dateStr);
        return workoutDate >= startOfWeek;
    }).length;
    
    // Assume goal is 5 workouts per week
    const weeklyGoal = 5;
    let progress = Math.min(100, Math.round((workoutsThisWeek / weeklyGoal) * 100));
    
    // Update UI
    progressFill.style.width = `${progress}%`;
    progressPercentage.textContent = `${progress}%`;
}

// Update upcoming schedule
function updateUpcomingSchedule() {
    const scheduleList = document.querySelector('.schedule-list');
    if (!scheduleList) return;
    
    // Clear existing schedule
    scheduleList.innerHTML = '';
    
    // Get today and next few days
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);
    
    // Format dates for comparison
    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    const dayAfterTomorrowStr = dayAfterTomorrow.toISOString().split('T')[0];
    
    // Get events for these days
    const todayEvents = userData.events.filter(event => event.date === todayStr && event.type === 'workout');
    const tomorrowEvents = userData.events.filter(event => event.date === tomorrowStr && event.type === 'workout');
    const dayAfterTomorrowEvents = userData.events.filter(event => event.date === dayAfterTomorrowStr && event.type === 'workout');
    
    // NEW CODE - Get goal-specific workouts from the plan if available
    let workoutPlan = [];
    if (userData.goal && workoutPlans[userData.goal]) {
        workoutPlan = workoutPlans[userData.goal].weeklyStructure;
    }
    
    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    const todayDayIndex = today.getDay();
    const tomorrowDayIndex = (todayDayIndex + 1) % 7;
    const dayAfterTomorrowDayIndex = (todayDayIndex + 2) % 7;
    
    // Create schedule items
    const scheduleItems = [
        { 
            day: 'Today', 
            events: todayEvents.length > 0 ? todayEvents : 
                    (workoutPlan.length > 0 ? [{ title: workoutPlan[todayDayIndex].workout }] : [{ title: 'Workout of the Day' }])
        },
        { 
            day: 'Tomorrow', 
            events: tomorrowEvents.length > 0 ? tomorrowEvents : 
                    (workoutPlan.length > 0 ? [{ title: workoutPlan[tomorrowDayIndex].workout }] : [{ title: 'Core Strength' }])
        },
        { 
            day: dayAfterTomorrow.toLocaleDateString('en-US', { weekday: 'long' }), 
            events: dayAfterTomorrowEvents.length > 0 ? dayAfterTomorrowEvents : 
                    (workoutPlan.length > 0 ? [{ title: workoutPlan[dayAfterTomorrowDayIndex].workout }] : [{ title: 'Rest Day' }])
        }
    ];
    
    // Add to schedule list
    scheduleItems.forEach(item => {
        const workout = item.events[0];
        const li = document.createElement('li');
        li.className = 'schedule-item';
        li.innerHTML = `
            <div class="schedule-day">${item.day}</div>
            <div class="schedule-workout">${workout.title}</div>
        `;
        scheduleList.appendChild(li);
    });
}

// Update badges display
function updateBadgesDisplay() {
    // QuickStarter badge
    if (userData.badges.quickstarter) {
        const quickstarterBadge = document.getElementById('quickstarter-badge');
        if (quickstarterBadge) {
            quickstarterBadge.classList.remove('locked');
            const badgeIcon = quickstarterBadge.querySelector('.badge-icon');
            if (badgeIcon) badgeIcon.classList.remove('locked');
        }
    }
    
    // On Fire badge
    if (userData.badges.onFire) {
        const onFireBadge = document.getElementById('on-fire-badge');
        if (onFireBadge) {
            onFireBadge.classList.remove('locked');
            const badgeIcon = onFireBadge.querySelector('.badge-icon');
            if (badgeIcon) badgeIcon.classList.remove('locked');
        }
    }
    
    // Power User badge
    if (userData.badges.powerUser) {
        const powerUserBadge = document.getElementById('power-user-badge');
        if (powerUserBadge) {
            powerUserBadge.classList.remove('locked');
            const badgeIcon = powerUserBadge.querySelector('.badge-icon');
            if (badgeIcon) badgeIcon.classList.remove('locked');
        }
    }
}

// Load workout library
function loadWorkoutLibrary() {
    const workoutGrid = document.getElementById('workout-grid');
    if (!workoutGrid) return;
    
    workoutGrid.innerHTML = '';
    
    // Get the current filter
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
    
    // NEW CODE - Filter workouts by goal and difficulty
    let filteredWorkouts = workouts;
    
    // Apply difficulty filter
    if (activeFilter !== 'all') {
        filteredWorkouts = filteredWorkouts.filter(workout => workout.difficulty === activeFilter);
    }
    
    // NEW CODE - Apply goal filter if a goal is selected
    if (userData.goal && userData.goal !== 'maintain') {
        // First include workouts specific to user's goal
        let goalWorkouts = filteredWorkouts.filter(workout => 
            workout.goalType === userData.goal || workout.goalType === 'both'
        );
        
        // If too few workouts match goal, add some general ones
        if (goalWorkouts.length < 4) {
            const generalWorkouts = filteredWorkouts.filter(workout => 
                workout.goalType !== userData.goal && workout.goalType !== 'both'
            );
            
            // Add general workouts until we have at least 4
            while (goalWorkouts.length < 4 && generalWorkouts.length > 0) {
                goalWorkouts.push(generalWorkouts.shift());
            }
        }
        
        filteredWorkouts = goalWorkouts;
    }
    
    // Create workout cards
    filteredWorkouts.forEach(workout => {
        const workoutCard = createWorkoutCard(workout);
        workoutGrid.appendChild(workoutCard);
    });
    
    // NEW CODE - Add goal filter buttons
    const sectionFilters = document.querySelector('.section-filters');
    if (sectionFilters && !document.querySelector('.goal-filter-btn')) {
        const goalFiltersDiv = document.createElement('div');
        goalFiltersDiv.className = 'goal-filters';
        goalFiltersDiv.innerHTML = `
            <button class="goal-filter-btn ${!userData.goal ? 'active' : ''}" data-goal="all">All Workouts</button>
            <button class="goal-filter-btn ${userData.goal === 'lose-weight' ? 'active' : ''}" data-goal="lose-weight">Weight Loss</button>
            <button class="goal-filter-btn ${userData.goal === 'build-muscle' ? 'active' : ''}" data-goal="build-muscle">Muscle Building</button>
        `;
        
        sectionFilters.appendChild(goalFiltersDiv);
        
        // Add event listeners to goal filter buttons
        document.querySelectorAll('.goal-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.goal-filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const goalFilter = btn.dataset.goal;
                if (goalFilter === 'all') {
                    userData.goal = '';
                } else {
                    userData.goal = goalFilter;
                }
                
                saveUserData();
                loadWorkoutLibrary();
            });
        });
    }
}

// Create workout card element
function createWorkoutCard(workout) {
    const card = document.createElement('div');
    card.className = 'workout-card';
    card.dataset.workoutId = workout.id;
    
    // NEW CODE - Add goal type badge
    let goalBadge = '';
    if (workout.goalType === 'lose-weight') {
        goalBadge = '<div class="workout-goal-badge weight-loss">Weight Loss</div>';
    } else if (workout.goalType === 'build-muscle') {
        goalBadge = '<div class="workout-goal-badge muscle-gain">Muscle Gain</div>';
    } else if (workout.goalType === 'both') {
        goalBadge = '<div class="workout-goal-badge general">General Fitness</div>';
    }
    
    card.innerHTML = `
        <div class="workout-thumbnail">
            <img src="${workout.thumbnail}" alt="${workout.title}">
            <div class="workout-difficulty">${workout.difficulty}</div>
            ${goalBadge}
        </div>
        <div class="workout-content">
            <h3>${workout.title}</h3>
            <p>${workout.description}</p>
            <div class="workout-meta">
                <span><i class="fas fa-clock"></i> ${workout.duration}</span>
                <span><i class="fas fa-fire"></i> ${workout.calories} calories</span>
            </div>
        </div>
    `;
    
    // Add click event
    card.addEventListener('click', () => {
        showWorkoutDetails(workout);
    });
    
    return card;
}

// Set daily workout
function setDailyWorkout() {
    // NEW CODE - Use goal to select appropriate workout
    let eligibleWorkouts = workouts;
    
    if (userData.goal && userData.goal !== 'maintain') {
        // Filter workouts that match the user's goal or are suitable for both goals
        eligibleWorkouts = workouts.filter(workout => 
            workout.goalType === userData.goal || workout.goalType === 'both'
        );
        
        // If no eligible workouts found, use all workouts
        if (eligibleWorkouts.length === 0) {
            eligibleWorkouts = workouts;
        }
    }
    
// Use deterministic selection based on date
const today = new Date().toDateString();
const seed = hashString(today);
const randomIndex = seed % eligibleWorkouts.length;
const dailyWorkout = eligibleWorkouts[randomIndex];

const dailyWorkoutTitle = document.getElementById('daily-workout-title');
const dailyWorkoutDesc = document.getElementById('daily-workout-desc');
const workoutThumbnail = document.querySelector('.workout-of-day .video-placeholder');

if (dailyWorkoutTitle) dailyWorkoutTitle.textContent = dailyWorkout.title;
if (dailyWorkoutDesc) dailyWorkoutDesc.textContent = dailyWorkout.description;
if (workoutThumbnail) workoutThumbnail.src = dailyWorkout.thumbnail;

// NEW CODE - Generate workout instructions if not available
setupWorkoutInstructions(dailyWorkout);

setupDailyWorkoutClick(dailyWorkout);
}

// NEW CODE - Generate and display workout instructions
function setupWorkoutInstructions(workout) {
const instructionsContainer = document.getElementById('workout-instructions-container');
const instructionsList = document.getElementById('workout-instructions');

if (!instructionsContainer || !instructionsList) return;

// Show the instructions container
instructionsContainer.classList.remove('hidden');
instructionsList.innerHTML = '';

// Generate exercise list based on workout type
const exercises = generateExercisesForWorkout(workout);

// Add exercises to list
exercises.forEach(exercise => {
    const li = document.createElement('li');
    li.className = 'instruction-item';
    li.innerHTML = `
        <div class="instruction-exercise">${exercise.name}</div>
        <div class="instruction-details">
            <span>${exercise.sets} sets</span>
            <span>${exercise.reps}</span>
        </div>
    `;
    instructionsList.appendChild(li);
});
}

// NEW CODE - Generate exercises based on workout type
function generateExercisesForWorkout(workout) {
// Default exercises if none specified
const exercises = [];

// Different exercises based on workout goal and difficulty
if (workout.goalType === 'lose-weight') {
    if (workout.difficulty === 'beginner') {
        exercises.push(
            {name: "Jumping Jacks", sets: 3, reps: "30 seconds"},
            {name: "Body Weight Squats", sets: 3, reps: "12 reps"},
            {name: "Push-ups (modified ok)", sets: 3, reps: "8-10 reps"},
            {name: "Walking Lunges", sets: 2, reps: "10 each leg"},
            {name: "Plank", sets: 3, reps: "20 seconds"}
        );
    } else if (workout.difficulty === 'intermediate') {
        exercises.push(
            {name: "High Knees", sets: 3, reps: "45 seconds"},
            {name: "Jump Squats", sets: 4, reps: "15 reps"},
            {name: "Mountain Climbers", sets: 3, reps: "30 seconds"},
            {name: "Burpees", sets: 3, reps: "10 reps"},
            {name: "Russian Twists", sets: 3, reps: "20 reps"}
        );
    } else { // advanced
        exercises.push(
            {name: "Burpee with Push-up", sets: 4, reps: "12 reps"},
            {name: "Plyometric Lunges", sets: 3, reps: "12 each leg"},
            {name: "Mountain Climbers", sets: 4, reps: "45 seconds"},
            {name: "Jumping Squats", sets: 4, reps: "20 reps"},
            {name: "Bicycle Crunches", sets: 3, reps: "30 reps"}
        );
    }
} else if (workout.goalType === 'build-muscle') {
    if (workout.difficulty === 'beginner') {
        exercises.push(
            {name: "Dumbbell Squats", sets: 3, reps: "12 reps"},
            {name: "Dumbbell Bench Press", sets: 3, reps: "10 reps"},
            {name: "Bent-Over Rows", sets: 3, reps: "10 reps"},
            {name: "Dumbbell Shoulder Press", sets: 3, reps: "10 reps"},
            {name: "Dumbbell Bicep Curls", sets: 3, reps: "12 reps"}
        );
    } else if (workout.difficulty === 'intermediate') {
        exercises.push(
            {name: "Goblet Squats", sets: 4, reps: "12 reps"},
            {name: "Dumbbell Chest Fly", sets: 3, reps: "12 reps"},
            {name: "One-Arm Dumbbell Rows", sets: 3, reps: "12 each arm"},
            {name: "Lateral Raises", sets: 3, reps: "15 reps"},
            {name: "Tricep Extensions", sets: 3, reps: "12 reps"}
        );
    } else { // advanced
        exercises.push(
            {name: "Bulgarian Split Squats", sets: 4, reps: "10 each leg"},
            {name: "Incline Dumbbell Press", sets: 4, reps: "10 reps"},
            {name: "Weighted Pull-ups", sets: 4, reps: "8 reps"},
            {name: "Arnold Press", sets: 3, reps: "10 reps"},
            {name: "Skull Crushers", sets: 3, reps: "12 reps"}
        );
    }
} else { // general fitness
    if (workout.difficulty === 'beginner') {
        exercises.push(
            {name: "Bodyweight Squats", sets: 3, reps: "15 reps"},
            {name: "Push-ups", sets: 3, reps: "10 reps"},
            {name: "Plank", sets: 3, reps: "30 seconds"},
            {name: "Jumping Jacks", sets: 3, reps: "30 seconds"},
            {name: "Glute Bridges", sets: 3, reps: "15 reps"}
        );
    } else if (workout.difficulty === 'intermediate') {
        exercises.push(
            {name: "Alternating Lunges", sets: 3, reps: "12 each leg"},
            {name: "Tricep Dips", sets: 3, reps: "12 reps"},
            {name: "V-Ups", sets: 3, reps: "15 reps"},
            {name: "High Knees", sets: 3, reps: "30 seconds"},
            {name: "Lateral Lunges", sets: 3, reps: "10 each side"}
        );
    } else { // advanced
        exercises.push(
            {name: "Single-Leg Deadlifts", sets: 3, reps: "10 each leg"},
            {name: "Decline Push-ups", sets: 3, reps: "15 reps"},
            {name: "Side Plank with Rotation", sets: 3, reps: "10 each side"},
            {name: "Burpees", sets: 3, reps: "15 reps"},
            {name: "Pistol Squats", sets: 3, reps: "8 each leg"}
        );
    }
}

return exercises;
}

// Setup daily workout click handlers
function setupDailyWorkoutClick(dailyWorkout) {
const playButton = document.querySelector('.workout-of-day .play-button');
if (!playButton) return;

// Remove any existing event listeners
const newPlayButton = playButton.cloneNode(true);
playButton.parentNode.replaceChild(newPlayButton, playButton);

// Add new event listener
newPlayButton.addEventListener('click', () => {
    openVideoModal(dailyWorkout.videoUrl);
});

// Complete workout button
const completeWorkoutBtn = document.getElementById('complete-workout');
if (completeWorkoutBtn) {
    // Remove any existing event listeners
    const newCompleteBtn = completeWorkoutBtn.cloneNode(true);
    completeWorkoutBtn.parentNode.replaceChild(newCompleteBtn, completeWorkoutBtn);
    
    // Add new event listener
    newCompleteBtn.addEventListener('click', () => {
        completeWorkout(dailyWorkout);
    });
}
}

// Open video modal
function openVideoModal(videoUrl) {
const modal = document.getElementById('video-modal');
const frame = document.getElementById('video-frame');

if (!modal || !frame) return;

frame.src = videoUrl;
modal.classList.remove('hidden');

// Add event listener to close button if not already added
const closeBtn = document.getElementById('close-video');
if (closeBtn) {
    // Remove any existing event listeners
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
    
    // Add new event listener
    newCloseBtn.addEventListener('click', closeVideoModal);
}
}

// Close video modal
function closeVideoModal() {
const modal = document.getElementById('video-modal');
const frame = document.getElementById('video-frame');

if (!modal || !frame) return;

// Stop video playback by clearing the src
frame.src = '';
modal.classList.add('hidden');
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

// Show workout details and video
function showWorkoutDetails(workout) {
openVideoModal(workout.videoUrl);

// NEW CODE - Show workout instructions in the modal
const workoutDetailsContainer = document.getElementById('workout-details-container');
if (workoutDetailsContainer) {
    workoutDetailsContainer.innerHTML = '';
    workoutDetailsContainer.classList.remove('hidden');
    
    // Generate exercises for this workout
    const exercises = generateExercisesForWorkout(workout);
    
    // Create container with workout details
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'modal-workout-details';
    
    let exerciseHTML = exercises.map(ex => 
        `<li class="workout-exercise-item">
            <div class="exercise-name">${ex.name}</div>
            <div class="exercise-details">${ex.sets} sets × ${ex.reps}</div>
        </li>`
    ).join('');
    
    detailsDiv.innerHTML = `
        <h3>${workout.title}</h3>
        <div class="workout-details-meta">
            <span><i class="fas fa-clock"></i> ${workout.duration}</span>
            <span><i class="fas fa-fire"></i> ${workout.calories} calories</span>
            <span><i class="fas fa-dumbbell"></i> ${workout.difficulty}</span>
        </div>
        <p>${workout.description}</p>
        <div class="workout-exercises">
            <h4><i class="fas fa-list-check"></i> Exercise Plan</h4>
            <ul class="workout-exercise-list">
                ${exerciseHTML}
            </ul>
        </div>
        <button id="modal-complete-workout" class="primary-btn">Mark as Complete</button>
        <button id="modal-share-workout" class="secondary-btn"><i class="fas fa-share-alt"></i> Share Workout</button>
    `;
    
    workoutDetailsContainer.appendChild(detailsDiv);
    
    // Add event listeners to buttons
    const completeBtn = document.getElementById('modal-complete-workout');
    if (completeBtn) {
        completeBtn.addEventListener('click', () => {
            closeVideoModal();
            completeWorkout(workout);
        });
    }
    
    // NEW CODE - Add share workout functionality
    const shareBtn = document.getElementById('modal-share-workout');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            shareWorkout(workout);
        });
    }
}
}

// NEW CODE - Share Workout function
function shareWorkout(workout) {
// Create share content
const shareTitle = `Check out this "${workout.title}" workout on QuickFit!`;
const shareText = `I'm using QuickFit to track my fitness. Try this ${workout.difficulty} level workout: ${workout.title} (${workout.duration}, ~${workout.calories} calories)`;

// Try to use Web Share API if available
if (navigator.share) {
    navigator.share({
        title: shareTitle,
        text: shareText
    })
    .catch(error => {
        console.log('Sharing failed:', error);
        showShareFallback(shareTitle, shareText);
    });
} else {
    // Fallback for browsers that don't support Web Share API
    showShareFallback(shareTitle, shareText);
}
}

// NEW CODE - Show fallback share dialog
function showShareFallback(title, text) {
// Create the modal for sharing if it doesn't exist
if (!document.getElementById('share-workout-modal')) {
    const shareModal = document.createElement('div');
    shareModal.id = 'share-workout-modal';
    shareModal.className = 'modal-container hidden';
    
    shareModal.innerHTML = `
        <div class="modal-content share-modal-content">
            <div class="modal-header">
                <h3>Share This Workout</h3>
                <button id="close-share-workout-modal" class="close-btn" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="share-content">
                <p class="share-workout-text"></p>
                <div class="share-options">
                    <button class="share-option copy-option">
                        <i class="fas fa-copy"></i>
                        Copy Text
                    </button>
                    <a class="share-option twitter-option" target="_blank">
                        <i class="fab fa-twitter"></i>
                        Twitter
                    </a>
                    <a class="share-option facebook-option" target="_blank">
                        <i class="fab fa-facebook"></i>
                        Facebook
                    </a>
                    <a class="share-option email-option">
                        <i class="fas fa-envelope"></i>
                        Email
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(shareModal);
    
    // Add event listener to close button
    document.getElementById('close-share-workout-modal').addEventListener('click', () => {
        document.getElementById('share-workout-modal').classList.add('hidden');
    });
    
    // Copy text button
    const copyBtn = shareModal.querySelector('.copy-option');
    copyBtn.addEventListener('click', () => {
        const textToCopy = shareModal.querySelector('.share-workout-text').textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('Text copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Failed to copy text.', 'error');
        });
    });
}

// Update modal content
const shareModal = document.getElementById('share-workout-modal');
const shareText = shareModal.querySelector('.share-workout-text');
shareText.textContent = text;

// Update social media links
const twitterLink = shareModal.querySelector('.twitter-option');
const facebookLink = shareModal.querySelector('.facebook-option');
const emailLink = shareModal.querySelector('.email-option');

twitterLink.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
emailLink.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text)}`;

// Show the modal
shareModal.classList.remove('hidden');
}

// Show badge achievement
function showBadgeAchievement(badgeName, description) {
// Update badge popup content
document.getElementById('badge-name').textContent = badgeName;
document.getElementById('badge-description').textContent = description;

// Show badge overlay
badgeOverlay.classList.remove('hidden');

// Set up close button if not already
const closeButton = document.getElementById('close-badge');
if (closeButton) {
    // Remove existing event listener
    const newCloseButton = closeButton.cloneNode(true);
    closeButton.parentNode.replaceChild(newCloseButton, closeButton);
    
    // Add new event listener
    newCloseButton.addEventListener('click', () => {
        badgeOverlay.classList.add('hidden');
    });
}
}

// Complete workout and possibly award badge
function completeWorkout(workout) {
// Add current date to completed workouts
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
userData.completedWorkouts.push(today);

// Award QuickStarter badge if first workout
if (!userData.badges.quickstarter && userData.completedWorkouts.length === 1) {
    userData.badges.quickstarter = true;
    showBadgeAchievement('QuickStarter', 'You completed your first workout!');
}

// Award On Fire badge for 5 consecutive days with workouts
if (!userData.badges.onFire && userData.completedWorkouts.length >= 5) {
    // Check if last 5 workouts are on consecutive days
    const lastFiveWorkouts = [...userData.completedWorkouts].sort().slice(-5);
    let consecutive = true;
    
    for (let i = 1; i < lastFiveWorkouts.length; i++) {
        const prevDate = new Date(lastFiveWorkouts[i-1]);
        const currDate = new Date(lastFiveWorkouts[i]);
        const diffDays = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays !== 1) {
            consecutive = false;
            break;
        }
    }
    
    if (consecutive) {
        userData.badges.onFire = true;
        showBadgeAchievement('On Fire', 'You completed 5 workouts in a row!');
    }
}

// Add burned calories
const caloriesBurned = parseInt(workout.calories, 10);
userData.calorieData.burned += caloriesBurned;

// Add workout event to calendar
addEvent({
    date: today,
    type: 'workout',
    title: workout.title,
    calories: caloriesBurned
});

// Show notification
showNotification('Workout completed! Great job!', 'success');

// Save user data
saveUserData();

// Update dashboard
updateDashboardData();
updateCalendar();

// NEW CODE - Update and show updated streak fire
updateStreakFire();

// NEW CODE - Show share streak option
if (userData.streak >= 3) {
    setTimeout(() => {
        showShareStreakPrompt();
    }, 1500);
}
}

// NEW CODE - Show share streak dialog
function showShareStreakPrompt() {
const shareStreakModal = document.getElementById('share-streak-modal');
if (!shareStreakModal) return;

// Create share streak content
const shareStreakContainer = document.getElementById('share-streak-container');
if (shareStreakContainer) {
    // Determine streak class based on length
    let streakClass = 'active';
    if (userData.streak >= 30) {
        streakClass = 'inferno';
    } else if (userData.streak >= 20) {
        streakClass = 'blazing';
    } else if (userData.streak >= 10) {
        streakClass = 'hot';
    }
    
    shareStreakContainer.innerHTML = `
        <div class="share-preview">
            <div class="share-header">
                <img src="https://loomforge.netlify.app/IOS/Random/Quick-Fit/Images/quickfit-logo.png" alt="QuickFit Logo" class="share-logo">
                <h3>My Fitness Streak</h3>
            </div>
            <div class="share-body">
                <div class="share-streak-count">
                    <div class="count">${userData.streak}</div>
                    <div class="label">day streak</div>
                </div>
                <div class="share-streak-fire ${streakClass}">
                    <i class="fas fa-fire"></i>
                </div>
                <div class="share-message">
                    I've been working out for ${userData.streak} days in a row with QuickFit!
                </div>
                <div class="share-username">
                    - ${userData.username}
                </div>
            </div>
            <div class="share-footer">
                Join me on my fitness journey with QuickFit!
            </div>
        </div>
        <div class="share-actions">
            <button id="share-streak-btn-social" class="primary-btn">
                <i class="fas fa-share-alt"></i> Share
            </button>
            <button id="close-share-streak" class="secondary-btn">
                Maybe Later
            </button>
        </div>
    `;
    
    // Add event listeners
    const shareBtn = document.getElementById('share-streak-btn-social');
    const closeBtn = document.getElementById('close-share-streak');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            shareStreak();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            shareStreakModal.classList.add('hidden');
        });
    }
}

// Show modal
shareStreakModal.classList.remove('hidden');
}

// NEW CODE - Share streak function
function shareStreak() {
const shareText = `I've been working out for ${userData.streak} days in a row with QuickFit! Join me on my fitness journey!`;
const shareTitle = 'My QuickFit Streak';

// Try to use Web Share API if available
if (navigator.share) {
    navigator.share({
        title: shareTitle,
        text: shareText
    })
    .catch(error => {
        console.log('Sharing failed:', error);
        showShareFallback(shareTitle, shareText);
    });
} else {
    // Use fallback share dialog
    showShareFallback(shareTitle, shareText);
}

// Hide the streak modal
document.getElementById('share-streak-modal').classList.add('hidden');
}

// Show notification message
function showNotification(message, type = 'info') {
// Check if notification container exists, create if not
let notificationContainer = document.getElementById('notification-container');

if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    document.body.appendChild(notificationContainer);
}

// Create notification element
const notification = document.createElement('div');
notification.className = `notification ${type}`;
notification.textContent = message;

// Add to container
notificationContainer.appendChild(notification);

// Auto-remove after 3 seconds
setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => {
        notification.remove();
    }, 300);
}, 3000);
}

// Detect device type
function detectDevice() {
const userAgent = navigator.userAgent;
const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
const isIPad = isIOS && (/iPad/.test(userAgent) || 
                        (window.screen && window.screen.height / window.screen.width >= 1 && 
                         window.innerWidth > 767));
const isLandscape = window.innerWidth > window.innerHeight;

document.body.classList.remove('device-iphone', 'device-ipad', 'orientation-landscape');

if (isIPad || (window.innerWidth >= 768 && window.innerWidth <= 1024)) {
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
if (themeIcon) {
    themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

// Save theme preference
localStorage.setItem('quickFitTheme', isDarkMode ? 'dark' : 'light');
}

// Load saved theme
function loadTheme() {
const savedTheme = localStorage.getItem('quickFitTheme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    const themeIcon = document.querySelector('#theme-toggle i');
    if (themeIcon) {
        themeIcon.className = 'fas fa-sun';
    }
}
}

// Sanitize user input to prevent XSS
function sanitizeInput(input) {
if (!input) return '';

const div = document.createElement('div');
div.textContent = input;
return div.innerHTML;
}

// ========================
// 1. CALORIE TRACKER AND DIET SYSTEM
// ========================

// NEW CODE START - Enhanced initCalorieTracker with midnight reset and macros
function initCalorieTracker() {
const calorieCard = document.getElementById('calorie-card');

if (!calorieCard) return; // Exit if calorie card doesn't exist yet

// Check if we need to reset calories for a new day
checkCalorieReset();

// Set initial values
updateCalorieDisplays();

// Setup event listeners
const addMealBtn = document.getElementById('add-meal-btn');
const addWorkoutCaloriesBtn = document.getElementById('add-workout-calories-btn');

// Remove any existing event listeners
if (addMealBtn) {
    const newAddMealBtn = addMealBtn.cloneNode(true);
    addMealBtn.parentNode.replaceChild(newAddMealBtn, addMealBtn);
    newAddMealBtn.addEventListener('click', showAddMealForm);
}

if (addWorkoutCaloriesBtn) {
    const newAddWorkoutBtn = addWorkoutCaloriesBtn.cloneNode(true);
    addWorkoutCaloriesBtn.parentNode.replaceChild(newAddWorkoutBtn, addWorkoutCaloriesBtn);
    newAddWorkoutBtn.addEventListener('click', showAddWorkoutCaloriesForm);
}

// Meal form event listeners
const mealForm = document.getElementById('meal-form');
const closeMealForm = document.getElementById('close-meal-form');

if (mealForm) {
    mealForm.addEventListener('submit', addMeal);
}

if (closeMealForm) {
    closeMealForm.addEventListener('click', hideAddMealForm);
}

// Workout calories form event listeners
const workoutCaloriesForm = document.getElementById('workout-calories-form');
const closeWorkoutCaloriesForm = document.getElementById('close-workout-calories-form');

if (workoutCaloriesForm) {
    workoutCaloriesForm.addEventListener('submit', addWorkoutCalories);
}

if (closeWorkoutCaloriesForm) {
    closeWorkoutCaloriesForm.addEventListener('click', hideAddWorkoutCaloriesForm);
}

// Populate meal log
updateMealLog();

// Setup search functionality for food items
setupFoodSearch();

// NEW CODE - Update macro display
updateMacroDisplay();
}
// NEW CODE END

// NEW CODE - Initialize meal plan
function initializeMealPlan() {
// Get user's goal
const goal = userData.goal || 'maintain';

// Get diet plan based on goal
const plan = dietPlans[goal];
if (!plan) return;

// If no meal plan exists, create one
if (!userData.mealPlan || userData.mealPlan.length === 0) {
    generateMealPlan(plan);
}

// Display the meal plan
displayMealPlan();

// Set up customize plan button
const customizePlanBtn = document.getElementById('customize-meal-plan');
if (customizePlanBtn) {
    customizePlanBtn.addEventListener('click', showCustomizeMealPlanModal);
}

// Set up modal submit handler
const customizePlanForm = document.getElementById('customize-plan-form');
if (customizePlanForm) {
    customizePlanForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get new calorie goal
        const calorieInput = document.getElementById('custom-calories');
        const proteinInput = document.getElementById('protein-percent');
        const carbsInput = document.getElementById('carbs-percent');
        const fatInput = document.getElementById('fat-percent');
        
        if (!calorieInput || !proteinInput || !carbsInput || !fatInput) return;
        
        const calories = parseInt(calorieInput.value, 10);
        const protein = parseInt(proteinInput.value, 10);
        const carbs = parseInt(carbsInput.value, 10);
        const fat = parseInt(fatInput.value, 10);
        
        // Validate macros add up to 100%
        if (protein + carbs + fat !== 100) {
            showNotification('Macros must add up to 100%', 'error');
            return;
        }
        
// Update user data
userData.calorieGoal = calories;
userData.macroGoals = {
    protein: protein,
    carbs: carbs,
    fat: fat
};

// Generate new meal plan
generateMealPlan(dietPlans[userData.goal || 'maintain']);
displayMealPlan();

// Save user data
saveUserData();

// Update calorie displays
updateCalorieDisplays();

// Close modal
document.getElementById('customize-meal-plan-modal').classList.add('hidden');

showNotification('Meal plan updated!', 'success');
});
}

// Set up macro slider interactions
setupMacroSliders();
}

// NEW CODE - Set up macro sliders
function setupMacroSliders() {
const proteinSlider = document.getElementById('protein-percent');
const carbsSlider = document.getElementById('carbs-percent');
const fatSlider = document.getElementById('fat-percent');

const proteinDisplay = document.getElementById('protein-percent-display');
const carbsDisplay = document.getElementById('carbs-percent-display');
const fatDisplay = document.getElementById('fat-percent-display');

const validationMessage = document.getElementById('macro-validation-message');

if (!proteinSlider || !carbsSlider || !fatSlider) return;

// Initialize with user's macro goals or defaults
proteinSlider.value = userData.macroGoals.protein || 30;
carbsSlider.value = userData.macroGoals.carbs || 40;
fatSlider.value = userData.macroGoals.fat || 30;

// Update displays
if (proteinDisplay) proteinDisplay.textContent = `${proteinSlider.value}%`;
if (carbsDisplay) carbsDisplay.textContent = `${carbsSlider.value}%`;
if (fatDisplay) fatDisplay.textContent = `${fatSlider.value}%`;

// Add event listeners for sliders
proteinSlider.addEventListener('input', updateMacroSliders);
carbsSlider.addEventListener('input', updateMacroSliders);
fatSlider.addEventListener('input', updateMacroSliders);

function updateMacroSliders() {
// Get current values
const protein = parseInt(proteinSlider.value, 10);
const carbs = parseInt(carbsSlider.value, 10);
const fat = parseInt(fatSlider.value, 10);

// Update displays
if (proteinDisplay) proteinDisplay.textContent = `${protein}%`;
if (carbsDisplay) carbsDisplay.textContent = `${carbs}%`;
if (fatDisplay) fatDisplay.textContent = `${fat}%`;

// Check if macros add up to 100%
const total = protein + carbs + fat;

if (validationMessage) {
if (total === 100) {
    validationMessage.textContent = 'Macro ratios are valid! ✅';
    validationMessage.className = 'validation-message';
} else {
    validationMessage.textContent = `Macros must add up to 100% (currently ${total}%)`;
    validationMessage.className = 'validation-message error';
}
}
}
}

// NEW CODE - Show customize meal plan modal
function showCustomizeMealPlanModal() {
const modal = document.getElementById('customize-meal-plan-modal');
if (!modal) return;

// Set initial values
const calorieInput = document.getElementById('custom-calories');
const proteinSlider = document.getElementById('protein-percent');
const carbsSlider = document.getElementById('carbs-percent');
const fatSlider = document.getElementById('fat-percent');

if (calorieInput) calorieInput.value = userData.calorieGoal;
if (proteinSlider) proteinSlider.value = userData.macroGoals.protein;
if (carbsSlider) carbsSlider.value = userData.macroGoals.carbs;
if (fatSlider) fatSlider.value = userData.macroGoals.fat;

// Update displays
const proteinDisplay = document.getElementById('protein-percent-display');
const carbsDisplay = document.getElementById('carbs-percent-display');
const fatDisplay = document.getElementById('fat-percent-display');

if (proteinDisplay) proteinDisplay.textContent = `${userData.macroGoals.protein}%`;
if (carbsDisplay) carbsDisplay.textContent = `${userData.macroGoals.carbs}%`;
if (fatDisplay) fatDisplay.textContent = `${userData.macroGoals.fat}%`;

// Show modal
modal.classList.remove('hidden');

// Add close button event
const closeBtn = document.getElementById('close-customize-plan');
if (closeBtn) {
closeBtn.addEventListener('click', () => {
modal.classList.add('hidden');
});
}
}

// NEW CODE - Generate meal plan
function generateMealPlan(plan) {
if (!plan) return;

const mealPlan = [];
const calorieGoal = userData.calorieGoal;

// Calculate macro targets in grams
const proteinTarget = Math.round((calorieGoal * (userData.macroGoals.protein / 100)) / 4); // 4 calories per gram of protein
const carbsTarget = Math.round((calorieGoal * (userData.macroGoals.carbs / 100)) / 4); // 4 calories per gram of carbs
const fatTarget = Math.round((calorieGoal * (userData.macroGoals.fat / 100)) / 9); // 9 calories per gram of fat

// Generate meals based on meal structure
plan.mealStructure.forEach(meal => {
const mealCalories = Math.round(calorieGoal * meal.portion);
const mealProtein = Math.round(proteinTarget * meal.portion);
const mealCarbs = Math.round(carbsTarget * meal.portion);
const mealFat = Math.round(fatTarget * meal.portion);

// Find recipes that match this meal's macros
const suggestedFoods = findFoodsForMeal(mealCalories, mealProtein, mealCarbs, mealFat);

mealPlan.push({
name: meal.name,
calories: mealCalories,
macros: {
    protein: mealProtein,
    carbs: mealCarbs,
    fat: mealFat
},
suggestions: suggestedFoods
});
});

userData.mealPlan = mealPlan;
saveUserData();
}

// NEW CODE - Find foods for meal
function findFoodsForMeal(calories, protein, carbs, fat) {
// Get diet type - default to balanced if none selected
const dietType = userData.selectedDiet || 'balanced';

// Get recipes of that diet type if available
let availableRecipes = [];
if (recipes[dietType]) {
availableRecipes = recipes[dietType];
} else {
// Get recipes from all diets
Object.values(recipes).forEach(dietRecipes => {
availableRecipes = availableRecipes.concat(dietRecipes);
});
}

// Find recipes that are close to the target calories
const calorieMargin = calories * 0.2; // Allow 20% margin
const matchingRecipes = availableRecipes.filter(recipe => 
Math.abs(recipe.calories - calories) <= calorieMargin
);

// If no matching recipes, suggest common foods
if (matchingRecipes.length === 0) {
return generateFoodCombination(calories, protein, carbs, fat);
}

// Sort matching recipes by how close they are to the target calories
matchingRecipes.sort((a, b) => 
Math.abs(a.calories - calories) - Math.abs(b.calories - calories)
);

// Return the top 2 matches
return matchingRecipes.slice(0, 2);
}

// NEW CODE - Generate food combination
function generateFoodCombination(calories, protein, carbs, fat) {
// Copy the common foods array
const availableFoods = [...commonFoods];

// Shuffle array for variety
shuffleArray(availableFoods);

// Select a protein source
const proteinSources = availableFoods.filter(food => 
food.category === 'Protein' && food.protein >= 10
);

// Select a carb source
const carbSources = availableFoods.filter(food => 
food.category === 'Grain' || food.carbs >= 15
);

// Select a fat source
const fatSources = availableFoods.filter(food => 
food.fat >= 5
);

// Select a vegetable
const vegetables = availableFoods.filter(food => 
food.category === 'Vegetable'
);

// Compile suggested combination
const suggestions = [];

if (proteinSources.length > 0) suggestions.push(proteinSources[0]);
if (carbSources.length > 0) suggestions.push(carbSources[0]);
if (fatSources.length > 0 && suggestions.length < 3) suggestions.push(fatSources[0]);
if (vegetables.length > 0 && suggestions.length < 3) suggestions.push(vegetables[0]);

// If we still need more items, add random foods
while (suggestions.length < 3 && availableFoods.length > 0) {
suggestions.push(availableFoods.shift());
}

return suggestions;
}

// Helper function to shuffle array
function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
}

// NEW CODE - Display meal plan
function displayMealPlan() {
const mealPlanContainer = document.getElementById('daily-meals-list');
if (!mealPlanContainer) return;

// Clear container
mealPlanContainer.innerHTML = '';

// If no meal plan, show message
if (!userData.mealPlan || userData.mealPlan.length === 0) {
mealPlanContainer.innerHTML = '<div class="empty-state"><i class="fas fa-clipboard-list"></i><p>No meal plan available. Please customize your plan.</p></div>';
return;
}

// Update plan calorie display
const dailyCalories = document.getElementById('daily-calories');
if (dailyCalories) dailyCalories.textContent = userData.calorieGoal;

// Update macro breakdown
const macroBreakdown = document.getElementById('macro-breakdown');
if (macroBreakdown) {
macroBreakdown.textContent = `${userData.macroGoals.protein}% / ${userData.macroGoals.carbs}% / ${userData.macroGoals.fat}%`;
}

// Add each meal to container
userData.mealPlan.forEach(meal => {
const mealSection = document.createElement('div');
mealSection.className = 'meal-section';

// Create meal header
const mealHeader = document.createElement('div');
mealHeader.className = 'meal-header';
mealHeader.innerHTML = `
<h4>${meal.name}</h4>
<div class="meal-macros">
    <span>${meal.calories} cal</span>
    <span>P: ${meal.macros.protein}g</span>
    <span>C: ${meal.macros.carbs}g</span>
    <span>F: ${meal.macros.fat}g</span>
</div>
`;

mealSection.appendChild(mealHeader);

// Add suggested meals/foods
if (meal.suggestions && meal.suggestions.length > 0) {
meal.suggestions.forEach(suggestion => {
    const mealOption = document.createElement('div');
    mealOption.className = 'meal-option';
    
    // Check if this is a recipe or a food
    if (suggestion.title) {
        // It's a recipe
        mealOption.innerHTML = `
            <div class="meal-option-name">${suggestion.title}</div>
            <div class="meal-option-desc">${suggestion.ingredients.slice(0, 3).join(', ')}${suggestion.ingredients.length > 3 ? '...' : ''}</div>
            <div class="meal-option-macros">
                <span>${suggestion.calories} cal</span>
                <span>P: ${suggestion.macros.protein}g</span>
                <span>C: ${suggestion.macros.carbs}g</span>
                <span>F: ${suggestion.macros.fat}g</span>
            </div>
            <button class="meal-option-btn log-meal-btn" data-calories="${suggestion.calories}" data-name="${suggestion.title}" data-time="${meal.name.toLowerCase()}" data-protein="${suggestion.macros.protein}" data-carbs="${suggestion.macros.carbs}" data-fat="${suggestion.macros.fat}">
                <i class="fas fa-plus"></i> Log Meal
            </button>
        `;
    } else {
        // It's a food
        mealOption.innerHTML = `
            <div class="meal-option-name">${suggestion.name}</div>
            <div class="meal-option-desc">${suggestion.serving}</div>
            <div class="meal-option-macros">
                <span>${suggestion.calories} cal</span>
                <span>P: ${suggestion.protein}g</span>
                <span>C: ${suggestion.carbs}g</span>
                <span>F: ${suggestion.fat}g</span>
            </div>
            <button class="meal-option-btn log-meal-btn" data-calories="${suggestion.calories}" data-name="${suggestion.name}" data-time="${meal.name.toLowerCase()}" data-protein="${suggestion.protein}" data-carbs="${suggestion.carbs}" data-fat="${suggestion.fat}">
                <i class="fas fa-plus"></i> Log Meal
            </button>
        `;
    }
    
    mealSection.appendChild(mealOption);
});
} else {
// No suggestions available
const noSuggestions = document.createElement('div');
noSuggestions.className = 'meal-option';
noSuggestions.innerHTML = '<p>No suggestions available</p>';
mealSection.appendChild(noSuggestions);
}

mealPlanContainer.appendChild(mealSection);
});

// Add event listeners to log meal buttons
document.querySelectorAll('.log-meal-btn').forEach(btn => {
btn.addEventListener('click', (e) => {
const mealName = e.target.dataset.name;
const mealCalories = parseInt(e.target.dataset.calories, 10);
const mealTime = e.target.dataset.time;
const mealProtein = parseFloat(e.target.dataset.protein);
const mealCarbs = parseFloat(e.target.dataset.carbs);
const mealFat = parseFloat(e.target.dataset.fat);

// Log the meal
logMealFromPlan(mealName, mealCalories, mealTime, mealProtein, mealCarbs, mealFat);
});
});
}

// NEW CODE - Log meal from plan
function logMealFromPlan(name, calories, time, protein, carbs, fat) {
// Create meal object
const meal = {
id: Date.now(),
name: name,
calories: calories,
serving: "1 serving",
time: time.toLowerCase(),
date: new Date().toISOString(),
// Add macros
macros: {
protein: protein,
carbs: carbs,
fat: fat
}
};

// Add to user data
userData.meals.push(meal);
userData.calorieData.consumed += calories;

// Update daily macros
userData.dailyMacros.protein += protein;
userData.dailyMacros.carbs += carbs;
userData.dailyMacros.fat += fat;

// Save and update
saveUserData();
updateCalorieDisplays();
updateMacroDisplay();

// Show notification
showNotification(`Added ${name} to your meal log`, 'success');
}

// NEW CODE - Update macro display
function updateMacroDisplay() {
// Get macro displays
const proteinPercent = document.getElementById('protein-percent');
const carbsPercent = document.getElementById('carbs-percent');
const fatPercent = document.getElementById('fat-percent');
const macroBreakdown = document.getElementById('macro-breakdown');

if (macroBreakdown) {
macroBreakdown.textContent = `${userData.macroGoals.protein}% / ${userData.macroGoals.carbs}% / ${userData.macroGoals.fat}%`;
}

// Calculate actual macro percentages for the day
const totalCalories = userData.calorieData.consumed;

if (totalCalories > 0) {
// Calculate calories from each macro
const proteinCalories = userData.dailyMacros.protein * 4; // 4 calories per gram
const carbsCalories = userData.dailyMacros.carbs * 4;     // 4 calories per gram
const fatCalories = userData.dailyMacros.fat * 9;         // 9 calories per gram

// Calculate percentages
const proteinPct = Math.round((proteinCalories / totalCalories) * 100);
const carbsPct = Math.round((carbsCalories / totalCalories) * 100);
const fatPct = Math.round((fatCalories / totalCalories) * 100);

// Update macro breakdown in meal plan section if visible
const dailyMacroBreakdown = document.getElementById('daily-macro-breakdown');
if (dailyMacroBreakdown) {
dailyMacroBreakdown.textContent = `${proteinPct}% / ${carbsPct}% / ${fatPct}%`;
}
}
}

// NEW CODE START - Enhanced updateCalorieDisplays with integration for daily reset and macros
function updateCalorieDisplays() {
const caloriesConsumed = document.getElementById('calories-consumed');
const caloriesBurned = document.getElementById('calories-burned');
const caloriesRemaining = document.getElementById('calories-remaining');

if (!caloriesConsumed || !caloriesBurned || !caloriesRemaining) return;

// Check for calorie reset before displaying
checkCalorieReset();

// Update calorie values
caloriesConsumed.textContent = userData.calorieData.consumed;
caloriesBurned.textContent = userData.calorieData.burned;

// Calculate remaining calories
const remaining = userData.calorieGoal - userData.calorieData.consumed + userData.calorieData.burned;
caloriesRemaining.textContent = remaining;

// Update progress circles
updateCalorieProgressCircles();

// Update calorie log
updateMealLog();

// NEW CODE - Update macro display
updateMacroDisplay();
}
// NEW CODE END

// Update calorie progress circles
function updateCalorieProgressCircles() {
const consumedCircle = document.getElementById('consumed-circle');
const burnedCircle = document.getElementById('burned-circle');
const remainingCircle = document.getElementById('remaining-circle');

if (!consumedCircle || !burnedCircle || !remainingCircle) return;

const consumedPercent = Math.min(100, (userData.calorieData.consumed / userData.calorieGoal) * 100);
const burnedPercent = Math.min(100, (userData.calorieData.burned / (userData.calorieGoal * 0.3)) * 100);
const remainingPercent = Math.min(100, ((userData.calorieGoal - userData.calorieData.consumed + userData.calorieData.burned) / userData.calorieGoal) * 100);

// Update SVG circles (circumference of circle with r=40 is approx 251.2)
consumedCircle.style.strokeDasharray = `${consumedPercent * 2.51} 1000`;
burnedCircle.style.strokeDasharray = `${burnedPercent * 2.51} 1000`;
remainingCircle.style.strokeDasharray = `${remainingPercent * 2.51} 1000`;
}

// NEW CODE START - Adding midnight calorie reset function with macro reset
function checkCalorieReset() {
// Get current date in YYYY-MM-DD format
const currentDate = new Date().toISOString().split('T')[0];

// Check if we have a last updated date
if (!userData.lastUpdatedDate) {
userData.lastUpdatedDate = currentDate;
saveUserData();
return;
}

// If the current date is different from the last updated date, reset calories
if (userData.lastUpdatedDate !== currentDate) {
console.log(`Resetting calories: last updated ${userData.lastUpdatedDate}, current date ${currentDate}`);

// Archive yesterday's meals if needed (optional feature)
if (userData.mealHistory === undefined) {
userData.mealHistory = {};
}

if (userData.meals && userData.meals.length > 0) {
userData.mealHistory[userData.lastUpdatedDate] = [...userData.meals];
}

// Reset daily calorie counters
userData.calorieData.consumed = 0;
userData.calorieData.burned = 0;

// Reset daily macros
userData.dailyMacros = {
protein: 0,
carbs: 0,
fat: 0
};

// Clear today's meals
userData.meals = [];

// Update the last updated date
userData.lastUpdatedDate = currentDate;

// Save the changes
saveUserData();

// Show notification to user
showNotification('Daily calorie counters have been reset for a new day!', 'info');
}
}
// NEW CODE END

// Show add meal form
function showAddMealForm() {
const mealFormContainer = document.getElementById('meal-form-container');
if (mealFormContainer) {
mealFormContainer.classList.remove('hidden');
}
}

// Hide add meal form
function hideAddMealForm() {
const mealFormContainer = document.getElementById('meal-form-container');
const mealForm = document.getElementById('meal-form');
const foodSuggestions = document.getElementById('food-suggestions');

if (mealFormContainer) {
mealFormContainer.classList.add('hidden');
}

if (mealForm) {
mealForm.reset();
}

if (foodSuggestions) {
foodSuggestions.innerHTML = '';
}
}

// Show add workout calories form
function showAddWorkoutCaloriesForm() {
const formContainer = document.getElementById('workout-calories-form-container');
if (formContainer) {
formContainer.classList.remove('hidden');
}
}

// Hide add workout calories form
function hideAddWorkoutCaloriesForm() {
const formContainer = document.getElementById('workout-calories-form-container');
const form = document.getElementById('workout-calories-form');

if (formContainer) {
formContainer.classList.add('hidden');
}

if (form) {
form.reset();
}
}

// Setup food search functionality
function setupFoodSearch() {
const foodSearchInput = document.getElementById('food-search');
const foodSuggestions = document.getElementById('food-suggestions');

if (!foodSearchInput || !foodSuggestions) return;

// Clean up old event listeners
const newInput = foodSearchInput.cloneNode(true);
foodSearchInput.parentNode.replaceChild(newInput, foodSearchInput);

// Add new event listener
newInput.addEventListener('input', () => {
const searchTerm = newInput.value.toLowerCase().trim();

if (searchTerm.length < 2) {
foodSuggestions.innerHTML = '';
return;
}

// Filter food items
const filteredFoods = commonFoods.filter(food => 
food.name.toLowerCase().includes(searchTerm) || 
food.category.toLowerCase().includes(searchTerm)
);

// Display suggestions
foodSuggestions.innerHTML = '';

filteredFoods.forEach(food => {
const suggestion = document.createElement('div');
suggestion.className = 'food-suggestion';
suggestion.innerHTML = `
    <div class="food-suggestion-name">${food.name}</div>
    <div class="food-suggestion-details">
        <span>${food.calories} cal</span>
        <span>${food.serving}</span>
    </div>
`;

suggestion.addEventListener('click', () => {
    // Fill form with selected food
    document.getElementById('meal-name').value = food.name;
    document.getElementById('meal-calories').value = food.calories;
    document.getElementById('meal-serving').value = food.serving;
    
    // NEW CODE - Add macro inputs if they exist
    const proteinInput = document.getElementById('meal-protein');
    const carbsInput = document.getElementById('meal-carbs');
    const fatInput = document.getElementById('meal-fat');
    
    if (proteinInput) proteinInput.value = food.protein;
    if (carbsInput) carbsInput.value = food.carbs;
    if (fatInput) fatInput.value = food.fat;
    
    // Clear suggestions
    foodSuggestions.innerHTML = '';
});

foodSuggestions.appendChild(suggestion);
});
});
}

// Add meal to log
function addMeal(event) {
event.preventDefault();

const mealNameInput = document.getElementById('meal-name');
const mealCaloriesInput = document.getElementById('meal-calories');
const mealServingInput = document.getElementById('meal-serving');
const mealTimeSelect = document.getElementById('meal-time');

// NEW CODE - Get macro inputs
const mealProteinInput = document.getElementById('meal-protein');
const mealCarbsInput = document.getElementById('meal-carbs');
const mealFatInput = document.getElementById('meal-fat');

if (!mealNameInput || !mealCaloriesInput || !mealServingInput || !mealTimeSelect) return;

const mealName = sanitizeInput(mealNameInput.value.trim());
const mealCalories = parseInt(mealCaloriesInput.value, 10);
const mealServing = sanitizeInput(mealServingInput.value.trim());
const mealTime = mealTimeSelect.value;

// NEW CODE - Get macro values
const mealProtein = mealProteinInput ? parseFloat(mealProteinInput.value) || 0 : 0;
const mealCarbs = mealCarbsInput ? parseFloat(mealCarbsInput.value) || 0 : 0;
const mealFat = mealFatInput ? parseFloat(mealFatInput.value) || 0 : 0;

// Validate inputs
if (!mealName) {
showNotification('Please enter a meal name', 'error');
return;
}

if (isNaN(mealCalories) || mealCalories <= 0) {
showNotification('Please enter valid calories', 'error');
return;
}

// Create meal object
const meal = {
id: Date.now(),
name: mealName,
calories: mealCalories,
serving: mealServing,
time: mealTime,
date: new Date().toISOString(),
// NEW PROPERTY - Meal macros
macros: {
protein: mealProtein,
carbs: mealCarbs,
fat: mealFat
}
};

// Add to user data
userData.meals.push(meal);
userData.calorieData.consumed += mealCalories;

// NEW CODE - Update daily macros
userData.dailyMacros.protein += mealProtein;
userData.dailyMacros.carbs += mealCarbs;
userData.dailyMacros.fat += mealFat;

// Add cheat meal event if calories > 600
if (mealCalories > 600) {
addEvent({
date: new Date().toISOString().split('T')[0],
type: 'cheat',
title: mealName,
calories: mealCalories
});
updateCalendar();
}

// Save and update
saveUserData();
updateCalorieDisplays();

// Hide form
hideAddMealForm();

// Show notification
showNotification(`Added ${mealName} to your meal log`, 'success');
}

// Add workout calories
function addWorkoutCalories(event) {
event.preventDefault();

const workoutNameInput = document.getElementById('workout-name');
const caloriesBurnedInput = document.getElementById('calories-burned-input');

if (!workoutNameInput || !caloriesBurnedInput) return;

const workoutName = sanitizeInput(workoutNameInput.value.trim());
const caloriesBurned = parseInt(caloriesBurnedInput.value, 10);

// Validate inputs
if (!workoutName) {
showNotification('Please enter a workout name', 'error');
return;
}

if (isNaN(caloriesBurned) || caloriesBurned <= 0) {
showNotification('Please enter valid calories', 'error');
return;
}

// Add to user data
userData.calorieData.burned += caloriesBurned;

// Add workout event to calendar
addEvent({
date: new Date().toISOString().split('T')[0],
type: 'workout',
title: workoutName,
calories: caloriesBurned
});

// Save and update
saveUserData();
updateCalorieDisplays();
updateCalendar();
    
    // Hide form
    hideAddWorkoutCaloriesForm();
    
    // Show notification
    showNotification(`Added ${caloriesBurned} calories burned from ${workoutName}`, 'success');
}

// Update meal log
function updateMealLog() {
    const mealLog = document.getElementById('meal-log');
    if (!mealLog) return;
    
    mealLog.innerHTML = '';
    
    // Sort meals by date (newest first)
    const sortedMeals = [...userData.meals].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Get today's meals
    const today = new Date().toDateString();
    const todayMeals = sortedMeals.filter(meal => new Date(meal.date).toDateString() === today);
    
    if (todayMeals.length === 0) {
        mealLog.innerHTML = '<div class="empty-state"><i class="fas fa-utensils"></i><p>No meals logged today. Add your first meal!</p></div>';
        return;
    }
    
    // Group meals by time
    const groupedMeals = {
        breakfast: todayMeals.filter(meal => meal.time === 'breakfast'),
        lunch: todayMeals.filter(meal => meal.time === 'lunch'),
        dinner: todayMeals.filter(meal => meal.time === 'dinner'),
        snack: todayMeals.filter(meal => meal.time === 'snack')
    };
    
    // Create meal log entries by time
    for (const [time, meals] of Object.entries(groupedMeals)) {
        if (meals.length > 0) {
            const timeHeading = document.createElement('div');
            timeHeading.className = 'meal-time-heading';
            timeHeading.textContent = time.charAt(0).toUpperCase() + time.slice(1);
            mealLog.appendChild(timeHeading);
            
            meals.forEach(meal => {
                const mealEntry = document.createElement('div');
                mealEntry.className = 'meal-entry';
                
                // NEW CODE - Add macro display to meal entries
                let macroDisplay = '';
                if (meal.macros) {
                    macroDisplay = `
                        <div class="meal-entry-macros">
                            <span>P: ${meal.macros.protein}g</span>
                            <span>C: ${meal.macros.carbs}g</span>
                            <span>F: ${meal.macros.fat}g</span>
                        </div>
                    `;
                }
                
                mealEntry.innerHTML = `
                    <div class="meal-entry-details">
                        <div class="meal-entry-name">${meal.name}</div>
                        <div class="meal-entry-serving">${meal.serving}</div>
                        ${macroDisplay}
                    </div>
                    <div class="meal-entry-calories">${meal.calories} cal</div>
                    <button class="delete-meal-btn" data-meal-id="${meal.id}">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                mealLog.appendChild(mealEntry);
            });
        }
    }
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-meal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mealId = parseInt(e.currentTarget.dataset.mealId, 10);
            deleteMeal(mealId);
        });
    });
}

// Delete meal
function deleteMeal(mealId) {
    const mealIndex = userData.meals.findIndex(meal => meal.id === mealId);
    
    if (mealIndex !== -1) {
        // Get meal to subtract macros
        const meal = userData.meals[mealIndex];
        
        // Subtract calories
        userData.calorieData.consumed -= meal.calories;
        
        // NEW CODE - Subtract macros if available
        if (meal.macros) {
            userData.dailyMacros.protein -= meal.macros.protein || 0;
            userData.dailyMacros.carbs -= meal.macros.carbs || 0;
            userData.dailyMacros.fat -= meal.macros.fat || 0;
            
            // Ensure no negative values
            userData.dailyMacros.protein = Math.max(0, userData.dailyMacros.protein);
            userData.dailyMacros.carbs = Math.max(0, userData.dailyMacros.carbs);
            userData.dailyMacros.fat = Math.max(0, userData.dailyMacros.fat);
        }
        
        // Remove meal
        userData.meals.splice(mealIndex, 1);
        
        // Save and update
        saveUserData();
        updateCalorieDisplays();
        
        // Show notification
        showNotification('Meal deleted', 'info');
    }
}

// ========================
// 2. WORKOUT + MEAL CALENDAR
// ========================

// Global variables for calendar
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;

// Initialize calendar
function initCalendar() {
    const calendarContainer = document.getElementById('calendar-container');
    if (!calendarContainer) return;
    
    renderCalendar();
    
    // Set up event listeners
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    if (prevMonthBtn) {
        // Remove existing listeners
        const newPrevBtn = prevMonthBtn.cloneNode(true);
        prevMonthBtn.parentNode.replaceChild(newPrevBtn, prevMonthBtn);
        
        // Add new listener
        newPrevBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });
    }
    
    if (nextMonthBtn) {
        // Remove existing listeners
        const newNextBtn = nextMonthBtn.cloneNode(true);
        nextMonthBtn.parentNode.replaceChild(newNextBtn, nextMonthBtn);
        
        // Add new listener
        newNextBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    }
    
    // Event form handlers
    const addEventBtn = document.getElementById('add-event-btn');
    const closeEventFormBtn = document.getElementById('close-event-form');
    const eventForm = document.getElementById('event-form');
    const closeEventSidebarBtn = document.getElementById('close-event-sidebar');
    
    if (addEventBtn) {
        // Remove existing listeners
        const newAddEventBtn = addEventBtn.cloneNode(true);
        addEventBtn.parentNode.replaceChild(newAddEventBtn, addEventBtn);
        
        // Add new listener
        newAddEventBtn.addEventListener('click', showAddEventForm);
    }
    
    if (closeEventFormBtn) {
        closeEventFormBtn.addEventListener('click', hideAddEventForm);
    }
    
    if (eventForm) {
        eventForm.addEventListener('submit', addCustomEvent);
    }
    
    if (closeEventSidebarBtn) {
        closeEventSidebarBtn.addEventListener('click', hideEventSidebar);
    }
}

// Render calendar
function renderCalendar() {
    const calendarDays = document.getElementById('calendar-days');
    const monthYear = document.getElementById('month-year');
    
    if (!calendarDays || !monthYear) return;
    
    // Clear previous calendar
    calendarDays.innerHTML = '';
    
    // Set month and year
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    monthYear.textContent = `${months[currentMonth]} ${currentYear}`;
    
    // Get first day of month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
    // Get number of days in month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Create empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarDays.appendChild(emptyCell);
    }
    
    // Create cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        
        // Create date string for comparison
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Check if there are events on this day
        const dayEvents = userData.events.filter(event => event.date === dateStr);
        
        // Add day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        cell.appendChild(dayNumber);
        
        // Add event markers
        if (dayEvents.length > 0) {
            const eventMarkers = document.createElement('div');
            eventMarkers.className = 'event-markers';
            
            // Group events by type
            const hasWorkout = dayEvents.some(event => event.type === 'workout');
            const hasCheat = dayEvents.some(event => event.type === 'cheat');
            const hasCustom = dayEvents.some(event => event.type === 'custom');
            
            if (hasWorkout) {
                const workoutMarker = document.createElement('div');
                workoutMarker.className = 'event-marker workout';
                workoutMarker.title = 'Workout';
                eventMarkers.appendChild(workoutMarker);
            }
            
            if (hasCheat) {
                const cheatMarker = document.createElement('div');
                cheatMarker.className = 'event-marker cheat';
                cheatMarker.title = 'Cheat Meal';
                eventMarkers.appendChild(cheatMarker);
            }
            
            if (hasCustom) {
                const customMarker = document.createElement('div');
                customMarker.className = 'event-marker custom';
                customMarker.title = 'Custom Event';
                eventMarkers.appendChild(customMarker);
            }
            
            cell.appendChild(eventMarkers);
        }
        
        // Highlight today
        const today = new Date();
        if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            cell.classList.add('today');
        }
        
        // Add click event
        cell.addEventListener('click', () => {
            selectDate(dateStr);
        });
        
        calendarDays.appendChild(cell);
    }
}

// Select a date on the calendar
function selectDate(dateStr) {
    selectedDate = dateStr;
    
    // Show event sidebar
    const eventSidebar = document.getElementById('event-sidebar');
    if (eventSidebar) {
        eventSidebar.classList.remove('hidden');
    }
    
    // Update sidebar with events for selected date
    updateEventSidebar(dateStr);
}

// Update event sidebar
function updateEventSidebar(dateStr) {
    const eventList = document.getElementById('event-list');
    const selectedDateElement = document.getElementById('selected-date');
    
    if (!eventList || !selectedDateElement) return;
    
    // Format date for display
    const date = new Date(dateStr + 'T00:00:00');
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    selectedDateElement.textContent = formattedDate;
    
    // Get events for selected date
    const dayEvents = userData.events.filter(event => event.date === dateStr);
    
    // Clear previous events
    eventList.innerHTML = '';
    
    if (dayEvents.length === 0) {
        eventList.innerHTML = '<div class="empty-state">No events for this day.</div>';
        return;
    }
    
    // Add events to sidebar
    dayEvents.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = `event-item ${event.type}`;
        
        // Create event icon based on type
        let typeIcon = '';
        switch (event.type) {
            case 'workout':
                typeIcon = '<i class="fas fa-dumbbell"></i>';
                break;
            case 'cheat':
                typeIcon = '<i class="fas fa-utensils"></i>';
                break;
            case 'custom':
                typeIcon = '<i class="fas fa-calendar-day"></i>';
                break;
        }
        
        eventItem.innerHTML = `
            <div class="event-type-icon">${typeIcon}</div>
            <div class="event-details">
                <div class="event-title">${event.title}</div>
                ${event.calories ? `<div class="event-calories">${event.calories} calories</div>` : ''}
                ${event.notes ? `<div class="event-notes">${event.notes}</div>` : ''}
            </div>
            <button class="delete-event-btn" data-event-id="${event.id}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        eventList.appendChild(eventItem);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-event-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const eventId = parseInt(e.currentTarget.dataset.eventId, 10);
            deleteEvent(eventId);
        });
    });
}

// Show add event form
function showAddEventForm() {
    const eventFormContainer = document.getElementById('event-form-container');
    if (!eventFormContainer) return;
    
    eventFormContainer.classList.remove('hidden');
    
    // Set date in form if a date is selected
    const eventDateInput = document.getElementById('event-date');
    if (!eventDateInput) return;
    
    if (selectedDate) {
        eventDateInput.value = selectedDate;
    } else {
        // Default to today
        const today = new Date().toISOString().split('T')[0];
        eventDateInput.value = today;
    }
}

// Hide add event form
function hideAddEventForm() {
    const eventFormContainer = document.getElementById('event-form-container');
    const eventForm = document.getElementById('event-form');
    
    if (eventFormContainer) {
        eventFormContainer.classList.add('hidden');
    }
    
    if (eventForm) {
        eventForm.reset();
    }
}

// Add custom event
function addCustomEvent(event) {
    event.preventDefault();
    
    const eventDateInput = document.getElementById('event-date');
    const eventTitleInput = document.getElementById('event-title');
    const eventTypeSelect = document.getElementById('event-type');
    const eventCaloriesInput = document.getElementById('event-calories');
    const eventNotesInput = document.getElementById('event-notes');
    
    if (!eventDateInput || !eventTitleInput || !eventTypeSelect) return;
    
    const eventDate = eventDateInput.value;
    const eventTitle = sanitizeInput(eventTitleInput.value.trim());
    const eventType = eventTypeSelect.value;
    const eventCalories = parseInt(eventCaloriesInput.value, 10) || 0;
    const eventNotes = sanitizeInput(eventNotesInput.value.trim());
    
    // Validate inputs
    if (!eventDate) {
        showNotification('Please select a date', 'error');
        return;
    }
    
    if (!eventTitle) {
        showNotification('Please enter an event title', 'error');
        return;
    }
    
    // Create event object
    const newEvent = {
        id: Date.now(),
        date: eventDate,
        type: eventType,
        title: eventTitle,
        calories: eventCalories,
        notes: eventNotes
    };
    
    // Add event to user data
    addEvent(newEvent);
    
    // Update calorie data if needed
    if (eventType === 'workout' && eventCalories > 0) {
        userData.calorieData.burned += eventCalories;
    } else if (eventType === 'cheat' && eventCalories > 0) {
        userData.calorieData.consumed += eventCalories;
    }
    
    // Save and update
    saveUserData();
    updateCalorieDisplays();
    
    // Hide form and update calendar
    hideAddEventForm();
    renderCalendar();
    
    // Update event sidebar if a date is selected
    if (selectedDate) {
        updateEventSidebar(selectedDate);
    }
    
    // Show notification
    showNotification('Event added successfully', 'success');
}

// Add event to user data
function addEvent(event) {
    if (!userData.events) {
        userData.events = [];
    }
    
    userData.events.push({
        id: event.id || Date.now(),
        date: event.date,
        type: event.type,
        title: event.title,
        calories: event.calories || 0,
        notes: event.notes || ''
    });
    
    saveUserData();
}

// Delete event
function deleteEvent(eventId) {
    const eventIndex = userData.events.findIndex(event => event.id === eventId);
    
    if (eventIndex !== -1) {
        const event = userData.events[eventIndex];
        
        // Update calorie data if needed
        if (event.type === 'workout' && event.calories > 0) {
            userData.calorieData.burned -= event.calories;
        } else if (event.type === 'cheat' && event.calories > 0) {
            userData.calorieData.consumed -= event.calories;
        }
        
        // Remove event
        userData.events.splice(eventIndex, 1);
        
        // Save and update
        saveUserData();
        updateCalorieDisplays();
        renderCalendar();
        
        // Update event sidebar
        if (selectedDate) {
            updateEventSidebar(selectedDate);
        }
        
        // Show notification
        showNotification('Event deleted', 'info');
    }
}

// Update calendar display
function updateCalendar() {
    if (document.getElementById('calendar-container')) {
        renderCalendar();
    }
}

// Hide event sidebar
function hideEventSidebar() {
    const eventSidebar = document.getElementById('event-sidebar');
    if (eventSidebar) {
        eventSidebar.classList.add('hidden');
    }
    selectedDate = null;
}

// ========================
// 3. DIET SECTION WITH RECIPES
// ========================

// Initialize diet section
function loadDietSection() {
    const dietSection = document.getElementById('diet-section');
    if (!dietSection) return;
    
    // Set default active tab to user's selected diet or keto
    setActiveDietTab(userData.selectedDiet || 'keto');
    
    // Add event listeners to diet tabs
    const dietTabs = document.querySelectorAll('.diet-tab');
    
    dietTabs.forEach(tab => {
        // Remove existing listeners
        const newTab = tab.cloneNode(true);
        tab.parentNode.replaceChild(newTab, tab);
        
        // Add new listener
        newTab.addEventListener('click', () => {
            const dietType = newTab.dataset.diet;
            setActiveDietTab(dietType);
            
            // Update user's selected diet
            userData.selectedDiet = dietType;
            saveUserData();
        });
    });
    
    // NEW CODE - Add new diet tabs if needed
    const dietTabsContainer = document.querySelector('.diet-tabs');
    if (dietTabsContainer) {
        // Check if new diet tabs exist
        if (!document.querySelector('.diet-tab[data-diet="lowCarb"]')) {
            // Add new diet tabs
            const lowCarbTab = document.createElement('button');
            lowCarbTab.className = 'diet-tab';
            lowCarbTab.dataset.diet = 'lowCarb';
            lowCarbTab.innerHTML = '<i class="fas fa-carrot"></i> Low Carb';
            lowCarbTab.addEventListener('click', () => {
                setActiveDietTab('lowCarb');
                userData.selectedDiet = 'lowCarb';
                saveUserData();
            });
            
            const highProteinTab = document.createElement('button');
            highProteinTab.className = 'diet-tab';
            highProteinTab.dataset.diet = 'highProtein';
            highProteinTab.innerHTML = '<i class="fas fa-drumstick-bite"></i> High Protein';
            highProteinTab.addEventListener('click', () => {
                setActiveDietTab('highProtein');
                userData.selectedDiet = 'highProtein';
                saveUserData();
            });
            
            dietTabsContainer.appendChild(lowCarbTab);
            dietTabsContainer.appendChild(highProteinTab);
        }
    }
}

// Set active diet tab
function setActiveDietTab(dietType) {
    // Remove active class from all tabs
    document.querySelectorAll('.diet-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to selected tab
    const selectedTab = document.querySelector(`.diet-tab[data-diet="${dietType}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Show recipes for selected diet
    showDietRecipes(dietType);
}

// Show recipes for selected diet
function showDietRecipes(dietType) {
    const recipeContainer = document.getElementById('recipe-container');
    if (!recipeContainer) return;
    
    recipeContainer.innerHTML = '';
    
    const dietRecipes = recipes[dietType] || [];
    
    if (dietRecipes.length === 0) {
        recipeContainer.innerHTML = '<div class="empty-state">No recipes available for this diet.</div>';
        return;
    }
    
    // Create recipe cards
    dietRecipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipeContainer.appendChild(recipeCard);
    });
}

// Create recipe card
function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    // NEW CODE - Add macro display
    let macroDisplay = '';
    if (recipe.macros) {
        macroDisplay = `
            <div class="recipe-macros">
                <span><i class="fas fa-drumstick-bite"></i> ${recipe.macros.protein}g protein</span>
                <span><i class="fas fa-bread-slice"></i> ${recipe.macros.carbs}g carbs</span>
                <span><i class="fas fa-oil-can"></i> ${recipe.macros.fat}g fat</span>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="recipe-image">
            <img src="${recipe.image}" alt="${recipe.title}">
        </div>
        <div class="recipe-content">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span><i class="fas fa-fire"></i> ${recipe.calories} cal</span>
                <span><i class="fas fa-clock"></i> ${recipe.prepTime}</span>
            </div>
            ${macroDisplay}
            <div class="recipe-details hidden">
                <div class="recipe-ingredients">
                    <h4>Ingredients</h4>
                    <ul>
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                <div class="recipe-instructions">
                    <h4>Instructions</h4>
                    <p>${recipe.instructions}</p>
                </div>
            </div>
            <div class="recipe-actions">
                <button class="toggle-recipe-btn">Show Details</button>
                <button class="add-to-meal-plan-btn" data-recipe='${JSON.stringify(recipe).replace(/'/g, "&apos;")}'>
                    <i class="fas fa-plus"></i> Add to Meals
                </button>
            </div>
        </div>
    `;
    
    // Add event listener to toggle button
    const toggleBtn = card.querySelector('.toggle-recipe-btn');
    toggleBtn.addEventListener('click', (e) => {
        const details = card.querySelector('.recipe-details');
        
        details.classList.toggle('hidden');
        e.target.textContent = details.classList.contains('hidden') ? 'Show Details' : 'Hide Details';
    });
    
    // NEW CODE - Add event listener to add to meal plan button
    const addToMealPlanBtn = card.querySelector('.add-to-meal-plan-btn');
    if (addToMealPlanBtn) {
        addToMealPlanBtn.addEventListener('click', (e) => {
            try {
                const recipeData = JSON.parse(e.target.dataset.recipe || e.currentTarget.dataset.recipe);
                showAddToMealPlanModal(recipeData);
            } catch (error) {
                console.error('Error parsing recipe data:', error);
                showNotification('Error adding recipe to meal plan', 'error');
            }
        });
    }
    
    return card;
}

// NEW CODE - Show add to meal plan modal
function showAddToMealPlanModal(recipe) {
    // Create modal if it doesn't exist
    if (!document.getElementById('add-to-meal-plan-modal')) {
        const modal = document.createElement('div');
        modal.id = 'add-to-meal-plan-modal';
        modal.className = 'modal-container hidden';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add to Meal Plan</h3>
                    <button id="close-add-to-meal-plan" class="close-btn" aria-label="Close modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 id="recipe-title-modal"></h4>
                    <p id="recipe-calories-modal"></p>
                    <p>Select meal time:</p>
                    <div class="meal-time-options">
                        <button class="meal-time-option" data-meal-time="breakfast">Breakfast</button>
                        <button class="meal-time-option" data-meal-time="lunch">Lunch</button>
                        <button class="meal-time-option" data-meal-time="dinner">Dinner</button>
                        <button class="meal-time-option" data-meal-time="snack">Snack</button>
                    </div>
                    <div class="modal-actions">
                        <button id="add-to-meal-plan-confirm" class="primary-btn">Add to Meal Plan</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listener to close button
        document.getElementById('close-add-to-meal-plan').addEventListener('click', () => {
            document.getElementById('add-to-meal-plan-modal').classList.add('hidden');
        });
    }
    
    // Update modal content
    const modal = document.getElementById('add-to-meal-plan-modal');
    const recipeTitle = document.getElementById('recipe-title-modal');
    const recipeCalories = document.getElementById('recipe-calories-modal');
    
    if (recipeTitle) recipeTitle.textContent = recipe.title;
    if (recipeCalories) {
        let macroText = `${recipe.calories} calories`;
        if (recipe.macros) {
            macroText += ` (Protein: ${recipe.macros.protein}g, Carbs: ${recipe.macros.carbs}g, Fat: ${recipe.macros.fat}g)`;
        }
        recipeCalories.textContent = macroText;
    }
    
    // Store recipe in data attribute
    const confirmBtn = document.getElementById('add-to-meal-plan-confirm');
    if (confirmBtn) {
        confirmBtn.dataset.recipe = JSON.stringify(recipe);
    }
    
    // Add event listeners to meal time options
    document.querySelectorAll('.meal-time-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.meal-time-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Add event listener to confirm button
    if (confirmBtn) {
        // Remove existing listeners
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        
        // Add new listener
        newConfirmBtn.addEventListener('click', () => {
            // Get selected meal time
            const selectedMealTime = document.querySelector('.meal-time-option.active');
            if (!selectedMealTime) {
                showNotification('Please select a meal time', 'error');
                return;
            }
            
            const mealTime = selectedMealTime.dataset.mealTime;
            try {
                // Parse recipe data
                const recipeData = JSON.parse(newConfirmBtn.dataset.recipe);
                
                // Add to meal log
                logMealFromPlan(
                    recipeData.title, 
                    recipeData.calories, 
                    mealTime, 
                    recipeData.macros ? recipeData.macros.protein : 0,
                    recipeData.macros ? recipeData.macros.carbs : 0,
                    recipeData.macros ? recipeData.macros.fat : 0
                );
                
                // Hide modal
                modal.classList.add('hidden');
            } catch (error) {
                console.error('Error adding to meal plan:', error);
                showNotification('Error adding to meal plan', 'error');
            }
        });
    }
    
    // Show modal
    modal.classList.remove('hidden');
}

// ========================
// 4. WORKOUT DETECTION SENSOR
// ========================

// Initialize workout detection
function initWorkoutDetection() {
    const workoutDetection = document.getElementById('workout-detection');
    if (!workoutDetection) return;
    
    // Set initial state
    updateWorkoutDetectionDisplay();
    
    // Add event listeners
    const startDetectionBtn = document.getElementById('start-detection');
    const stopDetectionBtn = document.getElementById('stop-detection');
    
    if (startDetectionBtn) {
// Remove existing listeners
const newStartBtn = startDetectionBtn.cloneNode(true);
startDetectionBtn.parentNode.replaceChild(newStartBtn, startDetectionBtn);

// Add new listener
newStartBtn.addEventListener('click', startWorkoutDetection);
}

if (stopDetectionBtn) {
// Remove existing listeners
const newStopBtn = stopDetectionBtn.cloneNode(true);
stopDetectionBtn.parentNode.replaceChild(newStopBtn, stopDetectionBtn);

// Add new listener
newStopBtn.addEventListener('click', stopWorkoutDetection);
}

// Check if device supports motion detection
const motionSupport = document.getElementById('motion-support');
if (motionSupport) {
if (window.DeviceMotionEvent) {
    // Check if permission is needed (iOS 13+)
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        motionSupport.textContent = 'Your device supports motion detection! Click "Start Detection" to allow access.';
    } else {
        motionSupport.textContent = 'Your device supports motion detection!';
    }
} else {
    motionSupport.textContent = 'Your device does not support motion detection. Using simulation instead.';
}
}
}

// Request motion permission (for iOS 13+)
async function requestMotionPermission() {
if (typeof DeviceMotionEvent.requestPermission === 'function') {
try {
    const permissionState = await DeviceMotionEvent.requestPermission();
    return permissionState === 'granted';
} catch (error) {
    console.error('Error requesting motion permission:', error);
    return false;
}
}
return true; // Permission not needed
}

// Start workout detection
async function startWorkoutDetection() {
if (userData.workoutDetection.isActive) return;

// Request permission if needed
const permissionGranted = await requestMotionPermission();
if (!permissionGranted) {
showNotification('Motion detection permission denied', 'error');
return;
}

// Update user data
userData.workoutDetection.isActive = true;
userData.workoutDetection.startTime = new Date().toISOString();
userData.workoutDetection.lastUpdate = new Date().toISOString();
userData.workoutDetection.detectedMovements = 0;

// Show active state
const detectionStatus = document.getElementById('detection-status');
if (detectionStatus) {
detectionStatus.textContent = 'Active';
detectionStatus.className = 'status-active';
}

const startBtn = document.getElementById('start-detection');
const stopBtn = document.getElementById('stop-detection');

if (startBtn) startBtn.classList.add('hidden');
if (stopBtn) stopBtn.classList.remove('hidden');

// Start animation
const detectionAnimation = document.getElementById('detection-animation');
if (detectionAnimation) {
detectionAnimation.classList.add('active');
}

// Start detection
if (window.DeviceMotionEvent) {
window.addEventListener('devicemotion', handleMotionEvent);
} else {
// Start simulation if motion detection is not supported
startMotionSimulation();
}

// Update display
updateWorkoutDetectionDisplay();

// Save user data
saveUserData();

// Show notification
showNotification('Workout detection started', 'success');
}

// Stop workout detection
function stopWorkoutDetection() {
if (!userData.workoutDetection.isActive) return;

// Update user data
userData.workoutDetection.isActive = false;

// Calculate duration
const startTime = new Date(userData.workoutDetection.startTime);
const endTime = new Date();
const durationMs = endTime - startTime;
userData.workoutDetection.duration = Math.round(durationMs / 1000); // duration in seconds

// Calculate calories burned (rough estimate: 0.1 calories per detected movement)
const caloriesBurned = Math.round(userData.workoutDetection.detectedMovements * 0.1);

// Add to total burned calories
userData.calorieData.burned += caloriesBurned;

// Add workout event to calendar
addEvent({
date: new Date().toISOString().split('T')[0],
type: 'workout',
title: 'Sensor Detected Workout',
calories: caloriesBurned,
notes: `Duration: ${Math.round(userData.workoutDetection.duration / 60)} minutes, Movements: ${userData.workoutDetection.detectedMovements}`
});

// Show summary
showWorkoutSummary(userData.workoutDetection.duration, userData.workoutDetection.detectedMovements, caloriesBurned);

// Show inactive state
const detectionStatus = document.getElementById('detection-status');
if (detectionStatus) {
detectionStatus.textContent = 'Inactive';
detectionStatus.className = 'status-inactive';
}

const startBtn = document.getElementById('start-detection');
const stopBtn = document.getElementById('stop-detection');

if (startBtn) startBtn.classList.remove('hidden');
if (stopBtn) stopBtn.classList.add('hidden');

// Stop animation
const detectionAnimation = document.getElementById('detection-animation');
if (detectionAnimation) {
detectionAnimation.classList.remove('active');
}

// Stop detection
if (window.DeviceMotionEvent) {
window.removeEventListener('devicemotion', handleMotionEvent);
} else {
// Stop simulation
stopMotionSimulation();
}

// Update displays
updateWorkoutDetectionDisplay();
updateCalorieDisplays();
updateCalendar();

// Save user data
saveUserData();

// Show notification
showNotification('Workout completed!', 'success');
}

// Handle motion event
function handleMotionEvent(event) {
if (!userData.workoutDetection.isActive) return;

// Calculate acceleration magnitude
const acceleration = event.accelerationIncludingGravity;

// Check if acceleration is valid
if (!acceleration || acceleration.x === null || acceleration.y === null || acceleration.z === null) {
return;
}

const magnitude = Math.sqrt(
acceleration.x * acceleration.x + 
acceleration.y * acceleration.y + 
acceleration.z * acceleration.z
);

// Detect significant movement (threshold: 15)
if (magnitude > 15) {
// Check if enough time has passed since last movement (to avoid multiple counts for same movement)
const now = new Date();
const lastUpdate = new Date(userData.workoutDetection.lastUpdate);
const timeDiff = now - lastUpdate;

if (timeDiff > 500) { // 500ms threshold
    userData.workoutDetection.detectedMovements++;
    userData.workoutDetection.lastUpdate = now.toISOString();
    
    // Update display
    updateWorkoutDetectionDisplay();
    
    // Animate detection
    showDetectionFeedback();
}
}
}

// Motion simulation variables
let motionSimulationInterval = null;

// Start motion simulation (for devices without motion sensors)
function startMotionSimulation() {
motionSimulationInterval = setInterval(() => {
// Simulate random movements every 2-5 seconds
if (Math.random() > 0.7) {
    userData.workoutDetection.detectedMovements++;
    userData.workoutDetection.lastUpdate = new Date().toISOString();
    
    // Update display
    updateWorkoutDetectionDisplay();
    
    // Animate detection
    showDetectionFeedback();
}
}, 2000);
}

// Stop motion simulation
function stopMotionSimulation() {
if (motionSimulationInterval) {
clearInterval(motionSimulationInterval);
motionSimulationInterval = null;
}
}

// Update workout detection display
function updateWorkoutDetectionDisplay() {
const movementCount = document.getElementById('movement-count');
const duration = document.getElementById('duration');

if (!movementCount || !duration) return;

movementCount.textContent = userData.workoutDetection.detectedMovements;

// Calculate duration if active
if (userData.workoutDetection.isActive) {
const startTime = new Date(userData.workoutDetection.startTime);
const now = new Date();
const durationSec = Math.round((now - startTime) / 1000);
const minutes = Math.floor(durationSec / 60);
const seconds = durationSec % 60;

duration.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
} else {
duration.textContent = '0:00';
}
}

// Show detection feedback animation
function showDetectionFeedback() {
const feedback = document.getElementById('detection-feedback');
if (!feedback) return;

// Create a new dot
const dot = document.createElement('div');
dot.className = 'detection-dot';

// Random position within the container
const containerRect = feedback.getBoundingClientRect();
const x = Math.random() * (containerRect.width - 20);
const y = Math.random() * (containerRect.height - 20);

dot.style.left = `${x}px`;
dot.style.top = `${y}px`;

// Add to container
feedback.appendChild(dot);

// Remove after animation
setTimeout(() => {
dot.remove();
}, 2000);
}

// Show workout summary
function showWorkoutSummary(duration, movements, calories) {
const summary = document.getElementById('workout-summary');
if (!summary) return;

// Update summary content
const summaryDuration = document.getElementById('summary-duration');
const summaryMovements = document.getElementById('summary-movements');
const summaryCalories = document.getElementById('summary-calories');

if (summaryDuration) summaryDuration.textContent = `${Math.round(duration / 60)} minutes`;
if (summaryMovements) summaryMovements.textContent = movements;
if (summaryCalories) summaryCalories.textContent = calories;

// Show summary
summary.classList.remove('hidden');

// Hide after a delay
setTimeout(() => {
summary.classList.add('hidden');
}, 5000);
}

// ========================
// 5. NEW BMI CALCULATOR
// ========================

// NEW CODE - Calculate and display BMI
function calculateAndDisplayBMI() {
// Check if height and weight are available
if (!userData.height || !userData.weight) return;

// Calculate BMI
const bmi = calculateBMI(userData.weight, userData.height, userData.weightUnit, userData.heightUnit);

// Update BMI display
updateBMIDisplay(bmi);

// Generate health recommendations based on BMI
generateBMIRecommendations(bmi);
}

// NEW CODE - Calculate BMI
function calculateBMI(weight, height, weightUnit, heightUnit) {
// Convert weight to kg if needed
const weightInKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;

// Convert height to meters if needed
let heightInMeters;
if (heightUnit === 'in') {
heightInMeters = height * 0.0254;
} else { // cm
heightInMeters = height / 100;
}

// Calculate BMI: weight (kg) / height^2 (m)
return weightInKg / (heightInMeters * heightInMeters);
}

// NEW CODE - Update BMI display
function updateBMIDisplay(bmi = null) {
const bmiValue = document.getElementById('bmi-value');
const bmiCategory = document.getElementById('bmi-category');

if (!bmiValue || !bmiCategory) return;

// If no BMI provided, calculate it
if (bmi === null) {
if (!userData.height || !userData.weight) {
    bmiValue.textContent = '--';
    bmiCategory.textContent = '--';
    return;
}

bmi = calculateBMI(userData.weight, userData.height, userData.weightUnit, userData.heightUnit);
}

// Round BMI to 1 decimal place
const roundedBMI = Math.round(bmi * 10) / 10;

// Update BMI value
bmiValue.textContent = roundedBMI;

// Determine BMI category
let category = '';
let categoryClass = '';

if (bmi < 18.5) {
category = 'Underweight';
categoryClass = 'category-underweight';
} else if (bmi < 25) {
category = 'Normal';
categoryClass = 'category-normal';
} else if (bmi < 30) {
category = 'Overweight';
categoryClass = 'category-overweight';
} else {
category = 'Obese';
categoryClass = 'category-obese';
}

// Update BMI category
bmiCategory.textContent = category;

// Remove all category classes
bmiCategory.classList.remove('category-underweight', 'category-normal', 'category-overweight', 'category-obese');

// Add the appropriate category class
bmiCategory.classList.add(categoryClass);
}

// NEW CODE - Generate BMI recommendations
function generateBMIRecommendations(bmi) {
const recommendationsList = document.getElementById('bmi-recommendations');
if (!recommendationsList) return;

// Clear existing recommendations
recommendationsList.innerHTML = '';

// Generate recommendations based on BMI category
let recommendations = [];

if (bmi < 18.5) {
// Underweight recommendations
recommendations = [
    "Consider consulting with a healthcare provider about healthy weight gain.",
    "Focus on nutrient-dense foods to gain weight in a healthy way.",
    "Incorporate strength training to build muscle mass.",
    "Aim for a gradual weight gain of 0.5-1 pound per week.",
    "Include healthy fats like avocados, nuts, and olive oil in your diet."
];
} else if (bmi < 25) {
// Normal weight recommendations
recommendations = [
    "Maintain your current healthy weight with balanced nutrition and regular exercise.",
    "Continue with a mix of cardio and strength training for overall fitness.",
    "Stay hydrated and prioritize quality sleep for overall health.",
    "Regular health check-ups are still important even with a healthy BMI.",
    "Focus on nutrient-dense foods for long-term health benefits."
];
} else if (bmi < 30) {
// Overweight recommendations
recommendations = [
    "Aim for a modest weight loss of 1-2 pounds per week through diet and exercise.",
    "Incorporate more physical activity into your daily routine.",
    "Focus on portion control and mindful eating habits.",
    "Increase fiber intake through fruits, vegetables, and whole grains.",
    "Consider tracking your food intake to increase awareness of calories and nutrition."
];
} else {
// Obese recommendations
recommendations = [
    "Consider consulting with a healthcare provider about a personalized weight loss plan.",
    "Begin with low-impact exercises to protect joints while increasing activity.",
    "Set realistic weight loss goals - even a 5-10% reduction improves health outcomes.",
    "Focus on whole, unprocessed foods while reducing added sugars and refined carbs.",
    "Seek support through friends, family, or groups to maintain motivation."
];
}

// Add recommendations to the list
recommendations.forEach(recommendation => {
const li = document.createElement('li');
li.textContent = recommendation;
recommendationsList.appendChild(li);
});

// Add "Update BMI" button functionality
const updateBMIBtn = document.getElementById('calculate-bmi-btn');
if (updateBMIBtn) {
// Remove existing event listeners
const newUpdateBtn = updateBMIBtn.cloneNode(true);
updateBMIBtn.parentNode.replaceChild(newUpdateBtn, updateBMIBtn);

// Add new event listener
newUpdateBtn.addEventListener('click', showBMICalculator);
}
}

// NEW CODE - Show BMI calculator modal
function showBMICalculator() {
const bmiModal = document.getElementById('bmi-calculator-modal');
if (!bmiModal) return;

// Set initial values
const weightInput = document.getElementById('bmi-weight');
const weightUnit = document.getElementById('bmi-weight-unit');
const heightInput = document.getElementById('bmi-height');
const heightUnit = document.getElementById('bmi-height-unit');

if (weightInput) weightInput.value = userData.weight;
if (weightUnit) weightUnit.value = userData.weightUnit;
if (heightInput) heightInput.value = userData.height;
if (heightUnit) heightUnit.value = userData.heightUnit;

// Show modal
bmiModal.classList.remove('hidden');

// Setup form submit handler
const bmiForm = document.getElementById('bmi-calculator-form');
if (bmiForm) {
bmiForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get values
    const weight = parseFloat(weightInput.value);
    const wUnit = weightUnit.value;
    const height = parseFloat(heightInput.value);
    const hUnit = heightUnit.value;
    
    // Validate inputs
    if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
        showNotification('Please enter valid height and weight', 'error');
        return;
    }
    
    // Update user data
    userData.weight = weight;
    userData.weightUnit = wUnit;
    userData.height = height;
    userData.heightUnit = hUnit;
    
    // Add to weight history for prediction
    const today = new Date().toISOString().split('T')[0];
    
    if (!userData.weightHistory) userData.weightHistory = [];
    
    // Add new weight entry
    userData.weightHistory.push({
        date: today,
        weight: weight, 
        unit: wUnit
    });
    
    // Keep only the last 30 entries
    if (userData.weightHistory.length > 30) {
        userData.weightHistory = userData.weightHistory.slice(-30);
    }
    
    // Save user data
    saveUserData();
    
    // Calculate and display BMI
    calculateAndDisplayBMI();
    
    // Update weight prediction
    updateWeightPrediction();
    
    // Close modal
    bmiModal.classList.add('hidden');
    
    // Show notification
    showNotification('BMI updated successfully!', 'success');
});
}

// Setup close button
const closeBtn = document.getElementById('close-bmi-calculator');
if (closeBtn) {
closeBtn.addEventListener('click', function() {
    bmiModal.classList.add('hidden');
});
}
}

// ========================
// 6. WEIGHT GOAL PREDICTION
// ========================

// NEW CODE - Initialize weight prediction
function initializeWeightPrediction() {
updateWeightPrediction();

// Add event listener to recalculate button
const recalculateBtn = document.getElementById('recalculate-prediction-btn');
if (recalculateBtn) {
recalculateBtn.addEventListener('click', updateWeightPrediction);
}
}

// NEW CODE - Update weight prediction
function updateWeightPrediction() {
// Check if we have enough weight history data (at least 2 entries)
if (!userData.weightHistory || userData.weightHistory.length < 2) {
displayNoPrediction("Not enough weight data. Log your weight regularly to get a prediction.");
return;
}

// Check if we have a weight goal
if (!userData.goal) {
displayNoPrediction("Set a weight goal in your profile to get a prediction.");
return;
}

// Sort weight history by date
const sortedHistory = [...userData.weightHistory].sort((a, b) => 
new Date(a.date) - new Date(b.date)
);

// Calculate weight change per day
const oldestEntry = sortedHistory[0];
const newestEntry = sortedHistory[sortedHistory.length - 1];

// Convert weights to the same unit (kg)
const oldestWeight = oldestEntry.unit === 'lbs' ? oldestEntry.weight * 0.453592 : oldestEntry.weight;
const newestWeight = newestEntry.unit === 'lbs' ? newestEntry.weight * 0.453592 : newestEntry.weight;

// Calculate days between entries
const daysDiff = Math.max(1, Math.round((new Date(newestEntry.date) - new Date(oldestEntry.date)) / (1000 * 60 * 60 * 24)));

// Calculate daily weight change
const weightChangePerDay = (newestWeight - oldestWeight) / daysDiff;

// If no weight change, we can't predict
if (weightChangePerDay === 0) {
displayNoPrediction("No weight change detected. Continue tracking to get a prediction.");
return;
}

// Determine if current trend matches goal
const isLosing = weightChangePerDay < 0;
const wantsToLose = userData.goal === 'lose-weight';

// If trend doesn't match goal, show warning
if ((wantsToLose && !isLosing) || (!wantsToLose && isLosing)) {
const message = wantsToLose 
    ? "Your current trend shows weight gain, but your goal is weight loss." 
    : "Your current trend shows weight loss, but your goal is weight gain.";

displayNoPrediction(message);
return;
}

// Calculate target weight based on BMI
const heightInMeters = userData.heightUnit === 'in' 
? userData.height * 0.0254 
: userData.height / 100;

let targetWeight;

if (wantsToLose) {
// Target weight based on BMI 22 (middle of normal range)
targetWeight = 22 * (heightInMeters * heightInMeters);
} else {
// For muscle gain, aim for BMI of 24 (upper end of normal)
targetWeight = 24 * (heightInMeters * heightInMeters);
}

// Convert target weight to user's preferred unit
if (userData.weightUnit === 'lbs') {
targetWeight = targetWeight / 0.453592;
}

// Calculate days to reach target
const currentWeight = userData.weightUnit === 'lbs' 
? userData.weight * 0.453592 
: userData.weight;

const weightDifference = Math.abs(targetWeight - currentWeight);
const daysToTarget = Math.round(weightDifference / Math.abs(weightChangePerDay));

// Calculate target date
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + daysToTarget);

// Display prediction
displayPrediction(daysToTarget, targetDate, weightChangePerDay);
}

// NEW CODE - Display prediction
function displayPrediction(days, date, rate) {
const daysToGoal = document.getElementById('days-to-goal');
const targetDate = document.getElementById('target-date');
const weightTrend = document.getElementById('weight-trend');

if (!daysToGoal || !targetDate || !weightTrend) return;

// Update days to goal
daysToGoal.textContent = days;

// Format target date
const formattedDate = date.toLocaleDateString('en-US', { 
year: 'numeric', 
month: 'long', 
day: 'numeric' 
});

targetDate.textContent = `Estimated achievement date: ${formattedDate}`;

// Format weight trend
const absRate = Math.abs(rate);
const ratePerWeek = (absRate * 7).toFixed(2);
const unit = userData.weightUnit === 'lbs' ? 'lbs' : 'kg';
const direction = rate < 0 ? 'losing' : 'gaining';

weightTrend.textContent = `Currently ${direction} about ${ratePerWeek} ${unit} per week`;

// Add color coding based on healthy rate
if (absRate * 7 > 2) { // More than 2 kg/week or ~4.4 lbs/week
weightTrend.className = 'weight-trend caution';
weightTrend.textContent += " (Caution: This rate may be unsustainable)";
} else {
weightTrend.className = 'weight-trend healthy';
}
}

// NEW CODE - Display no prediction message
function displayNoPrediction(message) {
const daysToGoal = document.getElementById('days-to-goal');
const targetDate = document.getElementById('target-date');
const weightTrend = document.getElementById('weight-trend');

if (!daysToGoal || !targetDate || !weightTrend) return;

daysToGoal.textContent = '--';
targetDate.textContent = message;
weightTrend.textContent = 'Insufficient data for trend calculation';
weightTrend.className = 'weight-trend';
}

// ========================
// EVENT LISTENERS
// ========================

document.addEventListener('DOMContentLoaded', () => {
// Check login status
checkLoginStatus();

// Load saved theme
loadTheme();

// Detect device on load
detectDevice();

// Login button event
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
loginBtn.addEventListener('click', () => {
    const usernameInput = document.getElementById('username');
    if (!usernameInput) return;
    
    const username = sanitizeInput(usernameInput.value.trim());

    if (!username) {
        showNotification('Please enter a username', 'error');
        return;
    }
    
    // In a real app, you would validate credentials server-side
    // For this demo, we'll just accept any input
    
    userData.username = username;
    userData.isLoggedIn = true;
    userData.lastLogin = new Date().toISOString();
    
    // Check if user has previous data
    const existingUser = loadUserData();
    
    if (existingUser && userData.username === username) {
        // User already exists, update login info
        userData.isLoggedIn = true;
        userData.lastLogin = new Date().toISOString();
        saveUserData();
        showDashboard();
    } else {
        // New user, go to onboarding
        saveUserData();
        showOnboarding();
    }
});
}

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
const weightSubmitBtn = document.getElementById('weight-submit');
if (weightSubmitBtn) {
weightSubmitBtn.addEventListener('click', () => {
    const weightInput = document.getElementById('current-weight');
    const unitSelect = document.getElementById('weight-unit');
    
    if (!weightInput || !unitSelect) return;
    
    const weight = parseFloat(weightInput.value);
    const unit = unitSelect.value;
    
    if (isNaN(weight) || weight <= 0) {
        showNotification('Please enter a valid weight', 'error');
        return;
    }
    
    userData.weight = weight;
    userData.weightUnit = unit;
    
    // NEW CODE - Add to weight history
    const today = new Date().toISOString().split('T')[0];
    
    if (!userData.weightHistory) userData.weightHistory = [];
    
    userData.weightHistory.push({
        date: today,
        weight: weight,
        unit: unit
    });
    
    // NEW CODE - Show height input next
    document.getElementById('weight-input').classList.add('hidden');
    document.getElementById('height-input').classList.remove('hidden');
});
}

// NEW CODE - Height submit event
const heightSubmitBtn = document.getElementById('height-submit');
if (heightSubmitBtn) {
heightSubmitBtn.addEventListener('click', () => {
    const heightInput = document.getElementById('current-height');
    const unitSelect = document.getElementById('height-unit');
    
    if (!heightInput || !unitSelect) return;
    
    const height = parseFloat(heightInput.value);
    const unit = unitSelect.value;
    
    if (isNaN(height) || height <= 0) {
        showNotification('Please enter a valid height', 'error');
        return;
    }
    
    userData.height = height;
    userData.heightUnit = unit;
    
    // Calculate default calorie goal based on weight, height, and goal
    let bmr;
    
    // Convert to metric for calculation
    const weightKg = userData.weightUnit === 'kg' ? userData.weight : userData.weight * 0.453592;
    const heightCm = userData.heightUnit === 'cm' ? userData.height : userData.height * 2.54;
    
    // Basic BMR calculation (Mifflin-St Jeor equation) - assuming 25 years old and male
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * 25 + 5;
    
    // Activity factor (moderate activity)
    const activityFactor = 1.55;
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    let tdee = bmr * activityFactor;
    
    // Adjust based on goal
    if (userData.goal === 'lose-weight') {
        userData.calorieGoal = Math.round(tdee - 500); // 500 calorie deficit
    } else if (userData.goal === 'build-muscle') {
        userData.calorieGoal = Math.round(tdee + 500); // 500 calorie surplus
    } else {
        userData.calorieGoal = Math.round(tdee); // Maintenance
    }
    // Show calorie goal input
    document.getElementById('height-input').classList.add('hidden');
    document.getElementById('calorie-goal-input').classList.remove('hidden');
    
    // Set default value in input
    const calorieGoalInput = document.getElementById('calorie-goal');
    const recommendedCalories = document.getElementById('recommended-calories');
    
    if (calorieGoalInput) calorieGoalInput.value = userData.calorieGoal;
    if (recommendedCalories) recommendedCalories.textContent = userData.calorieGoal;
});
}

// Calorie goal submit event
const calorieGoalSubmitBtn = document.getElementById('calorie-goal-submit');
if (calorieGoalSubmitBtn) {
calorieGoalSubmitBtn.addEventListener('click', () => {
    const calorieGoalInput = document.getElementById('calorie-goal');
    if (!calorieGoalInput) return;
    
    const calorieGoal = parseInt(calorieGoalInput.value, 10);
    
    if (isNaN(calorieGoal) || calorieGoal <= 0) {
        showNotification('Please enter a valid calorie goal', 'error');
        return;
    }
    
    userData.calorieGoal = calorieGoal;
    
    // NEW CODE - Set default macro goals based on user's selected goal
    if (userData.goal === 'lose-weight') {
        userData.macroGoals = {
            protein: 35, // Higher protein for satiety
            carbs: 30,   // Lower carbs
            fat: 35      // Moderate fat
        };
    } else if (userData.goal === 'build-muscle') {
        userData.macroGoals = {
            protein: 30, // High protein for muscle building
            carbs: 50,   // Higher carbs for energy and recovery
            fat: 20      // Lower fat
        };
    } else {
        userData.macroGoals = {
            protein: 25,
            carbs: 45,
            fat: 30
        };
    }
    
    // Generate initial meal plan
    if (dietPlans[userData.goal]) {
        generateMealPlan(dietPlans[userData.goal]);
    }
    
    // Calculate BMI for stats section
    calculateAndDisplayBMI();
    
    // Save user data
    saveUserData();
    
    // Show dashboard
    showDashboard();
    
    // Show welcome notification
    showNotification(`Welcome to QuickFit, ${userData.username}!`, 'success');
});
}

// Theme toggle event
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
themeToggleBtn.addEventListener('click', toggleTheme);
}

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

// Refresh workout button event
const refreshWorkoutBtn = document.getElementById('refresh-workout');
if (refreshWorkoutBtn) {
refreshWorkoutBtn.addEventListener('click', setDailyWorkout);
}

// NEW CODE - Share streak button event
const shareStreakBtn = document.getElementById('share-streak-btn');
if (shareStreakBtn) {
shareStreakBtn.addEventListener('click', () => {
    showShareStreakPrompt();
});
}

// Window resize event for device detection
window.addEventListener('resize', detectDevice);

// Window orientation change event
window.addEventListener('orientationchange', detectDevice);

// NEW CODE - Disable zoom on mobile
document.addEventListener('touchmove', function(event) {
if (event.scale !== 1) {
    event.preventDefault();
}
}, { passive: false });

// NEW CODE - Apply additional meta tags for preventing zoom
const metaViewport = document.querySelector('meta[name="viewport"]');
if (metaViewport) {
metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
} else {
const newMetaViewport = document.createElement('meta');
newMetaViewport.setAttribute('name', 'viewport');
newMetaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
document.head.appendChild(newMetaViewport);
}
});

// Ensure badge overlay close button works
document.getElementById('close-badge')?.addEventListener('click', () => {
document.getElementById('badge-overlay')?.classList.add('hidden');
});

// Ensure video modal close button works
document.getElementById('close-video')?.addEventListener('click', closeVideoModal);
