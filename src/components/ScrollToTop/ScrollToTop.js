import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";
import UpArrow from '../../assets/images/upArrow.png'
import  './ScrollToTop.css'

const ScrollToTop = () => {
    const { y: pageYOffset } = useWindowScroll();
    const [visible, setVisiblity] = useState(false);

    useEffect(() => {
        if (pageYOffset > 400) {
            setVisiblity(true);
        } else {
            setVisiblity(false);
        }
    }, [pageYOffset]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    if (!visible) {
        return false;
    }

    return (
        <div className='DeskTopOnly'>
            <div className="scroll-to-top cursor-pointer text-center"
                onClick={scrollToTop}
            >
                <img src={UpArrow} width='23px' height='23px' className="icon fas fa-chevron-up" alt='uparrow'/>
            </div>
        </div>
    );
};

export default ScrollToTop;