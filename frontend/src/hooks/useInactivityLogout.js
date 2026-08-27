import { useEffect, useRef } from "react";

const useInactivityLogout = (onInactivity) => {
    const timerRef = useRef(null);

    const INACTIVITY_TIME = 30 * 60 * 1000;

    useEffect(() => {
        const events = [
            "mousemove",
            "mousedown",
            "keydown",
            "scroll",
            "touchstart",
        ];

        const resetTimer = () => {
            clearTimeout(timerRef.current);

            timerRef.current = setTimeout(() => {
                onInactivity();
            }, INACTIVITY_TIME);
        };

        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        resetTimer();

        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });

            clearTimeout(timerRef.current);
        };
    }, [onInactivity]);
};

export default useInactivityLogout;