
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/contexts/AuthContext';
import { getTranslation } from '@/utils/translations';
import { RegistrationSuccessModal } from '@/components/RegistrationSuccessModal';
import LanguageDropdown from '@/components/LanguageDropdown';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const { signUp } = useAuth();

  const t = (key: string) => getTranslation(language as any, key as any);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: hasMinLength && hasCapitalLetter && hasSymbol,
      hasMinLength,
      hasCapitalLetter,
      hasSymbol
    };
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError(t('emailInvalid'));
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    const validation = validatePassword(value);
    if (value && !validation.isValid) {
      const errors = [];
      if (!validation.hasMinLength) errors.push(t('atLeast8Characters'));
      if (!validation.hasCapitalLetter) errors.push(t('oneCapitalLetter'));
      if (!validation.hasSymbol) errors.push(t('oneSymbol'));
      setPasswordError(`${t('passwordRequirements')}${errors.join(', ')}`);
    } else {
      setPasswordError('');
    }

    // Revalidate confirm password if it exists
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError(t('passwordsDoNotMatch'));
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (value && value !== password) {
      setConfirmPasswordError(t('passwordsDoNotMatch'));
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    
    if (!email) {
      setEmailError(t('emailRequired'));
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(t('emailInvalid'));
      return;
    }

    if (!password) {
      setPasswordError(t('passwordRequired'));
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(t('passwordsDoNotMatch'));
      return;
    }

    if (!agreedToTerms) {
      setRegisterError(t('pleaseAgreeToTerms'));
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, name);
    
    if (error) {
      if (error.message.includes('User already registered')) {
        setRegisterError(t('userAlreadyExists'));
      } else {
        setRegisterError(t('registerError'));
      }
      setLoading(false);
    } else {
      setLoading(false);
      setShowSuccessModal(true);
    }
  };

  const handleSuccessModalContinue = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - 65% - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-[65%] p-8">
        <div className="h-full flex items-center justify-center w-full">
          <div className="max-w-2xl w-full">
            <div className="relative">
              {/* Growth and analytics illustration */}
              <div className="w-full h-96 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10"></div>
                
                {/* Analytics dashboard mockup */}
                <div className="relative z-10 w-full max-w-lg">
                  <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 shadow-2xl border border-green-500/20">
                    {/* Header with user avatar */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500/30 rounded-full"></div>
                        <div>
                          <div className="h-3 bg-green-500/20 rounded w-20 mb-1"></div>
                          <div className="h-2 bg-green-500/10 rounded w-16"></div>
                        </div>
                      </div>
                      <div className="text-green-400 font-bold">Welcome!</div>
                    </div>
                    
                    {/* Progress indicators */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-green-300">Campaign Performance</span>
                          <span className="text-green-400">85%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded">
                          <div className="h-2 bg-green-500 rounded w-5/6"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-300">ROI Growth</span>
                          <span className="text-blue-400">92%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded">
                          <div className="h-2 bg-blue-500 rounded w-11/12"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Feature list */}
                    <div className="space-y-2">
                      {['AI Optimization', 'Real-time Analytics', 'Multi-platform'].map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating icons */}
                <div className="absolute top-8 right-8 text-4xl animate-bounce">📊</div>
                <div className="absolute bottom-8 left-8 text-3xl animate-pulse">🚀</div>
                <div className="absolute top-1/2 right-12 text-2xl animate-spin">⚡</div>
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
            <img 
              src="/horizontal-darkmode.png" 
              alt="Otmizy.ai Logo" 
              className="h-12 lg:h-16 mx-auto mb-6"
            />
            <h1 className="text-xl lg:text-2xl font-bold text-foreground mb-2">{t('createAccount')}</h1>
            <p className="text-sm lg:text-base text-muted-foreground">{t('registerSubtitle')}</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name field */}
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
              />
            </div>

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
                  onChange={handlePasswordChange}
                  className={passwordError ? 'border-red-500' : ''}
                  placeholder={t('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
            </div>

            {/* Confirm Password field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={confirmPasswordError ? 'border-red-500' : ''}
                  placeholder={t('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="text-sm text-red-500">{confirmPasswordError}</p>
              )}
            </div>

            {/* Terms checkbox - REQUIRED */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                required
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                {t('termsText')}{' '}
                <button
                  type="button"
                  onClick={() => navigate('/terms')}
                  className="text-yellow-500 hover:text-yellow-400 underline"
                >
                  {t('termsOfUse')}
                </button>
                ,{' '}
                <button
                  type="button"
                  onClick={() => navigate('/privacy')}
                  className="text-yellow-500 hover:text-yellow-400 underline"
                >
                  {t('privacyPolicy')}
                </button>
                {' '}e{' '}
                <button
                  type="button"
                  onClick={() => navigate('/cookies')}
                  className="text-yellow-500 hover:text-yellow-400 underline"
                >
                  {t('cookiesPolicy')}
                </button>
                .
              </label>
            </div>

            {/* Register error */}
            {registerError && (
              <p className="text-sm text-red-500">{registerError}</p>
            )}

            {/* Register button */}
            <Button 
              type="submit" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
              disabled={loading || !agreedToTerms}
            >
              {loading ? 'Cadastrando...' : t('register')}
            </Button>
          </form>

          {/* Link to login */}
          <div className="text-center">
            <p className="text-sm lg:text-base text-muted-foreground">
              {t('alreadyHaveAccount')}{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-yellow-500 hover:text-yellow-400 underline"
              >
                {t('enter')}
              </button>
            </p>
          </div>

          {/* Language selector - positioned at bottom */}
          <div className="flex justify-center mt-8">
            <LanguageDropdown />
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <RegistrationSuccessModal 
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        onContinue={handleSuccessModalContinue}
      />
    </div>
  );
}
