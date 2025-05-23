'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { TextPlugin } from 'gsap/TextPlugin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Zap, Sparkles, CheckCircle, AlertTriangle, Mail, Brain } from 'lucide-react'
import Image from 'next/image'

gsap.registerPlugin(ScrollToPlugin, TextPlugin)

const featureKeywords = [
  { text: 'Budgeting', icon: <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[hsl(var(--accent))] opacity-80" /> },
  { text: 'Taxes', icon: <Sparkles className="w-3.5 h-3.5 mr-1.5 text-pink-500 opacity-80" /> },
  { text: 'Debt Repayment', icon: <Sparkles className="w-3.5 h-3.5 mr-1.5 text-teal-400 opacity-80" /> },
  { text: 'Retirement Planning', icon: <Sparkles className="w-3.5 h-3.5 mr-1.5 text-sky-400 opacity-80" /> },
  { text: 'Insurance', icon: <Sparkles className="w-3.5 h-3.5 mr-1.5 text-orange-400 opacity-80" /> },
  { text: 'Estate Planning', icon: <Sparkles className="w-3.5 h-3.5 mr-1.5 text-lime-500 opacity-80" /> },
  { text: 'OPA Pension', icon: <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-400 opacity-80" /> },
]

const pharmacistQuestions = [
  "Latest OPA guidelines for Schedule II drugs?",
  "Summarize metformin interactions with new antivirals.",
  "Counseling points for a new Ozempic user?",
  "Bioequivalence standards for generic immunosuppressants?",
  "Documenting verbal prescription clarifications?",
  "Common side effects of Leqembi?",
  "Alternative therapies for statin intolerance?",
  "Storage for reconstituted pediatric antibiotics?",
  "Managing opioid addiction in community pharmacy?",
  "How does Ontario's PMP work?"
];

export default function LandingPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const cosmicCardRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineTaglineRef = useRef<HTMLParagraphElement>(null)
  const featureKeywordsContainerRef = useRef<HTMLDivElement>(null)
  const ibmLogoContainerRef = useRef<HTMLDivElement>(null)
  const ctaFormRef = useRef<HTMLFormElement>(null)
  const ctaEmailInputRef = useRef<HTMLInputElement>(null)
  const ctaButtonRef = useRef<HTMLButtonElement>(null)
  const secondaryCtaButtonRef = useRef<HTMLDivElement>(null)
  const typewriterSectionRef = useRef<HTMLDivElement>(null)
  const typewriterTextRef = useRef<HTMLSpanElement>(null)

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [inputLineFocused, setInputLineFocused] = useState(false)

  const handleHeaderWaitlistClick = () => {
    if (ctaFormRef.current && ctaEmailInputRef.current) {
      gsap.to(window, { duration: 1, scrollTo: { y: ctaFormRef.current, offsetY: 100 }, ease: 'power2.inOut' })
      setTimeout(() => ctaEmailInputRef.current?.focus({ preventScroll: true }), 1000)
    }
  }

  const handleSeeHowItWorksClick = () => {
    if (typewriterSectionRef.current) {
      gsap.to(window, { duration: 1, scrollTo: { y: typewriterSectionRef.current, offsetY: 100 }, ease: 'power2.inOut' })
    }
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    if (!email || !email.includes('@')) {
      setSubmitStatus('error')
      if (ctaFormRef.current) {
        gsap.fromTo(ctaFormRef.current, { x: -6 }, { x: 6, repeat: 3, yoyo: true, duration: 0.07, ease: 'sine.inOut', clearProps: 'x' })
      }
      setTimeout(() => setSubmitStatus(null), 3000)
      return
    }
    setIsSubmitting(true)
    setSubmitStatus(null)

    const buttonTextSpan = ctaButtonRef.current?.querySelector('span')
    if (ctaButtonRef.current && buttonTextSpan) {
      gsap.to(ctaButtonRef.current, { opacity: 0.7, scale: 0.98, duration: 0.3, ease: 'power2.inOut' })
      gsap.to(buttonTextSpan, { innerText: 'Processing...', duration: 0 })
    }

    await new Promise(resolve => setTimeout(resolve, 1500))
    const success = Math.random() > 0.1;

    if (ctaButtonRef.current && buttonTextSpan) {
      if (success) {
        setSubmitStatus('success')
        setEmail('')
        gsap.to(buttonTextSpan, { innerText: 'Success!', duration: 0 })
        gsap.set(ctaButtonRef.current, { background: 'hsl(130, 60%, 45%)' });
        gsap.to(ctaButtonRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.7)'
        })
        if (ctaEmailInputRef.current) gsap.to(ctaEmailInputRef.current, { opacity: 0.5, duration: 0.3 })
      } else {
        setSubmitStatus('error')
        gsap.to(buttonTextSpan, { innerText: 'Try Again', duration: 0 })
        gsap.set(ctaButtonRef.current, { background: 'hsl(0, 70%, 50%)' });
        gsap.to(ctaButtonRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3
        })
        if (ctaFormRef.current) {
          gsap.fromTo(ctaFormRef.current, { x: -6 }, { x: 6, repeat: 3, yoyo: true, duration: 0.07, ease: 'sine.inOut', clearProps: 'x' })
        }
      }
      setIsSubmitting(false)
      setTimeout(() => {
        setSubmitStatus(null)
        gsap.to(buttonTextSpan, { innerText: 'Join Waitlist', duration: 0 })
        gsap.set(ctaButtonRef.current, { clearProps: 'background,opacity,scale' })
        if (ctaEmailInputRef.current) gsap.to(ctaEmailInputRef.current, { opacity: 1 })
      }, 3000)
    }
  }

  useEffect(() => {
    const { current: page } = pageRef;
    const { current: header } = headerRef;
    const { current: cosmicCard } = cosmicCardRef;
    const { current: headline } = headlineRef;
    const { current: subheadlineTagline } = subheadlineTaglineRef;
    const { current: featureKeywordsContainer } = featureKeywordsContainerRef;
    const { current: ibmLogoContainer } = ibmLogoContainerRef;
    const { current: ctaForm } = ctaFormRef;
    const { current: secondaryCtaButton } = secondaryCtaButtonRef;
    const { current: typewriterSection } = typewriterSectionRef;

    if (!page || !header || !cosmicCard || !headline || !subheadlineTagline || !featureKeywordsContainer || !ibmLogoContainer || !ctaForm || !secondaryCtaButton || !typewriterSection) {
      console.warn("GSAP: Aborting initial animations as one or more critical refs are not yet available.");
      return;
    }

    gsap.set([header, cosmicCard, typewriterSection], { opacity: 0 });
    gsap.set([headline, subheadlineTagline, featureKeywordsContainer, ibmLogoContainer, ctaForm, secondaryCtaButton, typewriterSection], { opacity: 0, y: 40 });
    
    const featureKeywordItems = gsap.utils.toArray('.feature-keyword-item') as HTMLElement[];
    if (featureKeywordItems.length > 0) {
        gsap.set(featureKeywordItems, { opacity: 0, y: 20, scale: 0.8 });
    } else {
        console.warn("GSAP: No '.feature-keyword-item' elements found to animate.");
    }
    
    const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    entranceTl.to(header, { opacity: 1, duration: 0.8, delay: 0.2 })
      .to(cosmicCard, { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'elastic.out(1, 0.6)',
        // boxShadow: '0px 30px 100px -20px hsla(var(--primary),0.3), 0px 10px 40px -15px hsla(var(--accent),0.2)' // Still commented out
      }, '-=0.6')
      .to(headline, { opacity: 1, y: 0, duration: 0.9 }, '-=0.8')
      .to(subheadlineTagline, { opacity: 1, y: 0, duration: 0.8 }, '-=0.7')
      .to(ctaForm, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6') 
      .to(secondaryCtaButton, { opacity: 1, y: 0, duration: 0.8 }, '-=0.7')
      .to(featureKeywordsContainer, { opacity: 1, y: 0, duration: 0.8 }, '-=0.7')
      .to(ibmLogoContainer, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6');

    if (featureKeywordItems.length > 0) {
      entranceTl.to(featureKeywordItems, { 
        opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.6)' 
      }, "-=0.7");
    }
    
    entranceTl.to(typewriterSection, { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'elastic.out(1, 0.7)' }, '-=0.4');

    let floatingKeywordTweens: gsap.core.Tween[] = [];
    if (featureKeywordItems.length > 0) {
        floatingKeywordTweens = featureKeywordItems.map(item => 
          gsap.fromTo(item, 
            { y: "random(-5, 5)", x: "random(-3, 3)", rotation: "random(-4,4)" }, 
            {
              y: "random(-5, 5)", 
              x: "random(-3, 3)", 
              rotation: "random(-4, 4)",
              duration: "random(3.5, 6)", 
              repeat: -1, 
              yoyo: true, 
              ease: 'sine.inOut' 
            }
          )
        );
    }

    let parallaxTl: gsap.core.Timeline | null = null;
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      parallaxTl = gsap.timeline({
        scrollTrigger: { trigger: page, start: 'top top', end: 'bottom top', scrub: 1.8 }
      });
      if (cosmicCard && headline) { 
        parallaxTl.to(cosmicCard, { yPercent: -7, scale: 0.97, opacity: 0.9, filter: 'brightness(0.95)' }, 0)
                  .to(headline, { yPercent: -12 }, 0);
      }
    }
    
    return () => { 
      entranceTl.kill(); 
      if (parallaxTl) parallaxTl.kill();
      floatingKeywordTweens.forEach(tween => tween.kill());
      gsap.killTweensOf([page, header, cosmicCard, headline, subheadlineTagline, featureKeywordsContainer, ibmLogoContainer, ctaForm, secondaryCtaButton, typewriterSection, ...featureKeywordItems]);
    };
  }, []);

  useEffect(() => {
    if (!typewriterTextRef.current) return;
    const currentTypewriterTextRef = typewriterTextRef.current;
    const mainTl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
    pharmacistQuestions.forEach((question) => {
      const textElement = currentTypewriterTextRef;
      if (textElement) {
        const tl = gsap.timeline();
        tl.to(textElement, { 
            duration: question.length * 0.05,
            text: question,
            ease: "none"
         })
         .to(textElement, { 
            duration: 2.0,
            text: question, 
            ease: "none"
         })
         .to(textElement, { 
            duration: question.length * 0.025,
            text: "", 
            ease: "none" 
         }, "+=0.8");
        mainTl.add(tl);
      }
    });
    return () => {
      mainTl.kill();
      gsap.killTweensOf(currentTypewriterTextRef);
    };
  }, []);

  return (
    <div 
      ref={pageRef} 
      className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] flex flex-col items-center overflow-x-hidden relative isolate pt-24 md:pt-28 pb-20"
    >
      <header 
        ref={headerRef} 
        className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center py-3.5 px-6 md:px-10 bg-gradient-to-b from-[hsl(var(--background)/0.6)] to-[hsl(var(--background)/0.3)] backdrop-blur-xl border-b border-[hsl(var(--primary)/0.15)] shadow-2xl shadow-[hsl(var(--primary)/0.1)]"
      >
        <div className="select-none">
          <span className="text-2xl md:text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-pink-500 p-1">
            FriedmannAI
          </span>
        </div>
        <div>
          <Button 
            variant="default" 
            onClick={handleHeaderWaitlistClick} 
            className="bg-gradient-to-r from-[hsl(var(--primary)/0.7)] to-[hsl(var(--accent)/0.6)] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--accent)/0.8)] text-[hsl(var(--primary-foreground))] transition-all duration-300 ease-in-out shadow-lg hover:shadow-[hsl(var(--primary)/0.5)] text-sm px-5 py-2.5 rounded-xl border border-[hsl(var(--primary)/0.3)] transform hover:scale-105 active:scale-95"
          >
            Join Waitlist
          </Button>
        </div>
      </header>
      
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div className="absolute inset-0 bg-[hsl(260,70%,3%)]" /> 
        <div className="absolute inset-0 animate-[subtle-gradient-pan_35s_ease_infinite] opacity-30" style={{backgroundImage: 'radial-gradient(ellipse at 20% 80%, hsl(280,50%,30%,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, hsl(240,50%,40%,0.4) 0%, transparent 60%), radial-gradient(ellipse at 50% 50%, hsl(300,60%,25%,0.3) 0%, transparent 70%)'}}></div>
        {[...Array(80)].map((_, i) => {
          const size = Math.random() * 2.2 + 0.8;
          const duration = Math.random() * 4 + 3;
          const starOpacityMin = Math.random() * 0.2 + 0.1;
          const starOpacityMax = Math.random() * 0.5 + 0.4;
          return (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-gradient-to-br from-white/80 to-purple-300/70 animate-galaxy-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${duration}s`,
                animationDelay: `${Math.random() * 2}s`,
                '--star-opacity-min': starOpacityMin,
                '--star-opacity-max': starOpacityMax,
              } as React.CSSProperties}
            />
          );
        })}
        <div className="noise-overlay -z-10 opacity-60" /> 
      </div>

      <div 
        ref={cosmicCardRef} 
        className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-5xl xl:max-w-6xl mx-auto p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[hsl(var(--primary)/0.35)] via-[hsl(var(--card)/0.6)] to-[hsl(var(--accent)/0.25)] backdrop-blur-2xl shadow-[0_0_80px_hsla(var(--primary),0.25),_0_0_30px_hsla(var(--accent),0.15)] border border-[hsl(var(--primary)/0.2)] mt-10 md:mt-12 transition-all duration-500 hover:shadow-[0_0_120px_hsla(var(--primary),0.35),_0_0_50px_hsla(var(--accent),0.25)]"
      >
        <h1 ref={headlineRef} className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-5 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-200 to-pink-300 leading-tight block">
            AI-Powered
          </span>
          <span className="block leading-tight mt-1 md:mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300">Financial Guidance</span>
        </h1>

        <p ref={subheadlineTaglineRef} className="text-lg md:text-xl text-[hsl(var(--muted-foreground)/0.9)] max-w-2xl mb-10 leading-relaxed">
          Unbiased, hyper-personalized financial strategies for Canadians. Transparent AI, tailored for you.
        </p>
        
        <form onSubmit={handleFormSubmit} ref={ctaFormRef} className="relative flex flex-col sm:flex-row items-stretch w-full max-w-2xl mx-auto space-y-3 sm:space-y-0 sm:space-x-3 mb-8 group">
            <div className="relative w-full sm:flex-grow flex items-center bg-[hsl(var(--secondary)/0.2)] rounded-xl sm:rounded-r-none border border-[hsl(var(--border)/0.5)] hover:border-[hsl(var(--primary)/0.4)] focus-within:border-[hsl(var(--primary))] focus-within:bg-[hsl(var(--secondary)/0.3)] transition-all duration-300 shadow-md focus-within:shadow-lg focus-within:shadow-[hsl(var(--primary)/0.2)] focus-within:ring-2 focus-within:ring-[hsl(var(--primary)/0.3)]">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[hsl(var(--muted-foreground)/0.6)] group-focus-within:text-[hsl(var(--primary))] transition-colors duration-300" />
                <Input 
                    ref={ctaEmailInputRef}
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setInputLineFocused(true)}
                    onBlur={() => setInputLineFocused(false)}
                    placeholder="Enter Your Email!"
                    aria-label="Email for waitlist"
                    className={`appearance-none flex-grow h-[72px] pl-14 pr-6 bg-transparent text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground)/0.7)] focus:ring-0 focus-visible:outline-none transition-all duration-300 ease-in-out text-lg rounded-xl sm:rounded-r-none peer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                />
                <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-transparent rounded-full overflow-hidden transition-all duration-300 ease-out ${inputLineFocused ? 'bg-[hsl(var(--primary))] scale-x-100' : 'scale-x-0 group-hover:scale-x-100 peer-focus:scale-x-100'} origin-left`}>
                </div>
            </div>
            <Button 
                ref={ctaButtonRef}
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className={`w-full sm:w-auto h-[72px] bg-gradient-to-r text-white transition-all transform duration-300 ease-in-out shadow-xl hover:shadow-2xl hover:shadow-[hsl(var(--primary)/0.4)] active:scale-[0.97] text-lg font-semibold px-9 group rounded-xl sm:rounded-l-none ${isSubmitting ? 'from-purple-500 to-indigo-600 opacity-70 cursor-wait' : 'from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--accent)/0.9)] border border-transparent hover:border-[hsl(var(--primary)/0.5)]'}`}
            >
                <span>{isSubmitting ? 'Processing...' : (submitStatus === 'success' ? 'Success!' : (submitStatus === 'error' ? 'Try Again' : 'Join Waitlist'))}</span> 
                {submitStatus === 'success' ? <CheckCircle className="ml-2.5 h-6 w-6" /> : (submitStatus === 'error' ? <AlertTriangle className="ml-2.5 h-6 w-6" /> : <ArrowRight className="ml-2.5 h-6 w-6 group-hover:translate-x-0.5 transition-transform duration-200 ease-in-out" />)}
            </Button>
        </form>

        <div ref={secondaryCtaButtonRef} className="flex flex-col items-center mb-12"> 
            <Button 
                variant="link" 
                size="lg"
                onClick={handleSeeHowItWorksClick}
                className="text-[hsl(var(--muted-foreground))/0.8] hover:text-[hsl(var(--primary))] transition-colors duration-200 group text-base font-medium py-2"
            >
                <Zap className="mr-2 h-4 w-4 text-[hsl(var(--primary))/0.7] group-hover:text-[hsl(var(--primary))] transition-colors duration-200" /> See How It Works 
            </Button>
        </div>
        
        <div ref={featureKeywordsContainerRef} className="flex flex-wrap justify-center items-center gap-3 md:gap-3.5 mb-10 px-2">
          {featureKeywords.map((kw) => (
            <div 
              key={kw.text} 
              className="feature-keyword-item flex items-center p-2.5 px-4 rounded-full bg-[hsl(var(--secondary)/0.5)] backdrop-blur-md border border-[hsl(var(--border)/0.3)] shadow-lg hover:shadow-[hsl(var(--primary)/0.3)] transition-all duration-300 cursor-default select-none transform hover:scale-105 hover:border-[hsl(var(--primary)/0.4)]"
            >
              {kw.icon}
              <span className="text-xs sm:text-sm font-medium text-[hsl(var(--foreground)/0.9)]">{kw.text}</span>
            </div>
          ))}
        </div>

        <div ref={ibmLogoContainerRef} className="flex flex-col items-center w-full mt-4 mb-4 md:mb-6">
          <p className="text-xs text-[hsl(var(--muted-foreground)/0.7)] mb-6 tracking-wide uppercase">Co-built with</p>
          <Image
            src="/ibm.png" 
            alt="IBM Logo"
            width={100} 
            height={38} 
            className="opacity-100 transition-opacity duration-300 hover:opacity-75"
          />
        </div>

      </div>

      <div 
        ref={typewriterSectionRef} 
        className="w-full flex justify-center items-center my-16 md:my-24 px-4"
      >
        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[700px] w-[350px] shadow-xl group">
            <div className="w-[140px] h-[12px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[13px] top-[64px] rounded-l-lg"></div>
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[13px] top-[124px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -right-[13px] top-[100px] rounded-r-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-gray-900">
                <div className="w-full h-full flex flex-col relative isolate bg-gradient-to-br from-[hsl(var(--primary)/0.1)] via-[hsl(var(--background)/0.5)] to-[hsl(var(--accent)/0.15)] backdrop-blur-sm">
                    <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none -z-10"></div>
                    
                    <div className="py-3 px-4 flex items-center border-b border-[hsl(var(--border)/0.2)] bg-[hsl(var(--secondary)/0.3)] backdrop-blur-md">
                        <Brain className="w-7 h-7 text-[hsl(var(--primary))] mr-2 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">FriedmannAI</h2>
                    </div>

                    <div className="flex-grow p-4 space-y-3 overflow-y-auto">
                        <div className="flex justify-start">
                            <div className="max-w-[70%] bg-[hsl(var(--secondary)/0.8)] backdrop-blur-sm text-[hsl(var(--foreground))] p-3 rounded-xl rounded-bl-none shadow-md border border-[hsl(var(--border)/0.2)]">
                                <p className="text-sm">Hey there! I&apos;m FriedmannAI. Ask me any personal finance question, or question about your group savings plan with Manulife!</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 border-t border-[hsl(var(--border)/0.2)] bg-[hsl(var(--secondary)/0.2)] backdrop-blur-md">
                        <div className="min-h-[5em] p-4 rounded-xl bg-[hsl(var(--secondary)/0.6)] border border-[hsl(var(--border)/0.4)] shadow-inner relative overflow-hidden">
                            <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none"></div>
                            <span ref={typewriterTextRef} className="block text-base text-[hsl(var(--foreground))] leading-relaxed font-mono whitespace-pre-wrap select-none"></span>
                            <span className="inline-block text-xl text-[hsl(var(--primary))] ml-0.5 opacity-0 animate-blink-cursor select-none" style={{ animationName: 'blink-cursor-anim' }}>|</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <footer className="w-full text-center py-10 px-4 z-10 mt-auto">
        <p className="text-sm text-[hsl(var(--muted-foreground))/0.9]">&copy; {new Date().getFullYear()} FriedmannAI. All Rights Reserved. Proudly Canadian.</p>
      </footer>
    </div>
  )
}
