
import { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Meme } from '@/types/meme';

interface MemeCardProps {
  meme: Meme;
  onVote: (memeId: string, type: 'up' | 'down') => void;
  onBid: (memeId: string, amount: number) => void;
}

const MemeCard = ({ meme, onVote, onBid }: MemeCardProps) => {
  const [bidAmount, setBidAmount] = useState(100);

  const handleBidSubmit = () => {
    onBid(meme.id, bidAmount);
    setBidAmount(100);
  };

  return (
    <div className="cyber-card group hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img 
          src={meme.image_url} 
          alt={meme.title}
          className="w-full h-48 object-cover rounded border-2 border-blue-400 mb-4"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs text-green-400">
          #{meme.id.slice(0, 6)}
        </div>
      </div>

      <h3 className="text-lg font-bold text-pink-500 neon-text mb-2 glitch-text" data-text={meme.title}>
        {meme.title}
      </h3>

      {meme.caption && (
        <p className="text-blue-400 text-sm mb-2 italic">
          AI: "{meme.caption}"
        </p>
      )}

      {meme.vibe && (
        <div className="text-purple-400 text-xs mb-2 uppercase tracking-wider">
          Vibe: {meme.vibe}
        </div>
      )}

      <div className="flex flex-wrap gap-1 mb-3">
        {meme.tags.map((tag) => (
          <span 
            key={tag} 
            className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs border border-green-400"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onVote(meme.id, 'up')}
            className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors"
          >
            <ArrowUp size={16} />
            <span>{meme.upvotes}</span>
          </button>
          <button
            onClick={() => onVote(meme.id, 'down')}
            className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
          >
            <ArrowDown size={16} />
            <span>{meme.downvotes}</span>
          </button>
        </div>
        <div className="text-yellow-400 text-sm">
          Owner: {meme.owner_id}
        </div>
      </div>

      <div className="border-t border-gray-600 pt-3">
        <div className="mb-2">
          <div className="text-sm text-blue-400">Current Bid:</div>
          <div className="text-lg font-bold text-yellow-400">
            {meme.current_bid || 0} credits
          </div>
          {meme.highest_bidder && (
            <div className="text-xs text-gray-400">by {meme.highest_bidder}</div>
          )}
        </div>

        <div className="flex space-x-2">
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(parseInt(e.target.value) || 0)}
            className="flex-1 bg-gray-800 border border-blue-400 text-blue-400 px-2 py-1 rounded text-sm"
            placeholder="Credits"
            min="1"
          />
          <button
            onClick={handleBidSubmit}
            className="cyber-button text-xs px-3 py-1"
          >
            BID
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemeCard;
