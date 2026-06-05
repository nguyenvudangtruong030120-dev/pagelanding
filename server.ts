import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Standard top-level storage for temporary submissions in-memory.
// We also let client-side maintain state in localStorage to survive server restarts.
let storiesDB: any[] = [];

// Lazy initialization helper for Gemini
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "") {
    console.warn("GEMINI_API_KEY is not configured or uses default template. Running in fallback mode.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json({ limit: '10mb' }));

  // API Route: Get all custom submissions
  app.get("/api/stories", (req, res) => {
    res.json({ success: true, stories: storiesDB });
  });

  // API Route: Submit story with AI Review
  app.post("/api/stories", async (req, res) => {
    try {
      const { fullName, email, phone, category, title, content, image } = req.body;

      if (!fullName || !email || !title || !content) {
        res.status(400).json({ success: false, error: "Thiếu thông tin bắt buộc" });
        return;
      }

      const ai = getGeminiClient();
      let aiReview = {
        summary: "Câu chuyện chân thành về hành trình yêu xa đầy cảm xúc hướng về nước Úc.",
        suggestions: [
          "Bổ sung thêm một số kỷ niệm cụ thể hoặc đồ vật gắn liền với tình yêu của hai bạn để tăng tính chân thực.",
          "Nêu rõ hơn tác động của khoảng cách địa lý đến lối sống hằng ngày của bạn."
        ],
        emotionalScore: 85
      };

      if (ai) {
        try {
          console.log("Analyzing story via Gemini AI for:", fullName);
          const prompt = `Bạn là một biên tập viên văn học tinh tế của Lotus Consulting. Hãy đọc câu chuyện yêu xa đầy cảm xúc có thông tin như sau:
Tiêu đề: "${title}"
Thể loại: "${category}"
Người viết: "${fullName}"
Nội dung câu chuyện:
"${content}"

Nhiệm vụ của bạn là:
1. Viết một lời tóm tắt cảm xúc ngắn gọn (khoảng 1-2 câu tiếng Việt) tôn vinh tình yêu/tình cảm này.
2. Đưa ra 2 gợi ý tinh tế giúp người viết cấu trúc lại hoặc bổ sung thêm vài chi tiết đắt giá hòng lay động ban giám khảo cuộc thi "Hành Trình Yêu Xa" (ví dụ: kỷ vật, cuộc gọi nhịp múi giờ, rào cản thời tiết, khát vọng nước Úc...).
3. Chấm một điểm số cảm xúc (emotional score) từ 60 đến 100 dựa trên độ sâu sắc và truyền cảm hứng.

HÃY TRẢ VỀ DƯỚI DẠNG JSON duy nhất tuân thủ đúng cấu trúc sau:
{
  "summary": "chuỗi tóm tắt văn học truyền cảm hứng",
  "suggestions": ["gợi ý 1", "gợi ý 2"],
  "emotionalScore": số nguyên từ 60 đến 100
}`;

          const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  summary: { type: Type.STRING },
                  suggestions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  emotionalScore: { type: Type.INTEGER }
                },
                required: ["summary", "suggestions", "emotionalScore"]
              }
            }
          });

          const rawText = response.text ? response.text.trim() : "";
          if (rawText) {
            aiReview = JSON.parse(rawText);
          }
        } catch (aiErr) {
          console.error("AI Analysis failed, falling back to default review:", aiErr);
        }
      }

      const newStory = {
        id: "submission-" + Date.now(),
        fullName,
        email,
        phone,
        category,
        title,
        content,
        likesCount: 0,
        createdAt: new Date().toISOString(),
        image: image || "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
        isCustomImage: !!image,
        status: "approved",
        aiReview
      };

      storiesDB.unshift(newStory);
      res.json({ success: true, story: newStory });
    } catch (error: any) {
      console.error("Submission insertion error:", error);
      res.status(500).json({ success: false, error: error.message || "An error occurred" });
    }
  });

  // Vite middleware setup for Development/Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express Server connected on http://0.0.0.0:${PORT}`);
  });
}

startServer();
