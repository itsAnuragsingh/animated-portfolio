"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

interface IconItem {
    id: string;
    label: string;
    src: string;
    bg?: string;
    rotation: number;
    top: string;
    left?: string;
    right?: string;
    mTop?: string;
    mLeft?: string;
    mRight?: string;
    delay: number;
    dur: number;
    is3D?: boolean;
}

/* ─── Icon data for the 7 floating 3D tech icons ─── */
const ICONS: IconItem[] = [
    {
        id: "nextjs",
        label: "Next.js",
        src: "/nextjs.png",
        rotation: -4,
        top: "16%",
        left: "6%",
        mTop: "22%",
        mLeft: "4%",
        delay: 0,
        dur: 5.2,
        is3D: true,
    },
    {
        id: "nodejs",
        label: "Node.js",
        src: "/node.png",
        rotation: 3,
        top: "8%",
        left: "24%",
        mTop: "12%",
        mLeft: "14%",
        delay: 0.8,
        dur: 5.7,
        is3D: true,
    },
    {
        id: "github",
        label: "GitHub",
        src: "/github.png",
        rotation: -3,
        top: "60%",
        left: "10%",
        mTop: "60%",
        mLeft: "3%",
        delay: 1.4,
        dur: 6.0,
        is3D: true,
    },
    {
        id: "docker",
        label: "Docker",
        src: "/docker.png",
        rotation: 4,
        top: "10%",
        right: "22%",
        mTop: "12%",
        mRight: "14%",
        delay: 0.4,
        dur: 5.5,
        is3D: true,
    },
    {
        id: "postgresql",
        label: "PostgreSQL",
        src: "/postgresql.png",
        rotation: -2,
        top: "18%",
        right: "5%",
        mTop: "22%",
        mRight: "3%",
        delay: 1.0,
        dur: 5.3,
        is3D: true,
    },
    {
        id: "react",
        label: "React",
        src: "/react.png",
        rotation: 4,
        top: "56%",
        right: "4%",
        mTop: "56%",
        mRight: "2%",
        delay: 0.6,
        dur: 6.1,
        is3D: true,
    },
    {
        id: "aws",
        label: "AWS",
        src: "/aws.png",
        rotation: -3,
        top: "64%",
        right: "18%",
        mTop: "70%",
        mRight: "8%",
        delay: 1.6,
        dur: 5.6,
        is3D: true,
    },
];

/* ─── Magnetic / Sticky Physics Item Component ─── */
function MagneticItem({
    children,
    strength = 0.35,
    className = "",
}: {
    children: React.ReactNode;
    strength?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * strength, y: middleY * strength });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 350, damping: 16, mass: 0.15 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface InvokixFeature {
    id: string;
    badge: string;
    title: string;
    shortTitle: string;
    tech: string;
    iconType: "img" | "svg";
    iconUrl?: string;
    description: string;
    fullDesc: string;
    highlights: string[];
}

const invokixFeatures: InvokixFeature[] = [
    {
        id: "contract-engine",
        badge: "API CONTRACTS",
        title: "API Contract Management & Workspaces",
        shortTitle: "API Contract Management",
        tech: "Next.js",
        iconType: "img",
        iconUrl: "https://unavatar.io/github/nextjs",
        description: "Unified schema definition, multi-project environments, and real-time team synchronization.",
        fullDesc: "Invokix acts as the single source of truth for engineering teams, standardizing endpoint definitions, versioning contracts across environments, and ensuring zero drift between backend services and client consumers.",
        highlights: [
            "Centralized contract repository with version history & diff inspector",
            "Multi-environment configurations (Local, Staging, Production)",
            "Automated contract validation against runtime network payloads",
            "Granular team role permissions and organization project nesting",
        ],
    },
    {
        id: "cli-tooling",
        badge: "CLI TOOLING",
        title: "Interactive Developer CLI Workflows",
        shortTitle: "Developer CLI Package",
        tech: "Express.js",
        iconType: "img",
        iconUrl: "https://unavatar.io/github/expressjs",
        description: "Terminal package integrating backend APIs, browser-based authentication, and instant contract pull/push.",
        fullDesc: "Engineered with Commander and Inquirer, the Invokix CLI enables engineers to authenticate securely via browser OAuth, pull the latest schemas into local test suites, and generate mock types in seconds directly from the terminal.",
        highlights: [
            "Frictionless browser-based OAuth authentication flow",
            "One-command project schema synchronization (invokix pull / push)",
            "Interactive configuration prompts built with Inquirer",
            "Automated CI/CD integration hooks for deployment pre-checks",
        ],
    },
    {
        id: "ai-routing",
        badge: "AI INFRASTRUCTURE",
        title: "3-Tier Dynamic AI Model Routing",
        shortTitle: "3-Tier AI Model Routing",
        tech: "AWS Cloud",
        iconType: "img",
        iconUrl: "https://www.svgrepo.com/show/448266/aws.svg",
        description: "Dynamic provider routing mapping AI models to tiers for cost, throughput, and performance balance.",
        fullDesc: "Intelligent inference gateway that analyzes incoming prompt payloads and subscription tiers to route requests dynamically across 3 provider tiers, optimizing for maximum token throughput and minimal operating cost.",
        highlights: [
            "Multi-tier provider routing (Tier 1 Speed, Tier 2 Balanced, Tier 3 Reasoning)",
            "Automated fallback failover if an upstream LLM provider degrades",
            "Dynamic latency & token cost optimization per query",
            "Per-tier rate limiting and fair-use quota enforcement",
        ],
    },
    {
        id: "route-security",
        badge: "SECURITY & AUTH",
        title: "Route Protection & Cached Sessions",
        shortTitle: "Route Protection & Cached Auth",
        tech: "BetterAuth",
        iconType: "svg",
        description: "Middleware-based route protection, cached session validation, and server/client separation.",
        fullDesc: "Next.js edge middleware infrastructure that intercepts requests, validates cached authentication sessions with sub-millisecond overhead, and strictly separates server data queries from interactive client boundaries.",
        highlights: [
            "Edge-compatible middleware verifying cryptographically signed tokens",
            "LRU in-memory cached session validation preventing database read bottlenecks",
            "Strict server-component boundary isolation for zero secret leakage",
            "Granular role-based access control (RBAC) across dashboard routes",
        ],
    },
    {
        id: "billing-engine",
        badge: "MONETIZATION",
        title: "Dodo Payments & DB-Synced Subscriptions",
        shortTitle: "Subscription & Billing Engine",
        tech: "Drizzle & Dodo",
        iconType: "img",
        iconUrl: "https://dodopayments.com/favicon.ico",
        description: "Billing workflows supporting plan upgrades, real-time database-synchronized state, and tier gating.",
        fullDesc: "Production-ready payment infrastructure integrated with Dodo Payments, automatically handling webhooks, plan upgrades, team license allocations, and real-time database synchronization with PostgreSQL and Drizzle ORM.",
        highlights: [
            "Seamless checkout & billing portal powered by Dodo Payments",
            "Webhook event listener with idempotent database synchronization",
            "Automated tier feature-flag gating across SaaS workspace tools",
            "Self-service team invoice history, seat expansion, and prorated upgrades",
        ],
    },
    {
        id: "mock-server",
        badge: "API TESTING",
        title: "Dynamic Mock Servers & Health Telemetry",
        shortTitle: "Dynamic Mock Servers",
        tech: "Docker",
        iconType: "img",
        iconUrl: "https://www.svgrepo.com/show/452192/docker.svg",
        description: "Instant contract-backed mock endpoints with live health status, latency monitoring, and test payloads.",
        fullDesc: "Instantly spins up live mock endpoints based on active API contracts so frontend teams can begin building before backend implementations are finalized, complete with configurable status codes and response headers.",
        highlights: [
            "Instant synthetic mock endpoints matching defined contract schemas",
            "Simulated response delays, HTTP error codes (400, 404, 500) & headers",
            "Real-time endpoint health checks and uptime status indicators",
            "Exportable OpenAPI / Swagger specifications and Postman collections",
        ],
    },
];

/* ─── Multi-Language Greetings for Creative Studio Preloader ─── */
const GREETINGS = [
    { text: "Hello", lang: "English" },
    { text: "नमस्ते", lang: "Hindi" },
    { text: "Bonjour", lang: "French" },
    { text: "Hola", lang: "Spanish" },
    { text: "Ciao", lang: "Italian" },
    { text: "こんにちは", lang: "Japanese" },
    { text: "Guten Tag", lang: "German" },
    { text: "Olá", lang: "Portuguese" },
    { text: "स्वागतम", lang: "Sanskrit" },
];

