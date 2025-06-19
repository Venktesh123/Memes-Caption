
import { supabase } from '@/integrations/supabase/client';
import { Meme, Bid, User } from '@/types/meme';

export const supabaseService = {
  // Meme operations
  async getMemes(): Promise<Meme[]> {
    const { data, error } = await supabase
      .from('memes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createMeme(meme: Omit<Meme, 'id' | 'created_at' | 'upvotes' | 'downvotes' | 'current_bid'>): Promise<Meme> {
    const { data, error } = await supabase
      .from('memes')
      .insert([{
        title: meme.title,
        image_url: meme.image_url,
        tags: meme.tags,
        owner_id: meme.owner_id,
        caption: meme.caption,
        vibe: meme.vibe
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateMemeVotes(memeId: string, type: 'up' | 'down'): Promise<Meme> {
    const { data: meme, error: fetchError } = await supabase
      .from('memes')
      .select('upvotes, downvotes')
      .eq('id', memeId)
      .single();
    
    if (fetchError) throw fetchError;
    
    const updates = type === 'up' 
      ? { upvotes: (meme.upvotes || 0) + 1 }
      : { downvotes: (meme.downvotes || 0) + 1 };
    
    const { data, error } = await supabase
      .from('memes')
      .update(updates)
      .eq('id', memeId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateMemeBid(memeId: string, credits: number, bidderId: string): Promise<Meme> {
    const { data, error } = await supabase
      .from('memes')
      .update({
        current_bid: credits,
        highest_bidder: bidderId
      })
      .eq('id', memeId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Bid operations
  async createBid(bid: Omit<Bid, 'id' | 'created_at'>): Promise<Bid> {
    const { data, error } = await supabase
      .from('bids')
      .insert([bid])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getBidsForMeme(memeId: string): Promise<Bid[]> {
    const { data, error } = await supabase
      .from('bids')
      .select('*')
      .eq('meme_id', memeId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // User operations
  async getUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) throw error;
    return data || [];
  },

  async getUserById(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) return null;
    return data;
  }
};
