import React, { useState, useRef } from "react";
import { Story, ActiveTab } from "../types";
import { Sparkles, Image as ImageIcon, Send, AlertCircle, FileText, Check, CheckCircle2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SubmitEntryProps {
  onSubmitSuccess: (newStory: Story) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export default function SubmitEntry({ onSubmitSuccess, onNavigate }: SubmitEntryProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState<"Đôi lứa" | "Gia đình" | "Bạn tri kỷ" | "Khác">("Đôi lứa");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFilePreview, setImageFilePreview] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);
  const [justSubmittedStory, setJustSubmittedStory] = useState<Story | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-counting words
  const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;
  const isWordCountValid = wordCount >= 500;

  // Custom suggestions for image insertion
  const sampleImages = [
    { name: "Melbourne Winter", url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800" },
    { name: "Sydney Harbour", url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800" },
    { name: "Brisbane Riverscape", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800" },
    { name: "Holding Hands", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800" }
  ];

  // Steps for the magical loading sequence
  const loadingSteps = [
    "Khởi tạo tiến trình nộp bài...",
    "Đang phân tích cấu trúc bài viết...",
    "Đang phân tích chỉ số cảm xúc...",
    "Đang đánh giá tác động văn học của câu chuyện...",
    "Hoàn thiện hồ sơ & Lưu trữ thành công!"
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelected(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelected(files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFilePreview(reader.result as string);
      // We also store it to imageUrl to send to backend
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const triggerUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic Validations
    if (!fullName || !email || !phone || !title || !content) {
      setFormError("Vui lòng điền đầy đủ tất cả các trường dữ liệu bắt buộc.");
      return;
    }

    if (wordCount < 100) {
      setFormError("Để câu chuyện đủ cảm xúc và chiều sâu, vui lòng viết tối thiểu 100 chữ.");
      return;
    }

    setIsSubmitting(true);
    setLoadingStep(0);

    // Fire incremental steps for immersive aesthetic loading
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    try {
      const finalImage = imageFilePreview || imageUrl || sampleImages[Math.floor(Math.random() * sampleImages.length)].url;
      
      const payload = {
        fullName,
        email,
        phone,
        category,
        title,
        content,
        image: finalImage
      };

      const response = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      clearInterval(stepInterval);

      if (data.success && data.story) {
        setJustSubmittedStory(data.story);
        onSubmitSuccess(data.story);
      } else {
        setFormError(data.error || "Gửi bài lùi bước. Vui lòng kiểm tra lại thông tin.");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      setFormError("Lỗi kết nối máy chủ. Vui lòng thử lại sau.");
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setTitle("");
    setContent("");
    setImageUrl("");
    setImageFilePreview(null);
    setJustSubmittedStory(null);
    setIsSubmitting(false);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <AnimatePresence mode="wait">
        {!isSubmitting && !justSubmittedStory && (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/5 shadow-2xl"
          >
            <div className="text-center mb-8">
              <span className="text-brand-cyan font-sans text-xs sm:text-sm tracking-widest uppercase mb-2 font-bold inline-block">NỘP TÁC PHẨM</span>
              <h2 className="font-display text-2xl sm:text-4xl text-white font-bold">Gửi câu chuyện yêu xa</h2>
              <p className="font-sans text-xs sm:text-sm text-brand-muted mt-2 max-w-md mx-auto leading-relaxed">
                Chúng tôi trân quý từng nét bút, từng mảng ký ức kiên cường vượt đại dương của bạn. Hãy gửi tác phẩm tối thiểu 100 chữ (khuyến khích 500 chữ).
              </p>
            </div>

            {formError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm mb-6 flex items-start gap-2 animate-pulse">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-sans text-xs font-bold text-white uppercase tracking-wider block">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-brand-bg/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-sans text-xs font-bold text-white uppercase tracking-wider block">Email cá nhân *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nguyenvana@gmail.com"
                    className="w-full bg-brand-bg/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-sans text-xs font-bold text-white uppercase tracking-wider block">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full bg-brand-bg/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-sans text-xs font-bold text-white uppercase tracking-wider block">Thể loại câu chuyện</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full bg-[#1c212a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan transition-all"
                  >
                    <option value="Đôi lứa">Tình yêu đôi lứa</option>
                    <option value="Gia đình">Tình cảm gia đình</option>
                    <option value="Bạn tri kỷ">Tình bạn tri kỷ</option>
                    <option value="Khác">Thể loại khác</option>
                  </select>
                </div>
              </div>

              {/* Title of the Story */}
              <div className="space-y-2">
                <label className="font-sans text-xs font-bold text-white uppercase tracking-wider block">Tiêu đề câu chuyện *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Giọt Mưa Sài Gòn Nối Liền Nắng Ấm Brisbane"
                  className="w-full bg-brand-bg/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan transition-all"
                />
              </div>

              {/* Primary content area */}
              <div className="space-y-2 relative">
                <div className="flex justify-between items-center mb-1">
                  <label className="font-sans text-xs font-bold text-white uppercase tracking-wider block">Nội dung bài viết *</label>
                  
                  {/* Word count progress visualizer */}
                  <div className="flex items-center gap-2">
                    <span className={`font-sans text-xs font-semibold ${isWordCountValid ? "text-green-400" : "text-brand-cyan"}`}>
                      {wordCount} / 500 từ {isWordCountValid ? "✓ Đủ thể lệ" : "(Yêu cầu ≥ 100 từ, khuyên khích 500+ từ)"}
                    </span>
                  </div>
                </div>

                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Hãy kể câu chuyện của bạn ở đây... Từ sự hân hoan ban đầu, khó khăn của chênh lệch múi giờ, sự cô đơn mỗi lúc đau ốm, hay cái ôm nồng ấm trên đất Úc..."
                  rows={8}
                  className="w-full bg-brand-bg/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan transition-all font-sans leading-relaxed resize-y"
                />

                {/* Progress bar visual aid */}
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full bg-brand-cyan transition-all duration-300" 
                    style={{ width: `${Math.min((wordCount / 500) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Advanced UI: Media upload / attachments */}
              <div className="space-y-3">
                <label className="font-sans text-xs font-bold text-white uppercase tracking-wider block">Ảnh minh họa bài viết</label>
                
                {/* Drag and drop panel */}
                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-white/10 hover:border-brand-cyan/40 bg-brand-bg/30 hover:bg-brand-cyan/5 rounded-2xl p-6 text-center transition-all cursor-pointer group"
                  onClick={triggerUploadClick}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden" 
                  />
                  
                  {imageFilePreview ? (
                    <div className="relative w-full max-h-48 rounded-xl overflow-hidden mb-2">
                      <img src={imageFilePreview} alt="Upload preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageFilePreview(null);
                        }}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-red-500 text-white rounded-lg px-2.5 py-1 text-xs font-bold duration-300"
                      >
                        Gỡ bỏ
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <ImageIcon className="w-8 h-8 text-brand-muted group-hover:text-brand-cyan duration-300 mx-auto" />
                      <p className="font-sans text-sm text-white font-medium">Kéo thả hình ảnh của bạn vào đây hoặc <span className="text-brand-cyan font-bold block sm:inline">Duyệt tập tin</span></p>
                      <p className="font-sans text-xs text-brand-muted">Hỗ trợ các định dạng JPG, PNG, WebP (Tối đa 5MB)</p>
                    </div>
                  )}
                </div>

                {/* Or Custom URL or Sample selections */}
                {!imageFilePreview && (
                  <div className="space-y-2">
                    <p className="font-sans text-xs font-bold text-brand-muted uppercase">Hoặc dán URL ảnh trực tiếp / Chọn ảnh mẫu có sẵn:</p>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Dán URL link ảnh từ Google Photos, Facebook hoặc Unsplash..."
                      className="w-full bg-brand-bg/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan transition-all"
                    />
                    <div className="flex flex-wrap gap-2 pt-1">
                      {sampleImages.map((img) => (
                        <button
                          key={img.name}
                          type="button"
                          onClick={() => {
                            setImageUrl(img.url);
                            setImageFilePreview(null);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-sans font-semibold transition-all border duration-300 ${imageUrl === img.url ? "bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30" : "bg-white/5 text-brand-muted border-transparent hover:border-white/10"}`}
                        >
                          {img.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-3 justify-end items-center">
                <button
                  type="button"
                  onClick={() => onNavigate("home")}
                  className="w-full sm:w-auto text-brand-muted hover:text-white px-6 py-3 rounded-full font-sans text-sm font-semibold transition-all cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  id="btn-main-submit"
                  className="w-full sm:w-auto bg-brand-cyan text-brand-bg px-8 py-3.5 rounded-full font-sans text-sm font-bold shadow-[0_0_20px_rgba(0,251,251,0.25)] hover:bg-white active:scale-95 duration-300 cursor-pointer flex items-center justify-center gap-2 group relative overflow-hidden text-center"
                >
                  <Send className="w-4 h-4" />
                  Gửi bài thi
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Loading / Writing verification state */}
        {isSubmitting && !justSubmittedStory && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel rounded-3xl p-8 sm:p-16 text-center border border-white/5 shadow-2xl relative overflow-hidden"
          >
            {/* Spinning visual asset */}
            <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-brand-cyan/10 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-brand-cyan rounded-full animate-spin"></div>
              <Sparkles className="w-8 h-8 text-brand-cyan animate-pulse" />
            </div>

            <h3 className="font-display text-xl sm:text-2xl text-white font-bold mb-3">
              Hệ thống đang tiếp nhận tác phẩm của bạn...
            </h3>
            
            <p className="font-sans text-sm text-brand-cyan font-bold transition-all duration-500 max-w-sm mx-auto">
              {loadingSteps[loadingStep]}
            </p>

            <p className="font-sans text-xs text-brand-muted mt-4 max-w-sm mx-auto leading-relaxed">
              Việc ghi nhận tác phẩm và tính toán chỉ số cảm xúc thường mất vài giây. Vui lòng không đóng trình duyệt lúc này.
            </p>

            {/* Simulated terminal lines for immersive luxury */}
            <div className="mt-8 bg-black/40 border border-white/5 rounded-xl p-4 text-left font-mono text-[10px] sm:text-xs text-brand-muted space-y-1">
              <p className="text-green-400">&gt; CONNECTING to the Lotus Consulting Literary Submission desk...</p>
              <p>&gt; SUBMISSION DRAFT WORD COUNT: {wordCount} words (Status: validated)</p>
              <p className="animate-pulse text-brand-cyan">&gt; SECURING submission draft and generating feedback index...</p>
            </div>
          </motion.div>
        )}

        {/* Success screen highlighting AI outputs */}
        {justSubmittedStory && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel rounded-3xl p-6 sm:p-10 border border-brand-cyan/30 shadow-2xl space-y-6 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(34,197,94,0.1)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-white font-bold">Nộp bài dự thi thành công!</h3>
              <p className="font-sans text-xs sm:text-sm text-brand-muted mt-2 max-w-md mx-auto">
                Chúc mừng bạn đã hoàn tất đệ trình câu chuyện của mình lên Lotus Consulting. Bài viết của bạn đã được phê duyệt và hiển thị trong Thư viện chung!
              </p>
            </div>

            {/* AI Review Results Visualizer Card */}
            {justSubmittedStory.aiReview && (
              <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-2xl p-6 text-left glow-text-subtle">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-cyan fill-brand-cyan/10" />
                    <h4 className="font-display font-bold text-white text-base">Xem Đánh giá Câu chuyện &amp; Nhận xét Văn học</h4>
                  </div>
                  <div className="bg-brand-cyan/15 text-brand-cyan px-3.5 py-1.5 rounded-xl border border-brand-cyan/25 text-xs font-bold font-sans flex items-center gap-1">
                    Độ chạm cảm xúc:
                    <span className="text-sm font-black">{justSubmittedStory.aiReview.emotionalScore} / 100</span>
                  </div>
                </div>

                <p className="font-sans text-sm text-brand-cyan/85 italic border-l-2 border-brand-cyan/35 pl-3 leading-relaxed mb-4">
                  &quot;{justSubmittedStory.aiReview.summary}&quot;
                </p>

                <div className="space-y-2">
                  <h5 className="font-sans font-bold text-xs text-white uppercase tracking-wider">Đề xuất hoàn thiện văn học:</h5>
                  <ul className="space-y-1.5 font-sans text-xs sm:text-sm text-brand-muted">
                    {justSubmittedStory.aiReview.suggestions.map((s, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-brand-cyan font-bold select-none">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto border border-white/10 hover:border-brand-cyan/20 bg-white/5 text-white px-6 py-3 rounded-full font-sans text-sm font-semibold duration-300 transition-all cursor-pointer"
              >
                Nộp thêm bài viết khác
              </button>
              <button
                type="button"
                onClick={() => onNavigate("home")}
                className="w-full sm:w-auto bg-brand-cyan text-brand-bg px-8 py-3.5 rounded-full font-sans text-sm font-bold shadow-[0_0_20px_rgba(0,251,251,0.25)] hover:bg-white duration-300 transition-all cursor-pointer"
              >
                Quay lại Thư viện câu chuyện
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
