import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, Image, Video, Smile, Plus, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  department?: string;
  company?: string;
}

interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  video_url?: string;
  created_at: string;
  users: User;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
}

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  users: User;
}

interface ChatMessage {
  id: string;
  user_id: string;
  channel: string;
  content: string;
  image_url?: string;
  created_at: string;
  users: User;
}

interface TypingIndicator {
  user_id: string;
  channel: string;
  users: User;
}

const CHANNELS = [
  { value: 'PT-BR', label: 'Brasil (PT-BR)', flag: '🇧🇷' },
  { value: 'ES', label: 'Argentina (ES)', flag: '🇦🇷' },
  { value: 'EN', label: 'United States (EN)', flag: '🇺🇸' },
];

export default function Comunidade() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState<{ [postId: string]: string }>({});
  const [userData, setUserData] = useState<User | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newChatMessage, setNewChatMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('PT-BR');
  const [typingUsers, setTypingUsers] = useState<TypingIndicator[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (data) setUserData(data);
    };
    
    loadUserData();
  }, [user]);

  // Load posts
  useEffect(() => {
    loadPosts();
  }, []);

  // Load chat messages for selected channel
  useEffect(() => {
    loadChatMessages();
  }, [selectedChannel]);

  // Real-time subscriptions
  useEffect(() => {
    // Posts real-time
    const postsChannel = supabase
      .channel('posts-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'posts'
      }, () => {
        loadPosts();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'post_likes'
      }, () => {
        loadPosts();
      })
      .subscribe();

    // Chat real-time
    const chatChannel = supabase
      .channel('chat-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages'
      }, (payload) => {
        if (payload.new.channel === selectedChannel) {
          loadChatMessages();
        }
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'chat_typing'
      }, () => {
        loadTypingIndicators();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(postsChannel);
      supabase.removeChannel(chatChannel);
    };
  }, [selectedChannel]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const loadPosts = async () => {
    // Get all posts with user data using a proper join approach
    const { data: postsData } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!postsData) return;

    const postsWithStats = await Promise.all(
      postsData.map(async (post) => {
        // Get user data for each post using edge function to fetch auth user data
        const { data: userData } = await supabase.functions.invoke('get-user-profile', {
          body: { user_id: post.user_id }
        });

        // Get likes count and check if current user liked
        const { data: postLikes } = await supabase
          .from('post_likes')
          .select('user_id')
          .eq('post_id', post.id);

        // Get comments count
        const { count: commentsCount } = await supabase
          .from('post_comments')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', post.id);

        return {
          ...post,
          users: userData || { id: '', name: 'Usuario Deletado', email: '', avatar_url: '', department: '' },
          likes_count: postLikes?.length || 0,
          comments_count: commentsCount || 0,
          is_liked: postLikes?.some(like => like.user_id === user?.id) || false
        };
      })
    );

    setPosts(postsWithStats);
  };

  const loadChatMessages = async () => {
    const { data: messagesData } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('channel', selectedChannel)
      .order('created_at', { ascending: true })
      .limit(50);

    if (messagesData) {
      const messagesWithUsers = await Promise.all(
        messagesData.map(async (message) => {
          // Get user data using edge function
          const { data: userData } = await supabase.functions.invoke('get-user-profile', {
            body: { user_id: message.user_id }
          });
          
          return { 
            ...message, 
            users: userData || { id: '', name: 'Usuario Deletado', email: '', avatar_url: '', department: '' }
          };
        })
      );
      setChatMessages(messagesWithUsers);
    }
    loadTypingIndicators();
  };

  const loadTypingIndicators = async () => {
    const { data: typingData } = await supabase
      .from('chat_typing')
      .select('*')
      .eq('channel', selectedChannel)
      .eq('is_typing', true)
      .neq('user_id', user?.id);

    if (typingData) {
      const typingWithUsers = await Promise.all(
        typingData.map(async (typing) => {
          // Get user data using edge function
          const { data: userData } = await supabase.functions.invoke('get-user-profile', {
            body: { user_id: typing.user_id }
          });
          
          return { 
            ...typing, 
            users: userData || { id: '', name: 'Usuario Deletado', email: '', avatar_url: '', department: '' }
          };
        })
      );
      setTypingUsers(typingWithUsers);
    }
  };

  const createPost = async () => {
    if (!newPost.trim() || !user) return;

    const { error } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        content: newPost
      });

    if (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao criar post',
        variant: 'destructive'
      });
    } else {
      setNewPost('');
      toast({
        title: 'Sucesso',
        description: 'Post criado com sucesso!'
      });
    }
  };

  const toggleLike = async (postId: string, isLiked: boolean) => {
    if (!user) return;

    if (isLiked) {
      await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id);
    } else {
      await supabase
        .from('post_likes')
        .insert({
          post_id: postId,
          user_id: user.id
        });
    }
  };

  const loadComments = async (postId: string) => {
    const { data: commentsData } = await supabase
      .from('post_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (commentsData) {
      const commentsWithUsers = await Promise.all(
        commentsData.map(async (comment) => {
          // Get user data using edge function
          const { data: userData } = await supabase.functions.invoke('get-user-profile', {
            body: { user_id: comment.user_id }
          });
          
          return { 
            ...comment, 
            users: userData || { id: '', name: 'Usuario Deletado', email: '', avatar_url: '', department: '' }
          };
        })
      );
      setComments(prev => ({ ...prev, [postId]: commentsWithUsers }));
    }
  };

  const addComment = async (postId: string) => {
    const comment = newComment[postId];
    if (!comment?.trim() || !user) return;

    const { error } = await supabase
      .from('post_comments')
      .insert({
        post_id: postId,
        user_id: user.id,
        content: comment
      });

    if (!error) {
      setNewComment(prev => ({ ...prev, [postId]: '' }));
      loadComments(postId);
      loadPosts(); // Refresh to update comment count
    }
  };

  const sendChatMessage = async () => {
    if (!newChatMessage.trim() || !user) return;

    const { error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: user.id,
        channel: selectedChannel,
        content: newChatMessage
      });

    if (!error) {
      setNewChatMessage('');
      setIsTyping(false);
      // Clear typing indicator
      await supabase
        .from('chat_typing')
        .delete()
        .eq('user_id', user.id)
        .eq('channel', selectedChannel);
    }
  };

  const handleChatTyping = async (message: string) => {
    setNewChatMessage(message);
    
    if (!user) return;

    if (message.trim() && !isTyping) {
      setIsTyping(true);
      await supabase
        .from('chat_typing')
        .upsert({
          user_id: user.id,
          channel: selectedChannel,
          is_typing: true
        });
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(async () => {
      setIsTyping(false);
      await supabase
        .from('chat_typing')
        .delete()
        .eq('user_id', user.id)
        .eq('channel', selectedChannel);
    }, 3000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!userData) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Comunidade Otmizy</h1>
        <p className="text-muted-foreground">
          Conecte-se com outros profissionais da plataforma
        </p>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="feed">Feed Social</TabsTrigger>
          <TabsTrigger value="chat">Chat Global</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          {/* Create Post */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={userData.avatar_url} />
                  <AvatarFallback>{userData.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{userData.name}</h3>
                  <p className="text-sm text-muted-foreground">{userData.department}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="O que você está pensando?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-20"
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Image className="w-4 h-4 mr-2" />
                    Foto
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    Vídeo
                  </Button>
                </div>
                <Button onClick={createPost} disabled={!newPost.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Publicar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <Avatar>
                      <AvatarImage src={post.users.avatar_url} />
                      <AvatarFallback>{post.users.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{post.users.name}</h4>
                        {post.users.department && (
                          <Badge variant="secondary">{post.users.department}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(post.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
                  
                  {post.image_url && (
                    <img 
                      src={post.image_url} 
                      alt="Post" 
                      className="w-full rounded-lg mb-4 max-h-96 object-cover"
                    />
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(post.id, post.is_liked)}
                        className={post.is_liked ? 'text-red-500' : ''}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${post.is_liked ? 'fill-current' : ''}`} />
                        {post.likes_count}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedPost(selectedPost === post.id ? null : post.id);
                          if (selectedPost !== post.id) {
                            loadComments(post.id);
                          }
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments_count}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Comments Section */}
                  {selectedPost === post.id && (
                    <div className="mt-4 pt-4 border-t space-y-4">
                      {comments[post.id]?.map((comment) => (
                        <div key={comment.id} className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={comment.users.avatar_url} />
                            <AvatarFallback>{comment.users.name?.[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-muted rounded-lg p-3">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-sm">{comment.users.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(comment.created_at)}
                                </span>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={userData.avatar_url} />
                          <AvatarFallback>{userData.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex space-x-2">
                          <Input
                            placeholder="Escreva um comentário..."
                            value={newComment[post.id] || ''}
                            onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addComment(post.id);
                              }
                            }}
                          />
                          <Button size="sm" onClick={() => addComment(post.id)}>
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          {/* Channel Selection */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Globe className="w-5 h-5" />
                <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CHANNELS.map((channel) => (
                      <SelectItem key={channel.value} value={channel.value}>
                        {channel.flag} {channel.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <Card>
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={message.users.avatar_url} />
                      <AvatarFallback>{message.users.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{message.users.name}</span>
                        {message.users.department && (
                          <Badge variant="outline" className="text-xs">{message.users.department}</Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatDate(message.created_at)}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicators */}
                {typingUsers.map((typing) => (
                  <div key={typing.user_id} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={typing.users.avatar_url} />
                      <AvatarFallback>{typing.users.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <span>{typing.users.name} está escrevendo...</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                ))}
                
                <div ref={chatEndRef} />
              </div>
              
              {/* Chat Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={newChatMessage}
                    onChange={(e) => handleChatTyping(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        sendChatMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Image className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button onClick={sendChatMessage} disabled={!newChatMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}