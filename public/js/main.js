// Import GSAP from node_modules
import { gsap } from '../../node_modules/gsap/index.js';
import { ScrollTrigger } from '../../node_modules/gsap/ScrollTrigger.js';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Remove the global overflow control
// document.documentElement.style.overflowX = 'hidden';
// document.body.style.overflowX = 'hidden';

document.addEventListener('DOMContentLoaded', function() {
    // Remove the DOM loaded overflow control
    // document.documentElement.style.overflowX = 'hidden';
    // document.body.style.overflowX = 'hidden';
    
    // Hero animations
    const heroTl = gsap.timeline();
    
    heroTl.from(".hero-top-gradient", {
        opacity: 0,
        y: -20,
        duration: 1
    });
    
    heroTl.from(".hero-header", {
        opacity: 0,
        y: 30,
        duration: 0.8
    }, "-=0.5");
    
    heroTl.from(".hero-subheader", {
        opacity: 0,
        y: 20,
        duration: 0.6
    }, "-=0.3");
    
    heroTl.from(".hero-btn", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.2
    }, "-=0.3");
    
    heroTl.from(".hero-card-left", {
        opacity: 0,
        x: 40,
        duration: 0.8
    }, "-=0.6");
    
    heroTl.from(".hero-card-right", {
        opacity: 0,
        x: 40,
        duration: 0.8
    }, "-=0.5");

    // Logo animation
    const clientsContainer = document.querySelector('.clients-container');
    
    // Ensure the container is wide enough
    clientsContainer.style.width = '400%';
    
    // Position the first logo at the left edge initially (partially visible)
    gsap.set("#clientLogos1", {
        x: "-90%"
    });
    
    // Position the second logo right after the first one
    gsap.set("#clientLogos2", {
        x: "10%"
    });
    
    // Create the continuous animation - slower speed (30 seconds instead of 25)
    const logoTimeline = gsap.timeline({repeat: -1});
    
    logoTimeline
        .to("#clientLogos1", {
            x: "-200%", 
            duration: 30,
            ease: "linear"
        })
        .to("#clientLogos2", {
            x: "-100%", 
            duration: 30,
            ease: "linear"
        }, "<"); // Start at the same time
    
    // Add more logo elements for continuous scrolling
    const createAdditionalLogos = () => {
        const logo3 = document.querySelector('#clientLogos1').cloneNode(true);
        const logo4 = document.querySelector('#clientLogos2').cloneNode(true);
        
        logo3.id = "clientLogos3";
        logo4.id = "clientLogos4";
        
        clientsContainer.appendChild(logo3);
        clientsContainer.appendChild(logo4);
        
        // Position the additional logos
        gsap.set("#clientLogos3", {
            x: "110%"
        });
        
        gsap.set("#clientLogos4", {
            x: "210%"
        });
        
        // Add them to the animation
        logoTimeline
            .to("#clientLogos3", {
                x: "0%", 
                duration: 30,
                ease: "linear"
            }, "<")
            .to("#clientLogos4", {
                x: "100%", 
                duration: 30,
                ease: "linear"
            }, "<");
    };
    
    createAdditionalLogos();

    // Completely rewritten scrolling gallery animation
    const initScrollingGallery = () => {
        const galleryContainer = document.querySelector('.scrolling-gallery');
        const topRow = document.querySelector('.top-row');
        const bottomRow = document.querySelector('.bottom-row');
        
        if (!topRow || !bottomRow || !galleryContainer) return;
        
        // Only clear gallery animations, not all ScrollTrigger instances
        const existingTriggers = ScrollTrigger.getAll();
        existingTriggers.forEach(st => {
            // Only kill gallery-related animations based on their elements or IDs
            if ((st.vars && st.vars.trigger === galleryContainer) || 
                (st.trigger === galleryContainer) || 
                st.id === "galleryScroll") {
                console.log("Killing existing gallery ScrollTrigger");
                st.kill();
            }
        });
        
        // Reset any existing styles on the rows
        gsap.set([topRow, bottomRow], { clearProps: "all" });
        
        // Remove body overflow control
        // document.body.style.overflowX = 'hidden';
        // document.documentElement.style.overflowX = 'hidden';
        
        // Set only gallery container to hide overflow
        galleryContainer.style.overflow = 'hidden';
        
        // Keep the investor-ready section from causing horizontal scroll
        const investorSection = document.querySelector('.investor-ready-section');
        if (investorSection) {
            investorSection.style.overflow = 'hidden';
        }
        
        // Calculate dimensions once
        const windowWidth = window.innerWidth;
        const topRowWidth = topRow.scrollWidth;
        const bottomRowWidth = bottomRow.scrollWidth;
        
        // Hard-coded start and end positions
        const topRowStartX = 40; // Top row starts 400px from left
        const topRowEndX = -(topRowWidth - windowWidth - 40); // End with last image 40px from right
        
        const bottomRowStartX = windowWidth - bottomRowWidth + 40; // Bottom row starts with last image 40px from right
        const bottomRowEndX = 40; // End with first image 40px from left
        
        console.log({
            windowWidth,
            topRowWidth, 
            bottomRowWidth,
            topRowStartX,
            topRowEndX,
            bottomRowStartX,
            bottomRowEndX
        });
        
        // Manually force initial positioning
        topRow.style.transform = `translateX(${topRowStartX}px)`;
        bottomRow.style.transform = `translateX(${bottomRowStartX}px)`;
        
        // Create a "checker" function that periodically verifies positioning
        const checkPositions = () => {
            const topTransform = window.getComputedStyle(topRow).transform;
            const bottomTransform = window.getComputedStyle(bottomRow).transform;
            
            console.log("Current transforms:", { 
                top: topTransform,
                bottom: bottomTransform,
                topStyle: topRow.style.transform,
                bottomStyle: bottomRow.style.transform
            });
            
            // If somehow the transforms are not set or reverted to defaults, reapply them
            if (topTransform === "none" || topTransform === "matrix(1, 0, 0, 1, 0, 0)") {
                topRow.style.transform = `translateX(${topRowStartX}px)`;
            }
            
            if (bottomTransform === "none" || bottomTransform === "matrix(1, 0, 0, 1, 0, 0)") {
                bottomRow.style.transform = `translateX(${bottomRowStartX}px)`;
            }
        };
        
        // Check positions after a moment and again when the gallery enters view
        setTimeout(checkPositions, 100);
        
        // Create a unified trigger that handles both rows consistently
        const mainTrigger = ScrollTrigger.create({
            trigger: galleryContainer,
            start: "top bottom", // Start when top of gallery enters viewport
            end: "bottom top",   // End when bottom of gallery leaves viewport
            id: "galleryScroll", // Give it a unique ID
            onEnter: () => {
                console.log("Gallery entered view");
                // Re-enforce initial positions
                topRow.style.transform = `translateX(${topRowStartX}px)`;
                bottomRow.style.transform = `translateX(${bottomRowStartX}px)`;
                setTimeout(checkPositions, 50);
            },
            onLeaveBack: () => {
                console.log("Gallery left view backwards");
                // Reset to initial positions when scrolling back up
                topRow.style.transform = `translateX(${topRowStartX}px)`;
                bottomRow.style.transform = `translateX(${bottomRowStartX}px)`;
            }
        });
        
        // Create separate, simple animations for each row
        const topRowAnim = gsap.fromTo(topRow, 
            { x: topRowStartX }, 
            { 
                x: topRowEndX, 
                ease: "none",
                scrollTrigger: {
                    trigger: galleryContainer,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2,
                    invalidateOnRefresh: true
                }
            }
        );
        
        const bottomRowAnim = gsap.fromTo(bottomRow, 
            { x: bottomRowStartX }, 
            { 
                x: bottomRowEndX, 
                ease: "none",
                scrollTrigger: {
                    trigger: galleryContainer,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2,
                    invalidateOnRefresh: true
                }
            }
        );
        
        // Handle window resize events properly
        window.addEventListener('resize', () => {
            // First kill existing animations
            if (topRowAnim) topRowAnim.kill();
            if (bottomRowAnim) bottomRowAnim.kill();
            if (mainTrigger) mainTrigger.kill();
            
            // Then reinitialize the whole gallery
            setTimeout(initScrollingGallery, 100);
        });
    };
    
    // Initialize gallery after a short delay to ensure DOM is ready
    setTimeout(initScrollingGallery, 200);

    // Card stacking animation implementation
    const initCardAnimation = () => {
        const cards = document.querySelectorAll('.stacked-card');
        const cardSection = document.querySelector('.all-in-one-section');
        const title = document.querySelector('.all-in-one-content .section-title');
        const clientLogosSection = document.querySelector('.client-logos-section');
        
        if (!cards.length || !cardSection) return;
        
        // Define the correct order for cards to appear - from bottom to top
        // Based on HTML structure: data-card="0" is UX/UI Design, data-card="4" is Pitch Decks
        const cardOrder = [
            cards[4], // Pitch Decks & Presentations (first to appear, bottom)
            cards[3], // Content & Video Production
            cards[2], // Web Design & Development
            cards[1], // Brand Identity & Positioning
            cards[0]  // UX/UI Design (last to appear, top)
        ];
        
        // Log for debugging
        console.log("Initializing card animation with", cardOrder.length, "cards in custom order");
        
        // Set initial positions for title and first card - show them immediately
        gsap.set(title, { opacity: 1, y: 0 });
        gsap.set(cardOrder[0], { y: 0, opacity: 1 }); // First card (Pitch Decks) is visible immediately
        
        // All other cards start below the viewport
        for (let i = 1; i < cardOrder.length; i++) {
            gsap.set(cardOrder[i], {
                y: 1000, // Start from way below
                opacity: 1 // Start fully opaque for slide animation
            });
        }
        
        // Create a pinned section with ScrollTrigger
        const cardTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".all-in-one-section",
                start: "top 5%", // Start when section is 15% from top of viewport
                end: "+=1000", // Less scroll space needed
                scrub: 1,
                pin: true,
                pinSpacing: true,
                markers: false, // Disable markers for production
                id: "cardStackingAnimation", // Give it a unique ID to avoid conflicts
                onEnter: () => console.log("Cards section entered"),
                onLeaveBack: () => console.log("Cards section left (back)"),
                onLeave: () => console.log("Cards section left (forward)")
            }
        });
        
        // Skip first card (already visible) and animate remaining cards in sequence
        for (let i = 1; i < cardOrder.length; i++) {
            // Calculate the vertical offset - each card needs to be stacked with 64px showing
            const offset = i * 64; // Stack with 64px offset from the previous card
            
            // Animate the card into position
            cardTimeline.to(cardOrder[i], {
                y: offset, // Stack with proper offset
                duration: 0.5,
                ease: "power1.inOut"
            }, (i - 1) * 0.2); // Staggered timing - more compact
        }
        
        // Handle window resize only for this animation
        window.addEventListener('resize', () => {
            // Find only our animation and refresh it
            const cardST = ScrollTrigger.getById("cardStackingAnimation");
            if (cardST) cardST.refresh();
        });
    };
    
    // Initialize card animation after a delay to ensure other animations are initialized
    setTimeout(initCardAnimation, 500);

    // Initialize FAQ section
    const eigthSection = document.querySelector('.eigth-section');
    if (eigthSection) {
        eigthSection.classList.add('active');
    }
    
    // Add toggle functionality to FAQ questions
    const faqQuestions = document.querySelectorAll('.faq-q');
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.faq-icon');
            
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.style.opacity = 0;
                answer.style.paddingBottom = '0';
                answer.style.marginBottom = '0';
                icon.style.transform = 'rotate(0deg)';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = 1;
                answer.style.paddingBottom = '10px';
                answer.style.marginBottom = '10px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}); 