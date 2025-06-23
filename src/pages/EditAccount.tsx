import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { User, Upload, Save, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EditAccount = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    repeat: false
  });
  
  const [userData, setUserData] = useState({
    name: 'Caio Henrique',
    email: 'caio@otmizy.ai',
    role: 'Admin',
    phone: '+55 11 99999-9999',
    department: 'Marketing',
    avatar: null as string | null
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    repeatPassword: ''
  });

  const passwordRequirements = [
    { text: language === 'pt' ? 'Entre 8 e 50 caracteres' : 'Between 8 and 50 characters', check: (pwd: string) => pwd.length >= 8 && pwd.length <= 50 },
    { text: language === 'pt' ? 'Pelo menos uma letra maiúscula' : 'At least one capital letter', check: (pwd: string) => /[A-Z]/.test(pwd) },
    { text: language === 'pt' ? 'Pelo menos um número' : 'At least one number', check: (pwd: string) => /\d/.test(pwd) },
    { text: language === 'pt' ? 'Pelo menos um caractere especial' : 'At least one special character', check: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
  ];

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      title: {
        en: 'Edit Account',
        pt: 'Editar Conta',
        es: 'Editar Cuenta',
        ru: 'Редактировать аккаунт',
        de: 'Konto bearbeiten'
      },
      personalInfo: {
        en: 'Personal Information',
        pt: 'Informações Pessoais',
        es: 'Información Personal',
        ru: 'Личная информация',
        de: 'Persönliche Informationen'
      },
      changePassword: {
        en: 'Change Password',
        pt: 'Alterar Senha',
        es: 'Cambiar Contraseña',
        ru: 'Изменить пароль',
        de: 'Passwort ändern'
      },
      currentPassword: {
        en: 'Current Password',
        pt: 'Senha Atual',
        es: 'Contraseña Actual',
        ru: 'Текущий пароль',
        de: 'Aktuelles Passwort'
      },
      newPassword: {
        en: 'New Password',
        pt: 'Nova Senha',
        es: 'Nueva Contraseña',
        ru: 'Новый пароль',
        de: 'Neues Passwort'
      },
      repeatPassword: {
        en: 'Repeat Password',
        pt: 'Repetir Senha',
        es: 'Repetir Contraseña',
        ru: 'Повторить пароль',
        de: 'Passwort wiederholen'
      },
      fullName: {
        en: 'Full Name',
        pt: 'Nome Completo',
        es: 'Nombre Completo',
        ru: 'Полное имя',
        de: 'Vollständiger Name'
      },
      email: {
        en: 'Email',
        pt: 'E-mail',
        es: 'Correo Electrónico',
        ru: 'Электронная почта',
        de: 'E-Mail'
      },
      phone: {
        en: 'Phone',
        pt: 'Telefone',
        es: 'Teléfono',
        ru: 'Телефон',
        de: 'Telefon'
      },
      department: {
        en: 'Department',
        pt: 'Departamento',
        es: 'Departamento',
        ru: 'Отдел',
        de: 'Abteilung'
      },
      role: {
        en: 'Role',
        pt: 'Função',
        es: 'Rol',
        ru: 'Роль',
        de: 'Rolle'
      },
      avatar: {
        en: 'Avatar',
        pt: 'Avatar',
        es: 'Avatar',
        ru: 'Аватар',
        de: 'Avatar'
      },
      uploadPhoto: {
        en: 'Upload Photo',
        pt: 'Enviar Foto',
        es: 'Subir Foto',
        ru: 'Загрузить фото',
        de: 'Foto hochladen'
      },
      saveChanges: {
        en: 'Save Changes',
        pt: 'Salvar Alterações',
        es: 'Guardar Cambios',
        ru: 'Сохранить изменения',
        de: 'Änderungen speichern'
      },
      cancel: {
        en: 'Cancel',
        pt: 'Cancelar',
        es: 'Cancelar',
        ru: 'Отменить',
        de: 'Abbrechen'
      }
    };
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.length > 1 
      ? names[0][0] + names[names.length - 1][0]
      : names[0][0] + (names[0][1] || '');
  };

  const handleSave = () => {
    console.log('Saving user data:', userData);
    toast({
      title: "Account updated",
      description: "Your account information has been updated successfully!",
    });
    navigate(-1);
  };

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.repeatPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match!",
        variant: "destructive"
      });
      return;
    }

    const isValidPassword = passwordRequirements.every(req => req.check(passwordData.newPassword));
    if (!isValidPassword) {
      toast({
        title: "Error",
        description: "Password doesn't meet requirements!",
        variant: "destructive"
      });
      return;
    }

    console.log('Changing password...');
    toast({
      title: "Password changed",
      description: "Your password has been changed successfully!",
    });
    setPasswordData({ currentPassword: '', newPassword: '', repeatPassword: '' });
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData({...userData, avatar: e.target?.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="animated-bg"></div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          {getText('title')}
        </h1>
      </div>

      <div className="space-y-6">
        {/* Personal Information Card */}
        <Card className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-yellow-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <User className="w-5 h-5 text-yellow-400" />
              {getText('personalInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl">
                {userData.avatar ? (
                  <img src={userData.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  getInitials(userData.name)
                )}
              </div>
              <div>
                <Label className="text-white">{getText('avatar')}</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label htmlFor="avatar-upload">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400 cursor-pointer"
                      asChild
                    >
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        {getText('uploadPhoto')}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-white">{getText('fullName')}</Label>
                <Input
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="bg-gray-700 border-yellow-500/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">{getText('email')}</Label>
                <Input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  className="bg-gray-700 border-yellow-500/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">{getText('phone')}</Label>
                <Input
                  value={userData.phone}
                  onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  className="bg-gray-700 border-yellow-500/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">{getText('department')}</Label>
                <Input
                  value={userData.department}
                  onChange={(e) => setUserData({...userData, department: e.target.value})}
                  className="bg-gray-700 border-yellow-500/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">{getText('role')}</Label>
                <Input
                  value={userData.role}
                  disabled
                  className="bg-gray-600 border-yellow-500/20 text-gray-300"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-600">
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="border-gray-500 text-gray-300 hover:bg-gray-600"
              >
                {getText('cancel')}
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:to-yellow-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {getText('saveChanges')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-yellow-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Lock className="w-5 h-5 text-yellow-400" />
              {getText('changePassword')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Current Password */}
              <div>
                <Label className="text-white">{getText('currentPassword')}</Label>
                <div className="relative">
                  <Input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="bg-gray-700 border-yellow-500/20 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <Label className="text-white">{getText('newPassword')}</Label>
                <div className="relative">
                  <Input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="bg-gray-700 border-yellow-500/20 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                
                {/* Password Requirements */}
                <div className="mt-3 space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className={`flex items-center text-sm ${
                      req.check(passwordData.newPassword) ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        req.check(passwordData.newPassword) ? 'bg-green-400' : 'bg-gray-400'
                      }`} />
                      {req.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Repeat Password */}
              <div>
                <Label className="text-white">{getText('repeatPassword')}</Label>
                <div className="relative">
                  <Input
                    type={showPasswords.repeat ? "text" : "password"}
                    value={passwordData.repeatPassword}
                    onChange={(e) => setPasswordData({...passwordData, repeatPassword: e.target.value})}
                    className="bg-gray-700 border-yellow-500/20 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setShowPasswords({...showPasswords, repeat: !showPasswords.repeat})}
                  >
                    {showPasswords.repeat ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Password Action Button */}
            <div className="flex items-center justify-end pt-4 border-t border-gray-600">
              <Button
                onClick={handlePasswordSave}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:to-yellow-700"
              >
                <Lock className="w-4 h-4 mr-2" />
                {getText('changePassword')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditAccount;
