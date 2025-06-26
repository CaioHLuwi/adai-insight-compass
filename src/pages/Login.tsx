import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/contexts/AuthContext';
import { getTranslation } from '@/utils/translations';
import LanguageDropdown from '@/components/LanguageDropdown';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { signIn } = useAuth();

  const t = (key: string) => getTranslation(language as any, key as any);

  const validateEmail = (email: string) => {
    // Improved email validation that allows all standard domains
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError(t('emailInvalid'));
    } else {
      setEmailError('');
    }
    
    // Clear login error when user starts typing
    if (loginError) {
      setLoginError('');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    const trimmedEmail = email.trim().toLowerCase();
    
    if (!trimmedEmail) {
      setEmailError(t('emailRequired'));
      return;
    }
    
    if (!validateEmail(trimmedEmail)) {
      setEmailError(t('emailInvalid'));
      return;
    }

    if (!password) {
      setLoginError(t('passwordRequired'));
      return;
    }

    setLoading(true);
    console.log('Login attempt for:', trimmedEmail);
    
    const { error } = await signIn(trimmedEmail, password);
    
    if (error) {
      console.error('Login error:', error);
      if (error.message.includes('Invalid login credentials') || error.message.includes('invalid_credentials')) {
        setLoginError(t('invalidCredentials'));
      } else if (error.message.includes('Email not confirmed') || error.message.includes('email_not_confirmed')) {
        setLoginError('Por favor, confirme seu email antes de fazer login. Verifique sua caixa de entrada e spam.');
      } else {
        setLoginError(error.message || t('loginError'));
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Left side - 65% - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-[65%] p-8 bg-background">
        <div className="h-full flex items-center justify-center w-full">
          <div className="max-w-2xl w-full">
            <div className="relative">
              {/* Modern illustration with dashboard preview */}
              <div className="w-full h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10"></div>
                
                {/* Dashboard mockup */}
                <div className="relative z-10 w-full max-w-lg">
                  <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 shadow-2xl border border-yellow-500/20">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-8 bg-yellow-500/20 rounded w-32"></div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-yellow-500/30 rounded-full"></div>
                        <div className="w-8 h-8 bg-orange-500/30 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Stats cards */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <div className="text-green-400 text-2xl font-bold">+127%</div>
                        <div className="text-green-300 text-sm">ROI</div>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                        <div className="text-blue-400 text-2xl font-bold">R$ 45k</div>
                        <div className="text-blue-300 text-sm">Revenue</div>
                      </div>
                    </div>
                    
                    {/* Chart representation */}
                    <div className="bg-gray-800/50 rounded p-4">
                      <div className="flex items-end space-x-1 h-16">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-yellow-500/40 flex-1 rounded-t"
                            style={{ height: `${Math.random() * 100}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-6 left-6 w-12 h-12 border-2 border-yellow-400/30 rounded-lg animate-pulse"></div>
                <div className="absolute bottom-6 right-6 w-16 h-16 border-2 border-orange-400/30 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-12 w-8 h-8 bg-yellow-400/20 rounded animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - 35% on desktop, full width on mobile */}
      <div className="w-full lg:w-[35%] flex items-center justify-center p-4 lg:p-8 bg-card/50">
        <div className="w-full max-w-md space-y-6 relative">
          {/* Logo */}
          <div className="text-center mb-8">
            <button 
              onClick={() => navigate('/')}
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img 
                src="/horizontal-darkmode.png" 
                alt="Otmizy.ai Logo" 
                className="h-12 lg:h-16 mx-auto mb-6"
              />
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground mb-2">{t('welcomeBack')}</h1>
            <p className="text-sm lg:text-base text-muted-foreground">{t('loginSubtitle')}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={emailError ? 'border-red-500' : ''}
                placeholder={t('email')}
                autoComplete="email"
              />
              {emailError && (
                <p className="text-sm text-red-500">{emailError}</p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  placeholder={t('password')}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Login error */}
            {loginError && (
              <p className="text-sm text-red-500">{loginError}</p>
            )}

            {/* Login button */}
            <Button 
              type="submit" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
              disabled={loading}
            >
              {loading ? 'Entrando...' : t('enter')}
            </Button>
          </form>

          {/* Links */}
          <div className="text-center space-y-2">
            <p className="text-sm lg:text-base text-muted-foreground">
              {t('dontHaveAccount')}{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-yellow-500 hover:text-yellow-400 underline"
              >
                {t('register')}
              </button>
            </p>
            <p className="text-sm lg:text-base text-muted-foreground">
              {t('forgetPassword')}{' '}
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-yellow-500 hover:text-yellow-400 underline"
              >
                {t('clickHere')}
              </button>
            </p>
          </div>

          {/* Language selector - positioned at bottom */}
          <div className="flex justify-center mt-8">
            <LanguageDropdown />
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <ForgotPasswordDialog 
        open={showForgotPassword} 
        onOpenChange={setShowForgotPassword}
        language={language}
      />
    </div>
  );
}

function ForgotPasswordDialog({ 
  open, 
  onOpenChange, 
  language 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  language: string;
}) {
  const [step, setStep] = useState<'email' | 'code' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const t = (key: string) => getTranslation(language as any, key as any);

  const handleSendCode = () => {
    console.log('Sending code to:', email);
    setStep('code');
  };

  const handleVerifyCode = () => {
    console.log('Verifying code:', code);
    setStep('password');
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert(t('passwordsDoNotMatch'));
      return;
    }
    console.log('Resetting password');
    onOpenChange(false);
    setStep('email');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('resetPassword')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {step === 'email' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="reset-email">{t('email')}</Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('email')}
                />
              </div>
              <Button 
                onClick={handleSendCode}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                {t('sendCode')}
              </Button>
            </>
          )}

          {step === 'code' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="reset-code">{t('verificationCode')}</Label>
                <Input
                  id="reset-code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={t('verificationCode')}
                />
              </div>
              <Button 
                onClick={handleVerifyCode}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                {t('verifyCode')}
              </Button>
            </>
          )}

          {step === 'password' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="new-password">{t('newPassword')}</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t('newPassword')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t('confirmPassword')}</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('confirmPassword')}
                />
              </div>
              <Button 
                onClick={handleResetPassword}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                {t('confirmNewPassword')}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
