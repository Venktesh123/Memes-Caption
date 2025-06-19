
import { useState, useEffect } from 'react';
import TerminalHeader from '@/components/TerminalHeader';
import MemeCard from '@/components/MemeCard';
import MemeCreationForm from '@/components/MemeCreationForm';
import Leaderboard from '@/components/Leaderboard';
import { Meme } from '@/types/meme';
import { supabaseService } from '@/services/supabaseService';
import { generateCaption, generateVibe } from '@/services/geminiService';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingCaption, setGeneratingCaption] = useState(false);
  const [activeTab, setActiveTab] = useState<'gallery' | 'create' | 'leaderboard'>('gallery');
  const { toast } = useToast();

  useEffect(() => {
    loadMemes();
  }, []);

  const loadMemes = async () => {
    try {
      setLoading(true);
      const memesData = await supabaseService.getMemes();
      setMemes(memesData);
    } catch (error) {
      console.error('Error loading memes:', error);
      toast({
        title: "Connection Error! ⚠️",
        description: "Failed to load memes from the blockchain",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMeme = async (memeData: { title: string; image_url: string; tags: string[] }) => {
    try {
      setGeneratingCaption(true);
      
      // Generate AI caption and vibe using real Gemini API
      const [caption, vibe] = await Promise.all([
        generateCaption(memeData.title, memeData.tags),
        generateVibe(memeData.tags)
      ]);

      const newMeme = await supabaseService.createMeme({
        title: memeData.title,
        image_url: memeData.image_url,
        tags: memeData.tags,
        owner_id: 'cyberpunk420', // Mock current user
        caption,
        vibe
      });

      setMemes(prev => [newMeme, ...prev]);
      
      toast({
        title: "Meme Deployed! 🚀",
        description: `"${newMeme.title}" is now live in the cyberpunk marketplace`,
      });

      setActiveTab('gallery');
    } catch (error) {
      console.error('Error creating meme:', error);
      toast({
        title: "Deployment Failed! ⚠️",
        description: "Failed to deploy meme to the blockchain",
        variant: "destructive"
      });
    } finally {
      setGeneratingCaption(false);
    }
  };

  const handleGenerateCaption = async (title: string, tags: string[]) => {
    setGeneratingCaption(true);
    try {
      const caption = await generateCaption(title, tags);
      toast({
        title: "AI Caption Generated! 🤖",
        description: caption,
      });
    } catch (error) {
      console.error('Error generating caption:', error);
      toast({
        title: "AI Error! ⚠️",
        description: "Failed to generate caption",
        variant: "destructive"
      });
    } finally {
      setGeneratingCaption(false);
    }
  };

  const handleVote = async (memeId: string, type: 'up' | 'down') => {
    try {
      const updatedMeme = await supabaseService.updateMemeVotes(memeId, type);
      
      setMemes(prev => 
        prev.map(meme => 
          meme.id === memeId ? updatedMeme : meme
        )
      );

      toast({
        title: type === 'up' ? "Upvoted! ⬆️" : "Downvoted! ⬇️",
        description: "Vote registered in the blockchain",
      });
    } catch (error) {
      console.error('Error voting:', error);
      toast({
        title: "Vote Failed! ⚠️",
        description: "Failed to register vote",
        variant: "destructive"
      });
    }
  };

  const handleBid = async (memeId: string, amount: number) => {
    try {
      // Create bid record
      await supabaseService.createBid({
        meme_id: memeId,
        user_id: 'cyberpunk420',
        credits: amount
      });

      // Update meme with new highest bid
      const updatedMeme = await supabaseService.updateMemeBid(memeId, amount, 'cyberpunk420');
      
      setMemes(prev => 
        prev.map(meme => 
          meme.id === memeId ? updatedMeme : meme
        )
      );

      toast({
        title: "Bid Placed! 💰",
        description: `Bid of ${amount} credits submitted to the blockchain`,
      });
    } catch (error) {
      console.error('Error placing bid:', error);
      toast({
        title: "Bid Failed! ⚠️",
        description: "Failed to place bid",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-green-400 font-mono mb-4 typing-effect">
            Connecting to Cyberpunk Blockchain...
          </div>
          <div className="cyber-gradient w-64 h-1 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <TerminalHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="cyber-card p-2">
            <div className="flex space-x-4">
              {[
                { key: 'gallery', label: 'MEME GALLERY' },
                { key: 'create', label: 'CREATE MEME' },
                { key: 'leaderboard', label: 'LEADERBOARD' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`px-4 py-2 font-mono font-bold uppercase tracking-wider transition-all ${
                    activeTab === key
                      ? 'bg-pink-500 text-black neon-border'
                      : 'text-blue-400 hover:text-pink-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'gallery' && (
          <>
            <h1 className="text-4xl font-bold text-center mb-8 glitch-text neon-text text-pink-500" data-text="CYBERPUNK MEME MARKETPLACE">
              CYBERPUNK MEME MARKETPLACE
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memes.map((meme) => (
                <MemeCard
                  key={meme.id}
                  meme={meme}
                  onVote={handleVote}
                  onBid={handleBid}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === 'create' && (
          <MemeCreationForm
            onCreateMeme={handleCreateMeme}
            onGenerateCaption={handleGenerateCaption}
            generating={generatingCaption}
          />
        )}

        {activeTab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto">
            <Leaderboard memes={memes} />
          </div>
        )}
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="terminal-glow h-full w-full opacity-20"></div>
      </div>
    </div>
  );
};

export default Index;
