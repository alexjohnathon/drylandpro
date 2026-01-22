/**
 * Dryland Pro - Gold Standard Swimming Exercises Database
 * Data Architecture: Tiered Exercise System
 */

// Exercise Tier Classification System
const exerciseTiers = {
    STRENGTH: 'STRENGTH',
    POWER: 'POWER',
    HYPERTROPHY: 'HYPERTROPHY',
    MOBILITY: 'MOBILITY',
    METABOLIC: 'METABOLIC'
};

// Gold Standard Swimming Exercises Database
const exercises = [
    // ═══════════════════════════════════════════════════════════════
    // TIER 1: STRENGTH - Building Raw Power Foundation
    // ═══════════════════════════════════════════════════════════════
    {
        name: 'Lat Pulldown',
        equipment: 'Cable Machine',
        target: 'Back & Lats',
        desc: 'Seated pull targeting the latissimus dorsi with controlled eccentric phase.',
        tier: exerciseTiers.STRENGTH,
        swimmerNote: 'Verified: Directly mimics the catch phase of freestyle and butterfly, building the pulling power essential for propulsion.'
    },
    {
        name: 'Bench Press',
        equipment: 'Barbell',
        target: 'Chest',
        desc: 'Compound pressing movement targeting pectorals, anterior deltoids, and triceps.',
        tier: exerciseTiers.STRENGTH,
        swimmerNote: 'Verified: Develops pushing strength for starts, turns, and the recovery phase of breaststroke.'
    },
    {
        name: 'Deadlift',
        equipment: 'Barbell',
        target: 'Posterior Chain',
        desc: 'Full-body pull from the floor engaging glutes, hamstrings, and erector spinae.',
        tier: exerciseTiers.STRENGTH,
        swimmerNote: 'Verified: Builds total-body tension and hip drive critical for explosive starts and underwaters.'
    },
    {
        name: 'Squat',
        equipment: 'Barbell',
        target: 'Legs & Glutes',
        desc: 'Fundamental lower body compound movement targeting quads, glutes, and core.',
        tier: exerciseTiers.STRENGTH,
        swimmerNote: 'Verified: Essential for developing leg drive in starts, turns, and breaststroke kick power.'
    },
    {
        name: 'Bent Over Row',
        equipment: 'Barbell',
        target: 'Back & Lats',
        desc: 'Horizontal pulling movement targeting mid-back, lats, and rear deltoids.',
        tier: exerciseTiers.STRENGTH,
        swimmerNote: 'Verified: Strengthens the pulling muscles used throughout the entire freestyle stroke cycle.'
    },
    {
        name: 'Overhead Press',
        equipment: 'Barbell',
        target: 'Shoulders',
        desc: 'Vertical pressing movement developing deltoid and tricep strength.',
        tier: exerciseTiers.STRENGTH,
        swimmerNote: 'Verified: Builds shoulder stability and strength for the high-elbow catch and recovery phases.'
    },

    // ═══════════════════════════════════════════════════════════════
    // TIER 2: POWER - Explosive Movement Development
    // ═══════════════════════════════════════════════════════════════
    {
        name: 'Box Jump',
        equipment: 'Plyo Box',
        target: 'Legs & Glutes',
        desc: 'Explosive vertical jump onto an elevated platform with soft landing.',
        tier: exerciseTiers.POWER,
        swimmerNote: 'Verified: Develops the explosive leg power needed for race starts and flip turn push-offs.'
    },
    {
        name: 'Medicine Ball Slam',
        equipment: 'Medicine Ball',
        target: 'Core & Back',
        desc: 'Overhead slam driving the ball into the ground with full-body power.',
        tier: exerciseTiers.POWER,
        swimmerNote: 'Verified: Mimics the powerful lat engagement and core bracing of the butterfly pull.'
    },
    {
        name: 'Power Clean',
        equipment: 'Barbell',
        target: 'Full Body',
        desc: 'Olympic lift variation emphasizing explosive hip extension and triple extension.',
        tier: exerciseTiers.POWER,
        swimmerNote: 'Verified: Develops the coordinated explosive power essential for elite-level starts.'
    },
    {
        name: 'Broad Jump',
        equipment: 'Bodyweight',
        target: 'Legs & Glutes',
        desc: 'Horizontal explosive jump for maximum distance with controlled landing.',
        tier: exerciseTiers.POWER,
        swimmerNote: 'Verified: Builds horizontal power transfer directly applicable to dive starts.'
    },
    {
        name: 'Kettlebell Swing',
        equipment: 'Kettlebell',
        target: 'Posterior Chain',
        desc: 'Hip-hinge ballistic movement driving the kettlebell through hip extension.',
        tier: exerciseTiers.POWER,
        swimmerNote: 'Verified: Develops hip snap and posterior chain power for dolphin kicks and starts.'
    },
    {
        name: 'Plyo Push-Up',
        equipment: 'Bodyweight',
        target: 'Chest & Shoulders',
        desc: 'Explosive push-up with hands leaving the ground at the top of the movement.',
        tier: exerciseTiers.POWER,
        swimmerNote: 'Verified: Builds upper body explosiveness for the push-off phase of starts and turns.'
    },

    // ═══════════════════════════════════════════════════════════════
    // TIER 3: HYPERTROPHY - Muscle Development & Endurance
    // ═══════════════════════════════════════════════════════════════
    {
        name: 'Dumbbell Shoulder Press',
        equipment: 'Dumbbells',
        target: 'Shoulders',
        desc: 'Unilateral pressing movement with dumbbells for balanced shoulder development.',
        tier: exerciseTiers.HYPERTROPHY,
        swimmerNote: 'Verified: Builds symmetrical shoulder strength to prevent imbalances from stroke-dominant training.'
    },
    {
        name: 'Cable Face Pull',
        equipment: 'Cable Machine',
        target: 'Rear Deltoids',
        desc: 'External rotation and horizontal pull targeting posterior deltoids and rotator cuff.',
        tier: exerciseTiers.HYPERTROPHY,
        swimmerNote: 'Verified: Critical for shoulder health and balancing the internal rotation demands of swimming.'
    },
    {
        name: 'Dumbbell Row',
        equipment: 'Dumbbell',
        target: 'Back & Lats',
        desc: 'Single-arm row with torso support for isolated lat and rhomboid development.',
        tier: exerciseTiers.HYPERTROPHY,
        swimmerNote: 'Verified: Addresses unilateral strength imbalances common in freestyle-dominant swimmers.'
    },
    {
        name: 'Tricep Dip',
        equipment: 'Parallel Bars',
        target: 'Triceps & Chest',
        desc: 'Bodyweight pressing movement emphasizing tricep engagement.',
        tier: exerciseTiers.HYPERTROPHY,
        swimmerNote: 'Verified: Strengthens the triceps for the push phase of freestyle and backstroke.'
    },
    {
        name: 'Romanian Deadlift',
        equipment: 'Barbell',
        target: 'Hamstrings & Glutes',
        desc: 'Hip-hinge movement with emphasis on hamstring stretch under load.',
        tier: exerciseTiers.HYPERTROPHY,
        swimmerNote: 'Verified: Develops the posterior chain strength for streamlined body positioning and kick power.'
    },
    {
        name: 'Incline Dumbbell Press',
        equipment: 'Dumbbells',
        target: 'Upper Chest & Shoulders',
        desc: 'Pressing movement on an inclined bench targeting clavicular pectorals.',
        tier: exerciseTiers.HYPERTROPHY,
        swimmerNote: 'Verified: Builds upper chest and anterior deltoid strength for powerful catch phases.'
    },
    {
        name: 'Leg Curl',
        equipment: 'Machine',
        target: 'Hamstrings',
        desc: 'Isolation movement targeting the hamstring muscle group.',
        tier: exerciseTiers.HYPERTROPHY,
        swimmerNote: 'Verified: Isolates hamstrings for balanced leg development and injury prevention.'
    },

    // ═══════════════════════════════════════════════════════════════
    // TIER 4: MOBILITY - Flexibility & Injury Prevention
    // ═══════════════════════════════════════════════════════════════
    {
        name: 'Shoulder Dislocates',
        equipment: 'PVC Pipe or Band',
        target: 'Shoulders',
        desc: 'Full range of motion shoulder rotation maintaining straight arms throughout.',
        tier: exerciseTiers.MOBILITY,
        swimmerNote: 'Verified: Essential for maintaining the shoulder mobility required for efficient high-elbow catch.'
    },
    {
        name: 'Hip 90/90 Stretch',
        equipment: 'Bodyweight',
        target: 'Hips',
        desc: 'Seated hip rotation stretch alternating between internal and external rotation.',
        tier: exerciseTiers.MOBILITY,
        swimmerNote: 'Verified: Improves hip rotation range critical for breaststroke kick and flip turn efficiency.'
    },
    {
        name: 'Thoracic Spine Rotation',
        equipment: 'Bodyweight',
        target: 'Upper Back',
        desc: 'Rotational stretch improving thoracic spine mobility and extension.',
        tier: exerciseTiers.MOBILITY,
        swimmerNote: 'Verified: Enhances body rotation efficiency in freestyle and backstroke for longer strokes.'
    },
    {
        name: 'Prone Y-T-W Raises',
        equipment: 'Light Dumbbells',
        target: 'Shoulders & Upper Back',
        desc: 'Scapular stability exercise through three arm positions while prone.',
        tier: exerciseTiers.MOBILITY,
        swimmerNote: 'Verified: Activates stabilizer muscles protecting shoulders from repetitive stroke stress.'
    },
    {
        name: 'Ankle Mobility Stretch',
        equipment: 'Bodyweight',
        target: 'Ankles',
        desc: 'Wall-assisted dorsiflexion stretch improving ankle range of motion.',
        tier: exerciseTiers.MOBILITY,
        swimmerNote: 'Verified: Improves ankle plantarflexion range for a more powerful and fluid flutter kick.'
    },
    {
        name: 'World\'s Greatest Stretch',
        equipment: 'Bodyweight',
        target: 'Full Body',
        desc: 'Dynamic mobility flow combining hip flexor, hamstring, and thoracic rotation.',
        tier: exerciseTiers.MOBILITY,
        swimmerNote: 'Verified: Comprehensive warm-up movement addressing all major mobility needs for swimmers.'
    },
    {
        name: 'Plank Hold',
        equipment: 'Bodyweight',
        target: 'Core & Abs',
        desc: 'Static hold maintaining streamlined body position with engaged core.',
        tier: exerciseTiers.MOBILITY,
        swimmerNote: 'Verified: Develops the core stability essential for maintaining streamline position underwater.'
    },
    {
        name: 'Dead Bug',
        equipment: 'Bodyweight',
        target: 'Core & Abs',
        desc: 'Supine alternating arm and leg extension maintaining neutral spine.',
        tier: exerciseTiers.MOBILITY,
        swimmerNote: 'Verified: Trains anti-extension core control critical for preventing arching during freestyle.'
    },
    {
        name: 'Hollow Hold',
        equipment: 'Bodyweight',
        target: 'Core & Abs',
        desc: 'Supine hold with arms overhead and legs extended, creating hollow body position.',
        tier: exerciseTiers.MOBILITY,
        swimmerNote: 'Verified: Mimics the streamline position and core tension needed for underwaters.'
    },
    {
        name: 'Pallof Press',
        equipment: 'Cable Machine',
        target: 'Core & Abs',
        desc: 'Anti-rotation core exercise pressing cable away from center while resisting torque.',
        tier: exerciseTiers.MOBILITY,
        swimmerNote: 'Verified: Develops rotational stability essential for maintaining body position during freestyle breathing.'
    },
    {
        name: 'Hanging Leg Raise',
        equipment: 'Pull-up Bar',
        target: 'Core & Abs',
        desc: 'Hanging from bar while lifting legs to horizontal with controlled movement.',
        tier: exerciseTiers.MOBILITY,
        swimmerNote: 'Verified: Builds the hip flexor and lower ab strength critical for underwater dolphin kicks.'
    },
    {
        name: 'Swiss Ball Jackknife',
        equipment: 'Swiss Ball',
        target: 'Core & Abs',
        desc: 'Pike movement rolling ball toward chest while in plank position.',
        tier: exerciseTiers.MOBILITY,
        swimmerNote: 'Verified: Combines core stability with dynamic hip flexion mirroring the breaststroke kick recovery.'
    },

    // ═══════════════════════════════════════════════════════════════
    // TIER 5: METABOLIC - Conditioning Finishers
    // ═══════════════════════════════════════════════════════════════
    {
        name: 'Burpees',
        equipment: 'Bodyweight',
        target: 'Full Body',
        desc: 'Full-body exercise combining squat thrust, push-up, and vertical jump.',
        tier: exerciseTiers.METABOLIC,
        swimmerNote: 'Verified: Ultimate metabolic conditioner that builds the anaerobic capacity needed for race-pace efforts.'
    },
    {
        name: 'Mountain Climbers',
        equipment: 'Bodyweight',
        target: 'Core & Cardio',
        desc: 'Plank-based running motion with alternating knee drives.',
        tier: exerciseTiers.METABOLIC,
        swimmerNote: 'Verified: Develops core endurance and hip flexor conditioning essential for sustained kick sets.'
    },
    {
        name: 'Jumping Jacks',
        equipment: 'Bodyweight',
        target: 'Full Body Cardio',
        desc: 'Classic calisthenic combining arm circles with lateral leg jumps.',
        tier: exerciseTiers.METABOLIC,
        swimmerNote: 'Verified: Effective active recovery and warm-up movement maintaining elevated heart rate.'
    },
    {
        name: 'Plank Jacks',
        equipment: 'Bodyweight',
        target: 'Core & Cardio',
        desc: 'Jumping jack leg motion while maintaining a stable plank position.',
        tier: exerciseTiers.METABOLIC,
        swimmerNote: 'Verified: Combines core stability with metabolic demand, mimicking streamline under fatigue.'
    },
    {
        name: 'High Knees',
        equipment: 'Bodyweight',
        target: 'Cardio & Hip Flexors',
        desc: 'Running in place with exaggerated knee lift to hip height.',
        tier: exerciseTiers.METABOLIC,
        swimmerNote: 'Verified: Builds hip flexor endurance and cardiovascular capacity for sustained kick performance.'
    }
];

// ES6 Exports
export { exerciseTiers };
export default exercises;
