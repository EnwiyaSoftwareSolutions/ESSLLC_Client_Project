"use client"
import React, { useEffect, useRef, useState } from 'react';
import LaptopImage from '../../../utils/images/laptopNoBackground.png'
import Styles from './mainAbout.module.css'
import {Button} from "../../components/ui/button";
import {LaptopMinimal, CodeXml, Rocket, ChartNoAxesCombined } from 'lucide-react'

const MainAbout = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [offsetY, setOffsetY] = useState(0);

    // Trigger slide-in when element enters the viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.2 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Parallax — move the image at ~20% of scroll speed relative to its container
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const center = rect.top + rect.height / 2 - window.innerHeight / 2;
            setOffsetY(center * 0.15);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={Styles.mainAboutWrapper}>
        <div className={Styles.mainAboutContainer}>
            <div className={Styles.leftSideTextContainer}>
                <p className={Styles.heddingMessage}>Building Solutions. Empowering Businesses.</p>
                <h1 className={Styles.heddingCompanyName}>Enwiya Software Solutions</h1>
                <p className={Styles.heddingDescription}>We design and develop modern, reliable, and scalable web solutions that help businesses grow, streamline operations, and make an impact.</p>
                <div className={Styles.buttonContainer}>
                    <Button variant="default" size="lg" className={Styles.contactButton}>Explore our Services →</Button>
                    <Button variant="secondary" size="lg" className={Styles.contactButton2}>View Our Work</Button>
                </div>
            </div>

            <div className={Styles.rightSideTextContainer}>
                <div ref={containerRef} className={visible ? Styles.show : ''}>
                    <div className={Styles.card}>
                        <img
                            src={LaptopImage.src}
                            alt="Laptop"
                            className="w-full h-auto object-contain"
                            style={{
                                transform: `translateY(${offsetY}px)`,
                                transition: 'transform 0.08s linear',
                                willChange: 'transform',
                            }}
                        />
                    </div>
                </div>
            </div>
          
        </div>
          <div className={Styles.servicesContainer}>
                <div className={Styles.serviceCard}>
                    <div>
                        <LaptopMinimal className={Styles.icon}></LaptopMinimal>
                        </div>
                        <div>
                    <h3 className={Styles.focuseArea}>Web Design</h3>
                    <p>Beautiful, responsive designs that deliver great user experiences.</p>
                    </div>
                </div>
                <div className={Styles.serviceCard}>
                    <div>
                        <CodeXml className={Styles.icon}></CodeXml>
                    </div>
                    <div>
                    <h3 className={Styles.focuseArea}>Web Development</h3>
                    <p>Clean, scalable, and efficient code to bring your ideas to life.</p>
                    </div>
                </div>
                <div className={Styles.serviceCard}>
                    <div>
                        <Rocket className={Styles.icon}></Rocket>
                    </div>
                    <div>
                    <h3 className={Styles.focuseArea}>Performance</h3>
                    <p>Optimized for speed, security, and reliability.</p>
                    </div>
                </div>
                <div className={Styles.serviceCard}>
                    <div>
                    <ChartNoAxesCombined className={Styles.icon}></ChartNoAxesCombined>
                    </div>
                    <div>
                    <h3 className={Styles.focuseArea}>Growth Focused</h3>
                    <p>Solutions designed to help your business grow and succeed online.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MainAbout;