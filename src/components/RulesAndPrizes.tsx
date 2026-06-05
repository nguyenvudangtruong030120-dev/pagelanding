import { ActiveTab } from "../types";
import { Star, Trophy, Award, CheckCircle, Group, Gavel, Lock, ShieldAlert, ArrowRight, Heart, Sparkles, Image, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

// @ts-ignore
import sydneyImage from "../assets/images/sydney_opera_house_dawn_1780643815946.png";

interface RulesAndPrizesProps {
  onNavigate: (tab: ActiveTab) => void;
}

export default function RulesAndPrizes({ onNavigate }: RulesAndPrizesProps) {
  return (
    <div className="relative w-full">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-brand-cyan/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-brand-teal/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* Page Header */}
      <header className="text-center mb-12 sm:mb-16 mt-0 -mt-4 sm:-mt-6">
        <motion.p 
          className="font-sans text-[10px] sm:text-xs text-brand-cyan tracking-[0.25em] uppercase mb-2 font-semibold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          HÀNH TRÌNH YÊU XA, CHẠM ĐẾN NƯỚC ÚC
        </motion.p>
        <motion.h1 
          className="font-sans text-3xl sm:text-4xl md:text-5xl text-white glow-text mb-0 font-bold tracking-tight uppercase"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Thể lệ &amp; Giải thưởng
        </motion.h1>
      </header>

      {/* Section 1: Prizes (Moved above Eligibility per User Intent) */}
      <section className="mb-20 sm:mb-32">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex w-12 h-12 rounded-full bg-brand-cyan/10 items-center justify-center border border-brand-cyan/20 mb-4 animate-pulse">
            <Award className="text-brand-cyan w-6 h-6 animate-pulse" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-white font-bold">Cơ cấu giải thưởng</h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-brand-cyan to-transparent mx-auto mt-6"></div>
        </motion.div>

        {/* 5-Column Premium Pricing-Style Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
          
          {/* Card 1: Giải Đặc Biệt */}
          <motion.div 
            className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group border border-white/10 bg-gradient-to-b from-[#0a0f10] to-[#040809] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] cursor-default transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.93, y: 45 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ 
              y: -12, 
              scale: 1.035, 
              borderColor: "rgba(255, 255, 255, 0.65)", 
              boxShadow: "0 35px 70px -10px rgba(0, 251, 251, 0.35)" 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              delay: 0.05
            }}
          >
            {/* Soft Sydney Opera House Image blended in watermarked beauty */}
            <div className="absolute inset-0 w-full h-full opacity-[0.12] group-hover:opacity-[0.18] transition-opacity duration-500 pointer-events-none -z-10 mix-blend-screen">
              <img 
                src={sydneyImage} 
                className="w-full h-full object-cover scale-110 object-bottom"
                alt="Watermark"
              />
            </div>
            
            <div className="flex flex-col h-full justify-start space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-display font-black text-lg text-white tracking-wide uppercase">GIẢI ĐẶC BIỆT</h3>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#030607] uppercase bg-brand-cyan px-2.5 py-1 rounded shadow-[0_0_15px_rgba(0,251,251,0.5)]">Siêu Độc Quyền</span>
                </div>
                
                <div className="text-left my-4">
                  <div className="text-xs text-white/50 line-through tracking-wider block -mb-1">Giá trị ~350.000.000 VNĐ</div>
                  <div className="flex items-baseline text-white">
                    <span className="font-sans text-4xl sm:text-5xl font-black text-brand-cyan">TRỌN GÓI</span>
                  </div>
                  <p className="text-[10px] text-brand-cyan uppercase tracking-widest font-sans font-black mt-1">MIỄN PHÍ HỒ SƠ ĐỊNH CƯ ÚC</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Hạng Nhất */}
          <motion.div 
            className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group border border-brand-cyan bg-[#0a1818]/60 backdrop-blur-3xl shadow-[0_0_30px_rgba(0,251,251,0.15)] cursor-default transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.93, y: 45 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ 
              y: -12, 
              scale: 1.035, 
              borderColor: "rgba(0, 251, 251, 0.85)", 
              boxShadow: "0 35px 70px -10px rgba(0, 251, 251, 0.4)" 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              delay: 0.1
            }}
          >
            <div className="flex flex-col h-full justify-start space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-sans font-black text-lg text-white uppercase tracking-wider">HẠNG NHẤT</h3>
                </div>
                
                <div className="text-left my-4">
                  <div className="flex items-baseline text-white">
                    <span className="font-sans text-4xl font-black text-brand-cyan">20</span>
                    <span className="font-sans text-base font-bold ml-0.5 text-brand-cyan">.000.000</span>
                    <span className="font-sans text-xs font-semibold ml-1.5 text-brand-cyan">VNĐ</span>
                  </div>
                  <p className="text-[10px] text-brand-cyan uppercase tracking-widest font-sans font-black mt-1">Tiền mặt</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Hạng Nhì */}
          <motion.div 
            className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group border border-white/5 bg-[#0a0f10]/80 backdrop-blur-2xl cursor-default transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.93, y: 45 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ 
              y: -8, 
              scale: 1.025, 
              borderColor: "rgba(0, 251, 251, 0.55)", 
              boxShadow: "0 30px 60px -15px rgba(0, 251, 251, 0.25)" 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              delay: 0.15
            }}
          >
            <div className="flex flex-col h-full justify-start space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-sans font-black text-lg text-white uppercase tracking-wider">HẠNG NHÌ</h3>
                </div>
                
                <div className="text-left my-4">
                  <div className="flex items-baseline text-white">
                    <span className="font-sans text-4xl font-black">10</span>
                    <span className="font-sans text-base font-bold ml-0.5 text-brand-cyan">.000.000</span>
                    <span className="font-sans text-xs font-semibold ml-1.5 text-brand-muted">VNĐ</span>
                  </div>
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest font-sans font-semibold mt-1">Mỗi hạng mục đạt giải</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Hạng Ba */}
          <motion.div 
            className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group border border-white/5 bg-[#0a0f10]/80 backdrop-blur-2xl cursor-default transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.93, y: 45 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ 
              y: -8, 
              scale: 1.025, 
              borderColor: "rgba(0, 251, 251, 0.55)", 
              boxShadow: "0 30px 60px -15px rgba(0, 251, 251, 0.25)" 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              delay: 0.2
            }}
          >
            <div className="flex flex-col h-full justify-start space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-sans font-black text-lg text-white uppercase tracking-wider">HẠNG BA</h3>
                </div>
                
                <div className="text-left my-4">
                  <div className="flex items-baseline text-white">
                    <span className="font-sans text-4xl font-black">5</span>
                    <span className="font-sans text-base font-bold ml-0.5 text-brand-cyan">.000.000</span>
                    <span className="font-sans text-xs font-semibold ml-1.5 text-brand-muted">VNĐ</span>
                  </div>
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest font-sans font-semibold mt-1">Tiền mặt</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Đặc Biệt Tháng */}
          <motion.div 
            className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group border border-white/5 bg-[#0a0f10]/80 backdrop-blur-2xl cursor-default transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ 
              y: -8, 
              scale: 1.025, 
              borderColor: "rgba(0, 251, 251, 0.55)", 
              boxShadow: "0 25px 50px -15px rgba(0, 251, 251, 0.25)" 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              delay: 0.25
            }}
          >
            <div className="flex flex-col h-full justify-start space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-sans font-black text-lg text-white uppercase tracking-wider">ĐẶC BIỆT THÁNG</h3>
                  <span className="text-[9px] font-mono tracking-widest text-[#00fbfb] font-black uppercase bg-brand-cyan/10 px-2.5 py-1 rounded border border-brand-cyan/30 animate-pulse">Hàng tháng</span>
                </div>
                
                <div className="text-left my-4">
                  <div className="flex items-baseline text-white">
                    <span className="font-sans text-4xl font-black">10</span>
                    <span className="font-sans text-base font-bold ml-0.5 text-brand-cyan">.000.000</span>
                    <span className="font-sans text-xs font-semibold ml-1.5 text-brand-muted">VNĐ</span>
                  </div>
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest font-sans font-semibold mt-1">Tiền mặt</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Section 2: Eligibility (Moved below Prizes per User Intent) */}
      <section className="mb-20 sm:mb-32 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center lg:gap-12">
          {/* Glass Lotus Image */}
          <motion.div 
            className="col-span-1 md:col-span-5 order-2 md:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden relative glass-panel group p-1">
              <img 
                alt="A professional, minimalist 3D render of a transparent crystal lotus flower with glowing cyan neon edges." 
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtIoa2njAGdWTlzNJPJaWBrRZjsFSUvOKlBxU-96eSiaq4rYU19zExAVtdmiTFN-ojM_ddhltn08OsijQjpj9aufchimurR2YCk76IIw-TCswzcYFy2MX48dXFB3K9FieCJUJm4hVrLMcvQQvcPb9pCPn9ZWFKLzJCtHKy-paFjmI4Po5lBa98gz5zMgw0XaEJu2_HoMHWMtS7FhCVetQ4PRFvHgeLaIY0VBPXb6HaUv3vKWMl8o2xBfirlbldnOxd9HcJByInsgM"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent"></div>
            </div>
          </motion.div>

          <motion.div 
            className="col-span-1 md:col-span-7 md:col-start-6 order-1 md:order-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20">
                <Group className="text-brand-cyan w-6 h-6" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-white font-bold">Đối tượng tham gia</h2>
            </div>
            <div className="h-[2px] w-24 bg-gradient-to-r from-brand-cyan to-transparent"></div>
            
            <p className="font-sans text-sm sm:text-lg text-[#e1e2eb] leading-relaxed">
              Cuộc thi mở ra cho tất cả những ai đã, đang hoặc sẽ trải qua một hành trình yêu xa đầy cảm xúc, với một sợi dây liên kết đặc biệt hướng về <strong className="text-brand-cyan font-semibold">Nước Úc</strong>.
            </p>
            
            <ul className="space-y-4 font-sans text-sm sm:text-base text-brand-muted mt-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-brand-cyan w-5 h-5 mt-1 shrink-0" />
                <span>Công dân Việt Nam hoặc người gốc Việt đang sinh sống tại bất kỳ đâu trên thế giới.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="text-brand-cyan w-5 h-5 mt-1 shrink-0" />
                <span>Có câu chuyện tình cảm (tình yêu đôi lứa, tình thân gia đình, tình bạn tri kỷ) vượt qua khoảng cách địa lý.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="text-brand-cyan w-5 h-5 mt-1 shrink-0" />
                <span>Câu chuyện có yếu tố liên quan đến nước Úc, mong muốn định cư Úc dựa trên mối quan hệ hôn nhân, sống chung, đính hôn và LGBT EQ+.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Rules & Steps */}
      <section className="mb-20 sm:mb-32">
        <motion.div 
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 rounded-full bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20">
            <CheckCircle className="text-brand-cyan w-6 h-6" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-white font-bold">Thể lệ cuộc thi</h2>
        </motion.div>

        <div className="relative pl-6 sm:pl-0">
          {/* Vertical timeline line for desktop */}
          <div className="absolute left-[15px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-cyan/30 via-brand-cyan/10 to-transparent hidden sm:block -translate-x-1/2"></div>
          
          <div className="space-y-12 sm:space-y-16 relative">
            {/* Step 1 */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:justify-between w-full relative"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="sm:w-[45%] text-left sm:text-right pt-0 sm:pt-2">
                <h3 className="font-display text-xl sm:text-2xl text-white font-bold mb-2">Bước 1: Chuẩn bị nội dung</h3>
                <p className="font-sans text-sm sm:text-base text-brand-muted">
                  Viết bài chia sẻ về câu chuyện yêu xa của bạn (tối thiểu 500 chữ). Kèm theo ít nhất 01 hình ảnh chân thực minh họa.
                </p>
              </div>
              <div className="absolute left-[-15px] sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-bg border-2 border-brand-cyan z-10 flex items-center justify-center shadow-[0_0_15px_rgba(0,251,251,0.5)] my-1 sm:my-0">
                <span className="font-sans text-xs font-bold text-brand-cyan">1</span>
              </div>
              <div className="sm:w-[45%] hidden sm:block"></div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:justify-between w-full relative"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="sm:w-[45%] hidden sm:block"></div>
              <div className="absolute left-[-15px] sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-bg border-2 border-brand-cyan z-10 flex items-center justify-center shadow-[0_0_15px_rgba(0,251,251,0.5)] my-1 sm:my-0">
                <span className="font-sans text-xs font-bold text-brand-cyan">2</span>
              </div>
              <div className="sm:w-[45%] text-left pt-0 sm:pt-2">
                <h3 className="font-display text-xl sm:text-2xl text-white font-bold mb-2">Bước 2: Gửi bài dự thi</h3>
                <p className="font-sans text-sm sm:text-base text-brand-muted">
                  Truy cập vào mục &ldquo;Nộp bài&rdquo; trên website hoặc nút phía dưới, điền đầy đủ thông tin cá nhân và tải lên bài viết cùng hình ảnh đính kèm.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <button 
            id="btn-rules-submit"
            onClick={() => onNavigate("submit")}
            className="bg-brand-cyan text-brand-bg px-8 py-3.5 rounded-full font-sans text-sm font-bold hover:bg-white hover:neon-strong duration-300 transform active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2 relative group overflow-hidden neon-aura"
          >
            Nộp bài ngay
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* Section 3.5: Scoring Criteria */}
      <section className="mb-20 sm:mb-32">
        <motion.div 
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 rounded-full bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20">
            <Star className="text-brand-cyan w-6 h-6" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-white font-bold">Tiêu chí chấm điểm</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <motion.div 
            className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4 hover:border-brand-cyan/25 transition-all duration-300 group"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-brand-bg transition-colors duration-300">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg text-white font-extrabold">Tính chân thực</h3>
            <p className="font-sans text-xs sm:text-sm text-brand-muted leading-relaxed">
              Câu chuyện chân thực, có thật từ trải nghiệm thực tế của chính tác giả.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4 hover:border-brand-cyan/25 transition-all duration-300 group"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-brand-bg transition-colors duration-300">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg text-white font-extrabold">Cảm xúc truyền tải</h3>
            <p className="font-sans text-xs sm:text-sm text-brand-muted leading-relaxed">
              Văn phong giàu cảm xúc, chạm đến trái tim người đọc và ban giám khảo.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4 hover:border-brand-cyan/25 transition-all duration-300 group"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-brand-bg transition-colors duration-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg text-white font-extrabold">Câu chuyện truyền cảm hứng</h3>
            <p className="font-sans text-xs sm:text-sm text-brand-muted leading-relaxed">
              Thông điệp tích cực, tiếp thêm niềm tin và động lực cho các cặp đôi yêu xa.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4 hover:border-brand-cyan/25 transition-all duration-300 group"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-brand-bg transition-colors duration-300">
              <Image className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg text-white font-extrabold">Hình ảnh minh chứng</h3>
            <p className="font-sans text-xs sm:text-sm text-brand-muted leading-relaxed">
              Hình ảnh minh họa chân thực, đầy ắp kỷ niệm sống động của cả hai.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Terms & Privacy */}
      <section className="mt-20 sm:mt-32">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex w-12 h-12 rounded-full bg-brand-cyan/10 items-center justify-center border border-brand-cyan/20 mb-4">
            <Lock className="text-brand-cyan w-6 h-6" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-white font-bold">Điều khoản &amp; Chính sách</h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-brand-cyan to-transparent mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Rules & Terms */}
          <motion.div 
            className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/5 flex flex-col justify-between"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Gavel className="text-brand-cyan w-5 h-5" />
                <h3 className="font-display text-xl text-white font-bold">Điều khoản &amp; Quy tắc</h3>
              </div>
              <ul className="space-y-4 font-sans text-sm text-brand-muted">
                <li className="flex items-start gap-2">
                  <span className="text-brand-cyan font-bold select-none">•</span>
                  <span>Ban tổ chức có quyền quyết định cuối cùng trong mọi trường hợp khiếu nại.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-cyan font-bold select-none">•</span>
                  <span>Bài dự thi phải thuộc quyền sở hữu của người tham gia, không vi phạm bản quyền.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-cyan font-bold select-none">•</span>
                  <span>Nội dung không vi phạm thuần phong mỹ tục hoặc pháp luật Việt Nam và Úc.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Privacy Security */}
          <motion.div 
            className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/5 flex flex-col justify-between animate-glow"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Lock className="text-brand-cyan w-5 h-5" />
                <h3 className="font-display text-xl text-white font-bold">Bảo mật thông tin</h3>
              </div>
              <p className="font-sans text-sm text-brand-muted leading-relaxed">
                Thông tin cá nhân của bạn sẽ được LOTUS CONSULTING cam kết bảo mật tuyệt đối và chỉ sử dụng cho mục đích liên hệ, xác thực giải thưởng cũng như xử lý thủ tục trong khuôn khổ cuộc thi.
              </p>
            </div>
          </motion.div>

          {/* General Policies */}
          <motion.div 
            className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/5 flex flex-col justify-between"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="text-brand-cyan w-5 h-5" />
                <h3 className="font-display text-xl text-white font-bold">Chính sách chung</h3>
              </div>
              <p className="font-sans text-sm text-brand-muted leading-relaxed">
                Giải thưởng không có giá trị quy đổi thành tiền mặt đối với voucher dịch vụ. Người thắng cuộc chịu trách nhiệm về các khoản thuế thu nhập cá nhân theo quy định của pháp luật.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
