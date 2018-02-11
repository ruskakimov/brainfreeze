/**
 * Adds events listeners to arrows (left => 37, right => 39)
 * @returns {Function} removes event listeners on call
 */
export const addArrowListeners = (handleNoClick, handleYesClick) => {
    const handler = ({ keyCode }) => {
        if (keyCode === 37) {
            handleNoClick();
        }
    
        if (keyCode === 39) {
            handleYesClick();
        }
    }

    document.addEventListener("keypress", handler);

    return () => document.removeEventListener("keypress", handler);
}

/**
 * Adds events listeners to enter (Enter => 13)
 * @returns {Function} removes event listeners on call
 */
export const addEnterListener = (handlePlayClick) => {
    const handler = ({ keyCode }) => {
        if (keyCode === 13) {
            handlePlayClick();
        }
    }

    document.addEventListener("keypress", handler);

    return () => document.removeEventListener("keypress", handler);
}