// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Remove the global overflow control
// document.documentElement.style.overflowX = 'hidden';
// document.body.style.overflowX = 'hidden';

document.addEventListener('DOMContentLoaded', function() {
    // Remove the DOM loaded overflow control
    // document.documentElement.style.overflowX = 'hidden';
    // document.body.style.overflowX = 'hidden';
    
    // Initialize particles.js
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 180,
                "density": {
                    "enable": true,
                    "value_area": 1000
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 2,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 3,
                    "size_min": 0.5,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0,
                "width": 0
            },
            "move": {
                "enable": true,
                "speed": 0.8,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.3
                    }
                }
            }
        },
        "retina_detect": true
    });
    
    // Hero animations
    const heroTl = gsap.timeline();
    
    // Group 1: All top content fades in quickly together
    heroTl.from([".df-top-logo", ".hero-top-gradient", ".hero-header", ".hero-subheader", ".hero-btn"], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05
    });

    // Group 2: Gallery content fades in immediately after
    const initScrollingGallery = () => {
        const galleryContainer = document.querySelector('.scrolling-gallery');
        const topRow = document.querySelector('.top-row');
        const bottomRow = document.querySelector('.bottom-row');
        
        if (!topRow || !bottomRow || !galleryContainer) return;
        
        // Calculate dimensions once
        const windowWidth = window.innerWidth;
        const topRowWidth = topRow.scrollWidth;
        const bottomRowWidth = bottomRow.scrollWidth;
        
        // Hard-coded start and end positions
        const topRowStartX = 40;
        const bottomRowStartX = windowWidth - bottomRowWidth + 40;
        const topRowEndX = -(topRowWidth - windowWidth - 40);
        const bottomRowEndX = 40;
        
        // Set initial positions with opacity 0
        gsap.set([topRow, bottomRow], { 
            opacity: 0
        });
        gsap.set(topRow, { x: topRowStartX });
        gsap.set(bottomRow, { x: bottomRowStartX });
        
        // Quick fade in for gallery
        heroTl.to([topRow, bottomRow], {
            opacity: 1,
            duration: 0.3,
            ease: "none",
            stagger: 0.05
        }); 
        
        // Create scroll animations
        gsap.fromTo(topRow, 
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
        
        gsap.fromTo(bottomRow, 
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
        
        // Simple resize handler
        window.addEventListener('resize', () => {
            ScrollTrigger.refresh();
        });
    };
    
    // Initialize gallery immediately
    initScrollingGallery();

    // Why Founders Choose Dreamflow section animation
    const initFoundersCardsAnimation = () => {
        const foundersCards = document.querySelector('.founders-cards');
        const title = document.querySelector('.why-founders-title');
        const cards = document.querySelectorAll('.founder-card');
        
        // Set initial state for title and cards
        gsap.set(title, {
            opacity: 0,
            y: 30
        });

        // Set initial state for cards
        gsap.set(cards, {
            opacity: 0,
            y: 30
        });

        // Animate title
        ScrollTrigger.create({
            trigger: title,
            start: "top 80%",
            onEnter: () => {
                gsap.to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });

                // Stagger animate cards after title
                gsap.to(cards, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power2.out"
                });
            }
        });

        // Only apply horizontal scroll animation for screens under 1200px
        const handleResize = () => {
            if (window.innerWidth <= 1200) {
                // Set initial position for cards container
                gsap.set(foundersCards, { x: 0 });

                // Create horizontal scroll animation
                gsap.to(foundersCards, {
                    x: () => {
                        const endPosition = -(foundersCards.scrollWidth - window.innerWidth + 40);
                        return Math.max(endPosition, -foundersCards.scrollWidth + window.innerWidth * 0.9);
                    },
                    ease: "none",
                    scrollTrigger: {
                        trigger: foundersCards,
                        start: "top 65%",
                        end: "top 15%",
                        scrub: 1.5,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            // Ensure cards stay visible at the end of animation
                            if (self.progress >= 0.95) {
                                const minVisible = window.innerWidth * 0.1;
                                const currentX = gsap.getProperty(foundersCards, "x");
                                if (-currentX > foundersCards.scrollWidth - minVisible) {
                                    gsap.set(foundersCards, {
                                        x: -(foundersCards.scrollWidth - minVisible)
                                    });
                                }
                            }
                        }
                    }
                });
            } else {
                // Reset position for larger screens
                gsap.set(foundersCards, { x: 0 });
                
                // Kill any existing ScrollTrigger animations
                ScrollTrigger.getAll().forEach(st => {
                    if (st.vars.trigger === foundersCards) {
                        st.kill();
                    }
                });
            }
        };

        // Initial check
        handleResize();

        // Update on window resize
        window.addEventListener('resize', handleResize);
    };

    // Initialize founders cards animation
    initFoundersCardsAnimation();

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

    // Pricing card dynamic content
    const initPricingCard = () => {
        const toggleOptions = document.querySelectorAll('.toggle-option');
        const pricingTitle = document.querySelector('.pricing-title');
        const statusIndicator = document.querySelector('.status-indicator');
        const statusText = document.querySelector('.status-text');
        const featuresColumns = document.querySelectorAll('.features-column');
        
        // Content configuration for each tier
        const tierContent = {
            'Essentials': {
                title: 'MVP Stage',
                price: '$4,995',
                features: [
                    'One request at a time',
                    'Avg 3-4 day delivery',
                    'Unlimited brands',
                    'Webflow development',
                    'Unlimited requests',
                    'Unlimited revisions',
                    'DreamGate™ Portal',
                    
                ]
            },
            'Elite': {
                title: 'Seed Stage',
                price: '$9,995',
                features: [
                    'Two requests at a time',
                    'Avg 48-hour delivery',
                    'Motion graphics included',
                    'Front-end development',
                    'Unlimited brands',
                    'DreamGate™ Portal',
                    'Unlimited requests',
                    'Unlimited revisions',
                 
                ]
            },
            'Full-Stack': {
                title: 'Growth Stage',
                price: '$24,995',
                features: [
                    'Everything in Seed',
                    'Avg 24–48 hour delivery',
                    'Motion graphics + 3D design',
                    'Full-stack development',
                    'Videography + photography',
                    'Dedicated creative director',
                    'Unlimited brands',
                    'DreamGate™ Portal'
                ]
            }
        };

        // Update card content based on selected tier
        const updateCardContent = (selectedTier) => {
            const content = tierContent[selectedTier];
            
            // Update title and price
            pricingTitle.textContent = content.title;
            document.querySelector('.price').textContent = content.price;
            
            // Update status
            statusIndicator.style.backgroundColor = '##1cdb6e';
            statusText.textContent = '3 spots left';
            
            // Clear existing features
            featuresColumns.forEach(column => column.innerHTML = '');
            
            // Get features array
            const features = content.features;
            
            // First column always gets first 4 items
            features.slice(0, 4).forEach(feature => {
                featuresColumns[0].innerHTML += `<div class="feature">${feature}</div>`;
            });
            
            // Second column gets remaining items
            features.slice(4).forEach(feature => {
                featuresColumns[1].innerHTML += `<div class="feature">${feature}</div>`;
            });
            
            // Add invisible placeholders if needed to maintain height
            const firstColumnNeeded = 4 - Math.min(4, features.length);
            const secondColumnNeeded = 4 - Math.max(0, features.length - 4);
            
            for (let i = 0; i < firstColumnNeeded; i++) {
                featuresColumns[0].innerHTML += `<div class="feature" style="opacity: 0; height: 21px;">placeholder</div>`;
            }
            
            for (let i = 0; i < secondColumnNeeded; i++) {
                featuresColumns[1].innerHTML += `<div class="feature" style="opacity: 0; height: 21px;">placeholder</div>`;
            }
        };

        // Add click handlers to toggle options
        toggleOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedTier = this.querySelector('.toggle-label').textContent;
                updateCardContent(selectedTier);
            });
        });

        // Initialize with Essentials tier
        updateCardContent('Essentials');
    };

    // Initialize pricing card
    initPricingCard();

    // Testimonial Carousel
    const initTestimonialCarousel = () => {
        const testimonials = document.querySelectorAll('.testimonial');
        let currentIndex = 0;
        const duration = 5000; // 5 seconds per testimonial
        
        // Function to show next testimonial
        const showNextTestimonial = () => {
            // Remove active class from current testimonial
            testimonials[currentIndex].classList.remove('active');
            
            // Calculate next index
            currentIndex = (currentIndex + 1) % testimonials.length;
            
            // Add active class to next testimonial
            testimonials[currentIndex].classList.add('active');
        };

        // Function to show specific testimonial
        const showTestimonial = (index) => {
            testimonials[currentIndex].classList.remove('active');
            currentIndex = index;
            testimonials[currentIndex].classList.add('active');
        };

        // Set up automatic cycling
        let intervalId = setInterval(showNextTestimonial, duration);

        // Add hover pause functionality
        const testimonialContainer = document.querySelector('.testimonials-container');
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(intervalId);
        });

        testimonialContainer.addEventListener('mouseleave', () => {
            intervalId = setInterval(showNextTestimonial, duration);
        });

        // Optional: Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                clearInterval(intervalId);
                showTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length);
                intervalId = setInterval(showNextTestimonial, duration);
            } else if (e.key === 'ArrowRight') {
                clearInterval(intervalId);
                showTestimonial((currentIndex + 1) % testimonials.length);
                intervalId = setInterval(showNextTestimonial, duration);
            }
        });
    };

    // Initialize testimonial carousel
    initTestimonialCarousel();

    // Card stacking animation implementation
    const initCardAnimation = () => {
        const cards = document.querySelectorAll('.stacked-card');
        const cardSection = document.querySelector('.all-in-one-section');
        const title = document.querySelector('.all-in-one-content .section-title');
        const clientLogosSection = document.querySelector('.client-logos-section');
        
        if (!cards.length || !cardSection) return;
        
        // Define the correct order for cards to appear - from bottom to top
        const cardOrder = [
            cards[4], // Pitch Decks & Presentations (first to appear, bottom)
            cards[3], // Content & Video Production
            cards[2], // Web Design & Development
            cards[1], // Brand Identity & Positioning
            cards[0]  // UX/UI Design (last to appear, top)
        ];
        
        // Function to setup animation
        const setupAnimation = () => {
            // Reset any existing ScrollTrigger
            const existingST = ScrollTrigger.getById("cardStackingAnimation");
            if (existingST) existingST.kill();
            
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
            
            // Use consistent 64px offset for all screen sizes
            const cardOffset = window.innerWidth <= 480 ? 32 : 64;
            
            // Create a pinned section with ScrollTrigger
            const cardTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".all-in-one-section",
                    start: "top 5%", // Start when section is 5% from top of viewport
                    end: "+=1200", // More scroll space needed for the new layout
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    markers: false,
                    id: "cardStackingAnimation",
                    onEnter: () => console.log("Cards section entered"),
                    onLeaveBack: () => console.log("Cards section left (back)"),
                    onLeave: () => console.log("Cards section left (forward)")
                }
            });
            
            // Animate all cards in sequence
            for (let i = 1; i < cardOrder.length; i++) {
                cardTimeline.to(cardOrder[i], {
                    y: i * cardOffset,
                    duration: 0.5,
                    ease: "power1.inOut"
                }, (i - 1) * 0.2);
            }
        };
        
        // Setup animation initially
        setupAnimation();
        
        // Handle window resize and re-initialize animation if needed
        window.addEventListener('resize', () => {
            clearTimeout(window.resizeTimer);
            window.resizeTimer = setTimeout(() => {
                setupAnimation();
            }, 250);
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

    // Add founders-cards hover scrolling and arrow navigation
    const foundersCards = document.querySelector('.founders-cards');

    if (foundersCards) {
        // Initialize any necessary properties
        const founderCards = document.querySelectorAll('.founder-card');
        const whyFoundersSection = document.querySelector('.why-founders-section');
    }
}); 