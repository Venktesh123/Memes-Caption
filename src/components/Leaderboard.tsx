
import { Meme } from '@/types/meme';

interface LeaderboardProps {
  memes: Meme[];
}

const Leaderboard = ({ memes }: LeaderboardProps) => {
  const topMemes = [...memes]
    .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
    .slice(0, 10);

  const getRank = (index: number) => {
    const ranks = ['👑', '🥈', '🥉'];
    return ranks[index] || `#${index + 1}`;
  };

  return (
    <div className="cyber-card">
      <h2 className="text-xl font-bold text-pink-500 neon-text mb-4 text-center glitch-text" data-text="TRENDING MEMES">
        TRENDING MEMES
      </h2>
      
      <div className="space-y-2">
        {topMemes.map((meme, index) => (
          <div
            key={meme.id}
            className="flex items-center justify-between bg-gray-800 p-3 rounded border border-blue-400 hover:border-pink-500 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-yellow-400 font-bold w-8">
                {getRank(index)}
              </span>
              <div>
                <div className="text-blue-400 font-bold">{meme.title}</div>
                <div className="text-xs text-gray-400">
                  by {meme.owner_id} • {meme.tags.join(', ')}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-green-400 font-bold">
                {meme.upvotes - meme.downvotes} pts
              </div>
              <div className="text-xs text-yellow-400">
                {meme.current_bid || 0} credits
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
