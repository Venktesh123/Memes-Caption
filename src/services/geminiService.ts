
const GEMINI_API_KEY = 'AIzaSyD3pO5KV4CJIIhRUqANsY-SG-SmOjW56zc';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

const fallbackCaptions = [
  "YOLO to the moon! 🚀",
  "Stonks only go up 📈",
  "This is the way... to financial ruin 💎",
  "When you're down 90% but still HODLing 🤡",
  "Number go up, dopamine go brrr 🧠",
  "Sir, this is a Wendy's 🍔",
  "Diamond hands, smooth brain 💎🧠",
  "Buy high, sell low - the way 📉",
  "Apes together strong 🦍",
  "To the moon or behind Wendy's 🌙"
];

const fallbackVibes = [
  "Neon Crypto Chaos",
  "Retro Stonks Energy",
  "Cyberpunk Degen Vibes",
  "Matrix HODL Mode",
  "Glitch in the Portfolio",
  "Terminal Meme Energy",
  "Neural Network Comedy",
  "Digital Degeneracy",
  "Quantum Meme State",
  "Blockchain Humor Protocol"
];

export const generateCaption = async (title: string, tags: string[]): Promise<string> => {
  try {
    console.log('Generating caption with Gemini API for:', title, tags);
    
    const prompt = `Generate a funny, cyberpunk-style caption for a meme titled "${title}" with tags: ${tags.join(', ')}. 
    The caption should be under 50 characters, include emojis, and have a chaotic cyberpunk/hacker vibe. 
    Think neon-lit alley at 3AM, synthwave energy, crypto degeneracy.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 100,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (generatedText) {
      console.log('Generated caption:', generatedText);
      return generatedText.trim();
    } else {
      throw new Error('No caption generated');
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Smart fallback based on tags
    if (tags.includes('crypto') || tags.includes('bitcoin')) {
      return "When you check your portfolio at 3AM 📱💀";
    }
    if (tags.includes('doge')) {
      return "Much wow, very moon, such gains 🐕🚀";
    }
    if (tags.includes('stonks')) {
      return "Number go up = happy brain chemicals 📈🧠";
    }
    if (tags.includes('ai')) {
      return "AI overlords approve this meme 🤖✨";
    }
    
    return fallbackCaptions[Math.floor(Math.random() * fallbackCaptions.length)];
  }
};

export const generateVibe = async (tags: string[]): Promise<string> => {
  try {
    console.log('Generating vibe with Gemini API for tags:', tags);
    
    const prompt = `Generate a short (2-4 words) cyberpunk vibe description for a meme with these tags: ${tags.join(', ')}. 
    Examples: "Neon Crypto Chaos", "Terminal Degen Energy", "Matrix HODL Mode". 
    Make it sound like a cyberpunk aesthetic with tech/crypto/meme vibes.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 1,
          topP: 1,
          maxOutputTokens: 50,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (generatedText) {
      console.log('Generated vibe:', generatedText);
      return generatedText.trim().replace(/['"]/g, '');
    } else {
      throw new Error('No vibe generated');
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Smart fallback based on tags
    if (tags.includes('crypto')) {
      return "Cyberpunk Trader Vibes";
    }
    if (tags.includes('funny')) {
      return "Terminal Comedy Energy";
    }
    if (tags.includes('ai')) {
      return "Neural Network Chaos";
    }
    if (tags.includes('doge')) {
      return "Dogecoin Matrix Mode";
    }
    
    return fallbackVibes[Math.floor(Math.random() * fallbackVibes.length)];
  }
};
