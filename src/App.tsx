import { useState, useEffect } from "react";
import { Story, ActiveTab } from "./types";
import { DEFAULT_STORIES } from "./data/defaultStories";
import RulesAndPrizes from "./components/RulesAndPrizes";
import Home from "./components/Home";
import SubmitEntry from "./components/SubmitEntry";
import LotusLogo from "./components/LotusLogo";
import { Award, Compass, Edit3, Mail, Heart, Home as HomeIcon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
// @ts-ignore
import backgroundImage from "./assets/images/sunset_background_1780641113542.png";
// @ts-ignore
import sydneyHarborSunsetBg from "./assets/images/sydney_harbor_sunset_bg_1780645120800.png";
// @ts-ignore
import sunsetSeaBg from "./assets/images/sunset_sea_bg_1780645868964.png";

export default function App() {
  // Set default tab to "rules" so that the screen shown in the user's screenshot
  // is presented immediately upon load, ensuring maximum visual fidelity to user intent!
  const [activeTab, setActiveTab] = useState<ActiveTab>("rules");
  const [stories, setStories] = useState<Story[]>([]);
  const [likedStories, setLikedStories] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Initialize data from localStorage or default dataset
  useEffect(() => {
    try {
      const storedStories = localStorage.getItem("lotus_stories");
      if (storedStories) {
        setStories(JSON.parse(storedStories));
      } else {
        setStories(DEFAULT_STORIES);
        localStorage.setItem("lotus_stories", JSON.stringify(DEFAULT_STORIES));
      }
    } catch (e) {
      setStories(DEFAULT_STORIES);
    }

    try {
      const storedLikes = localStorage.getItem("lotus_liked_stories");
      if (storedLikes) {
        setLikedStories(JSON.parse(storedLikes));
      }
    } catch (e) {
      // safe fallback
    }

    // Since in-memory server state can exist, let's sync with backend as well!
    fetch("/api/stories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.stories && data.stories.length > 0) {
          setStories((prev) => {
            // Merge custom stories from server with default stories locally
            const merged = [...data.stories];
            // Add any default stories that aren't already included
            DEFAULT_STORIES.forEach((ds) => {
              if (!merged.some((m) => m.id === ds.id)) {
                merged.push(ds);
              }
            });
            // Persist to localstorage
            localStorage.setItem("lotus_stories", JSON.stringify(merged));
            return merged;
          });
        }
      })
      .catch((err) => console.log("Serving offline - using localStorage/defaultStories datasets."));
  }, []);

  // Support upvoting / liking stories and persisting state in client + localstorage
  const handleLike = (storyId: string) => {
    let updatedLikes = [...likedStories];
    const isLiked = likedStories.includes(storyId);

    if (isLiked) {
      // Unlike
      updatedLikes = updatedLikes.filter((id) => id !== storyId);
    } else {
      // Like
      updatedLikes.push(storyId);
    }

    setLikedStories(updatedLikes);
    localStorage.setItem("lotus_liked_stories", JSON.stringify(updatedLikes));

    // Update state of likes Count
    const updatedStories = stories.map((story) => {
      if (story.id === storyId) {
        return {
          ...story,
          likesCount: isLiked ? story.likesCount - 1 : story.likesCount + 1,
        };
      }
      return story;
    });

    setStories(updatedStories);
    localStorage.setItem("lotus_stories", JSON.stringify(updatedStories));
  };

  // Support adding a story immediately on submission
  const handleNewSubmission = (newStory: Story) => {
    const updated = [newStory, ...stories];
    setStories(updated);
    localStorage.setItem("lotus_stories", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen text-[#e1e2eb] relative flex flex-col font-sans selection:bg-brand-cyan/30 selection:text-white">
      {/* Immersive Liquid Glass Motion Background Layer with Sunset Sea Background Image */}
      <div id="liquid-glass-background" className="fixed inset-0 w-full h-full -z-10 bg-[#030607] overflow-hidden pointer-events-none">
        {/* Base Background Image (Changes based on route for custom immersive feel) */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-[1000ms] ease-in-out"
          style={{
            backgroundImage: `url(${activeTab === "rules" ? sydneyHarborSunsetBg : sunsetSeaBg})`,
            transform: `scale(${1 + scrollY * 0.00015})`,
          }}
        />
        
        {/* Soft dark tinted Tiffany glass overlay that keeps the sunset beautifully visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030607]/40 via-[#051112]/50 to-[#030607]/75 backdrop-blur-[2px]" />

        {/* Dynamic Tiffany Blue & White liquid glass blobs */}
        <div className="absolute top-[5%] right-[5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-[#0abab5]/15 rounded-full blur-[110px] sm:blur-[150px] animate-liquid-one mix-blend-screen" />
        <div className="absolute bottom-[5%] left-[-5%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] bg-[#0abab5]/10 rounded-full blur-[120px] sm:blur-[160px] animate-liquid-two mix-blend-screen" />
        <div className="absolute top-[40%] left-[25%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-white/8 rounded-full blur-[90px] sm:blur-[130px] animate-liquid-one mix-blend-screen" />
        
        {/* Fine Grain Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 mix-blend-overlay" />
      </div>
      
      {/* Top Navigation Bar with clear Liquid Glass look */}
      <nav id="nav-desktop" className="hidden md:flex fixed top-0 w-full z-50 bg-white/[0.03] backdrop-blur-xl border-b border-white/10 py-4 px-8 items-center justify-between shadow-[0_8px_32px_0_rgba(0,10,10,0.15)]">
        <div 
          onClick={() => setActiveTab("home")}
          className="cursor-pointer select-none hover:opacity-80 duration-300"
        >
          <LotusLogo size="sm" />
        </div>

        <div className="flex gap-8 items-center font-sans text-sm font-semibold text-brand-muted">
          <button
            onClick={() => setActiveTab("home")}
            className={`transition-colors duration-300 cursor-pointer ${activeTab === "home" ? "text-brand-cyan font-bold" : "hover:text-white"}`}
          >
            Trang chủ
          </button>
          
          <button
            onClick={() => setActiveTab("rules")}
            className={`transition-colors duration-300 cursor-pointer ${activeTab === "rules" ? "text-brand-cyan font-bold border-b-2 border-brand-cyan pb-1" : "hover:text-white"}`}
          >
            Thể lệ &amp; Giải thưởng
          </button>
          
          <button
            onClick={() => setActiveTab("submit")}
            className={`transition-colors duration-300 cursor-pointer ${activeTab === "submit" ? "text-brand-cyan font-bold border-b-2 border-brand-cyan pb-1" : "hover:text-white"}`}
          >
            Nộp bài
          </button>
        </div>

        <button
          onClick={() => setActiveTab("home")}
          className="bg-brand-cyan text-brand-bg px-6 py-2.5 rounded-full font-sans text-xs font-black tracking-wider hover:bg-white hover:scale-105 active:scale-95 duration-300 cursor-pointer transition-all neon-aura"
        >
          BACK TO WEBSITE
        </button>
      </nav>

      {/* Side Floating NavBar with Tiffany styling */}
      <nav id="nav-mobile" className="md:hidden fixed right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(10,186,181,0.15)] flex flex-col gap-4 p-2.5 z-40">
        <button
          onClick={() => setActiveTab("home")}
          title="Trang chủ"
          className={`p-3 rounded-full hover:scale-110 transition-transform flex items-center justify-center duration-300 ${activeTab === "home" ? "bg-brand-cyan text-brand-bg" : "text-brand-muted hover:text-white"}`}
        >
          <HomeIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setActiveTab("rules")}
          title="Thể lệ & Giải thưởng"
          className={`p-3 rounded-full hover:scale-110 transition-transform flex items-center justify-center duration-300 ${activeTab === "rules" ? "bg-brand-cyan text-brand-bg md:fill-none" : "text-brand-muted hover:text-white"}`}
        >
          <Award className="w-5 h-5" />
        </button>
        <button
          onClick={() => setActiveTab("submit")}
          title="Nộp bài"
          className={`p-3 rounded-full hover:scale-110 transition-transform flex items-center justify-center duration-300 ${activeTab === "submit" ? "bg-brand-cyan text-brand-bg" : "text-brand-muted hover:text-white"}`}
        >
          <Edit3 className="w-5 h-5" />
        </button>
      </nav>

      {/* Mobile Top Header */}
      <div className="md:hidden sticky top-0 w-full z-40 bg-[#070d0e]/85 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-white/5">
        <div 
          onClick={() => setActiveTab("home")} 
          className="cursor-pointer"
        >
          <LotusLogo size="sm" />
        </div>
        <button
          onClick={() => setActiveTab("home")}
          className="bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/25 px-3.5 py-1.5 rounded-full font-sans text-[11px] font-bold tracking-wider"
        >
          BACK TO WEBSITE
        </button>
      </div>

      {/* Main Canvas Area */}
      <main className="flex-grow pt-[30px] md:pt-[110px] pb-24 px-4 sm:px-8 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Animated router views using framer motion layout triggers */}
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <Home 
                stories={stories} 
                onLike={handleLike} 
                likedStories={likedStories} 
                onNavigate={setActiveTab} 
              />
            </motion.div>
          )}

          {activeTab === "rules" && (
            <motion.div
              key="rules"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <RulesAndPrizes onNavigate={setActiveTab} />
            </motion.div>
          )}

          {activeTab === "submit" && (
            <motion.div
              key="submit"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <SubmitEntry 
                onSubmitSuccess={handleNewSubmission} 
                onNavigate={setActiveTab} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Page Footer */}
      <footer className="w-full bg-[#0b0e14] border-t border-white/5 py-16 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-8 mt-auto z-10">
        <div className="text-center sm:text-left space-y-4">
          <LotusLogo size="md" />
          <p className="font-sans text-xs sm:text-sm text-brand-muted font-normal">
            © 2026 LOTUS CONSULTING. All rights reserved. Registered Migration Agents.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 font-sans text-xs sm:text-sm font-semibold select-none text-brand-muted">
          <a href="#facebook" className="hover:text-brand-cyan transition-colors">Facebook</a>
          <a href="#linkedin" className="hover:text-brand-cyan transition-colors">LinkedIn</a>
          <a href="#instagram" className="hover:text-brand-cyan transition-colors">Instagram</a>
          <a href="mailto:info@lotusconsulting.vn" className="hover:text-brand-cyan transition-colors">Email Us</a>
        </div>
      </footer>
    </div>
  );
}
