
import { useState } from 'react';

interface MemeCreationFormProps {
  onCreateMeme: (meme: {
    title: string;
    image_url: string;
    tags: string[];
  }) => void;
  onGenerateCaption: (title: string, tags: string[]) => void;
  generating?: boolean;
}

const MemeCreationForm = ({ onCreateMeme, onGenerateCaption, generating }: MemeCreationFormProps) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  const placeholderImages = [
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1516138008210-ba63a8cecd1b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1548502632-6b93092aad0b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=300&fit=crop',
    'https://picsum.photos/400/300?random=' + Math.floor(Math.random() * 1000)
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    onCreateMeme({
      title,
      image_url: imageUrl || placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
      tags: tagArray
    });

    setTitle('');
    setImageUrl('');
    setTags('');
  };

  const handleGenerateCaption = () => {
    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    onGenerateCaption(title, tagArray);
  };

  return (
    <div className="cyber-card max-w-2xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-pink-500 neon-text mb-6 text-center glitch-text" data-text="Create New Meme">
        Create New Meme
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-green-400 text-sm font-bold mb-2">
            MEME_TITLE.exe
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-800 border-2 border-blue-400 text-blue-400 px-3 py-2 rounded focus:outline-none focus:border-pink-500 font-mono"
            placeholder="Doge HODL..."
            required
          />
        </div>

        <div>
          <label className="block text-green-400 text-sm font-bold mb-2">
            IMAGE_URL.jpg (optional)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full bg-gray-800 border-2 border-blue-400 text-blue-400 px-3 py-2 rounded focus:outline-none focus:border-pink-500 font-mono"
            placeholder="https://... or leave blank for random"
          />
        </div>

        <div>
          <label className="block text-green-400 text-sm font-bold mb-2">
            TAGS.csv (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full bg-gray-800 border-2 border-blue-400 text-blue-400 px-3 py-2 rounded focus:outline-none focus:border-pink-500 font-mono"
            placeholder="crypto, funny, doge, stonks"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleGenerateCaption}
            disabled={!title || generating}
            className="cyber-button flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? 'AI THINKING...' : 'GENERATE AI CAPTION'}
          </button>
          
          <button
            type="submit"
            disabled={!title}
            className="cyber-button flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            DEPLOY MEME
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemeCreationForm;
