import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ---- Deterministic Risk Engine (v5) ----
function processEmailAnalysis(email) {
    let public_presence = 0;      // 0–30
    let platform_reuse = 0;       // 0–30
    let developer_exposure = 0;   // 0–20
    let metadata_visibility = 0;  // 0–20

    const lowerEmail = email.toLowerCase();
    const [localPart] = lowerEmail.split('@');
    const seed = localPart.length;

    // LOGIC: Short usernames (<10 chars) → increase public_presence
    if (localPart.length < 10) {
        public_presence += 20;
    }
    public_presence += (seed * 3) % 10;

    // LOGIC: Words like dev, admin, test, support → increase platform_reuse
    if (["dev", "admin", "test", "support", "root"].some(word => lowerEmail.includes(word))) {
        platform_reuse += 20;
    }
    platform_reuse += (seed % 10);

    // LOGIC: Developer-style names → increase developer_exposure
    if (["git", "code", "dev", "api", "stack", "repo", "engineer"].some(word => lowerEmail.includes(word))) {
        developer_exposure += 15;
    }
    developer_exposure += (seed % 5);

    // LOGIC: Older / generic formats → increase metadata_visibility
    metadata_visibility += (seed % 15) + 5;
    if (!lowerEmail.includes(".")) metadata_visibility += 5; // Simpler formats often older

    const internal_score = public_presence + platform_reuse + developer_exposure + metadata_visibility;
    const final_score = Math.min(10.0, Math.round((internal_score / 100) * 10 * 10) / 10);

    let risk_level = "LOW";
    if (final_score >= 2.5) risk_level = "MEDIUM";
    if (final_score >= 5.0) risk_level = "HIGH";
    if (final_score >= 7.5) risk_level = "CRITICAL";

    return {
        signals: {
            public_presence,
            platform_reuse,
            developer_exposure,
            metadata_visibility
        },
        final_score,
        risk_level
    };
}

// Internal legacy risk engine for specialized modules
function calculateRisk(input, moduleType) {
    let score = 0;
    const seed = (input || "default").length;
    switch (moduleType) {
        case 'Text':
            score += (seed % 40) + 20;
            if (input.includes("admin") || input.includes("root")) score += 25;
            break;
        case 'Image':
            score += (seed % 30) + 30;
            break;
        case 'Location':
            score += (seed % 50) + 10;
            break;
        case 'Code':
            score += (seed % 35) + 15;
            if (input.includes("api") || input.includes("key")) score += 40;
            break;
        default:
            score = 50;
    }
    const finalScore = Math.min(10.0, score / 10).toFixed(1);
    let level = "LOW";
    if (finalScore >= 2.5) level = "MEDIUM";
    if (finalScore >= 5.0) level = "HIGH";
    if (finalScore >= 7.5) level = "CRITICAL";
    return { finalScore, level };
}

// Helper for specialized modules
async function runModuleAnalysis(req, res, moduleType, factors, mockSummary) {
    const { input_value, authorized } = req.body;
    if (!authorized) return res.status(403).json({ error: "Authorization required" });
    const { finalScore, level } = calculateRisk(input_value || "forensic_stream", moduleType);

    let explanation = [
        `The ${moduleType} analysis has identified deterministic patterns in public footprints.`,
        "Educational awareness of these vectors is recommended for privacy."
    ];

    try {
        const prompt = `Explain why a ${moduleType} OSINT risk score of ${finalScore} (${level}) was assigned to ${input_value}. 4 bullet points, calm academic language. No hacking.`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        explanation = text.split('\n').filter(l => l.length > 20).slice(0, 4);
    } catch (e) { }

    res.json({
        input: input_value,
        risk_score: parseFloat(finalScore),
        risk_level: level,
        exposure_summary: mockSummary,
        ai_explanation: explanation,
        recommendations: [`Minimize ${moduleType} signals`],
        disclaimer: "Simulated data for education."
    });
}

// Specialized Module Endpoints
app.post("/analyze/text-osint", (req, res) => runModuleAnalysis(req, res, 'Text', ['ID Correlation'], { public_mentions: "Simulated", platform_reuse: "Detected" }));
app.post("/analyze/image-osint", (req, res) => runModuleAnalysis(req, res, 'Image', ['EXIF'], { metadata: "Substantial" }));
app.post("/analyze/location-osint", (req, res) => runModuleAnalysis(req, res, 'Location', ['Timezone'], { timezone: "Simulated" }));
app.post("/analyze/code-osint", (req, res) => runModuleAnalysis(req, res, 'Code', ['Commits'], { email_exposure: "Detected" }));

// FLAGSHIP ANALYZE (v5 Specification)
app.post("/analyze-email", async (req, res) => {
    try {
        const { email, authorized } = req.body;
        if (!authorized) return res.json({ error: "Authorization required" });
        if (!email || !email.includes("@")) return res.json({ error: "Valid Gmail ID required" });

        const analysis = processEmailAnalysis(email);
        const exposure_summary = {
            public_presence: analysis.signals.public_presence > 20 ? "Significant Public Footprint" : "Moderate Public Footprint",
            platform_reuse: analysis.signals.platform_reuse > 20 ? "Extensive Cross-Platform Reuse" : "Limited Correlation Signals",
            developer_exposure: analysis.signals.developer_exposure > 12 ? "Advanced Technical Trail" : "Minimal Technical Footprint",
            metadata_visibility: analysis.signals.metadata_visibility > 12 ? "High Metadata Exposure" : "Restricted Metadata Clues"
        };

        const maskedEmail = email.replace(/(.{1})(.*)(?=@)/, (gp1, gp2, gp3) => gp2 + "*".repeat(gp3.length));
        let aiExplanation = ["Analyzing digital footprints...", "Mapping platform reuse signals...", "Calculating metadata visibility..."];

        try {
            const prompt = `Explain WHY the risk level "${analysis.risk_level}" was assigned to ${maskedEmail} (Score: ${analysis.final_score}/10.0). Bullet points, professional academic tone.`;
            const result = await model.generateContent(prompt);
            aiExplanation = result.response.text().split('\n').filter(l => l.length > 20).slice(0, 6);
        } catch (e) { }

        res.json({
            email,
            risk_score: analysis.final_score,
            risk_level: analysis.risk_level,
            exposure_summary,
            ai_explanation: aiExplanation,
            recommendations: ["Review privacy settings", "Avoid email reuse", "Monitor exposure"],
            disclaimer: "Simulated public data for educational purposes only."
        });
    } catch (err) {
        res.json({ risk_score: 1.0, risk_level: "LOW" });
    }
});

// Alias
app.post("/analyze", (req, res) => res.redirect(307, "/analyze-email"));

const PORT = 5000;
app.listen(PORT, () => console.log("✅ TraceMap Engine Live on " + PORT));
