import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    characters?: string;
    className?: string;
    parentClassName?: string;
    encryptedClassName?: string;
    animateOn?: "view" | "hover";
    clickMode?: string;
    revealDirection?: string;
    sequential?: boolean;
    useOriginalCharsOnly?: boolean;
}

const DecryptedText: React.FC<DecryptedTextProps> = ({
    text,
    speed = 50,
    maxIterations = 10,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
    className = "",
    parentClassName = "",
    animateOn = "hover"
}) => {
    const [displayText, setDisplayText] = useState(animateOn === 'hover' ? text : "");
    const [isHovering, setIsHovering] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    useEffect(() => {
        if (animateOn === 'view' && isInView && !hasAnimated) {
            let iteration = 0;
            const interval = setInterval(() => {
                setDisplayText(() => 
                    text.split("").map((_, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    }).join("")
                );
                
                if (iteration >= text.length) {
                    clearInterval(interval);
                    setHasAnimated(true);
                    setDisplayText(text);
                }
                iteration += 1 / (maxIterations / 2);
            }, speed);
            return () => clearInterval(interval);
        }
    }, [text, speed, maxIterations, characters, animateOn, hasAnimated, isInView]);

    const handleMouseEnter = () => {
        if (animateOn !== 'hover') return;
        setIsHovering(true);
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(() => 
                text.split("").map((_, index) => {
                    if (index < iteration) {
                        return text[index];
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                }).join("")
            );
            
            if (iteration >= text.length) {
                clearInterval(interval);
                setDisplayText(text);
            }
            iteration += 1 / (maxIterations / 2);
        }, speed);
    };

    return (
        <span 
            ref={ref}
            className={`inline-block ${parentClassName}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovering(false)}
        >
            <span className={className}>
                {animateOn === 'view' ? (displayText || text.replace(/./g, '-')) : (isHovering ? displayText : text)}
            </span>
        </span>
    );
};

export default DecryptedText;
