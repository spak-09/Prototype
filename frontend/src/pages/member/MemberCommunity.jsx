import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, Plus, Megaphone, Trophy } from 'lucide-react';
import { PageHeader, Badge, Button } from '../../components/shared/UIComponents';
import { useAuthStore } from '../../stores/authStore';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

export default function MemberCommunity() {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.community.getPosts();
        setPosts(res.posts);
      } catch (error) { console.error(error); }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await api.community.likePost(postId);
      setPosts(posts.map(p => p._id === postId ? { ...p, likes: res.post.likes } : p));
    } catch (error) { toast.error(error.message); }
  };

  const handleComment = async (postId) => {
    if (!commentText[postId]) return;
    try {
      const res = await api.community.commentPost(postId, commentText[postId]);
      setPosts(posts.map(p => p._id === postId ? { ...p, comments: res.post.comments } : p));
      setCommentText({ ...commentText, [postId]: '' });
    } catch (error) { toast.error(error.message); }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    try {
      const res = await api.community.createPost({ caption: newPost });
      setPosts([res.post, ...posts]);
      setNewPost('');
      toast.success('Post created!');
    } catch (error) { toast.error(error.message); }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Community" subtitle="Stay connected with your fitness family" />

      {/* Create Post */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181818] rounded-2xl p-5 shadow-card">
        <form onSubmit={handleCreatePost} className="flex gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{user?.name?.charAt(0)}</div>
          <div className="flex-1">
            <input value={newPost} onChange={(e) => setNewPost(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-sm" placeholder="Share your fitness journey..." />
            <div className="flex justify-end mt-2">
              <Button type="submit" size="sm" disabled={!newPost.trim()}><Send className="w-3.5 h-3.5" /> Post</Button>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post, i) => (
          <motion.div key={post._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-[#181818] rounded-2xl p-5 shadow-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {post.author?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#F0EDE8]">{post.author?.name || 'User'}</p>
                <p className="text-xs text-[#6B7280]">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
              <Badge variant={post.type === 'achievement' ? 'success' : post.type === 'announcement' ? 'info' : 'default'}>{post.type}</Badge>
            </div>
            <p className="text-sm text-[#A8A29E] mb-4 leading-relaxed">{post.caption}</p>

            {/* Actions */}
            <div className="flex items-center gap-6 pt-3 border-t border-[rgba(255,255,255,0.07)]">
              <button onClick={() => handleLike(post._id)} className={`flex items-center gap-1.5 text-sm transition-colors ${
                post.likes?.includes(user?._id) ? 'text-red-500' : 'text-[#6B7280] hover:text-red-500'
              }`}>
                <Heart className={`w-4 h-4 ${post.likes?.includes(user?._id) ? 'fill-red-500' : ''}`} />
                {post.likes?.length || 0}
              </button>
              <span className="flex items-center gap-1.5 text-sm text-[#6B7280]"><MessageCircle className="w-4 h-4" /> {post.comments?.length || 0}</span>
            </div>

            {/* Comments */}
            <div className="mt-3 space-y-2">
              {post.comments?.slice(0, 3).map((c, j) => (
                <div key={j} className="flex items-center gap-2 pl-4">
                  <div className="w-6 h-6 bg-[#2A2A2A] rounded-full flex items-center justify-center text-[10px] font-bold text-[#6B7280]">{c.author?.name?.charAt(0) || 'U'}</div>
                  <span className="text-xs font-medium text-[#A8A29E]">{c.author?.name || 'User'}</span>
                  <span className="text-xs text-[#6B7280]">{c.text}</span>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <input value={commentText[post._id] || ''} onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
                  className="flex-1 bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-1.5 text-xs" placeholder="Add a comment..." />
                <button onClick={() => handleComment(post._id)} className="p-1.5 text-primary-500 hover:text-primary-600"><Send className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
