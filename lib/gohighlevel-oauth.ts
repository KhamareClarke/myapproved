// GoHighLevel OAuth 2.0 Authentication Service
// This service handles OAuth 2.0 authentication with GoHighLevel CRM

interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  baseUrl?: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export class GoHighLevelOAuth {
  private config: OAuthConfig;
  private baseUrl: string;

  constructor(config: OAuthConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://services.leadconnectorhq.com';
  }

  // Generate authorization URL for OAuth flow
  generateAuthUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: 'contacts.write opportunities.write locations.read',
      state: state || 'default'
    });

    return `https://marketplace.gohighlevel.com/oauth/chooselocation?${params.toString()}`;
  }

  // Exchange authorization code for access token
  async exchangeCodeForToken(code: string): Promise<TokenResponse> {
    const response = await fetch(`${this.baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uri: this.config.redirectUri,
        code: code,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OAuth token exchange failed: ${response.status} - ${errorData.error_description || response.statusText}`);
    }

    return await response.json();
  }

  // Refresh access token using refresh token
  async refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
    const response = await fetch(`${this.baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Token refresh failed: ${response.status} - ${errorData.error_description || response.statusText}`);
    }

    return await response.json();
  }

  // Get user's locations
  async getLocations(accessToken: string): Promise<Location[]> {
    const response = await fetch(`${this.baseUrl}/locations/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Version': '2021-07-28'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to get locations: ${response.status} - ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data.locations || [];
  }

  // Test access token validity
  async testToken(accessToken: string): Promise<{ valid: boolean; locationId?: string; locationName?: string }> {
    try {
      const locations = await this.getLocations(accessToken);
      
      if (locations.length > 0) {
        return {
          valid: true,
          locationId: locations[0].id,
          locationName: locations[0].name
        };
      }
      
      return { valid: false };
    } catch (error) {
      console.error('Token test failed:', error);
      return { valid: false };
    }
  }
}

// Factory function to create OAuth service
export function createGoHighLevelOAuth(clientId: string, clientSecret: string, redirectUri: string) {
  return new GoHighLevelOAuth({
    clientId,
    clientSecret,
    redirectUri,
  });
}

// Default export
export default GoHighLevelOAuth;


