
-- Create memes table
CREATE TABLE public.memes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  owner_id TEXT NOT NULL,
  caption TEXT,
  vibe TEXT,
  current_bid INTEGER DEFAULT 0,
  highest_bidder TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bids table
CREATE TABLE public.bids (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meme_id UUID REFERENCES public.memes(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  credits INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table for mock users
CREATE TABLE public.users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  credits INTEGER DEFAULT 1000,
  avatar TEXT
);

-- Enable Row Level Security
ALTER TABLE public.memes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a hackathon project)
CREATE POLICY "Allow all operations on memes" ON public.memes FOR ALL USING (true);
CREATE POLICY "Allow all operations on bids" ON public.bids FOR ALL USING (true);
CREATE POLICY "Allow all operations on users" ON public.users FOR ALL USING (true);

-- Insert some mock users
INSERT INTO public.users (id, username, credits, avatar) VALUES
('cyberpunk420', 'cyberpunk420', 1500, 'https://picsum.photos/50/50?random=1'),
('neo_trader', 'neo_trader', 2000, 'https://picsum.photos/50/50?random=2'),
('matrix_hacker', 'matrix_hacker', 1200, 'https://picsum.photos/50/50?random=3'),
('doge_master', 'doge_master', 800, 'https://picsum.photos/50/50?random=4');

-- Insert some sample memes
INSERT INTO public.memes (title, image_url, tags, upvotes, downvotes, owner_id, caption, vibe, current_bid, highest_bidder) VALUES
('Doge HODL Forever', 'https://picsum.photos/400/300?random=1', ARRAY['crypto', 'doge', 'hodl'], 42, 3, 'cyberpunk420', 'Much wow, very moon, such gains 🐕🚀', 'Cyberpunk Crypto Chaos', 500, 'neo_trader'),
('Stonks Only Go Up', 'https://picsum.photos/400/300?random=2', ARRAY['stonks', 'meme', 'finance'], 69, 5, 'neo_trader', 'Number go up = happy brain chemicals 📈🧠', 'Neon Trading Vibes', 750, 'matrix_hacker'),
('AI Overlords', 'https://picsum.photos/400/300?random=3', ARRAY['ai', 'tech', 'future'], 31, 2, 'matrix_hacker', 'When you realize AI is writing your memes 🤖', 'Neural Network Comedy', 300, 'doge_master'),
('Diamond Hands', 'https://picsum.photos/400/300?random=4', ARRAY['crypto', 'diamond', 'hands'], 88, 7, 'doge_master', 'Diamond hands, smooth brain 💎🧠', 'Terminal Degen Energy', 1200, 'cyberpunk420');
