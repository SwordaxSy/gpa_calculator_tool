import { create } from "zustand";

// default grading systems
const defaultGradingSystems = {
    myuni: [
        { letter: "AA", grade: 4 },
        { letter: "BA", grade: 3.5 },
        { letter: "BB", grade: 3 },
        { letter: "CB", grade: 2.5 },
        { letter: "CC", grade: 2 },
        { letter: "DC", grade: 1.5 },
        { letter: "DD", grade: 1 },
        { letter: "FF", grade: 0 },
    ],
    universal: [
        { letter: "A+", grade: 4 },
        { letter: "A", grade: 4 },
        { letter: "A-", grade: 3.7 },
        { letter: "B+", grade: 3.3 },
        { letter: "B", grade: 3 },
        { letter: "B-", grade: 2.7 },
        { letter: "C+", grade: 2.3 },
        { letter: "C", grade: 2 },
        { letter: "C-", grade: 1.7 },
        { letter: "D+", grade: 1.3 },
        { letter: "D", grade: 1 },
        { letter: "D-", grade: 0.7 },
        { letter: "F", grade: 0 },
    ],
};

/**
 * local storage keys
 */
export const CONTENT_KEY = "content_data";
export const SYSTEM_KEY = "system_data";
export const LETTER_GRADES_KEY = "letters_data";

const useDataStore = create((set) => {
    /**
     * first attempt to get data from URL params
     * second attempt to get data from local storage
     * third use default data
     */

    const urlParams = new URLSearchParams(window.location.search);

    const storedGrades = JSON.parse(
        urlParams.get(CONTENT_KEY) || localStorage.getItem(CONTENT_KEY) || "[]"
    );

    const storedSystem = JSON.parse(
        urlParams.get(SYSTEM_KEY) ||
            localStorage.getItem(SYSTEM_KEY) ||
            '"myuni"'
    );

    const storedCustomGrades = JSON.parse(
        urlParams.get(LETTER_GRADES_KEY) ||
            localStorage.getItem(LETTER_GRADES_KEY) ||
            "[]"
    );

    return {
        content: storedGrades,
        setContent: (newContent) => {
            localStorage.setItem(CONTENT_KEY, JSON.stringify(newContent));
            set({ content: newContent });
        },

        system: storedSystem,
        setSystem: (newSystem) => {
            localStorage.setItem(SYSTEM_KEY, JSON.stringify(newSystem));
            set({ system: newSystem });
        },

        letterGrades: {
            ...defaultGradingSystems,
            custom: storedCustomGrades,
        },
        setCustomGrades: (newCustomGrades) => {
            localStorage.setItem(
                LETTER_GRADES_KEY,
                JSON.stringify(newCustomGrades)
            );

            /**
             * when setting new letterGrades
             * preserve default grading systems and only change custom letter grades
             */
            set({
                letterGrades: {
                    ...defaultGradingSystems,
                    custom: newCustomGrades,
                },
            });
        },

        settingsActive: false,
        setSettingsActive: (newSettingsActive) => {
            set({ settingsActive: newSettingsActive });
        },
    };
});

export default useDataStore;
