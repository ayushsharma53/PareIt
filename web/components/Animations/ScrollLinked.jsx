"use client"

import {
    animate,
    motion,
    MotionValue,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
} from "motion/react"
import { useContext, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../Context/ProfileContext";
import { useToast } from "../ui/Toast";
// Helper constants for the mask effect
const left = `0%`
const right = `100%`
const leftInset = `20%`
const rightInset = `80%`
const transparent = `#0000`
const opaque = `#000`

export default function ScrollLinked() {
    const ref = useRef(null)
    const navigate = useNavigate();
    const { scrollXProgress } = useScroll({ container: ref })
    const {isProvider} = useContext(ProfileContext)
    const toast = useToast()
    // 1. We call the mask function here
    const maskImage = useScrollOverflowMask(scrollXProgress)

    const items = [
        { id: 1, text: "I am a SITTER", color: "#ff0088", path: "/form" },
        { id: 2, text: "I can Help in GROOMING", color: "#dd00ee", path: "/form" },
        { id: 3, text: "Leave it for BOARDING", color: "#9911ff", path: "/form" },
        { id: 4, text: "I can Help for WALKING", color: "#0d63f8", path: "/form" },
    ];

    return (
        <div id="example">
            {/* Progress Circle */}
            {/* <svg id="progress" width="80" height="80" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
                <motion.circle
                    cx="50"
                    cy="50"
                    r="30"
                    className="indicator"
                    style={{ pathLength: scrollXProgress, stroke: "#4a90e2" }}
                />
            </svg> */}
            
            {/* Scrolling List */}
            <motion.ul ref={ref} style={{ maskImage }}>
                {items.map((item) => (
                    <motion.li 
                        key={item.id}
                        whileHover={{ scale: 1.05 }}  
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>  isProvider == true ? toast("You have already Registered! ","success"):navigate(item.path)}
                        style={{ 
                            background: item.color, 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            textAlign: 'center',
                            padding: '20px',
                            borderRadius: '15px'
                        }}
                    >
                        {item.text}
                    </motion.li>
                ))}
            </motion.ul>
            <StyleSheet />
        </div>
    )
}



function useScrollOverflowMask(scrollXProgress) {
    const maskImage = useMotionValue(
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
    )

    useMotionValueEvent(scrollXProgress, "change", (value) => {
        if (value === 0) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
            )
        } else if (value === 1) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
            )
        } else if (
            scrollXProgress.getPrevious() === 0 ||
            scrollXProgress.getPrevious() === 1
        ) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
            )
        }
    })

    return maskImage
}

function StyleSheet() {
    return (
        <style>{`
            #example {
              width: 100%;
              max-width: 600px; 
              position: relative;
              margin: 20px auto;
            }
            #example #progress {
                position: absolute;
                top: -65px;
                left: -15px;
                transform: rotate(-90deg);
                z-index: 10;
            }
            #example .bg { stroke: #222; }
            #example #progress circle {
                stroke-dashoffset: 0;
                stroke-width: 10%;
                fill: none;
            }
            #example ul {
                display: flex;
                list-style: none;
                height: 180px;
                overflow-x: scroll;
                padding: 10px 0;
                margin: 0 auto;
                gap: 15px;
                scrollbar-width: none;
            }
            #example ul::-webkit-scrollbar { display: none; }
            #example li {
                flex: 0 0 160px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            }
    `}</style>
    )
}