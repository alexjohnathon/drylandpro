/**
 * WorkoutManager.js
 * Backend Logic for Smart Workout Generation
 * 
 * Handles workout generation, exercise swapping, locking, and rep scheme calculations.
 */

import exercises, { exerciseTiers } from './exercises.js';

class WorkoutManager {
    constructor() {
        // Current workout state
        this.currentWorkout = [];
        this.lockedIndices = new Set();

        // User filter state
        this.filters = {
            goal: 'Strength',      // 'Strength' | 'Power' | 'Endurance'
            equipment: 'All',       // 'All' | 'Bodyweight' | 'Dumbbells' | etc.
            finisherEnabled: false  // Toggle for Slot 6 (Metabolic Finisher)
        };

        // Slot configuration - defines the structure of every workout
        this.slotConfig = [
            { slot: 1, category: 'Mobility', tier: exerciseTiers.MOBILITY, isCore: false },
            { slot: 2, category: 'Power', tier: exerciseTiers.POWER, isCore: false },
            { slot: 3, category: 'Strength', tier: exerciseTiers.STRENGTH, isCore: false },
            { slot: 4, category: 'Accessory', tier: exerciseTiers.HYPERTROPHY, isCore: false },
            { slot: 5, category: 'Core', tier: exerciseTiers.MOBILITY, isCore: true },
            { slot: 6, category: 'Finisher', tier: exerciseTiers.METABOLIC, isCore: false, optional: true }
        ];
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // FILTER MANAGEMENT
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Update user filters
     * @param {Object} newFilters - Partial filter object to merge
     */
    setFilters(newFilters) {
        this.filters = { ...this.filters, ...newFilters };
    }

    /**
     * Get current filter state
     * @returns {Object} Current filters
     */
    getFilters() {
        return { ...this.filters };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CORE ALGORITHM: WORKOUT GENERATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Generate a new workout following the strict slot structure
     * Respects locked indices - locked exercises are preserved
     * @returns {Array} Generated workout array
     */
    generateWorkout() {
        const usedExerciseNames = new Set();
        const newWorkout = [];

        // Determine how many slots to fill (5 or 6 based on finisher toggle)
        const slotsToFill = this.filters.finisherEnabled ? 6 : 5;

        for (let i = 0; i < slotsToFill; i++) {
            // If this index is locked and we have an existing exercise, preserve it
            if (this.lockedIndices.has(i) && this.currentWorkout[i]) {
                const lockedExercise = this.currentWorkout[i];
                usedExerciseNames.add(lockedExercise.name);
                newWorkout.push(lockedExercise);
                continue;
            }

            // Get slot configuration
            const slotDef = this.slotConfig[i];

            // Find a valid exercise for this slot
            const exercise = this._findExerciseForSlot(slotDef, usedExerciseNames);

            if (exercise) {
                usedExerciseNames.add(exercise.name);

                // Attach rep scheme based on tier and goal
                const workoutExercise = {
                    ...exercise,
                    slotCategory: slotDef.category,
                    repScheme: this.getRepScheme(exercise.tier, this.filters.goal)
                };

                newWorkout.push(workoutExercise);
            }
        }

        this.currentWorkout = newWorkout;
        return this.currentWorkout;
    }

    /**
     * Find a suitable exercise for a given slot
     * @private
     * @param {Object} slotDef - Slot definition object
     * @param {Set} usedNames - Set of already-used exercise names
     * @returns {Object|null} Selected exercise or null
     */
    _findExerciseForSlot(slotDef, usedNames) {
        // Start with tier-only candidates
        let candidates = exercises.filter(ex => ex.tier === slotDef.tier);

        // Core slot special filter
        if (slotDef.isCore) {
            candidates = candidates.filter(ex =>
                ex.target.toLowerCase().includes('core') ||
                ex.target.toLowerCase().includes('abs')
            );
        }

        if (this.filters.equipment !== 'All') {
            const selectedEq = this.filters.equipment.toLowerCase();

            // Step 1: Try exact equipment match
            let exactMatch = candidates.filter(ex =>
                ex.equipment.toLowerCase() === selectedEq
            );

            if (exactMatch.length > 0) {
                candidates = exactMatch;
            } else {
                // Step 2: Fall back to Bodyweight only
                let bodyweightFallback = candidates.filter(ex =>
                    ex.equipment.toLowerCase() === 'bodyweight'
                );

                if (bodyweightFallback.length > 0) {
                    candidates = bodyweightFallback;
                }
                // Step 3: If still empty, use full tier (no filter)
            }
        }

        // Exclude already-used exercises
        candidates = candidates.filter(ex => !usedNames.has(ex.name));

        // Final desperate fallback if somehow empty
        if (candidates.length === 0) {
            candidates = exercises.filter(ex =>
                ex.tier === slotDef.tier && !usedNames.has(ex.name)
            );
        }

        if (candidates.length === 0) return null;

        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // EXERCISE SWAPPING
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Swap a single exercise at the given index with a new valid exercise
     * Respects locks - will not swap if index is locked
     * @param {number} index - Index of exercise to swap (0-based)
     * @returns {Object|null} New exercise or null if locked/invalid
     */
    swapExercise(index) {
        // Check if index is valid
        if (index < 0 || index >= this.currentWorkout.length) {
            console.warn(`Invalid swap index: ${index}`);
            return null;
        }

        // Check if slot is locked
        if (this.lockedIndices.has(index)) {
            console.warn(`Cannot swap locked exercise at index: ${index}`);
            return null;
        }

        // Get current exercise names to avoid duplicates
        const usedNames = new Set(
            this.currentWorkout
                .filter((_, i) => i !== index)
                .map(ex => ex.name)
        );

        // Add current exercise to exclusion list for variety
        usedNames.add(this.currentWorkout[index].name);

        // Get slot configuration for this index
        const slotDef = this.slotConfig[index];

        // Find new exercise
        const newExercise = this._findExerciseForSlot(slotDef, usedNames);

        if (newExercise) {
            const workoutExercise = {
                ...newExercise,
                slotCategory: slotDef.category,
                repScheme: this.getRepScheme(newExercise.tier, this.filters.goal)
            };

            this.currentWorkout[index] = workoutExercise;
            return workoutExercise;
        }

        return null;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // LOCK MANAGEMENT
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Toggle lock state for a specific exercise index
     * @param {number} index - Index to toggle (0-based)
     * @returns {boolean} New lock state (true = locked)
     */
    toggleLock(index) {
        if (index < 0 || index >= this.currentWorkout.length) {
            console.warn(`Invalid lock index: ${index}`);
            return false;
        }

        if (this.lockedIndices.has(index)) {
            this.lockedIndices.delete(index);
            return false;
        } else {
            this.lockedIndices.add(index);
            return true;
        }
    }

    /**
     * Check if an index is locked
     * @param {number} index - Index to check
     * @returns {boolean} Lock state
     */
    isLocked(index) {
        return this.lockedIndices.has(index);
    }

    /**
     * Clear all locks
     */
    clearLocks() {
        this.lockedIndices.clear();
    }

    /**
     * Get all locked indices
     * @returns {Array<number>} Array of locked indices
     */
    getLockedIndices() {
        return [...this.lockedIndices];
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // REP SCHEME CALCULATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Get the appropriate rep scheme based on tier and session goal
     * @param {string} tier - Exercise tier from exerciseTiers
     * @param {string} sessionGoal - 'Strength' | 'Power' | 'Endurance'
     * @returns {string} Rep scheme string (e.g., "4x6")
     */
    getRepScheme(tier, sessionGoal) {
        const repSchemes = {
            // STRENGTH tier rep schemes
            [exerciseTiers.STRENGTH]: {
                'Strength': '4x5',
                'Power': '5x3',
                'Endurance': '3x12'
            },
            // POWER tier rep schemes
            [exerciseTiers.POWER]: {
                'Strength': '4x6',
                'Power': '5x3',
                'Endurance': '3x10'
            },
            // HYPERTROPHY tier rep schemes
            [exerciseTiers.HYPERTROPHY]: {
                'Strength': '3x8',
                'Power': '4x6',
                'Endurance': '3x15'
            },
            // MOBILITY tier rep schemes
            [exerciseTiers.MOBILITY]: {
                'Strength': '2x30s',
                'Power': '2x30s',
                'Endurance': '3x45s'
            },
            // METABOLIC tier rep schemes
            [exerciseTiers.METABOLIC]: {
                'Strength': '3x30s',
                'Power': '4x20s',
                'Endurance': '3x45s'
            }
        };

        // Get scheme or fallback to default
        const tierSchemes = repSchemes[tier];
        if (!tierSchemes) {
            console.warn(`Unknown tier: ${tier}, using default scheme`);
            return '3x10';
        }

        return tierSchemes[sessionGoal] || '3x10';
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // UTILITY METHODS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Get the current workout
     * @returns {Array} Current workout array
     */
    getCurrentWorkout() {
        return [...this.currentWorkout];
    }

    /**
     * Clear the current workout and locks
     */
    reset() {
        this.currentWorkout = [];
        this.lockedIndices.clear();
    }

    /**
     * Get workout summary for display
     * @returns {Object} Summary object with workout stats
     */
    getWorkoutSummary() {
        return {
            exerciseCount: this.currentWorkout.length,
            lockedCount: this.lockedIndices.size,
            hasFinisher: this.filters.finisherEnabled && this.currentWorkout.length === 6,
            goal: this.filters.goal,
            equipment: this.filters.equipment
        };
    }
}

// ES6 Export
export default WorkoutManager;
