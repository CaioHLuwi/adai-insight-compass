
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
    
    if (loginError) {
      setLoginError('');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    const trimmedEmail = email.trim().toLowerCase();
    
    if (!trimmedEmail) {
      setEmailError('Email é obrigatório');
      return;
    }
    
    if (!validateEmail(trimmedEmail)) {
      setEmailError('Email inválido');
      return;
    }

    if (!password) {
      setLoginError('Senha é obrigatória');
      return;
    }

    setLoading(true);
    
    try {
      // Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (authError) {
        setLoginError('Credenciais inválidas ou erro no servidor');
        return;
      }

      if (authData.user) {
        // Check if user has admin role
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', authData.user.id)
          .single();

        if (userError || !userData || userData.role !== 'admin') {
          setLoginError('Acesso negado. Apenas administradores podem entrar.');
          // Sign out the user since they don't have admin access
          await supabase.auth.signOut();
          return;
        }

        // Redirect to Zeuz dashboard
        navigate('/zeuz');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <img 
            src="/horizontal-darkmode.png" 
            alt="Otmizy.ai Logo" 
            className="h-16 mx-auto mb-8 cursor-pointer hover:opacity-80 transition-opacity"
          />
          <h1 className="text-2xl font-bold text-foreground mb-2">Acesso Administrativo</h1>
          <p className="text-muted-foreground">Entre com suas credenciais de administrador</p>
        </div>

        {/* Login Card */}
        <Card className="bg-gray-800/50 border-yellow-500/20 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center text-white">Login Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 ${emailError ? 'border-red-500' : ''}`}
                    placeholder="admin@exemplo.com"
                    autoComplete="email"
                  />
                </div>
                {emailError && (
                  <p className="text-sm text-red-500">{emailError}</p>
                )}
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (loginError) setLoginError('');
                    }}
                    className="pl-10 pr-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500"
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Login error */}
              {loginError && (
                <p className="text-sm text-red-500 text-center">{loginError}</p>
              )}

              {/* Login button */}
              <Button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar no Painel'}
              </Button>
            </form>

            {/* Additional info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Sistema de administração Zeuz
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security notice */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            🔒 Acesso restrito a administradores autorizados
          </p>
        </div>
      </div>
    </div>
  );
}
