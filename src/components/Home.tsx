import { useState, useEffect } from "react";
import { Story, ActiveTab } from "../types";
import { Heart, Search, Filter, Sparkles, BookOpen, Clock, Award, ArrowUpRight, ArrowRight, Globe, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HomeProps {
  stories: Story[];
  onLike: (storyId: string) => void;
  likedStories: string[];
  onNavigate: (tab: ActiveTab) => void;
}

export default function Home({ stories, onLike, likedStories, onNavigate }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [sortBy, setSortBy] = useState<"newest" | "likes">("likes");
  const [viewingStory, setViewingStory] = useState<Story | null>(null);

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

  // Live countdown to the end of the current month
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      // Target is 23:59:59 on the last day of the current month
      const targetDate = new Date(year, month + 1, 0, 23, 59, 59);
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Categories
  const categories = ["Tất cả", "Đôi lứa", "Gia đình", "Bạn tri kỷ"];

  // Filter and Sort logic
  const filteredStories = stories.filter((story) => {
    const matchesSearch = 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "Tất cả" || story.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortBy === "likes") {
      return b.likesCount - a.likesCount;
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="relative w-full">
      {/* Decorative Interactive Scroll-Linked Particles and Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-20">
        {/* Tiffany Blue floating luxury orb that pushes downwards on scroll */}
        <div 
          className="absolute top-[8%] left-[2%] w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-brand-cyan/5 rounded-full blur-[90px] sm:blur-[130px] transition-transform duration-75 ease-out"
          style={{
            transform: `translateY(${scrollY * -0.12}px) rotate(${scrollY * 0.04}deg)`,
          }}
        />
        {/* Tiffany Blue floating luxury orb that pulls upwards on scroll */}
        <div 
          className="absolute top-[40%] right-[-8%] w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-brand-cyan/4 rounded-full blur-[100px] sm:blur-[150px] transition-transform duration-75 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.18}px) scale(${1 + scrollY * 0.00008})`,
          }}
        />
        {/* Delicate Star backdrop that glimmers and moves slightly */}
        <div 
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] opacity-35"
          style={{
            transform: `translateY(${scrollY * 0.06}px)`,
          }}
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <g fill="#0abab5">
              <circle cx="10%" cy="15%" r="1" className="animate-pulse" />
              <circle cx="28%" cy="30%" r="1.5" style={{ animationDelay: "1s" }} className="animate-pulse" />
              <circle cx="42%" cy="65%" r="1" className="animate-pulse" />
              <circle cx="68%" cy="10%" r="1.2" style={{ animationDelay: "2s" }} className="animate-pulse" />
              <circle cx="82%" cy="55%" r="1" className="animate-pulse" />
              <circle cx="93%" cy="25%" r="1.5" className="animate-pulse" />
            </g>
            <g fill="#ffffff">
              <circle cx="14%" cy="60%" r="1.2" style={{ animationDelay: "0.5s" }} className="animate-pulse" />
              <circle cx="52%" cy="20%" r="1.5" className="animate-pulse" />
              <circle cx="73%" cy="80%" r="1" style={{ animationDelay: "1.5s" }} className="animate-pulse" />
              <circle cx="91%" cy="45%" r="1.2" className="animate-pulse" />
            </g>
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 relative inline-block text-center"
          >
            <h1 className="font-display text-4xl sm:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-5xl mx-auto px-2 uppercase relative">
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block"
              >
                Hành trình yêu xa
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.0, delay: 0.4 }}
                className="text-white glow-text block mt-2 sm:mt-4 relative"
              >
                Chạm đến nước Úc
                <span className="absolute inset-x-0 bottom-1 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent scale-x-75 animate-pulse"></span>
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="font-sans text-sm sm:text-lg text-brand-muted max-w-2xl mx-auto mb-8 leading-relaxed px-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Cuộc thi viết về những câu chuyện tình yêu xa và hành trình đến với nước Úc. Nơi những dòng chữ nối liền hai nửa bán cầu, biến khoảng cách thành sức mạnh.
          </motion.p>

          <div className="max-w-2xl lg:max-w-3xl mx-auto mb-14 px-4">
            <div className="relative group bg-gradient-to-br from-brand-cyan/20 via-brand-cyan/5 to-transparent border-2 border-brand-cyan/50 rounded-3xl p-8 sm:p-12 shadow-[0_0_60px_rgba(10,186,181,0.15)] hover:shadow-[0_0_80px_rgba(10,186,181,0.3)] hover:border-brand-cyan hover:scale-[1.02] transition-all duration-500 overflow-hidden text-center backdrop-blur-md">
              {/* Animated Sheen Swipe overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              
              {/* Outer decorative Tiffany certificate line inside */}
              <div className="absolute inset-2 border border-brand-cyan/15 rounded-2xl pointer-events-none group-hover:border-brand-cyan/35 transition-colors"></div>
              
              <div className="flex flex-col items-center relative z-10 w-full max-w-2xl mx-auto">
                <div className="mb-5 bg-brand-cyan/15 text-brand-cyan p-4 rounded-full border border-brand-cyan/30 shadow-[0_0_20px_rgba(10,186,181,0.25)] animate-pulse">
                  <Award className="w-10 h-10 fill-brand-cyan/10" />
                </div>
                
                <span className="text-xs font-mono tracking-[0.25em] text-brand-cyan font-black uppercase bg-brand-cyan/10 px-4 py-1.5 rounded-full border border-brand-cyan/25 mb-4 shadow-[0_0_15px_rgba(10,186,181,0.1)]">
                  GIẢI THƯỜNG ĐẶC BIỆT ĐỘC QUYỀN
                </span>
                
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-wide filter drop-shadow-[0_4px_12px_rgba(10,186,181,0.2)] text-center max-w-lg">
                  MIỄN PHÍ HỒ SƠ <br />
                  <span className="text-brand-cyan glow-text">ĐỊNH CƯ ÚC</span>
                </h2>
                
                {/* Clean divider line */}
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/35 to-transparent my-6"></div>
                
                <p className="font-sans text-sm sm:text-base md:text-lg text-[#e1e2eb] max-w-xl leading-relaxed text-center">
                  Tài trợ 100% toàn bộ chi phí dịch vụ dịch di trú trực tiếp bởi các cố vấn cấp cao từ <strong className="text-brand-cyan font-bold">Lotus Consulting</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 mb-16">
            <button
              onClick={() => onNavigate("submit")}
              className="w-full sm:w-auto bg-brand-cyan text-brand-bg px-8 py-4 rounded-full font-sans text-sm font-bold shadow-[0_0_20px_rgba(0,251,251,0.25)] hover:bg-white hover:scale-105 active:scale-95 cursor-pointer duration-300 transition-all font-semibold"
            >
              Gửi bài dự thi của bạn
            </button>
            <button
              onClick={() => onNavigate("rules")}
              className="w-full sm:w-auto border border-white/10 hover:border-brand-cyan/40 bg-white/5 hover:bg-brand-cyan/5 text-white px-8 py-4 rounded-full font-sans text-sm font-semibold cursor-pointer duration-300 transition-all flex items-center justify-center gap-2"
            >
              Tìm hiểu Thể lệ &amp; Giải thưởng
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Campaign Countdown & Key Dates Dashboard */}
          <div className="max-w-4xl mx-auto px-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              
              {/* Box 1: Deadline with Live Countdown */}
              <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-brand-cyan/40 transition-all duration-300 flex flex-col justify-between h-[150px]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/5 rounded-full blur-2xl group-hover:bg-brand-cyan/10 transition-colors"></div>
                
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-cyan font-extrabold block mb-1">
                    Hạn nộp bài tháng này
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-white">
                      Cuối tháng
                    </span>
                    <span className="text-[11px] text-brand-muted">
                      (30/06/2026)
                    </span>
                  </div>
                </div>
                
                {/* Countdown display */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex flex-col">
                    <div className="bg-white/10 border border-white/15 px-2 py-1 rounded-lg min-w-[34px] text-center font-mono text-xs font-bold text-brand-cyan shadow-inner">
                      {String(timeLeft.days).padStart(2, "0")}
                    </div>
                    <span className="text-[8px] text-brand-muted uppercase text-center mt-0.5">Ngày</span>
                  </div>
                  <span className="text-brand-cyan font-bold -mt-3.5 animate-pulse">:</span>
                  <div className="flex flex-col">
                    <div className="bg-white/10 border border-white/15 px-2 py-1 rounded-lg min-w-[34px] text-center font-mono text-xs font-bold text-brand-cyan shadow-inner">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <span className="text-[8px] text-brand-muted uppercase text-center mt-0.5">Giờ</span>
                  </div>
                  <span className="text-brand-cyan font-bold -mt-3.5 animate-pulse">:</span>
                  <div className="flex flex-col">
                    <div className="bg-white/10 border border-white/15 px-2 py-1 rounded-lg min-w-[34px] text-center font-mono text-xs font-bold text-brand-cyan shadow-inner">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <span className="text-[8px] text-brand-muted uppercase text-center mt-0.5">Phút</span>
                  </div>
                  <span className="text-brand-cyan font-bold -mt-3.5 animate-pulse">:</span>
                  <div className="flex flex-col">
                    <div className="bg-white/10 border border-white/15 px-2 py-1 rounded-lg min-w-[34px] text-center font-mono text-xs font-bold text-brand-cyan shadow-inner">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <span className="text-[8px] text-brand-muted uppercase text-center mt-0.5">Giây</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Special Prize Finale Date */}
              <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-brand-cyan/40 transition-all duration-300 flex flex-col justify-between h-[150px]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/5 rounded-full blur-2xl group-hover:bg-brand-cyan/10 transition-colors"></div>
                <Clock className="w-4 h-4 text-brand-cyan absolute top-6 right-6 opacity-60 group-hover:opacity-100 transition-opacity" />
                
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-cyan font-extrabold block mb-1">
                    Hạn chót giải đặc biệt
                  </span>
                  <span className="text-2xl font-black text-white block select-text">
                    01/09/2026
                  </span>
                </div>
                
                <span className="text-[11px] text-brand-muted leading-relaxed">
                  Cơ hội sở hữu trọn bộ hồ sơ định cư Úc miễn phí hoàn toàn.
                </span>
              </div>

              {/* Box 3: Campaign Results Announcement */}
              <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-brand-cyan/40 transition-all duration-300 flex flex-col justify-between h-[150px]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
                <Sparkles className="w-4 h-4 text-brand-cyan absolute top-6 right-6 opacity-60 group-hover:opacity-100 transition-opacity" />
                
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-cyan font-extrabold block mb-1">
                    Ngày công bố kết quả
                  </span>
                  <span className="text-2xl font-black text-white block select-text">
                    08/09/2026
                  </span>
                </div>
                
                <span className="text-[11px] text-brand-muted leading-relaxed">
                  Vinh danh câu chuyện xuất sắc nhất của toàn chiến dịch.
                </span>
              </div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* Về Chúng Tôi & Core Info Section */}
      <section className="py-12 border-y border-white/5 bg-[#151922]/40 rounded-3xl p-6 sm:p-10 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <span className="text-brand-cyan font-sans text-xs tracking-widest uppercase font-semibold">
              VỀ CHÚNG TÔI
            </span>
            <h2 className="font-display text-4xl font-extrabold text-white leading-tight">
              LOTUS CONSULTING
            </h2>
            <p className="font-sans text-sm sm:text-base text-brand-muted leading-relaxed">
              Là đơn vị tư vấn di trú chuyên nghiệp, chúng tôi thấu hiểu những khó khăn của khoảng cách địa lý. &quot; HÀNH TRÌNH YÊU XA, CHẠM ĐẾN NƯỚC ÚC &quot; không chỉ là một cuộc thi viết, mà là không gian để những tâm hồn đồng điệu chia sẻ hành trình, và là nhịp cầu kết nối giấc mơ Úc của bạn.
            </p>
          </div>

          {/* Right Column Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-[#12161f] border border-white/5 rounded-2xl p-6 space-y-4 hover:border-white/10 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl text-white font-extrabold">Kể Câu Chuyện</h3>
              <p className="font-sans text-xs sm:text-sm text-brand-muted leading-relaxed">
                Chia sẻ hành trình chân thực của bạn bằng ngôn từ.
              </p>
            </div>

            {/* Card 2 with Gradient Ring Glow (representing "how it looks in the picture sent") */}
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-brand-cyan to-indigo-500 overflow-hidden shadow-[0_0_20px_rgba(0,251,251,0.15)] group">
              <div className="bg-[#12161f] rounded-[15px] p-6 space-y-4 h-full">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                  <Globe className="w-5 h-5 animate-pulse" />
                </div>
                <h3 className="font-display text-xl text-white font-extrabold">Kết Nối</h3>
                <p className="font-sans text-xs sm:text-sm text-brand-muted leading-relaxed">
                  Lan tỏa cảm hứng đến cộng đồng những người chung chí hướng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Story Detail Immersive Drawer / Modal */}
      <AnimatePresence>
        {viewingStory && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-brand-surface border border-white/10 rounded-2xl max-w-4xl w-full my-8 overflow-hidden glow-text-subtle relative"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setViewingStory(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/10 hover:bg-white hover:text-brand-bg duration-300"
              >
                ✕
              </button>

              {/* Header Cover Banner */}
              <div className="w-full h-64 sm:h-80 relative">
                <img 
                  src={viewingStory.image} 
                  alt={viewingStory.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan px-3 py-1 rounded-xl text-xs sm:text-sm font-semibold font-sans">
                    {viewingStory.category}
                  </span>
                  <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mt-3 leading-tight leading-tight">
                    {viewingStory.title}
                  </h2>
                </div>
              </div>

              {/* Subtitle Details */}
              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap gap-4 justify-between items-center pb-6 border-b border-white/5 mb-6 text-sm text-brand-muted">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-brand-cyan/15 flex items-center justify-center font-bold text-brand-cyan">
                      {viewingStory.fullName.charAt(0)}
                    </span>
                    <div>
                      <p className="font-sans font-bold text-white">{viewingStory.fullName}</p>
                      <p className="font-sans text-xs">Mã dự thi: #{viewingStory.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {new Date(viewingStory.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                    <button
                      onClick={() => onLike(viewingStory.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-semibold border transition-all cursor-pointer ${likedStories.includes(viewingStory.id) ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-white/5 text-brand-muted hover:text-white border-transparent"}`}
                    >
                      <Heart className={`w-4.5 h-4.5 ${likedStories.includes(viewingStory.id) ? "fill-red-400 text-red-400" : ""}`} />
                      <span>Thích ({viewingStory.likesCount})</span>
                    </button>
                  </div>
                </div>

                {/* Primary Narrative Text */}
                <div className="prose prose-invert max-w-none text-sm sm:text-base text-[#e1e2eb] font-sans leading-relaxed space-y-4 whitespace-pre-wrap">
                  {viewingStory.content}
                </div>

                {/* AI Editorial Desk Integration */}
                {viewingStory.aiReview && (
                  <motion.div 
                    className="mt-8 bg-brand-cyan/5 border border-brand-cyan/20 rounded-2xl p-5 sm:p-6"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex justify-between items-start sm:items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-brand-cyan fill-brand-cyan/10" />
                        <h4 className="font-display font-bold text-white text-base sm:text-lg">AI Editorial Assessment</h4>
                      </div>
                      <div className="px-3 py-1 rounded-xl bg-brand-cyan/15 border border-brand-cyan/25 text-brand-cyan text-xs font-bold font-sans">
                        Emotional Aura: {viewingStory.aiReview.emotionalScore}%
                      </div>
                    </div>
                    
                    <p className="font-sans text-sm text-brand-cyan/85 italic border-l-2 border-brand-cyan/35 pl-3 leading-relaxed mb-4 whitespace-pre-wrap">
                      &quot;{viewingStory.aiReview.summary}&quot;
                    </p>

                    <div className="space-y-2">
                      <h5 className="font-sans font-bold text-xs text-white uppercase tracking-wider">Đề xuất cải thiện từ Ban Biên Tập:</h5>
                      <ul className="space-y-1.5 font-sans text-xs sm:text-sm text-brand-muted">
                        {viewingStory.aiReview.suggestions.map((s, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="text-brand-cyan font-bold select-none">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Drawer footer close button */}
              <div className="p-6 border-t border-white/5 bg-brand-container-low flex justify-end gap-3">
                <button
                  onClick={() => setViewingStory(null)}
                  className="bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl font-semibold font-sans text-sm duration-300 transition-all cursor-pointer"
                >
                  Đóng nội dung
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