export default function PortfolioPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [greetingIndex, setGreetingIndex] = useState(0);
    const [counter, setCounter] = useState(0);
    const heroIntroTlRef = useRef<gsap.core.Timeline | null>(null);

    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState<InvokixFeature | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [istTime, setIstTime] = useState<string>("");
    const [diceBearAvatar, setDiceBearAvatar] = useState<string>(
        "https://api.dicebear.com/10.x/gaze/svg?tags=animation&seed=Felix"
    );

    const handleCopyEmail = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText("itsanurag707@gmail.com");
        }
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2400);
    };

    const lenisRef = useRef<Lenis | null>(null);

    const scrollTo = (target: string) => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(target, {
                duration: 1.35,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            const el = document.querySelector(target);
            el?.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        setMounted(true);
        // Randomize DiceBear avatar on every reload (gaze style with animation, transparent background)
        const randomSeed = Math.random().toString(36).substring(2, 9);
        setDiceBearAvatar(`https://api.dicebear.com/10.x/gaze/svg?tags=animation&seed=${randomSeed}`);

        const updateMobile = () => setIsMobile(window.innerWidth < 640);
        updateMobile();
        window.addEventListener("resize", updateMobile);
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMobileMenuOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);

        // Real-time IST clock updater
        const updateClock = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString("en-US", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            setIstTime(timeStr);
        };
        updateClock();
        const clockTimer = setInterval(updateClock, 1000);

        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.5,
            infinite: false,
        });
        lenisRef.current = lenis;
        lenis.stop(); // Pause scroll during preloader

        // Wire Lenis with ScrollTrigger & throttle setScrolled state updates to prevent re-render lag
        gsap.registerPlugin(ScrollTrigger);
        let lastScrolledState = false;
        lenis.on("scroll", (e: any) => {
            ScrollTrigger.update();
            const y = typeof e === "number" ? e : (e?.scroll ?? window.scrollY);
            const isNowScrolled = y > 25;
            if (isNowScrolled !== lastScrolledState) {
                lastScrolledState = isNowScrolled;
                setScrolled(isNowScrolled);
            }
        });

        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        // Use smooth lagSmoothing to avoid frame stuttering
        gsap.ticker.lagSmoothing(1000, 16);

        // Reliable Hero unlock function with fail-safe visibility
        const unlockHero = () => {
            setIsLoading(false);
            if (heroIntroTlRef.current) {
                heroIntroTlRef.current.play();
            } else {
                gsap.set([".hero-billboard-text", ".hero-character-box", ".hero-mist-cloud", ".hero-icon-tile", ".hero-scroll-btn", "header"], {
                    opacity: 1,
                    clearProps: "opacity,filter",
                });
            }
            if (lenisRef.current) {
                lenisRef.current.start();
            }
            ScrollTrigger.refresh();
        };

        // Preloader Greeting Cycling & Counter Loop
        const totalDuration = 2200; // 2.2s total duration
        const startTime = Date.now();
        let animationFrameId: number;

        const updatePreloader = () => {
            const elapsed = Date.now() - startTime;
            const progressRatio = Math.min(1, elapsed / totalDuration);
            const easedProgress = Math.round(progressRatio * 100);
            setCounter(easedProgress);

            const activeIndex = Math.min(
                GREETINGS.length - 1,
                Math.floor(progressRatio * GREETINGS.length)
            );
            setGreetingIndex(activeIndex);

            if (progressRatio < 1) {
                animationFrameId = requestAnimationFrame(updatePreloader);
            } else {
                setTimeout(unlockHero, 220);
            }
        };

        animationFrameId = requestAnimationFrame(updatePreloader);

        // Safety fallback timer: if tab was backgrounded or preloader delayed, force hero visible
        const safetyFallbackTimer = setTimeout(() => {
            unlockHero();
        }, 3200);

        // GSAP ScrollTrigger Context for animations & cleanup
        const ctx = gsap.context(() => {
            // ══════════════════════════════════════════════════════════
            // HERO ENTRANCE INTRO TIMELINE (Fires right after preloader finishes)
            // ══════════════════════════════════════════════════════════
            const heroIntroTl = gsap.timeline({
                paused: true,
                defaults: { ease: "power3.out" },
                onComplete: () => {
                    // Clear props so elements are never trapped in inline opacity/transforms
                    gsap.set([".hero-billboard-text", ".hero-character-box", ".hero-mist-cloud", ".hero-icon-tile", ".hero-scroll-btn"], {
                        clearProps: "opacity,filter",
                    });
                    ScrollTrigger.refresh();
                },
            });
            heroIntroTlRef.current = heroIntroTl;

            // 0. Fixed floating Navbar slides down into view
            heroIntroTl.fromTo(
                "header",
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", clearProps: "transform,opacity" }
            );

            // 1. Background billboard text rises gracefully (NO blur filter to prevent Chromium background-clip:text dropout!)
            heroIntroTl.fromTo(
                ".hero-billboard-text",
                { y: 90, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", clearProps: "transform,opacity" },
                "-=0.45"
            );

            // 2. 3D Character emerges
            heroIntroTl.fromTo(
                ".hero-character-box",
                { y: 130, scale: 0.88, opacity: 0 },
                { y: 0, scale: 1, opacity: 1, duration: 1.25, ease: "power3.out", clearProps: "transform,opacity" },
                "-=0.8"
            );

            // 3. Atmosphere mist clouds
            heroIntroTl.fromTo(
                ".hero-mist-cloud",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", clearProps: "transform" },
                "-=0.9"
            );

            // 4. Tech icons pop in sequence with an elastic burst
            heroIntroTl.fromTo(
                ".hero-icon-tile",
                { scale: 0, opacity: 0, rotation: (i) => (i % 2 === 0 ? -25 : 25) },
                {
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.65,
                    stagger: {
                        amount: 0.45,
                        from: "random",
                    },
                    ease: "back.out(2.2)",
                    clearProps: "opacity",
                },
                "-=0.7"
            );

            // 5. Scroll down prompt reveals at the base
            heroIntroTl.fromTo(
                ".hero-scroll-btn",
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.5)", clearProps: "transform,opacity" },
                "-=0.2"
            );

            // ══════════════════════════════════════════════════════════
            // HERO SCROLL EXIT & PARALLAX (Smooth scrubbed transitions)
            // ══════════════════════════════════════════════════════════
            gsap.to(".hero-billboard-text", {
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
                y: -110,
                opacity: 0.2,
                ease: "none",
                immediateRender: false,
            });

            gsap.to(".hero-character-box", {
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
                scale: 0.94,
                y: 50,
                opacity: 0.7,
                ease: "none",
                immediateRender: false,
            });

            gsap.to(".hero-icon-tile", {
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
                y: (i) => (i % 2 === 0 ? -60 : 50),
                opacity: 0.3,
                ease: "none",
                immediateRender: false,
            });

            // ══════════════════════════════════════════════════════════
            // ABOUT SECTION GSAP SCROLLTRIGGER CHOREOGRAPHY
            // ══════════════════════════════════════════════════════════
            const aboutTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 78%",
                    toggleActions: "play none none reverse",
                },
            });

            aboutTl
                .fromTo(
                    ".about-eyebrow",
                    { y: 25, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", clearProps: "transform" }
                )
                .fromTo(
                    ".about-heading",
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.35"
                )
                .fromTo(
                    ".about-p",
                    { y: 25, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: "power2.out", clearProps: "transform" },
                    "-=0.4"
                )
                .fromTo(
                    ".about-col",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out", clearProps: "transform" },
                    "-=0.3"
                )
                .fromTo(
                    ".about-cta",
                    { y: 15, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)", clearProps: "transform" },
                    "-=0.2"
                );

            // Subtle parallax effect on heading as user scrolls
            gsap.to(".about-heading", {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2,
                },
                y: -15,
                ease: "none",
            });

            // ══════════════════════════════════════════════════════════
            // PROJECTS SECTION GSAP SCROLLTRIGGER CHOREOGRAPHY
            // ══════════════════════════════════════════════════════════
            const projectsTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#projects",
                    start: "top 78%",
                    toggleActions: "play none none reverse",
                },
            });

            projectsTl
                .fromTo(
                    ".proj-header",
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", clearProps: "transform,opacity" }
                )
                .fromTo(
                    ".proj-stage",
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", clearProps: "transform,opacity" },
                    "-=0.4"
                );

            // Experience Section Staggered Entrance
            const expTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#experience",
                    start: "top 78%",
                    end: "top 25%",
                    toggleActions: "play none none reverse",
                },
            });

            expTl
                .from(".exp-badge", {
                    x: -35,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power3.out",
                })
                .from(
                    ".exp-header",
                    {
                        y: 28,
                        scale: 0.95,
                        opacity: 0,
                        duration: 0.7,
                        ease: "back.out(1.6)",
                    },
                    "-=0.4"
                )
                .from(
                    ".exp-desc",
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.45"
                )
                .from(
                    ".exp-pill",
                    {
                        y: 18,
                        opacity: 0,
                        scale: 0.92,
                        stagger: 0.035,
                        duration: 0.45,
                        ease: "back.out(1.5)",
                    },
                    "-=0.35"
                )
                .from(
                    ".exp-bullet",
                    {
                        x: -24,
                        opacity: 0,
                        stagger: 0.08,
                        duration: 0.5,
                        ease: "power2.out",
                    },
                    "-=0.25"
                );

            // Right side character cinematic reveal & continuous parallax
            gsap.from(".exp-character-wrapper", {
                scrollTrigger: {
                    trigger: "#experience",
                    start: "top 82%",
                    end: "top 30%",
                    toggleActions: "play none none reverse",
                },
                y: 70,
                scale: 0.94,
                opacity: 0,
                duration: 1.1,
                ease: "power3.out",
            });

            gsap.to(".exp-character-wrapper", {
                scrollTrigger: {
                    trigger: "#experience",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
                y: -35,
                ease: "none",
            });
        });

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(safetyFallbackTimer);
            window.removeEventListener("resize", updateMobile);
            window.removeEventListener("keydown", handleKeyDown);
            clearInterval(clockTimer);
            gsap.ticker.remove(tickerCallback);
            ctx.revert();
            lenis.destroy();
        };
    }, []);

    const navItems = [
        { name: "About", href: "#about", num: "01" },
        { name: "Projects", href: "#projects", num: "02" },
        { name: "Experience", href: "#experience", num: "03" },
        { name: "Services", href: "#services", num: "04" },
        { name: "Contact", href: "#contact", num: "05" },
    ];

    return (
        <main className="relative w-full bg-[#b2f164] overflow-x-hidden font-outfit">
            {/* ── Fullscreen Modern Multi-Language Creative Preloader ── */}
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="creative-preloader"
                        initial={{ y: 0 }}
                        exit={{
                            y: "-100%",
                            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
                        }}
                        className="fixed inset-0 z-[99999] bg-[#b2f164] text-[#143a12] flex flex-col justify-between px-6 sm:px-12 py-8 sm:py-10 select-none pointer-events-auto overflow-hidden border-b border-[#143a12]/20 shadow-[0_25px_60px_rgba(20,58,18,0.18)]"
                        style={{ touchAction: "none" }}
                    >
                        {/* Top Bar: Studio Brand & Indicator */}
                        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                            <div className="flex items-center gap-2.5">
                                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center overflow-visible shrink-0">
                                    <img
                                        src={diceBearAvatar}
                                        alt="Avatar"
                                        className="w-full h-full object-contain select-none pointer-events-none drop-shadow-sm"
                                    />
                                </div>
                                <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#143a12]">
                                    Anurag<span className="text-[#25691f]">.dev</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#143a12]/80 uppercase px-3 py-1 rounded-full bg-[#143a12]/8 border border-[#143a12]/15">
                                <span className="w-2 h-2 rounded-full bg-[#143a12] animate-pulse" />
                                <span>Studio</span>
                            </div>
                        </div>

                        {/* Center Stage: Dynamic Multi-Language Greeting in Curvy Script Font */}
                        <div className="relative flex flex-col items-center justify-center my-auto w-full max-w-4xl mx-auto text-center px-4">
                            <div className="flex items-center justify-center gap-3 sm:gap-4 overflow-hidden py-3">
                                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#143a12] animate-ping shrink-0" />
                                <motion.div
                                    key={greetingIndex}
                                    initial={{ y: 22, opacity: 0, filter: "blur(3px)" }}
                                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                    exit={{ y: -22, opacity: 0, filter: "blur(3px)" }}
                                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                    className="font-dancing-script text-4xl sm:text-6xl md:text-7xl font-bold tracking-normal text-[#143a12] drop-shadow-[0_2px_12px_rgba(20,58,18,0.1)]"
                                >
                                    {GREETINGS[greetingIndex].text}
                                </motion.div>
                            </div>
                            <motion.div
                                key={`lang-${greetingIndex}`}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.2 }}
                                className="mt-2 font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#143a12]/75 bg-[#143a12]/8 px-3.5 py-1 rounded-full border border-[#143a12]/15 font-semibold"
                            >
                                {GREETINGS[greetingIndex].lang}
                            </motion.div>
                        </div>

                        {/* Bottom Area: Thin line from left to right + Single counting in lower right */}
                        <div className="w-full max-w-7xl mx-auto flex flex-col gap-4">
                            {/* Thin progress line from left to right */}
                            <div className="w-full h-[1.5px] bg-[#143a12]/15 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-[#143a12]"
                                    style={{ width: `${counter}%` }}
                                    transition={{ ease: "easeOut" }}
                                />
                            </div>

                            {/* Row beneath line: Studio status on left, single counting in lower right */}
                            <div className="flex items-end justify-between w-full pt-1">
                                <div className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#143a12]/70 font-semibold">
                                    INITIALIZING WORKSPACE
                                </div>

                                {/* Only one counting in lower right */}
                                <div className="flex items-baseline gap-1">
                                    <span className="font-space-grotesk text-5xl sm:text-7xl font-black text-[#143a12] leading-none tracking-tight">
                                        {counter.toString().padStart(3, "0")}
                                    </span>
                                    <span className="font-mono text-base sm:text-xl text-[#143a12]/60 font-bold">
                                        %
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* ═══════════════════════════════════════════════
                SECTION 1 — HERO
            ═══════════════════════════════════════════════ */}
            <section
                id="hero"
                className="relative w-full h-screen h-[100dvh] max-h-[100dvh] overflow-hidden flex items-center justify-center select-none"
                style={{ backgroundColor: "#b2f164" }}
            >
                {/* ── Floating Capsule Navbar (Transparent on Hero, Glassy Blurry Pill on Scroll) ── */}
                <header className="fixed top-3.5 sm:top-5 lg:top-6 inset-x-0 z-50 flex justify-center pointer-events-none px-3.5 sm:px-6 select-none touch-manipulation">
                    <div
                        className={`w-full max-w-[1340px] transition-all duration-300 pointer-events-auto rounded-full flex items-center justify-between px-4 sm:px-8 py-2.5 sm:py-3 ${scrolled
                            ? "bg-[#b2f164]/80 backdrop-blur-2xl border border-[#143a12]/15 shadow-[0_12px_36px_rgba(20,58,18,0.12)]"
                            : "bg-transparent border border-transparent shadow-none"
                            }`}
                        style={{
                            WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
                            backdropFilter: scrolled ? "blur(20px)" : "none",
                        }}
                    >
                        {/* LEFT: Minimal Brand Typography with Magnetic Physics */}
                        <MagneticItem strength={0.25}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollTo("#hero");
                                }}
                                className="flex items-center gap-2.5 group cursor-pointer"
                            >
                                <span className="relative w-15 h-20 sm:w-11 sm:h-11 rounded-full flex items-center justify-center overflow-visible shrink-0 group-hover:scale-115 group-hover:rotate-6 transition-all duration-300">
                                    <img
                                        src={diceBearAvatar}
                                        alt="Character Avatar"
                                        className="w-full h-full object-contain select-none pointer-events-none transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                    />
                                </span>
                                <span className="font-extrabold text-[#143a12] tracking-tight text-base sm:text-lg">
                                    Anurag<span className="text-[#25691f]">.dev</span>
                                </span>
                            </a>
                        </MagneticItem>

                        {/* CENTER: Clean Minimal Navigation Links with Magnetic Pull */}
                        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                            {navItems.map((item) => (
                                <MagneticItem key={item.name} strength={0.28}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollTo(item.href);
                                        }}
                                        className="group relative py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#143a12]/80 hover:text-[#143a12] transition-colors cursor-pointer flex items-center gap-1.5"
                                    >
                                        <span className="text-[9px] font-mono text-[#143a12]/40 group-hover:text-[#143a12]/75 transition-colors">
                                            {item.num}
                                        </span>
                                        <span>{item.name}</span>
                                        <span className="w-1 h-1 rounded-full bg-[#143a12] scale-0 group-hover:scale-100 transition-transform duration-200" />
                                    </a>
                                </MagneticItem>
                            ))}
                        </nav>

                        {/* RIGHT: Sticky Magnetic CTA Button & Mobile Trigger */}
                        <div className="flex items-center gap-3">
                            <MagneticItem strength={0.42}>
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollTo("#contact");
                                    }}
                                    className="hidden sm:inline-flex items-center gap-3 pl-5 pr-2 py-1.5 rounded-full bg-[#143a12] text-[#b2f164] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-xl hover:shadow-[#143a12]/25 active:scale-95 transition-shadow group cursor-pointer"
                                >
                                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">Let's Talk</span>
                                    <span className="w-6 h-6 rounded-full bg-[#b2f164] text-[#143a12] flex items-center justify-center shadow-sm group-hover:rotate-45 group-hover:scale-110 transition-all duration-300">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </a>
                            </MagneticItem>

                            {/* Mobile Hamburger Morph Button */}
                            <MagneticItem strength={0.3} className="md:hidden">
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    onTouchEnd={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setMobileMenuOpen(!mobileMenuOpen);
                                    }}
                                    className="w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5 bg-[#143a12] text-[#b2f164] shadow-md active:scale-90 transition-all cursor-pointer touch-manipulation"
                                    aria-label="Toggle Navigation"
                                >
                                    <span
                                        className={`w-4.5 h-0.5 bg-[#b2f164] rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                                            }`}
                                    />
                                    <span
                                        className={`w-3 h-0.5 bg-[#b2f164] rounded-full transition-all duration-200 self-end mr-2 ${mobileMenuOpen ? "opacity-0" : ""
                                            }`}
                                    />
                                    <span
                                        className={`w-4.5 h-0.5 bg-[#b2f164] rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                                            }`}
                                    />
                                </button>
                            </MagneticItem>
                        </div>
                    </div>
                </header>

                {/* ── Full-Screen Fluid Glassy Mobile Navigation Overlay ── */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            key="fullscreen-mobile-menu"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed inset-0 z-[999] h-[100dvh] w-screen flex flex-col justify-between px-6 py-6 pointer-events-auto touch-manipulation select-none overflow-y-auto"
                            style={{
                                background:
                                    "radial-gradient(ellipse 95% 85% at 50% 20%, rgba(255, 255, 255, 0.65) 0%, rgba(178, 241, 100, 0.92) 55%, rgba(135, 212, 60, 0.98) 100%)",
                                backdropFilter: "blur(36px)",
                                WebkitBackdropFilter: "blur(36px)",
                                paddingTop: "max(1.25rem, env(safe-area-inset-top, 20px))",
                                paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 24px))",
                            }}
                        >
                            {/* Top Bar with Brand & Close Button */}
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2.5">
                                    <div className="relative w-11 h-11 rounded-full flex items-center justify-center overflow-visible shrink-0">
                                        <img
                                            src={diceBearAvatar}
                                            alt="Avatar"
                                            className="w-full h-full object-contain select-none pointer-events-none drop-shadow-sm"
                                        />
                                    </div>
                                    <span className="font-extrabold text-[#164214] tracking-tight text-lg">
                                        Anurag<span className="text-[#25691f]">.dev</span>
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(false)}
                                    onTouchEnd={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-11 h-11 rounded-full flex items-center justify-center bg-white/60 border border-white/80 text-[#164214] shadow-md active:scale-90 hover:bg-white/80 transition-all cursor-pointer touch-manipulation"
                                    aria-label="Close Menu"
                                >
                                    <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Vertical Navigation Links */}
                            <nav className="my-auto py-4 flex flex-col gap-1 w-full max-w-sm mx-auto">
                                {navItems.map((item, idx) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setMobileMenuOpen(false);
                                            scrollTo(item.href);
                                        }}
                                        onTouchEnd={(e) => {
                                            e.preventDefault();
                                            setMobileMenuOpen(false);
                                            scrollTo(item.href);
                                        }}
                                        initial={{ opacity: 0, x: -24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.05 * idx,
                                            duration: 0.3,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="flex items-center justify-between py-3.5 px-3 rounded-2xl hover:bg-white/35 active:bg-white/50 transition-all group border-b border-[#143a12]/10 cursor-pointer touch-manipulation"
                                    >
                                        <div className="flex items-baseline gap-4 pointer-events-none">
                                            <span className="text-xs font-mono font-bold text-[#184416]/50">
                                                {item.num}
                                            </span>
                                            <span
                                                className="font-anton text-4xl uppercase tracking-wider text-[#143a12] group-hover:text-[#25691f] transition-colors"
                                            >
                                                {item.name}
                                            </span>
                                        </div>
                                        <span className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center text-[#184416] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all pointer-events-none">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    </motion.a>
                                ))}
                            </nav>

                            {/* Bottom Footer Section */}
                            <div className="w-full max-w-sm mx-auto pt-4 border-t border-[#184416]/15 flex flex-col gap-4">
                                <div className="flex items-center justify-between text-xs font-bold text-[#184416]/80 px-1">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#2496ed] animate-pulse" />
                                        Available for new projects
                                    </span>
                                    <span className="text-[#184416]/60">India (IST)</span>
                                </div>

                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setMobileMenuOpen(false);
                                        scrollTo("#contact");
                                    }}
                                    onTouchEnd={(e) => {
                                        e.preventDefault();
                                        setMobileMenuOpen(false);
                                        scrollTo("#contact");
                                    }}
                                    className="w-full py-4 rounded-full bg-[#184416] text-[#b2f164] font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#184416]/25 active:scale-95 transition-all cursor-pointer touch-manipulation"
                                >
                                    <span>Let's Talk Together</span>
                                    <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Subtle radial studio glow ── */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 60% at 50% 48%, rgba(200,255,140,0.6) 0%, transparent 70%)",
                    }}
                />

                {/* ── Main stage container ── */}
                <div className="relative w-full max-w-[1200px] mx-auto min-h-[100dvh] sm:min-h-[500px] sm:aspect-[16/9] flex items-center justify-center">

                    {/* ═══════════════════════════════════════════════
            LAYER 1 — Billboard background text
            - Sits DIRECTLY behind Anurag's head & neck (zero gap)
            - Mobile: "ANURAG" (massive, bold, readable)
            - Tablet/Desktop: "ANURAG SINGH"
            - Light/dark green gradient fading into bottom fog
        ═══════════════════════════════════════════════ */}
                    <div
                        className="hero-billboard-text absolute inset-x-0 top-[33%] sm:top-[22%] flex items-center justify-center pointer-events-none select-none z-[1] px-2 sm:px-4"
                        style={{
                            willChange: "transform, opacity",
                            WebkitMaskImage:
                                "linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.7) 72%, rgba(0,0,0,0.2) 88%, transparent 100%)",
                            maskImage:
                                "linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.7) 72%, rgba(0,0,0,0.2) 88%, transparent 100%)",
                        }}
                    >
                        <div className="relative flex items-center justify-center">
                            {/* Bottom foggy blur layer — emerges as you go down the letter */}
                            <span
                                className="font-anton absolute whitespace-nowrap uppercase leading-none select-none pointer-events-none text-[clamp(6rem,26vw,9rem)] sm:text-[clamp(3.8rem,11.5vw,11rem)] tracking-[0.08em] sm:tracking-[0.04em]"
                                aria-hidden="true"
                                style={{
                                    color: "#184216",
                                    filter: "blur(8px)",
                                    opacity: 0.7,
                                    WebkitMaskImage:
                                        "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 35%, transparent 70%)",
                                    maskImage:
                                        "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 35%, transparent 70%)",
                                    transform: "translateY(5px)",
                                }}
                            >
                                <span className="block sm:hidden">ANURAG</span>
                                <span className="hidden sm:block">ANURAG SINGH</span>
                            </span>

                            {/* Soft ambient mist layer at base of letters */}
                            <span
                                className="font-anton absolute whitespace-nowrap uppercase leading-none select-none pointer-events-none text-[clamp(6rem,26vw,9rem)] sm:text-[clamp(3.8rem,11.5vw,11rem)] tracking-[0.08em] sm:tracking-[0.04em]"
                                aria-hidden="true"
                                style={{
                                    color: "#143a12",
                                    filter: "blur(16px)",
                                    opacity: 0.45,
                                    WebkitMaskImage:
                                        "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)",
                                    maskImage:
                                        "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)",
                                    transform: "translateY(10px)",
                                }}
                            >
                                <span className="block sm:hidden">ANURAG</span>
                                <span className="hidden sm:block">ANURAG SINGH</span>
                            </span>

                            {/* Main letter layer: Light-dark green mix gradient from top to bottom, fading into the fog */}
                            <h1
                                className="font-anton relative whitespace-nowrap uppercase leading-none select-none text-[clamp(6rem,26vw,9rem)] sm:text-[clamp(3.8rem,11.5vw,11rem)] tracking-[0.08em] sm:tracking-[0.04em]"
                                style={{
                                    background:
                                        "linear-gradient(180deg, #3e9235 0%, #246520 25%, #184316 55%, rgba(24, 67, 22, 0.3) 80%, transparent 98%)",
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text",
                                    color: "transparent",
                                    WebkitTextFillColor: "transparent",
                                    WebkitTextStroke: "1px rgba(22, 62, 20, 0.45)",
                                    WebkitMaskImage:
                                        "linear-gradient(to bottom, black 0%, black 48%, rgba(0,0,0,0.7) 68%, transparent 92%)",
                                    maskImage:
                                        "linear-gradient(to bottom, black 0%, black 48%, rgba(0,0,0,0.7) 68%, transparent 92%)",
                                }}
                            >
                                <span className="block sm:hidden">ANURAG</span>
                                <span className="hidden sm:block">ANURAG SINGH</span>
                            </h1>
                        </div>
                    </div>

                    {/* ═══════════════════════════════════════════════
            LAYER 2 — 3D Character (anurag-hero.png)
            Shifted down slightly on lg screens (top-[10%]),
            increased size slightly for commanding presence.
        ═══════════════════════════════════════════════ */}
                    <div className="absolute inset-x-0 bottom-0 top-[2%] sm:top-[10%] flex justify-center items-end z-[2] pointer-events-none">
                        <div
                            className="hero-character-box relative h-[72vh] sm:h-full flex items-end justify-center w-[clamp(360px,96vw,580px)] sm:w-[clamp(340px,46vw,560px)]"
                            style={{
                                willChange: "transform, opacity",
                                WebkitMaskImage:
                                    "radial-gradient(ellipse 95% 75% at 50% 35%, black 60%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.3) 90%, transparent 100%)",
                                maskImage:
                                    "radial-gradient(ellipse 95% 75% at 50% 35%, black 60%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.3) 90%, transparent 100%)",
                            }}
                        >
                            <img
                                src="/anurag-hero-7.png"
                                alt="Anurag Singh"
                                width={620}
                                height={620}
                                sizes="(max-width: 768px) 96vw, 46vw"
                                className="object-contain object-bottom max-h-full"
                                style={{ objectPosition: "center bottom" }}
                            />
                        </div>
                    </div>

                    {/* ═══════════════════════════════════════════════
            LAYER 2b — Subtle, delicate mist blend at bottom
            Greatly reduced in height and opacity for a clean look
        ═══════════════════════════════════════════════ */}
                    {/* Central soft rounded dome cloud */}
                    <div
                        className="hero-mist-cloud absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] sm:w-[55%] h-[10%] sm:h-[15%] z-[3] pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse 90% 75% at 50% 95%, rgba(178,241,100,0.7) 30%, rgba(178,241,100,0.4) 60%, transparent 100%)",
                            filter: "blur(14px)",
                        }}
                    />

                    {/* Wider ambient dome cloud */}
                    <div
                        className="hero-mist-cloud absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] sm:w-[70%] h-[6%] sm:h-[12%] z-[3] pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse 100% 70% at 50% 100%, rgba(178,241,100,0.6) 35%, rgba(178,241,100,0.25) 70%, transparent 100%)",
                            filter: "blur(16px)",
                        }}
                    />

                    {/* Breathing animated mist dome */}
                    <motion.div
                        animate={mounted ? { opacity: [0.3, 0.55, 0.3], scale: [0.97, 1.03, 0.97] } : {}}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="hero-mist-cloud absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] sm:w-[42%] h-[6%] sm:h-[10%] z-[3] pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse at 50% 95%, rgba(190,248,120,0.5) 0%, transparent 75%)",
                            filter: "blur(12px)",
                        }}
                    />

                    {/* Subtle base floor blend */}
                    <div
                        className="hero-mist-cloud absolute bottom-0 inset-x-0 h-[4%] sm:h-[6%] z-[3] pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(to top, #b2f164 0%, rgba(178,241,100,0.4) 60%, transparent 100%)",
                        }}
                    />

                    {/* ═══════════════════════════════════════════════
            LAYER 3 — 7 Floating tech icon tiles
            Smaller & spread apart on mobile to avoid crowding.
        ═══════════════════════════════════════════════ */}
                    {ICONS.map((icon) => {
                        const topPos = isMobile ? (icon.mTop ?? icon.top) : icon.top;
                        const leftPos = icon.left ? (isMobile ? (icon.mLeft ?? icon.left) : icon.left) : undefined;
                        const rightPos = icon.right ? (isMobile ? (icon.mRight ?? icon.right) : icon.right) : undefined;

                        return (
                            <div
                                key={icon.id}
                                className="hero-icon-tile absolute z-[4]"
                                style={{
                                    top: topPos,
                                    left: leftPos,
                                    right: rightPos,
                                }}
                            >
                                <motion.div
                                    animate={
                                        mounted
                                            ? {
                                                y: [-5, 5, -5],
                                                rotate: [icon.rotation - 2, icon.rotation + 2, icon.rotation - 2],
                                            }
                                            : {}
                                    }
                                    transition={{
                                        duration: icon.dur,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: icon.delay,
                                    }}
                                    className="group cursor-default"
                                    title={icon.label}
                                >
                                    {/* Tile body or standalone 3D icon */}
                                    {icon.is3D ? (
                                        <div
                                            className="relative flex items-center justify-center"
                                            style={{
                                                width: "clamp(46px, 6vw, 92px)",
                                                height: "clamp(46px, 6vw, 92px)",
                                                transform: `rotate(${icon.rotation}deg)`,
                                            }}
                                        >
                                            <img
                                                src={icon.src}
                                                alt={icon.label}
                                                className="w-full h-full object-contain filter drop-shadow-[0_14px_22px_rgba(20,50,15,0.28)] select-none"
                                                loading="lazy"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="relative flex items-center justify-center rounded-[22%] sm:rounded-[24%]"
                                            style={{
                                                width: "clamp(34px, 4.5vw, 80px)",
                                                height: "clamp(34px, 4.5vw, 80px)",
                                                background: icon.bg,
                                                boxShadow: `
                           0 10px 24px rgba(0,0,0,0.3),
                           0 3px 6px rgba(0,0,0,0.2),
                           inset 0 1px 1px rgba(255,255,255,0.25)
                         `,
                                                transform: `rotate(${icon.rotation}deg)`,
                                                border: "1px solid rgba(255,255,255,0.15)",
                                            }}
                                        >
                                            {/* Top bevel shine */}
                                            <div
                                                className="absolute top-[2px] left-[3px] right-[3px] h-[40%] rounded-t-[20%] pointer-events-none"
                                                style={{
                                                    background: "linear-gradient(to bottom, rgba(255,255,255,0.22), transparent)",
                                                }}
                                            />
                                            {/* Icon image */}
                                            <img
                                                src={icon.src}
                                                alt={icon.label}
                                                style={{
                                                    width: "48%",
                                                    height: "48%",
                                                    objectFit: "contain",
                                                    transform: `rotate(${-icon.rotation}deg)`,
                                                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                                                }}
                                                loading="lazy"
                                            />
                                        </div>
                                    )}

                                    {/* Tooltip on hover */}
                                    <div className="absolute left-1/2 -translate-x-1/2 bottom-[110%] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 hidden sm:block">
                                        <div className="px-3 py-1.5 rounded-lg bg-[#1a2e18]/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-white/10">
                                            {icon.label}
                                        </div>
                                        <div className="w-2 h-2 bg-[#1a2e18]/95 rotate-45 mx-auto -mt-1 border-r border-b border-white/10" />
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}

                    {/* ═══════════════════════════════════════════════
            LAYER 4 — Scroll with down arrow indicator
            Present on all screen sizes with micro-motion.
        ═══════════════════════════════════════════════ */}
                    <div
                        onClick={() => scrollTo("#about")}
                        className="hero-scroll-btn absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-[10] select-none pointer-events-auto cursor-pointer group"
                    >
                        <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#1a4a17]/75 group-hover:text-[#1a4a17] transition-colors duration-200">
                            Scroll
                        </span>
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                            className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1a4a17]/10 border border-[#1a4a17]/20 group-hover:bg-[#1a4a17]/15 transition-colors"
                        >
                            <svg
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1a4a17]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m7 7V3" />
                            </svg>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 1.5 — ABOUT: MINIMAL, EDITORIAL & CLEAN
                - Pure typography, zero clutter
                - Brief personal intro
                - Essential details & clean contact CTA
            ═══════════════════════════════════════════════════════════════ */}
            <section
                id="about"
                className="relative w-full py-16 sm:py-20 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden scroll-mt-20"
                style={{ backgroundColor: "#b2f164" }}
            >
                <div className="relative max-w-4xl mx-auto z-10 flex flex-col gap-8 sm:gap-10">
                    {/* ── Top Eyebrow ── */}
                    <div className="about-eyebrow flex items-center justify-between border-b border-[#143a12]/20 pb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#143a12] uppercase">
                                01
                            </span>
                            <span className="text-xs text-[#143a12]/40">/</span>
                            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#143a12] uppercase">
                                ABOUT ME
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#143a12]/80">
                            <span className="w-2 h-2 rounded-full bg-[#143a12] animate-pulse" />
                            <span className="uppercase tracking-wider">DELHI, INDIA</span>
                        </div>
                    </div>

                    {/* ── Big Bold Editorial Headline ── */}
                    <h2 className="about-heading font-anton text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#143a12] leading-[0.95]">
                        BUILDING CLEAN, THOUGHTFUL DIGITAL EXPERIENCES.
                    </h2>

                    {/* ── Brief Personal Intro ── */}
                    <div className="flex flex-col gap-4 text-base sm:text-lg md:text-xl text-[#143a12]/90 leading-relaxed font-medium">
                        <p className="about-p">
                            I'm <span className="font-extrabold text-[#143a12]">Anurag Singh</span> — a Full-Stack Developer with a deep focus on crafting fast, accessible, and visually refined web applications.
                        </p>
                        <p className="about-p text-[#143a12]/75 text-sm sm:text-base md:text-lg leading-relaxed">
                            I enjoy working across the entire stack — from architecting clean APIs and database schemas with Node.js and PostgreSQL to delivering fluid, responsive interfaces with Next.js, React, and Tailwind CSS.
                        </p>
                    </div>

                    {/* ── Minimal Detail Points (Clean Inline List, No Cards) ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#143a12]/20 font-mono text-xs sm:text-sm">
                        <div className="about-col flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-[#143a12]/50 uppercase tracking-wider">
                                Core Focus
                            </span>
                            <span className="font-semibold text-[#143a12]">
                                Full-Stack & Modern Web Architecture
                            </span>
                        </div>
                        <div className="about-col flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-[#143a12]/50 uppercase tracking-wider">
                                Technologies
                            </span>
                            <span className="font-semibold text-[#143a12]">
                                Next.js, React, Node.js, PostgreSQL, Docker
                            </span>
                        </div>
                        <div className="about-col flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-[#143a12]/50 uppercase tracking-wider">
                                Current Status
                            </span>
                            <span className="font-semibold text-[#143a12] flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#143a12]" />
                                Available for new opportunities
                            </span>
                        </div>
                    </div>

                    {/* ── Clean Direct CTA Button ── */}
                    <div className="about-cta flex items-center gap-4 pt-2">
                        <button
                            onClick={() => scrollTo("#contact")}
                            className="px-6 py-3 rounded-full bg-[#143a12] text-[#b2f164] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#25691f] active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-2"
                        >
                            <span>Get in Touch</span>
                            <span>→</span>
                        </button>
                        <button
                            onClick={() => scrollTo("#projects")}
                            className="px-5 py-3 rounded-full border border-[#143a12]/30 text-[#143a12] text-xs font-mono font-bold uppercase tracking-wider hover:bg-white/30 active:scale-95 transition-all cursor-pointer"
                        >
                            View Projects ↓
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 2 — FEATURED PROJECT: Invokix
                Centerpiece: Giant Static Character holding laptop with LIVE IFRAME of invokix.com
                Sides: Small floating cards with magnetic hover physics (MagneticItem)
            ═══════════════════════════════════════════════════════════════ */}
            <section
                id="projects"
                className="relative w-full min-h-screen pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col justify-center overflow-hidden select-none scroll-mt-28 lg:scroll-mt-36"
                style={{ backgroundColor: "#b2f164" }}
            >
                <div className="relative w-full max-w-[1550px] mx-auto z-10 flex flex-col">
                    {/* ── Top Header: Minimal Eyebrow, Title, 2-3 Line Description, Live Status & Tech Tags ── */}
                    <div className="proj-header flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-[#143a12]/15">
                        <div className="flex flex-col gap-2 max-w-3xl">
                            <div className="flex items-center gap-2.5">
                                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#143a12]/80 font-mono">
                                    02 / FEATURED PROJECT
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#143a12]/40" />
                                <span className="text-xs font-mono uppercase tracking-wider text-[#143a12]/70 font-semibold">
                                    PRODUCTION SAAS
                                </span>
                            </div>
                            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase text-[#143a12] tracking-tight leading-none font-sans">
                                    INVOKIX
                                </h2>
                                <span className="text-base sm:text-lg lg:text-xl font-light text-[#143a12]/85 tracking-normal font-sans">
                                    — API Contract Management Platform
                                </span>
                            </div>
                            {/* 2-3 Line Concise Project Description */}
                            <p className="text-xs sm:text-sm lg:text-[15px] text-[#143a12]/85 font-sans leading-relaxed mt-1 max-w-2xl">
                                A full-stack API contract management SaaS that standardizes endpoint schemas, provides dynamic mock testing, and automates developer workflows via CLI. Engineered with multi-tier AI model routing, robust session security, and database-synchronized subscription monetization.
                            </p>
                        </div>

                        {/* Top-Right: Live Platform Pill & Tech Stack Pills */}
                        <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
                            <MagneticItem strength={0.25}>
                                <a
                                    href="https://invokix.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#143a12] text-[#b2f164] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#25691f] active:scale-95 transition-all shadow-md cursor-pointer"
                                >
                                    <span className="w-2 h-2 rounded-full bg-[#b2f164] shadow-[0_0_8px_#b2f164] animate-pulse" />
                                    <span>Live Platform</span>
                                    <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                                </a>
                            </MagneticItem>
                            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                                {/* Next.js */}
                                <MagneticItem strength={0.3}>
                                    <div
                                        title="Next.js"
                                        className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/60 hover:bg-white backdrop-blur-md border border-white/80 shadow-[0_2px_8px_rgba(20,50,15,0.08)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                                    >
                                        <img
                                            src="https://unavatar.io/github/nextjs"
                                            alt="Next.js"
                                            className="w-5 h-5 object-contain rounded-full bg-black p-0.5"
                                        />
                                        <span className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#143a12] text-[#b2f164] text-[10px] font-mono font-bold tracking-wider shadow-lg transition-opacity duration-150 z-30 whitespace-nowrap">
                                            Next.js
                                        </span>
                                    </div>
                                </MagneticItem>

                                {/* Express.js */}
                                <MagneticItem strength={0.3}>
                                    <div
                                        title="Express.js"
                                        className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/60 hover:bg-white backdrop-blur-md border border-white/80 shadow-[0_2px_8px_rgba(20,50,15,0.08)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                                    >
                                        <img
                                            src="https://unavatar.io/github/expressjs"
                                            alt="Express.js"
                                            className="w-5 h-5 object-contain rounded-full bg-black p-0.5"
                                        />
                                        <span className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#143a12] text-[#b2f164] text-[10px] font-mono font-bold tracking-wider shadow-lg transition-opacity duration-150 z-30 whitespace-nowrap">
                                            Express.js
                                        </span>
                                    </div>
                                </MagneticItem>

                                {/* BetterAuth */}
                                <MagneticItem strength={0.3}>
                                    <div
                                        title="BetterAuth"
                                        className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/60 hover:bg-white backdrop-blur-md border border-white/80 shadow-[0_2px_8px_rgba(20,50,15,0.08)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 400 300" className="w-4.5 h-4.5 shrink-0">
                                            <path fill="#143a12" d="M200 0h200v300H200V200h100V100H200zM0 0h100v100h100v100H100v100H0z" />
                                        </svg>
                                        <span className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#143a12] text-[#b2f164] text-[10px] font-mono font-bold tracking-wider shadow-lg transition-opacity duration-150 z-30 whitespace-nowrap">
                                            BetterAuth
                                        </span>
                                    </div>
                                </MagneticItem>

                                {/* Drizzle ORM */}
                                <MagneticItem strength={0.3}>
                                    <div
                                        title="Drizzle ORM"
                                        className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/60 hover:bg-white backdrop-blur-md border border-white/80 shadow-[0_2px_8px_rgba(20,50,15,0.08)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                                    >
                                        <img
                                            src="https://unavatar.io/github/drizzle-team"
                                            alt="Drizzle ORM"
                                            className="w-5 h-5 object-contain rounded-full bg-black p-0.5"
                                        />
                                        <span className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#143a12] text-[#b2f164] text-[10px] font-mono font-bold tracking-wider shadow-lg transition-opacity duration-150 z-30 whitespace-nowrap">
                                            Drizzle ORM
                                        </span>
                                    </div>
                                </MagneticItem>

                                {/* PostgreSQL */}
                                <MagneticItem strength={0.3}>
                                    <div
                                        title="PostgreSQL"
                                        className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/60 hover:bg-white backdrop-blur-md border border-white/80 shadow-[0_2px_8px_rgba(20,50,15,0.08)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                                    >
                                        <img
                                            src="https://www.svgrepo.com/show/354200/postgresql.svg"
                                            alt="PostgreSQL"
                                            className="w-5 h-5 object-contain"
                                        />
                                        <span className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#143a12] text-[#b2f164] text-[10px] font-mono font-bold tracking-wider shadow-lg transition-opacity duration-150 z-30 whitespace-nowrap">
                                            PostgreSQL
                                        </span>
                                    </div>
                                </MagneticItem>

                                {/* Docker */}
                                <MagneticItem strength={0.3}>
                                    <div
                                        title="Docker"
                                        className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/60 hover:bg-white backdrop-blur-md border border-white/80 shadow-[0_2px_8px_rgba(20,50,15,0.08)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                                    >
                                        <img
                                            src="https://www.svgrepo.com/show/452192/docker.svg"
                                            alt="Docker"
                                            className="w-5 h-5 object-contain"
                                        />
                                        <span className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#143a12] text-[#b2f164] text-[10px] font-mono font-bold tracking-wider shadow-lg transition-opacity duration-150 z-30 whitespace-nowrap">
                                            Docker
                                        </span>
                                    </div>
                                </MagneticItem>

                                {/* AWS */}
                                <MagneticItem strength={0.3}>
                                    <div
                                        title="AWS"
                                        className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/60 hover:bg-white backdrop-blur-md border border-white/80 shadow-[0_2px_8px_rgba(20,50,15,0.08)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                                    >
                                        <img
                                            src="https://www.svgrepo.com/show/448266/aws.svg"
                                            alt="AWS"
                                            className="w-5 h-5 object-contain"
                                        />
                                        <span className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#143a12] text-[#b2f164] text-[10px] font-mono font-bold tracking-wider shadow-lg transition-opacity duration-150 z-30 whitespace-nowrap">
                                            AWS
                                        </span>
                                    </div>
                                </MagneticItem>

                                {/* Dodo Payments */}
                                <MagneticItem strength={0.3}>
                                    <div
                                        title="Dodo Payments"
                                        className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/60 hover:bg-white backdrop-blur-md border border-white/80 shadow-[0_2px_8px_rgba(20,50,15,0.08)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                                    >
                                        <img
                                            src="https://dodopayments.com/favicon.ico"
                                            alt="Dodo Payments"
                                            className="w-5 h-5 object-contain rounded-full"
                                        />
                                        <span className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#143a12] text-[#b2f164] text-[10px] font-mono font-bold tracking-wider shadow-lg transition-opacity duration-150 z-30 whitespace-nowrap">
                                            Dodo Payments
                                        </span>
                                    </div>
                                </MagneticItem>
                            </div>
                        </div>
                    </div>

                    {/* ── Main Stage: Massive 75%+ Character with Live Desktop-Scaled Iframe & Circular Floating Cards ── */}
                    <div className="proj-stage relative w-full pt-6 sm:pt-10 flex flex-col items-center justify-center">

                        {/* ── CENTRAL STAGE (Takes over 75% of the section width) ── */}
                        <div className="relative w-full max-w-[1260px] mx-auto flex items-center justify-center select-none">
                            {/* Ambient Glow Halo behind character */}
                            <div
                                className="absolute w-[80%] h-[80%] rounded-full pointer-events-none -z-10"
                                style={{
                                    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.55) 0%, rgba(178,241,100,0.5) 45%, transparent 72%)",
                                    filter: "blur(48px)",
                                }}
                            />

                            {/* Main Giant Static Cutout Image — 100% Still, No Float */}
                            <div className="proj-character relative w-[96%] sm:w-[90%] lg:w-[84%] xl:w-[78%] flex items-center justify-center">
                                <img
                                    src="/invokix.png"
                                    alt="Invokix — API Contract Management Platform by Anurag Singh"
                                    className="w-full h-auto block select-none pointer-events-none drop-shadow-[0_28px_60px_rgba(20,58,18,0.22)]"
                                    loading="eager"
                                />

                                {/* ── LIVE IFRAME SCREEN OVERLAY (Positioned directly on laptop screen) ── */}
                                <div
                                    className="absolute rounded-[4px] sm:rounded-[6px] overflow-hidden bg-[#0a0f18] shadow-[inset_0_0_15px_rgba(0,0,0,0.95)] z-20 pointer-events-auto"
                                    style={{
                                        left: "34.1%",
                                        top: "50.1%",
                                        width: "34.8%",
                                        height: "38.2%",
                                    }}
                                >
                                    {/* Mini Browser Header */}
                                    <div className="w-full h-4 sm:h-5 bg-[#0e1726] flex items-center justify-between px-2 sm:px-2.5 border-b border-white/10 shrink-0 select-none">
                                        <div className="flex items-center gap-1 sm:gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[8px] sm:text-[10px] font-mono text-white/80">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f] animate-ping" />
                                            <span className="font-semibold tracking-wide">invokix.com</span>
                                        </div>
                                        <a
                                            href="https://invokix.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[8px] sm:text-[10px] font-mono text-[#b2f164] hover:text-white transition-colors"
                                            title="Open Invokix in new tab"
                                        >
                                            ↗
                                        </a>
                                    </div>

                                    {/* Active Live Iframe of invokix.com — scaled to fit properly without looking zoomed in */}
                                    <div className="relative w-full h-[calc(100%-16px)] sm:h-[calc(100%-20px)] bg-[#070b12] overflow-hidden">
                                        <iframe
                                            src="https://invokix.com"
                                            title="Invokix Live Production Application"
                                            style={{
                                                width: "250%",
                                                height: "250%",
                                                transform: "scale(0.4)",
                                                transformOrigin: "top left",
                                                border: "none",
                                            }}
                                            className="select-auto"
                                            loading="eager"
                                            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ── DESKTOP CIRCULAR / ORBITAL FLOATING BUTTON-LIKE CARDS (Arranged in a circle around the character) ── */}
                            {/* Card 1: Top-Left (~10:30 o'clock) — API Contract Management */}
                            <div className="hidden lg:block absolute top-[8%] left-[0%] xl:left-[2%] z-30">
                                <motion.div
                                    animate={{ y: [-3, 3, -3] }}
                                    transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <MagneticItem strength={0.4}>
                                        <div
                                            onClick={() => setActiveFeature(invokixFeatures[0])}
                                            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-[#143a12]/20 shadow-[0_8px_20px_rgba(20,58,18,0.12)] hover:shadow-[0_14px_28px_rgba(20,58,18,0.22)] hover:scale-[1.03] active:scale-95 transition-all cursor-pointer max-w-[290px]"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-[#143a12]/10 border border-[#143a12]/15 flex items-center justify-center shrink-0">
                                                <img
                                                    src="https://unavatar.io/github/nextjs"
                                                    alt="Next.js"
                                                    className="w-4 h-4 object-contain rounded-full bg-black p-0.5"
                                                />
                                            </div>
                                            <div className="flex flex-col text-left">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#27781f]">
                                                        {invokixFeatures[0].badge}
                                                    </span>
                                                    <span className="text-[9px] text-[#143a12]/50 font-mono group-hover:text-[#143a12] transition-colors">
                                                        (info ↗)
                                                    </span>
                                                </div>
                                                <span className="text-xs font-bold text-[#143a12] leading-tight">
                                                    {invokixFeatures[0].shortTitle}
                                                </span>
                                            </div>
                                        </div>
                                    </MagneticItem>
                                </motion.div>
                            </div>

                            {/* Card 2: Mid-Left (~9 o'clock) — Developer CLI Package */}
                            <div className="hidden lg:block absolute top-[44%] -left-[2%] xl:left-[0%] z-30">
                                <motion.div
                                    animate={{ y: [3, -3, 3] }}
                                    transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                                >
                                    <MagneticItem strength={0.4}>
                                        <div
                                            onClick={() => setActiveFeature(invokixFeatures[1])}
                                            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-[#143a12]/20 shadow-[0_8px_20px_rgba(20,58,18,0.12)] hover:shadow-[0_14px_28px_rgba(20,58,18,0.22)] hover:scale-[1.03] active:scale-95 transition-all cursor-pointer max-w-[290px]"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-[#143a12]/10 border border-[#143a12]/15 flex items-center justify-center shrink-0">
                                                <img
                                                    src="https://unavatar.io/github/expressjs"
                                                    alt="Express.js"
                                                    className="w-4 h-4 object-contain rounded-full bg-black p-0.5"
                                                />
                                            </div>
                                            <div className="flex flex-col text-left">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#27781f]">
                                                        {invokixFeatures[1].badge}
                                                    </span>
                                                    <span className="text-[9px] text-[#143a12]/50 font-mono group-hover:text-[#143a12] transition-colors">
                                                        (info ↗)
                                                    </span>
                                                </div>
                                                <span className="text-xs font-bold text-[#143a12] leading-tight">
                                                    {invokixFeatures[1].shortTitle}
                                                </span>
                                            </div>
                                        </div>
                                    </MagneticItem>
                                </motion.div>
                            </div>

                            {/* Card 3: Lower-Left (~7:30 o'clock) — Route Security & Cached Auth */}
                            <div className="hidden lg:block absolute bottom-[8%] left-[2%] xl:left-[4%] z-30">
                                <motion.div
                                    animate={{ y: [-2, 2, -2] }}
                                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                                >
                                    <MagneticItem strength={0.35}>
                                        <div
                                            onClick={() => setActiveFeature(invokixFeatures[3])}
                                            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#143a12]/90 hover:bg-[#143a12] text-[#b2f164] backdrop-blur-md border border-[#b2f164]/25 shadow-lg hover:scale-[1.03] active:scale-95 transition-all cursor-pointer max-w-[310px]"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 400 300" className="w-3.5 h-3.5 shrink-0">
                                                    <path fill="#b2f164" d="M200 0h200v300H200V200h100V100H200zM0 0h100v100h100v100H100v100H0z" />
                                                </svg>
                                            </div>
                                            <div className="flex flex-col text-left">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white">
                                                        {invokixFeatures[3].badge}
                                                    </span>
                                                    <span className="text-[9px] text-[#b2f164]/70 font-mono group-hover:text-white transition-colors">
                                                        (info ↗)
                                                    </span>
                                                </div>
                                                <span className="text-xs font-semibold text-[#b2f164] leading-tight">
                                                    {invokixFeatures[3].shortTitle}
                                                </span>
                                            </div>
                                        </div>
                                    </MagneticItem>
                                </motion.div>
                            </div>

                            {/* Card 4: Top-Right (~1:30 o'clock) — 3-Tier AI Model Routing */}
                            <div className="hidden lg:block absolute top-[8%] right-[0%] xl:right-[2%] z-30">
                                <motion.div
                                    animate={{ y: [-3, 3, -3] }}
                                    transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                >
                                    <MagneticItem strength={0.4}>
                                        <div
                                            onClick={() => setActiveFeature(invokixFeatures[2])}
                                            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-[#143a12]/20 shadow-[0_8px_20px_rgba(20,58,18,0.12)] hover:shadow-[0_14px_28px_rgba(20,58,18,0.22)] hover:scale-[1.03] active:scale-95 transition-all cursor-pointer max-w-[290px]"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-[#143a12]/10 border border-[#143a12]/15 flex items-center justify-center shrink-0">
                                                <img
                                                    src="https://www.svgrepo.com/show/448266/aws.svg"
                                                    alt="AWS"
                                                    className="w-4 h-4 object-contain"
                                                />
                                            </div>
                                            <div className="flex flex-col text-left">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#27781f]">
                                                        {invokixFeatures[2].badge}
                                                    </span>
                                                    <span className="text-[9px] text-[#143a12]/50 font-mono group-hover:text-[#143a12] transition-colors">
                                                        (info ↗)
                                                    </span>
                                                </div>
                                                <span className="text-xs font-bold text-[#143a12] leading-tight">
                                                    {invokixFeatures[2].shortTitle}
                                                </span>
                                            </div>
                                        </div>
                                    </MagneticItem>
                                </motion.div>
                            </div>

                            {/* Card 5: Mid-Right (~3 o'clock) — Subscription & Billing Engine */}
                            <div className="hidden lg:block absolute top-[44%] -right-[2%] xl:right-[0%] z-30">
                                <motion.div
                                    animate={{ y: [3, -3, 3] }}
                                    transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                                >
                                    <MagneticItem strength={0.4}>
                                        <div
                                            onClick={() => setActiveFeature(invokixFeatures[4])}
                                            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-[#143a12]/20 shadow-[0_8px_20px_rgba(20,58,18,0.12)] hover:shadow-[0_14px_28px_rgba(20,58,18,0.22)] hover:scale-[1.03] active:scale-95 transition-all cursor-pointer max-w-[290px]"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-[#143a12]/10 border border-[#143a12]/15 flex items-center justify-center shrink-0">
                                                <img
                                                    src="https://dodopayments.com/favicon.ico"
                                                    alt="Dodo Payments"
                                                    className="w-4 h-4 object-contain rounded-full"
                                                />
                                            </div>
                                            <div className="flex flex-col text-left">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#27781f]">
                                                        {invokixFeatures[4].badge}
                                                    </span>
                                                    <span className="text-[9px] text-[#143a12]/50 font-mono group-hover:text-[#143a12] transition-colors">
                                                        (info ↗)
                                                    </span>
                                                </div>
                                                <span className="text-xs font-bold text-[#143a12] leading-tight">
                                                    {invokixFeatures[4].shortTitle}
                                                </span>
                                            </div>
                                        </div>
                                    </MagneticItem>
                                </motion.div>
                            </div>

                            {/* Card 6: Lower-Right (~4:30 o'clock) — Dynamic Mock Servers */}
                            <div className="hidden lg:block absolute bottom-[8%] right-[2%] xl:right-[4%] z-30">
                                <motion.div
                                    animate={{ y: [-2, 2, -2] }}
                                    transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                >
                                    <MagneticItem strength={0.35}>
                                        <div
                                            onClick={() => setActiveFeature(invokixFeatures[5])}
                                            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-[#143a12]/20 shadow-[0_8px_20px_rgba(20,58,18,0.12)] hover:shadow-[0_14px_28px_rgba(20,58,18,0.22)] hover:scale-[1.03] active:scale-95 transition-all cursor-pointer max-w-[290px]"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-[#143a12]/10 border border-[#143a12]/15 flex items-center justify-center shrink-0">
                                                <img
                                                    src="https://www.svgrepo.com/show/452192/docker.svg"
                                                    alt="Docker"
                                                    className="w-4 h-4 object-contain"
                                                />
                                            </div>
                                            <div className="flex flex-col text-left">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#27781f]">
                                                        {invokixFeatures[5].badge}
                                                    </span>
                                                    <span className="text-[9px] text-[#143a12]/50 font-mono group-hover:text-[#143a12] transition-colors">
                                                        (info ↗)
                                                    </span>
                                                </div>
                                                <span className="text-xs font-bold text-[#143a12] leading-tight">
                                                    {invokixFeatures[5].shortTitle}
                                                </span>
                                            </div>
                                        </div>
                                    </MagneticItem>
                                </motion.div>
                            </div>
                        </div>

                        {/* ── MOBILE / TABLET PILL BUTTON CLOUD (< lg screens) ── */}
                        <div className="flex lg:hidden flex-wrap items-center justify-center gap-2.5 pt-6 px-2 w-full max-w-2xl">
                            {invokixFeatures.map((feat) => (
                                <MagneticItem key={feat.id} strength={0.3}>
                                    <div
                                        onClick={() => setActiveFeature(feat)}
                                        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/85 backdrop-blur-md border border-[#143a12]/20 shadow-sm text-xs font-bold text-[#143a12] cursor-pointer hover:bg-white active:scale-95 transition-all"
                                    >
                                        {feat.iconType === "svg" ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 400 300" className="shrink-0">
                                                <path fill="#143a12" d="M200 0h200v300H200V200h100V100H200zM0 0h100v100h100v100H100v100H0z" />
                                            </svg>
                                        ) : (
                                            <img src={feat.iconUrl} alt={feat.tech} className="w-3.5 h-3.5 object-contain rounded-full shrink-0" />
                                        )}
                                        <span>{feat.shortTitle}</span>
                                        <span className="text-[10px] text-[#143a12]/50">↗</span>
                                    </div>
                                </MagneticItem>
                            ))}
                        </div>

                    </div>

                    {/* ── Bottom Section Scroll to Next (Experience) ── */}
                    <div className="flex justify-center pt-10 sm:pt-14">
                        <button
                            onClick={() => scrollTo("#experience")}
                            className="group flex flex-col items-center gap-1.5 text-[#143a12]/75 hover:text-[#143a12] transition-colors cursor-pointer"
                        >
                            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase">
                                Next: Experience
                            </span>
                            <motion.div
                                animate={{ y: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-6 h-6 rounded-full border border-[#143a12]/25 flex items-center justify-center group-hover:border-[#143a12]/60 group-hover:bg-[#143a12]/5 transition-all"
                            >
                                <svg className="w-3.5 h-3.5 text-[#143a12]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 13l-7 7-7-7m7 7V3" />
                                </svg>
                            </motion.div>
                        </button>
                    </div>
                </div>

                {/* ── SMOOTH ROUNDED-CORNER POPUP MODAL (Opens on click with Cross button) ── */}
                <AnimatePresence>
                    {activeFeature && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md pointer-events-auto"
                            onClick={() => setActiveFeature(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 25 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 25 }}
                                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-lg rounded-[28px] bg-[#0c240d] text-[#b2f164] border border-[#b2f164]/30 shadow-[0_30px_70px_rgba(0,0,0,0.6)] p-6 sm:p-8 overflow-hidden select-text"
                            >
                                {/* Cross Button (✕) */}
                                <button
                                    onClick={() => setActiveFeature(null)}
                                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-[#b2f164] flex items-center justify-center text-sm font-mono transition-all cursor-pointer hover:scale-110 active:scale-95"
                                    aria-label="Close feature modal"
                                >
                                    ✕
                                </button>

                                {/* Feature Badge & Tech Icon */}
                                <div className="flex items-center gap-2.5 mb-3">
                                    {activeFeature.iconType === "svg" ? (
                                        <div className="w-6 h-6 rounded-full bg-[#b2f164] flex items-center justify-center shrink-0 p-1 shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 400 300">
                                                <path fill="#143a12" d="M200 0h200v300H200V200h100V100H200zM0 0h100v100h100v100H100v100H0z" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="w-6 h-6 rounded-full bg-white/15 border border-white/20 flex items-center justify-center shrink-0 p-1 shadow-sm">
                                            <img src={activeFeature.iconUrl} alt={activeFeature.tech} className="w-full h-full object-contain rounded-full" />
                                        </div>
                                    )}
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#b2f164]/90">
                                        {activeFeature.badge} • {activeFeature.tech}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight mb-2.5 font-sans pr-8">
                                    {activeFeature.title}
                                </h3>

                                {/* Quick Summary Paragraph */}
                                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans mb-5">
                                    {activeFeature.fullDesc}
                                </p>

                                {/* Key Technical Highlights */}
                                <div className="space-y-2 mb-6 bg-white/[0.04] p-4 rounded-2xl border border-white/10">
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#b2f164]/70 block mb-2">
                                        Key Architectural Highlights:
                                    </span>
                                    {activeFeature.highlights.map((highlight, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5 text-xs text-white/80">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#b2f164] mt-1.5 shrink-0" />
                                            <span className="leading-snug">{highlight}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer Action Row */}
                                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                    <span className="text-[11px] font-mono text-white/60">
                                        Production SaaS • Invokix
                                    </span>
                                    <a
                                        href="https://invokix.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b2f164] text-[#143a12] text-xs font-mono font-bold tracking-wider hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-md"
                                    >
                                        <span>Open Invokix</span>
                                        <span className="text-sm">↗</span>
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 — EXPERIENCE: NeuroInkX (Full-Stack Developer)
            Pixel-perfect match to user's design reference with neuroinkx.png
        ═══════════════════════════════════════════════════════════════ */}
            <section
                id="experience"
                className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-center overflow-hidden select-none scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32 pt-24 sm:pt-28 lg:pt-0 pb-12 sm:pb-16 lg:pb-0"
                style={{ backgroundColor: "#b2f164" }}
            >
                {/* ── Main Two-Column Stage ── */}
                <div className="relative w-full flex flex-col lg:flex-row items-center justify-start lg:justify-between min-h-0 lg:min-h-[100dvh] z-10 pl-5 sm:pl-10 lg:pl-14 xl:pl-20 pr-5 sm:pr-10 lg:pr-0 gap-6 sm:gap-8 lg:gap-0">
                    {/* LEFT COLUMN: Content & Info (takes ~40% on desktop) */}
                    <div className="w-full lg:w-[42%] xl:w-[38%] max-w-xl flex flex-col justify-center py-2 sm:py-4 lg:py-6 z-20 shrink-0">
                        {/* Section Number Badge */}
                        <div className="exp-badge flex items-center gap-2 mb-4 sm:mb-6">
                            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.28em] text-[#1a4a17]/85 font-mono">
                                03
                            </span>
                            <span className="text-xs sm:text-sm font-light text-[#1a4a17]/40">/</span>
                            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.28em] text-[#1a4a17]/85">
                                EXPERIENCE
                            </span>
                        </div>

                        {/* Company Logo Squircle + Heading + Subtitle */}
                        <div className="exp-header flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5">
                            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-[22px] bg-[#143a12] flex items-center justify-center shadow-xl shadow-[#143a12]/20 border border-white/20 shrink-0">
                                <svg
                                    className="w-8 h-8 sm:w-9 sm:h-9 text-[#b2f164]"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
                                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
                                    <circle cx="8" cy="9" r="0.8" fill="currentColor" />
                                    <circle cx="16" cy="9" r="0.8" fill="currentColor" />
                                    <circle cx="8" cy="14" r="0.8" fill="currentColor" />
                                    <circle cx="16" cy="14" r="0.8" fill="currentColor" />
                                </svg>
                            </div>
                            <div>
                                <div className="flex items-center gap-2.5">
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#143a12] leading-none">
                                        NeuroInkX
                                    </h2>
                                    <span className="px-2.5 py-0.5 rounded-full bg-[#143a12] text-[#b2f164] text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                                        Current
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm font-semibold text-[#1a4a17]/80 mt-1.5 flex items-center gap-2">
                                    <span>Full-Stack Developer</span>
                                    <span className="w-1 h-1 rounded-full bg-[#1a4a17]/50" />
                                    <span>Aug 2025 – Present</span>
                                </p>
                            </div>
                        </div>

                        {/* Description with Left Accent Line */}
                        <div className="exp-desc border-l-2 border-[#143a12]/35 pl-3.5 mb-6">
                            <p className="text-sm sm:text-base lg:text-[16px] text-[#143a12]/90 font-medium leading-relaxed max-w-xl">
                                Engineering an AI-powered document vault platform for intelligent knowledge retrieval, streaming conversations, and high-concurrency document processing.
                            </p>
                        </div>

                        {/* Tech Stack Pills (2 Rows matching reference image) */}
                        <div className="flex flex-col gap-2.5 mb-7">
                            {/* Row 1 */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                                <div className="exp-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/45 backdrop-blur-md border border-white/60 shadow-[0_2px_8px_rgba(20,50,15,0.06)] text-xs font-bold text-[#143a12]">
                                    <img src="https://unavatar.io/github/nextjs" alt="Next.js" className="w-4 h-4 object-contain rounded-full bg-black p-0.5" />
                                    <span>Next.js</span>
                                </div>
                                <div className="exp-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/45 backdrop-blur-md border border-white/60 shadow-[0_2px_8px_rgba(20,50,15,0.06)] text-xs font-bold text-[#143a12]">
                                    <img src="https://unavatar.io/github/expressjs" alt="Next.js" className="w-4 h-4 object-contain rounded-full bg-black p-0.5" />
                                    <span>Express.js</span>
                                </div>
                                <div className="exp-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/45 backdrop-blur-md border border-white/60 shadow-[0_2px_8px_rgba(20,50,15,0.06)] text-xs font-bold text-[#143a12]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 400 300">
                                        <path fill="rgba(0, 0, 0, 1)000ff" d="M200 0h200v300H200V200h100V100H200zM0 0h100v100h100v100H100v100H0z" />
                                    </svg>
                                    <span>BetterAuth</span>
                                </div>
                                <div className="exp-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/45 backdrop-blur-md border border-white/60 shadow-[0_2px_8px_rgba(20,50,15,0.06)] text-xs font-bold text-[#143a12]">
                                    <img src="https://unavatar.io/github/drizzle-team" alt="Next.js" className="w-4 h-4 object-contain rounded-full bg-black p-0.5" />
                                    <span>Drizzle</span>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                                <div className="exp-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/45 backdrop-blur-md border border-white/60 shadow-[0_2px_8px_rgba(20,50,15,0.06)] text-xs font-bold text-[#143a12]">
                                    <img src="https://www.svgrepo.com/show/354200/postgresql.svg" alt="PostgreSQL" className="w-4 h-4 object-contain" />
                                    <span>PostgreSQL</span>
                                </div>
                                <div className="exp-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/45 backdrop-blur-md border border-white/60 shadow-[0_2px_8px_rgba(20,50,15,0.06)] text-xs font-bold text-[#143a12]">
                                    <img src="https://www.svgrepo.com/show/452192/docker.svg" alt="Docker" className="w-4 h-4 object-contain" />
                                    <span>Docker</span>
                                </div>
                                <div className="exp-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/45 backdrop-blur-md border border-white/60 shadow-[0_2px_8px_rgba(20,50,15,0.06)] text-xs font-bold text-[#143a12]">
                                    <img src="https://www.svgrepo.com/show/448266/aws.svg" alt="AWS" className="w-4 h-4 object-contain" />
                                    <span>AWS</span>
                                </div>
                                <div className="exp-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/45 backdrop-blur-md border border-white/60 shadow-[0_2px_8px_rgba(20,50,15,0.06)] text-xs font-bold text-[#143a12]">
                                    <img src="https://www.svgrepo.com/show/373924/nginx.svg" alt="nginx" className="w-4 h-4 object-contain" />
                                    <span>Nginx</span>
                                </div>
                            </div>
                        </div>

                        {/* Bullet Points with Glowing Green Orbs (Transparent Background) */}
                        <ul className="space-y-3.5 max-w-xl text-xs sm:text-[13.5px] leading-relaxed font-medium">
                            <li className="exp-bullet flex items-start gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#27781f] shadow-[0_0_8px_rgba(39,120,31,0.65)] mt-1.5 shrink-0 border border-white/40" />
                                <span className="text-[#143a12]/90">
                                    <strong className="font-extrabold text-[#143a12]">Full-Stack Architecture: </strong>
                                    Built core platform features across <span className="font-bold text-[#143a12]">Next.js, React, Node.js, Express.js</span> and <span className="font-bold text-[#143a12]">PostgreSQL</span> with end-to-end type safety.
                                </span>
                            </li>
                            <li className="exp-bullet flex items-start gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#27781f] shadow-[0_0_8px_rgba(39,120,31,0.65)] mt-1.5 shrink-0 border border-white/40" />
                                <span className="text-[#143a12]/90">
                                    <strong className="font-extrabold text-[#143a12]">AI Document Vault Workflows: </strong>
                                    Developed multi-threaded document conversations, contextual chat history, and granular user-thread ownership.
                                </span>
                            </li>
                            <li className="exp-bullet flex items-start gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#27781f] shadow-[0_0_8px_rgba(39,120,31,0.65)] mt-1.5 shrink-0 border border-white/40" />
                                <span className="text-[#143a12]/90">
                                    <strong className="font-extrabold text-[#143a12]">Cloud Infrastructure & CI/CD: </strong>
                                    Configured <span className="font-bold text-[#143a12]">AWS EC2</span>, automated GitHub Actions pipelines, Nginx reverse proxy routing, and SSL/TLS certificates.
                                </span>
                            </li>
                            <li className="exp-bullet flex items-start gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#27781f] shadow-[0_0_8px_rgba(39,120,31,0.65)] mt-1.5 shrink-0 border border-white/40" />
                                <span className="text-[#143a12]/90">
                                    <strong className="font-extrabold text-[#143a12]">AI Services & Backend APIs: </strong>
                                    Structured backend API middleware to orchestrate AI inference and data ingestion seamlessly into application state.
                                </span>
                            </li>
                            <li className="exp-bullet flex items-start gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#27781f] shadow-[0_0_8px_rgba(39,120,31,0.65)] mt-1.5 shrink-0 border border-white/40" />
                                <span className="text-[#143a12]/90">
                                    <strong className="font-extrabold text-[#143a12]">Production Reliability: </strong>
                                    Monitored and resolved live issues across Dockerized microservices, boosting API reliability and throughput.
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* RIGHT COLUMN: Character Image */}
                    <div className="exp-character-wrapper w-full lg:w-[50%] xl:w-[53%] relative flex items-center lg:items-end justify-center lg:justify-end min-h-0 lg:min-h-[80vh] lg:h-[80vh] overflow-visible z-10 mt-8 sm:mt-6 lg:mt-0 mb-8 sm:mb-6 lg:mb-0">
                        <motion.div
                            animate={{ y: [-4, 4, -4] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-full max-w-[560px] sm:max-w-[680px] lg:max-w-none flex items-center lg:items-end justify-center lg:justify-end overflow-visible"
                        >
                            <img
                                src="/neuroinkx.png"
                                alt="NeuroInkX Full-Stack Experience - Anurag Singh"
                                className="w-[148%] sm:w-[125%] lg:w-[118%] xl:w-[122%] max-w-none h-auto max-h-none lg:max-h-[92vh] object-contain object-bottom select-none pointer-events-none origin-center lg:origin-bottom-right drop-shadow-[0_18px_40px_rgba(20,58,18,0.2)]"
                                loading="eager"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════
                LAYER — Rounded Cloudy Mist over lower body & floor
                Identical 4-layer atmospheric cloud dome system as Hero (Desktop)
            ═══════════════════════════════════════════════ */}
                {/* 1. Central soft rounded dome cloud over character lower body (Desktop only to prevent fogging out mobile image) */}
                <div
                    className="hidden lg:block absolute bottom-[-2%] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-[2%] w-[95%] sm:w-[75%] lg:w-[62%] h-[22%] sm:h-[32%] z-[15] pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 90% 75% at 50% 90%, #b2f164 45%, rgba(178,241,100,0.95) 65%, rgba(178,241,100,0.5) 82%, transparent 100%)",
                        filter: "blur(24px)",
                    }}
                />

                {/* 2. Wider ambient dome cloud across section bottom (Desktop only) */}
                <div
                    className="hidden lg:block absolute bottom-0 inset-x-0 h-[18%] sm:h-[28%] z-[15] pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 100% 70% at 65% 95%, #b2f164 50%, rgba(178,241,100,0.85) 75%, transparent 100%)",
                        filter: "blur(30px)",
                    }}
                />

                {/* 3. Breathing animated mist dome (Desktop only) */}
                <motion.div
                    animate={mounted ? { opacity: [0.6, 0.9, 0.6], scale: [0.96, 1.04, 0.96] } : {}}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-[6%] w-[85%] sm:w-[55%] lg:w-[52%] h-[15%] sm:h-[24%] z-[15] pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at 50% 90%, rgba(190,248,120,0.9) 0%, transparent 75%)",
                        filter: "blur(26px)",
                    }}
                />

                {/* 4. Subtle base floor blend across entire bottom */}
                <div
                    className="absolute bottom-0 inset-x-0 h-10 sm:h-14 lg:h-[10%] z-[15] pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to top, #b2f164 0%, rgba(178,241,100,0.85) 50%, transparent 100%)",
                    }}
                />

                {/* ═══════════════════════════════════════════════
                LAYER 5 — Scroll indicator at bottom center
                Matches reference screenshot with smooth scroll to next section
            ═══════════════════════════════════════════════ */}
                <div
                    onClick={() => scrollTo("#contact")}
                    className="relative lg:absolute mt-6 sm:mt-8 lg:mt-0 lg:bottom-4 sm:lg:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-[20] select-none pointer-events-auto cursor-pointer group"
                >
                    <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#1a4a17]/75 group-hover:text-[#1a4a17] transition-colors duration-200">
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1a4a17]/10 border border-[#1a4a17]/20 group-hover:bg-[#1a4a17]/15 transition-colors"
                    >
                        <svg
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1a4a17]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 4 — CONTACT & CONNECT
                Clean, Minimalist, High-Impact Editorial Hub:
                - Kinetic Marquee Ticker
                - Big Bold Typography & Real-Time IST Availability Pill
                - Giant 1-Click Copy Email Action
                - Pure Minimalist Social Icons (No Cards, Pure Branded Icons)
            ═══════════════════════════════════════════════════════════════ */}
            <section
                id="contact"
                className="relative w-full min-h-screen min-h-[100dvh] pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 xl:px-20 flex flex-col justify-between overflow-hidden select-none scroll-mt-24 sm:scroll-mt-28"
                style={{ backgroundColor: "#b2f164" }}
            >
                {/* ── Background Subtle Ambient Studio Elements & Grid Dots ── */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-40 -z-10"
                    style={{
                        backgroundImage: "radial-gradient(rgba(20, 58, 18, 0.15) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <motion.div
                    animate={{
                        x: [0, 35, 0],
                        y: [0, -25, 0],
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 14,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-[15%] right-[-10%] w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full pointer-events-none -z-10"
                    style={{
                        background: "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(178,241,100,0.35) 45%, transparent 70%)",
                        filter: "blur(36px)",
                        willChange: "transform",
                    }}
                />
                <motion.div
                    animate={{
                        x: [0, -25, 0],
                        y: [0, 20, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 18,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-[-10%] left-[-10%] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full pointer-events-none -z-10"
                    style={{
                        background: "radial-gradient(circle, rgba(20,58,18,0.14) 0%, transparent 70%)",
                        filter: "blur(32px)",
                        willChange: "transform",
                    }}
                />

                {/* ── Kinetic Running Marquee Ticker Ribbon ── */}
                <div className="w-full overflow-hidden border-y border-[#143a12]/15 py-2.5 sm:py-3 mb-8 sm:mb-12 bg-[#143a12]/[0.03] backdrop-blur-sm -mx-4 sm:-mx-8 lg:-mx-12 xl:-mx-20 px-4 sm:px-8 lg:px-12 xl:px-20">
                    <motion.div
                        animate={{ x: [0, -1100] }}
                        transition={{
                            repeat: Infinity,
                            duration: 22,
                            ease: "linear",
                        }}
                        className="flex whitespace-nowrap gap-8 items-center text-xs sm:text-sm font-mono font-bold tracking-widest text-[#143a12]/80 uppercase"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#143a12]" />
                            AVAILABLE FOR FULL-TIME & CONTRACT ROLES
                        </span>
                        <span>•</span>
                        <span>NEXT.JS 15 & REACT ARCHITECTURE</span>
                        <span>•</span>
                        <span>SCALABLE SAAS & API SYSTEMS</span>
                        <span>•</span>
                        <span>&lt; 4H GUARANTEED RESPONSE TIME</span>
                        <span>•</span>
                        <span>WORLDWIDE REMOTE COLLABORATION</span>
                        <span>•</span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#143a12]" />
                            AVAILABLE FOR FULL-TIME & CONTRACT ROLES
                        </span>
                        <span>•</span>
                        <span>NEXT.JS 15 & REACT ARCHITECTURE</span>
                        <span>•</span>
                        <span>SCALABLE SAAS & API SYSTEMS</span>
                        <span>•</span>
                        <span>&lt; 4H GUARANTEED RESPONSE TIME</span>
                        <span>•</span>
                        <span>WORLDWIDE REMOTE COLLABORATION</span>
                    </motion.div>
                </div>

                {/* ── Center Content: Clean, Spacious, Ultra-Premium ── */}
                <div className="relative w-full max-w-[1200px] mx-auto z-10 flex flex-col items-center text-center my-auto py-8 sm:py-12 gap-8 sm:gap-10">

                    {/* Eyebrow & Live Status Pill */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.28em] text-[#143a12]/85 font-mono">
                            04 / CONTACT
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#143a12]/40" />
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm text-xs font-mono font-bold text-[#143a12]">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27c93f] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#27c93f]" />
                            </span>
                            <span>Available Q1–Q2 2025</span>
                            <span className="text-[#143a12]/30">•</span>
                            <span>IST {istTime || "19:40 IST"}</span>
                        </div>
                    </div>

                    {/* Grand Heading */}
                    <h2 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black uppercase text-[#143a12] tracking-tight leading-[0.92] font-sans max-w-5xl">
                        LET’S BUILD SOMETHING <br />
                        <span className="text-[#25691f]">EXTRAORDINARY.</span>
                    </h2>

                    {/* Concise Subtitle */}
                    <p className="text-base sm:text-xl text-[#143a12]/80 font-sans leading-relaxed max-w-2xl">
                        Have an ambitious web application, full-stack opening, or architecture challenge? Drop a line directly and let’s make it happen.
                    </p>

                    {/* Giant Interactive 1-Click Copy Email Display */}
                    <div className="flex flex-col items-center gap-4 mt-2">
                        <MagneticItem strength={0.25}>
                            <button
                                type="button"
                                onClick={handleCopyEmail}
                                className="group relative px-6 sm:px-10 py-4 sm:py-6 rounded-3xl bg-[#143a12] text-[#b2f164] shadow-[0_20px_50px_rgba(20,58,18,0.28)] hover:shadow-[0_25px_60px_rgba(20,58,18,0.38)] border border-[#b2f164]/20 hover:border-[#b2f164]/50 transition-all flex flex-col sm:flex-row items-center gap-4 sm:gap-6 cursor-pointer"
                            >
                                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#b2f164]/70 mb-1">
                                        CLICK TO COPY INBOX
                                    </span>
                                    <span className="text-xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-[#b2f164] font-mono tracking-tight transition-colors">
                                        itsanurag707@gmail.com
                                    </span>
                                </div>

                                <div className="px-4 py-2 rounded-full bg-[#b2f164] text-[#143a12] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 group-hover:bg-white transition-colors shrink-0 shadow-sm">
                                    {copiedEmail ? (
                                        <>
                                            <svg className="w-4 h-4 text-[#143a12]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                            </svg>
                                            <span>Copy Email</span>
                                        </>
                                    )}
                                </div>
                            </button>
                        </MagneticItem>

                        <div className="flex items-center gap-4 text-xs font-mono text-[#143a12]/75">
                            <span>⚡ Response time: &lt; 4 hours</span>
                            <span>•</span>
                            <a
                                href="mailto:itsanurag707@gmail.com?subject=Project%20Inquiry%20-%20Collaboration"
                                className="underline font-bold text-[#143a12] hover:text-[#25691f] cursor-pointer"
                            >
                                Or open in default mail app ↗
                            </a>
                        </div>
                    </div>

                    {/* ── OR Section: Instant Cal.com Booking ── */}
                    <div className="flex flex-col items-center gap-4 w-full max-w-md">
                        <div className="flex items-center gap-4 w-full">
                            <div className="h-px flex-1 bg-[#143a12]/20" />
                            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.28em] text-[#143a12]/60">
                                OR
                            </span>
                            <div className="h-px flex-1 bg-[#143a12]/20" />
                        </div>

                        {/* Cal.com Direct Booking Card */}
                        <MagneticItem strength={0.28}>
                            <a
                                href="https://cal.com/itsanuragsingh/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white/85 hover:bg-[#143a12] text-[#143a12] hover:text-[#b2f164] border border-[#143a12]/20 hover:border-[#143a12] shadow-sm hover:shadow-xl transition-all duration-300 flex items-center gap-3.5 cursor-pointer active:scale-95"
                            >
                                <div className="w-8 h-8 rounded-full bg-[#143a12]/10 group-hover:bg-[#b2f164] text-[#143a12] flex items-center justify-center transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
                                        Schedule a 30-Min Call
                                    </span>
                                    <span className="text-[11px] font-mono text-[#143a12]/60 group-hover:text-[#b2f164]/80 transition-colors">
                                        cal.com/itsanuragsingh/30min
                                    </span>
                                </div>
                                <span className="text-sm font-sans ml-1 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                                    ↗
                                </span>
                            </a>
                        </MagneticItem>
                    </div>

                    {/* ── Sleek Minimalist Social Icons as JUST ICONS ── */}
                    <div className="flex flex-col items-center gap-3 pt-3">
                        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#143a12]/70 font-bold">
                            Connect Directly
                        </span>
                        <div className="flex items-center gap-3 sm:gap-4">
                            {/* GitHub */}
                            <MagneticItem strength={0.35}>
                                <a
                                    href="https://github.com/itsanuragsingh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub Profile"
                                    title="GitHub (@itsanuragsingh)"
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/80 hover:bg-[#143a12] text-[#143a12] hover:text-[#b2f164] border border-[#143a12]/15 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer"
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                </a>
                            </MagneticItem>

                            {/* LinkedIn */}
                            <MagneticItem strength={0.35}>
                                <a
                                    href="https://linkedin.com/in/itsanuragsingh7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn Profile"
                                    title="LinkedIn (@itsanuragsingh7)"
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/80 hover:bg-[#143a12] text-[#143a12] hover:text-[#b2f164] border border-[#143a12]/15 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer"
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                    </svg>
                                </a>
                            </MagneticItem>

                            {/* X / Twitter */}
                            <MagneticItem strength={0.35}>
                                <a
                                    href="https://x.com/itsanurag707"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="X (Twitter) Profile"
                                    title="X (@itsanurag707)"
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/80 hover:bg-[#143a12] text-[#143a12] hover:text-[#b2f164] border border-[#143a12]/15 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer"
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                            </MagneticItem>

                            {/* Cal.com Icon */}
                            <MagneticItem strength={0.35}>
                                <a
                                    href="https://cal.com/itsanuragsingh/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Book 30-Min Call on Cal.com"
                                    title="Book 30-Min Call (cal.com/itsanuragsingh/30min)"
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/80 hover:bg-[#143a12] text-[#143a12] hover:text-[#b2f164] border border-[#143a12]/15 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer"
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </a>
                            </MagneticItem>

                            {/* Direct Mail */}
                            <MagneticItem strength={0.35}>
                                <a
                                    href="mailto:itsanurag707@gmail.com"
                                    aria-label="Send Direct Email"
                                    title="Send Direct Email"
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/80 hover:bg-[#143a12] text-[#143a12] hover:text-[#b2f164] border border-[#143a12]/15 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer"
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </a>
                            </MagneticItem>
                        </div>
                    </div>

                </div>

                {/* ── Footer Bar: Copyright & Back to Top ── */}
                <div className="pt-10 sm:pt-14 border-t border-[#143a12]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#143a12]/70 max-w-[1440px] mx-auto w-full z-10">
                    <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full flex items-center justify-center overflow-visible shrink-0">
                            <img
                                src={diceBearAvatar}
                                alt="Avatar"
                                className="w-full h-full object-contain select-none pointer-events-none"
                            />
                        </span>
                        <span>© {new Date().getFullYear()} Anurag Singh. All rights reserved.</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span>Engineered with Next.js 15, Motion & Lenis</span>
                        <button
                            type="button"
                            onClick={() => scrollTo("#hero")}
                            className="group flex items-center gap-1.5 text-[#143a12] font-bold uppercase tracking-wider hover:underline cursor-pointer"
                        >
                            <span>Back to Top</span>
                            <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
                        </button>
                    </div>
                </div>

            </section>
        </main>
    );
}

