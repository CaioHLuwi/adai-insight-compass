
import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/contexts/AuthContext';
import { getTranslation } from '@/utils/translations';
import LanguageDropdown from '@/components/LanguageDropdown';
import { RegistrationSuccessModal } from '@/components/RegistrationSuccessModal';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { signUp } = useAuth();

  const t = (key: string) => getTranslation(language as any, key as any);

  const validateField = (name: string, value: any) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          newErrors.fullName = 'Nome completo é obrigatório';
        } else {
          delete newErrors.fullName;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = t('emailRequired');
        } else if (!emailRegex.test(value)) {
          newErrors.email = t('emailInvalid');
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = t('passwordRequired');
        } else if (value.length < 6) {
          newErrors.password = t('passwordTooShort');
        } else {
          delete newErrors.password;
        }
        break;
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = t('confirmPasswordRequired');
        } else if (value !== formData.password) {
          newErrors.confirmPassword = t('passwordsDoNotMatch');
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case 'acceptTerms':
        if (!value) {
          newErrors.acceptTerms = 'É necessário aceitar os termos de uso e privacidade';
        } else {
          delete newErrors.acceptTerms;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    validateField(name, newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key as keyof typeof formData]);
    });

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);

      if (error) {
        if (error.message.includes('User already registered')) {
          setErrors({ email: 'Este email já está cadastrado. Tente fazer login.' });
        } else {
          setErrors({ general: error.message });
        }
      } else {
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Ocorreu um erro durante o cadastro. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    // Placeholder for Google registration implementation
    console.log('Google register clicked');
    setLoading(false);
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ];
    strength = checks.filter(Boolean).length;
    return { strength, checks };
  };

  const { strength } = passwordStrength(formData.password);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - 65% - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-[65%] p-8">
        <div className="h-full flex items-center justify-center w-full">
          <div className="max-w-2xl w-full">
            <div className="relative">
              {/* Modern tech illustration */}
              <div className="w-full h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10"></div>
                
                {/* Main central element */}
                <div className="relative z-10 w-full max-w-lg">
                  <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-blue-500/20">
                    {/* Header with user avatar */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="h-3 bg-blue-500/30 rounded w-20 mb-1"></div>
                          <div className="h-2 bg-gray-600 rounded w-16"></div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Welcome message */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">Bem-vindo!</h3>
                      <p className="text-gray-300">Cadastre-se e comece sua jornada</p>
                    </div>
                    
                    {/* Form elements mockup */}
                    <div className="space-y-4">
                      <div className="h-12 bg-gray-800/50 border border-blue-500/20 rounded-lg flex items-center px-4">
                        <div className="w-5 h-5 bg-blue-500/40 rounded mr-3"></div>
                        <div className="h-2 bg-gray-600 rounded flex-1"></div>
                      </div>
                      <div className="h-12 bg-gray-800/50 border border-purple-500/20 rounded-lg flex items-center px-4">
                        <div className="w-5 h-5 bg-purple-500/40 rounded mr-3"></div>
                        <div className="h-2 bg-gray-600 rounded flex-1"></div>
                      </div>
                      <div className="h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <div className="text-white font-semibold">Criar Conta</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute top-8 left-8 w-16 h-16 border-2 border-blue-400/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-purple-400/30 rounded-lg rotate-45 animate-pulse"></div>
                <div className="absolute top-1/3 left-16 w-8 h-8 bg-pink-400/20 rounded-full animate-bounce"></div>
                <div className="absolute bottom-1/3 right-16 w-6 h-6 bg-blue-400/20 rounded animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                
                {/* Tech grid pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-8 grid-rows-8 h-full">
                    {[...Array(64)].map((_, i) => (
                      <div key={i} className="border border-white/10"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - 35% on desktop, full width on mobile */}
      <div className="w-full lg:w-[35%] overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md space-y-6">
            {/* Logo */}
            <div className="text-center mb-8">
              <button onClick={() => navigate('/')}>
                <img 
                  src="/horizontal-darkmode.png" 
                  alt="Otmizy.ai Logo" 
                  className="h-12 lg:h-16 mx-auto mb-6 cursor-pointer hover:opacity-80 transition-opacity"
                />
              </button>
              <h1 className="text-xl lg:text-2xl font-bold text-foreground mb-2">{t('createAccount')}</h1>
              <p className="text-sm lg:text-base text-muted-foreground">{t('registerSubtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name field */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
                    placeholder="Digite seu nome completo"
                  />
                </div>
                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder={t('email')}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder={t('password')}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

                {/* Password strength indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded ${
                            level <= strength
                              ? strength <= 2
                                ? 'bg-red-500'
                                : strength <= 3
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {strength <= 2 ? t('weakPassword') : strength <= 3 ? t('mediumPassword') : t('strongPassword')}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder={t('confirmPassword')}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>

              {/* Terms and conditions */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange({
                      target: { name: 'acceptTerms', type: 'checkbox', checked }
                    } as React.ChangeEvent<HTMLInputElement>)}
                    className={errors.acceptTerms ? 'border-red-500' : ''}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="acceptTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Aceito os{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/terms')}
                        className="text-yellow-500 hover:text-yellow-400 underline"
                      >
                        Termos de Uso
                      </button>
                      {' '}e{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/privacy')}
                        className="text-yellow-500 hover:text-yellow-400 underline"
                      >
                        Termos de Privacidade
                      </button>
                    </label>
                  </div>
                </div>
                {errors.acceptTerms && <p className="text-sm text-red-500">{errors.acceptTerms}</p>}
              </div>

              {/* Register error */}
              {errors.general && (
                <p className="text-sm text-red-500">{errors.general}</p>
              )}

              {/* Register button */}
              <Button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                disabled={loading}
              >
                {loading ? t('creating') : t('createAccount')}
              </Button>

              {/* Google Register Button */}
              <Button 
                type="button"
                onClick={handleGoogleRegister}
                variant="outline"
                className="w-full border-gray-300 hover:bg-black hover:text-white transition-colors"
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Register with Google
              </Button>
            </form>

            {/* Links */}
            <div className="text-center space-y-2">
              <p className="text-sm lg:text-base text-muted-foreground">
                {t('alreadyHaveAccount')}{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-yellow-500 hover:text-yellow-400 underline"
                >
                  {t('login')}
                </button>
              </p>
            </div>

            {/* Language selector */}
            <div className="flex justify-center mt-8">
              <LanguageDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <RegistrationSuccessModal 
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        onContinue={() => {
          setShowSuccessModal(false);
          navigate('/');
        }}
      />
    </div>
  );
}
