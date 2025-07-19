# Google OAuth Integration - Design Documentation

## Project Information
- **Project Name**: Otmizy - AI-Powered Ads Management Platform
- **Frontend URL**: https://otmizy.com
- **Backend URL**: https://backend.otmizy.com
- **OAuth Implementation**: Google Ads API Integration
- **Document Version**: 1.0
- **Date**: January 2025

---

## 1. Overview

Otmizy is an AI-powered advertising management platform that integrates with Google Ads API to provide users with comprehensive campaign management, analytics, and optimization tools. This document outlines the technical design and implementation of our Google OAuth 2.0 integration.

### 1.1 Purpose
The Google OAuth integration enables users to:
- Securely authenticate with their Google Ads accounts
- Access and manage Google Ads campaigns
- Retrieve advertising data and analytics
- Perform automated optimizations

### 1.2 Scope
This documentation covers:
- OAuth 2.0 flow implementation
- Frontend and backend architecture
- Security measures and data handling
- Error handling and user experience
- API endpoints and data structures

---

## 2. Architecture Overview

### 2.1 System Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend       │    │  Google APIs    │
│   (React/TS)    │◄──►│   (Node.js)      │◄──►│   OAuth 2.0     │
│                 │    │                  │    │   Ads API       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### 2.2 Technology Stack
- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Node.js, Express
- **Authentication**: OAuth 2.0
- **Storage**: localStorage (frontend), secure token storage (backend)
- **Communication**: REST API, postMessage API

---

## 3. OAuth 2.0 Flow Implementation

### 3.1 Authorization Flow
```
1. User clicks "Connect Google Ads"
2. Frontend requests auth URL from backend
3. Backend generates OAuth URL with proper scopes
4. Frontend opens popup with OAuth URL
5. User authorizes in Google
6. Google redirects to backend callback
7. Backend exchanges code for tokens
8. Backend sends success message to frontend
9. Frontend receives tokens and user data
10. Data is stored locally with expiration
```

### 3.2 Required Scopes
```
https://www.googleapis.com/auth/adwords
https://www.googleapis.com/auth/userinfo.email
https://www.googleapis.com/auth/userinfo.profile
```

---

## 4. API Endpoints

### 4.1 Initiate OAuth
**Endpoint**: `GET /api/google/initiate`

