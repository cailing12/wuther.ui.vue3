export const idpBase = 'http://localhost:5000';
export const apiBase = 'http://localhost:5001';
export const wutherBase = 'http://localhost:4200';

export const oidcSetting = {
  apiBase,
  openIdConnectSettings: {
    authority: `${idpBase}`,
    client_id: 'wuther-client',
    redirect_uri: `${wutherBase}/signin-oidc`,
    post_logout_redirec_uri: `${wutherBase}/`,
    silent_redirect_uri: `${wutherBase}/redirect-silentrenew`,
    scope: 'api1 openid profile address email phone',
    response_type: 'id_token token',
    automaticSilentRenew: true
  }
};