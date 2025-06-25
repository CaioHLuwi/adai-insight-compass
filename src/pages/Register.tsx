
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

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
      setEmailError('Please enter a valid email address');
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
      if (!validation.hasMinLength) errors.push('at least 8 characters');
      if (!validation.hasCapitalLetter) errors.push('1 capital letter');
      if (!validation.hasSymbol) errors.push('1 symbol');
      setPasswordError(`Password must contain: ${errors.join(', ')}`);
    } else {
      setPasswordError('');
    }

    // Revalidate confirm password if it exists
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (value && value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    // TODO: Implement registration logic
    console.log('Registration attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - 65% */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ flex: '0 0 65%' }}>
        <div className="max-w-2xl w-full">
          <div className="relative">
            {/* Illustration placeholder */}
            <div className="w-full h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10"></div>
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <div className="text-4xl mb-4">📈</div>
                <div className="text-2xl opacity-70">Join Our Platform</div>
              </div>
              {/* Background charts decoration */}
              <div className="absolute top-4 left-4 w-16 h-16 border-2 border-yellow-400/30 rounded-lg"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-orange-400/30 rounded-full"></div>
              <div className="absolute top-1/2 left-8 w-8 h-8 bg-yellow-400/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - 35% */}
      <div className="flex items-center justify-center p-8 bg-card/50" style={{ flex: '0 0 35%' }}>
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center mb-8">
            <img 
              src="/horizontal-darkmode.png" 
              alt="Otmizy.ai Logo" 
              className="h-16 mx-auto mb-6"
            />
            <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join us to start your journey</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={emailError ? 'border-red-500' : ''}
                placeholder="Enter your email"
              />
              {emailError && (
                <p className="text-sm text-red-500">{emailError}</p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  className={passwordError ? 'border-red-500' : ''}
                  placeholder="Enter your password"
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
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={confirmPasswordError ? 'border-red-500' : ''}
                  placeholder="Confirm your password"
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

            {/* Terms checkbox */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                Li e concordo com os{' '}
                <a href="#" className="text-yellow-500 hover:text-yellow-400 underline">
                  Termos de Uso
                </a>
                ,{' '}
                <a href="#" className="text-yellow-500 hover:text-yellow-400 underline">
                  Política de Privacidade
                </a>
                {' '}e{' '}
                <a href="#" className="text-yellow-500 hover:text-yellow-400 underline">
                  Política de Cookies
                </a>
                .
              </label>
            </div>

            {/* Register button */}
            <Button 
              type="submit" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
            >
              Register
            </Button>
          </form>

          {/* Link to login */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Already have account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-yellow-500 hover:text-yellow-400 underline"
              >
                Enter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
