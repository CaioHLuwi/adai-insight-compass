
import React, { useState } from 'react';
import { Eye, EyeOff, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    // TODO: Implement login logic
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - 65% - Hidden on mobile */}
      <div className="hidden lg:block lg:w-[65%] p-8">
        <div className="h-full flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <div className="relative">
              {/* Illustration placeholder */}
              <div className="w-full h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10"></div>
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-4">💻</div>
                  <div className="text-4xl mb-4">📊</div>
                  <div className="text-2xl opacity-70">Investment Analytics</div>
                </div>
                {/* Background charts decoration */}
                <div className="absolute top-4 left-4 w-16 h-16 border-2 border-yellow-400/30 rounded-lg"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-orange-400/30 rounded-full"></div>
                <div className="absolute top-1/2 left-8 w-8 h-8 bg-yellow-400/20 rounded"></div>
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
            <h1 className="text-xl lg:text-2xl font-bold text-foreground mb-2">Welcome back</h1>
            <p className="text-sm lg:text-base text-muted-foreground">Enter your e-mail and password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            {/* Login button */}
            <Button 
              type="submit" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
            >
              Enter
            </Button>
          </form>

          {/* Links */}
          <div className="text-center space-y-2">
            <p className="text-sm lg:text-base text-muted-foreground">
              Don't have account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-yellow-500 hover:text-yellow-400 underline"
              >
                Register
              </button>
            </p>
            <p className="text-sm lg:text-base text-muted-foreground">
              Forget password?{' '}
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-yellow-500 hover:text-yellow-400 underline"
              >
                Click here
              </button>
            </p>
          </div>

          {/* Language selector - positioned at bottom */}
          <div className="flex justify-center mt-8">
            <Button
              onClick={toggleLanguage}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language.toUpperCase()}
            </Button>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <ForgotPasswordDialog 
        open={showForgotPassword} 
        onOpenChange={setShowForgotPassword}
      />
    </div>
  );
}

function ForgotPasswordDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState<'email' | 'code' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendCode = () => {
    // TODO: Implement send code logic
    console.log('Sending code to:', email);
    setStep('code');
  };

  const handleVerifyCode = () => {
    // TODO: Implement code verification
    console.log('Verifying code:', code);
    setStep('password');
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // TODO: Implement password reset
    console.log('Resetting password');
    onOpenChange(false);
    setStep('email');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {step === 'email' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="reset-email">E-mail</Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <Button 
                onClick={handleSendCode}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Send Code
              </Button>
            </>
          )}

          {step === 'code' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="reset-code">Verification Code</Label>
                <Input
                  id="reset-code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter the code sent to your email"
                />
              </div>
              <Button 
                onClick={handleVerifyCode}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Verify Code
              </Button>
            </>
          )}

          {step === 'password' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
              <Button 
                onClick={handleResetPassword}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Confirm New Password
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
