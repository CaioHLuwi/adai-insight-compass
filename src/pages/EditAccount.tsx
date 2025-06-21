
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { User, Upload, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EditAccount = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'João Silva',
    email: 'joao.silva@example.com',
    role: 'Admin',
    phone: '+55 11 99999-9999',
    department: 'Marketing',
    avatar: null as string | null
  });

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
    // Save to database logic here
    console.log('Saving user data:', userData);
    toast({
      title: "Account updated",
      description: "Your account information has been updated successfully!",
    });
    navigate(-1); // Go back to previous page
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
      </div>
    </div>
  );
};

export default EditAccount;
