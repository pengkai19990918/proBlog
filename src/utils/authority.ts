const AUTHORITY_KEY = 'app-authority';
const TOKEN_KEY = 'app-token';
const USER_ID = 'app-userid';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem(AUTHORITY_KEY) : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design Dedicated environment variable, please do not use it in your project.
  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }
  return authority;
}

export function setAuthority(authority: string | string[], callback?: () => void): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem(AUTHORITY_KEY, JSON.stringify(proAuthority));
  // auto reload
  // reloadAuthorized();
  callback?.();
}

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string, callback?: () => void): void => {
  localStorage.setItem(TOKEN_KEY, token);
  callback?.();
};

export const getUserId = (): string | null => {
  return localStorage.getItem(USER_ID);
};

export const setUserId = (userid: string, callback?: () => void): void => {
  localStorage.setItem(USER_ID, userid);
  callback?.();
};

export const removeUserId = (): void => {
  localStorage.removeItem(USER_ID);
};