**Response**:
```json
{
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

### 4.2 OAuth Callback
**Endpoint**: `GET /api/google/callback`

**Parameters**:
- `code`: Authorization code from Google
- `state`: CSRF protection token

**Response**: HTML page with postMessage to parent window

---

## 5. Frontend Implementation

### 5.1 OAuth Service Class
```typescript
export class GoogleAdsOAuthService {
  async initiateOAuth(): Promise<string>
  async openOAuthPopup(): Promise<{accessToken: string, refreshToken?: string}>
  async completeOAuthFlow(): Promise<{accessToken: string, userInfo?: any}>
}
```

### 5.2 React Component Integration
```typescript
const openGoogleAuth = async () => {
  setIsGoogleConnecting(true);
  try {
    // Fetch auth URL from backend
    const response = await fetch('/api/google/initiate');
    const data = await response.json();
    
    // Open popup with auth URL
    const popup = window.open(data.authUrl, 'google_auth', 'width=500,height=600');
    
    // Handle popup response via postMessage
  } catch (error) {
    // Error handling
  }
};
```

### 5.3 Message Handling
```typescript
const handleMessage = (event: MessageEvent) => {
  switch (event.data.type) {
    case 'GOOGLE_AUTH_SUCCESS':
      // Process successful authentication
      break;
    case 'GOOGLE_AUTH_ERROR':
      // Handle authentication errors
      break;
  }
};
```

---

## 6. Data Structures

### 6.1 Google Auth Result
```typescript
interface GoogleAuthResult {
  accessToken: string;
  refreshToken: string;
  userInfo: {
    id: string;
    name: string;
    email: string;
    picture?: string;
  };
  adsAccounts: {
    resourceNames: string[];
  };
  timestamp: number;
}
```

### 6.2 Error Response
```typescript
interface AuthError {
  type: 'GOOGLE_AUTH_ERROR';
  error: string;
  details?: any;
}
```

---

## 7. Security Measures

### 7.1 Data Protection
- **Token Storage**: Secure storage with expiration timestamps
- **CSRF Protection**: State parameter validation
- **Origin Validation**: postMessage origin verification
- **Popup Security**: Controlled popup dimensions and permissions

### 7.2 Privacy Compliance
- **Data Minimization**: Only request necessary scopes
- **User Consent**: Clear authorization flow
- **Data Retention**: Configurable token expiration (30-60 days)
- **Secure Transmission**: HTTPS only

---

## 8. Error Handling

### 8.1 Frontend Error Handling
```typescript
try {
  // OAuth flow
} catch (error) {
  console.error('OAuth Error:', error);
  setAuthErrors(prev => [...prev, `Google: ${error.message}`]);
  setIsGoogleConnecting(false);
}
```

### 8.2 Common Error Scenarios
- **Popup Blocked**: User notification and instructions
- **Network Errors**: Retry mechanism with exponential backoff
- **Invalid Tokens**: Automatic re-authentication flow
- **Scope Denial**: Clear error messaging

---

## 9. User Experience

### 9.1 Authentication Flow UX
1. **Clear Call-to-Action**: "Connect Google Ads Account" button
2. **Loading States**: Visual feedback during authentication
3. **Error Messages**: User-friendly error descriptions
4. **Success Confirmation**: Account connection status

### 9.2 Persistent Authentication
- **Auto-Login**: Saved credentials for returning users
- **Token Refresh**: Automatic token renewal
- **Disconnect Option**: User-controlled account disconnection

---

## 10. Testing and Validation

### 10.1 Test Scenarios
- ✅ Successful OAuth flow
- ✅ Popup blocked scenario
- ✅ Network failure handling
- ✅ Token expiration
- ✅ User cancellation
- ✅ Invalid credentials

### 10.2 Debug Logging
```typescript
console.log('🔄 Iniciando autenticação Google...');
console.log('📡 Resposta do /api/google/initiate:', response.status);
console.log('🔗 URL de autenticação:', authUrl);
console.log('✅ Popup aberto com sucesso');
console.log('📨 Mensagem recebida:', event.data);
```

---

## 11. Compliance and Verification

### 11.1 Google API Compliance
- **OAuth 2.0 Standard**: Full compliance with RFC 6749
- **Google Ads API**: Adherence to Google Ads API policies
- **Rate Limiting**: Respect for API quotas and limits
- **Data Usage**: Transparent data usage policies

### 11.2 Security Review Requirements
- **HTTPS Enforcement**: All communications over HTTPS
- **Token Security**: Secure token storage and transmission
- **User Privacy**: Clear privacy policy and data handling
- **Audit Trail**: Comprehensive logging for security review

---

## 12. Deployment Configuration

### 12.1 Environment Variables
```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=https://backend.otmizy.com/api/google/callback
FRONTEND_URL=https://otmizy.com
```

### 12.2 Domain Configuration
- **Authorized Origins**: https://otmizy.com
- **Redirect URIs**: https://backend.otmizy.com/api/google/callback
- **JavaScript Origins**: https://otmizy.com

---

## 13. Support and Maintenance

### 13.1 Monitoring
- **Authentication Success Rate**: Track successful OAuth flows
- **Error Rates**: Monitor and alert on authentication failures
- **Performance Metrics**: OAuth flow completion times

### 13.2 Support Contacts
- **Technical Lead**: development@otmizy.com
- **Security Team**: security@otmizy.com
- **Support Team**: support@otmizy.com

---

## 14. Appendices

### 14.1 Code Repository
- **Frontend**: React TypeScript implementation
- **Backend**: Node.js Express server
- **Documentation**: This design document

### 14.2 External Dependencies
- **Google APIs Client Library**
- **OAuth 2.0 Libraries**
- **Security Libraries**

---

**Document Prepared By**: Otmizy Development Team  
**Review Date**: January 2025  
**Next Review**: July 2025  

*This document is prepared for Google Developer verification and compliance review.*