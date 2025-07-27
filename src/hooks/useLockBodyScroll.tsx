import { useEffect, useState } from "react";

const useLockBodyScroll = (locked: boolean) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && locked) {
            document.body.style.overflowY = "hidden";
            
            return () => {
                document.body.style.overflowY = "scroll";
            };
        }
    }, [isClient, locked]);
};

export default useLockBodyScroll;