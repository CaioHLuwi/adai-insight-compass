
export const translations = {
  pt: {
    // Login page
    welcomeBack: 'Bem-vindo de volta',
    loginSubtitle: 'Digite seu e-mail e senha para continuar',
    email: 'E-mail',
    password: 'Senha',
    enter: 'Entrar',
    dontHaveAccount: 'Não tem conta?',
    register: 'Cadastrar',
    forgetPassword: 'Esqueceu a senha?',
    clickHere: 'Clique aqui',
    resetPassword: 'Redefinir Senha',
    sendCode: 'Enviar Código',
    verificationCode: 'Código de Verificação',
    verifyCode: 'Verificar Código',
    newPassword: 'Nova Senha',
    confirmPassword: 'Confirmar Senha',
    confirmNewPassword: 'Confirmar Nova Senha',
    
    // Register page
    createAccount: 'Criar Conta',
    registerSubtitle: 'Junte-se a nós para começar sua jornada',
    alreadyHaveAccount: 'Já tem conta?',
    termsText: 'Li e concordo com os',
    termsOfUse: 'Termos de Uso',
    privacyPolicy: 'Política de Privacidade',
    cookiesPolicy: 'Política de Cookies',
    
    // Errors
    emailRequired: 'E-mail é obrigatório',
    emailInvalid: 'Digite um e-mail válido',
    passwordRequired: 'Senha é obrigatória',
    passwordMinLength: 'A senha deve ter pelo menos 8 caracteres',
    passwordRequirements: 'A senha deve conter: ',
    atLeast8Characters: 'pelo menos 8 caracteres',
    oneCapitalLetter: '1 letra maiúscula',
    oneSymbol: '1 símbolo',
    passwordsDoNotMatch: 'As senhas não coincidem',
    pleaseAgreeToTerms: 'Por favor, concorde com os termos e condições',
    invalidCredentials: 'Credenciais inválidas',
    userAlreadyExists: 'Usuário já existe',
    loginError: 'Erro ao fazer login',
    registerError: 'Erro ao cadastrar',
  },
  en: {
    // Login page
    welcomeBack: 'Welcome back',
    loginSubtitle: 'Enter your e-mail and password to continue',
    email: 'E-mail',
    password: 'Password',
    enter: 'Enter',
    dontHaveAccount: "Don't have account?",
    register: 'Register',
    forgetPassword: 'Forget password?',
    clickHere: 'Click here',
    resetPassword: 'Reset Password',
    sendCode: 'Send Code',
    verificationCode: 'Verification Code',
    verifyCode: 'Verify Code',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    confirmNewPassword: 'Confirm New Password',
    
    // Register page
    createAccount: 'Create Account',
    registerSubtitle: 'Join us to start your journey',
    alreadyHaveAccount: 'Already have account?',
    termsText: 'I have read and agree to the',
    termsOfUse: 'Terms of Use',
    privacyPolicy: 'Privacy Policy',
    cookiesPolicy: 'Cookies Policy',
    
    // Errors
    emailRequired: 'E-mail is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordMinLength: 'Password must be at least 8 characters',
    passwordRequirements: 'Password must contain: ',
    atLeast8Characters: 'at least 8 characters',
    oneCapitalLetter: '1 capital letter',
    oneSymbol: '1 symbol',
    passwordsDoNotMatch: 'Passwords do not match',
    pleaseAgreeToTerms: 'Please agree to the terms and conditions',
    invalidCredentials: 'Invalid credentials',
    userAlreadyExists: 'User already exists',
    loginError: 'Login error',
    registerError: 'Registration error',
  },
  es: {
    // Login page
    welcomeBack: 'Bienvenido de vuelta',
    loginSubtitle: 'Ingresa tu correo y contraseña para continuar',
    email: 'Correo',
    password: 'Contraseña',
    enter: 'Entrar',
    dontHaveAccount: '¿No tienes cuenta?',
    register: 'Registrarse',
    forgetPassword: '¿Olvidaste tu contraseña?',
    clickHere: 'Haz clic aquí',
    resetPassword: 'Restablecer Contraseña',
    sendCode: 'Enviar Código',
    verificationCode: 'Código de Verificación',
    verifyCode: 'Verificar Código',
    newPassword: 'Nueva Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    confirmNewPassword: 'Confirmar Nueva Contraseña',
    
    // Register page
    createAccount: 'Crear Cuenta',
    registerSubtitle: 'Únete a nosotros para comenzar tu viaje',
    alreadyHaveAccount: '¿Ya tienes cuenta?',
    termsText: 'He leído y acepto los',
    termsOfUse: 'Términos de Uso',
    privacyPolicy: 'Política de Privacidad',
    cookiesPolicy: 'Política de Cookies',
    
    // Errors
    emailRequired: 'El correo es obligatorio',
    emailInvalid: 'Por favor ingresa un correo válido',
    passwordRequired: 'La contraseña es obligatoria',
    passwordMinLength: 'La contraseña debe tener al menos 8 caracteres',
    passwordRequirements: 'La contraseña debe contener: ',
    atLeast8Characters: 'al menos 8 caracteres',
    oneCapitalLetter: '1 letra mayúscula',
    oneSymbol: '1 símbolo',
    passwordsDoNotMatch: 'Las contraseñas no coinciden',
    pleaseAgreeToTerms: 'Por favor acepta los términos y condiciones',
    invalidCredentials: 'Credenciales inválidas',
    userAlreadyExists: 'El usuario ya existe',
    loginError: 'Error al iniciar sesión',
    registerError: 'Error al registrarse',
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.pt;

export const getTranslation = (language: Language, key: TranslationKey): string => {
  return translations[language]?.[key] || translations.pt[key] || key;
};
