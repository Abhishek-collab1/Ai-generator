
// This is a mock implementation of AI detection
// In a real application, you would use actual AI models or APIs

// Simulates image analysis with a delay
export const detectAIImage = async (imageFile) => {
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  const isAI = Math.random() > 0.4; // Slightly higher chance of being AI for variety
  const confidence = isAI ? 
    Math.floor(65 + Math.random() * 30) : 
    Math.floor(55 + Math.random() * 40);
  
  let description = "";
  let patterns = [];

  if (isAI) {
    description = "Our analysis suggests this image exhibits characteristics commonly found in AI-generated visuals. ";
    const aiIndicators = [
      "Unusual smoothness in certain textures.",
      "Non-standard lighting or shadow inconsistencies.",
      "Repetitive micro-patterns or artifacts.",
      "Geometric anomalies or overly perfect shapes.",
      "Subtle distortions in complex areas like hands or faces."
    ];
    patterns = aiIndicators.sort(() => 0.5 - Math.random()).slice(0, Math.floor(2 + Math.random() * 2));
    description += `Key indicators include: ${patterns.join(' ')}`;
  } else {
    description = "This image appears to align with characteristics of human-created photography or digital art. ";
    const humanIndicators = [
      "Natural variations in texture and detail.",
      "Consistent and plausible lighting conditions.",
      "Organic imperfections and asymmetries.",
      "Complex details rendered realistically.",
      "Typical photographic noise or artistic style."
    ];
    patterns = humanIndicators.sort(() => 0.5 - Math.random()).slice(0, Math.floor(2 + Math.random() * 2));
    description += `Observed characteristics: ${patterns.join(' ')}`;
  }
  
  return {
    isAI,
    confidence,
    analysisTime: (1.5 + Math.random() * 1).toFixed(1),
    description,
    patterns
  };
};

// Simulates text analysis with a delay
export const detectAIText = async (text) => {
  await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
  
  const isAI = Math.random() > 0.45;
  const confidence = isAI ? 
    Math.floor(70 + Math.random() * 25) : 
    Math.floor(60 + Math.random() * 35);
  
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
  const avgSentenceLength = Math.round(wordCount / Math.max(1, sentenceCount)) || 0;

  let description = "";
  let details = [];

  if (isAI) {
    description = "The linguistic patterns in this text suggest a significant likelihood of AI generation. ";
    const aiTextIndicators = [
      `Fluctuating coherence or occasional logical gaps.`,
      `Overuse of certain phrases or generic statements.`,
      `Unusual or overly formal vocabulary choices for the context.`,
      `Sentence structures sometimes lack natural human cadence.`,
      `The text is ${wordCount} words long with an average sentence length of ${avgSentenceLength} words.`
    ];
    details = aiTextIndicators.sort(() => 0.5 - Math.random()).slice(0, Math.floor(2 + Math.random() * 2));
    description += `Notable observations: ${details.join(' ')}`;
  } else {
    description = "This text exhibits linguistic characteristics consistent with human authorship. ";
    const humanTextIndicators = [
      `Natural flow and varied sentence construction.`,
      `Consistent tone and style throughout the piece.`,
      `Appropriate vocabulary and idiomatic expressions for the context.`,
      `Human-like nuances and subtle expressions.`,
      `The text is ${wordCount} words long with an average sentence length of ${avgSentenceLength} words.`
    ];
    details = humanTextIndicators.sort(() => 0.5 - Math.random()).slice(0, Math.floor(2 + Math.random() * 2));
    description += `Observed traits: ${details.join(' ')}`;
  }
  
  return {
    isAI,
    confidence,
    analysisTime: (1.2 + Math.random() * 0.8).toFixed(1),
    description,
    details
  };
};

// Simulates video analysis with a delay
export const detectAIVideo = async (videoFile) => {
  await new Promise(resolve => setTimeout(resolve, 2500 + Math.random() * 1500));

  const isAI = Math.random() > 0.35; // AI videos might be harder to detect or less common currently
  const confidence = isAI ?
    Math.floor(60 + Math.random() * 30) :
    Math.floor(50 + Math.random() * 40);

  let description = "";
  let findings = [];
  const duration = (Math.random() * 120 + 10).toFixed(0); // Mock duration
  const resolution = Math.random() > 0.5 ? "1920x1080" : "1280x720";

  if (isAI) {
    description = "Preliminary analysis indicates this video may contain elements consistent with AI-generated or manipulated footage. ";
    const aiVideoIndicators = [
      "Inconsistent motion blur or object tracking.",
      "Unnatural transitions or visual artifacts between frames.",
      "Anomalies in facial expressions or movements if subjects are present.",
      "Unusual visual noise patterns or compression artifacts not typical for standard codecs.",
      `Video duration: ${duration}s, Resolution: ${resolution}.`
    ];
    findings = aiVideoIndicators.sort(() => 0.5 - Math.random()).slice(0, Math.floor(2 + Math.random() * 2));
    description += `Specific findings: ${findings.join(' ')}`;
  } else {
    description = "This video appears to be standard footage without obvious signs of AI generation or deepfake manipulation. ";
    const humanVideoIndicators = [
      "Consistent motion and object interactions.",
      "Natural frame-to-frame transitions.",
      "Typical camera work and editing styles.",
      "Expected compression artifacts for the given format.",
      `Video duration: ${duration}s, Resolution: ${resolution}.`
    ];
    findings = humanVideoIndicators.sort(() => 0.5 - Math.random()).slice(0, Math.floor(2 + Math.random() * 2));
    description += `Observed aspects: ${findings.join(' ')}`;
  }

  return {
    isAI,
    confidence,
    analysisTime: (2.5 + Math.random() * 1.5).toFixed(1),
    description,
    findings,
    videoInfo: {
      fileName: videoFile.name,
      fileSize: (videoFile.size / (1024 * 1024)).toFixed(2) + " MB",
      duration: `${duration}s`,
      resolution: resolution,
    }
  };
};
