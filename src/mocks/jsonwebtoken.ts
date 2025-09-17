const base64UrlEncode = (str: string): string => {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

const base64UrlDecode = (str: string): string => {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return atob(str);
};

export const sign = <T>(payload: T, secret: string): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 3600;

  const jwtPayload = {
    ...payload,
    iat: now,
    exp: exp,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(jwtPayload));

  const signature = base64UrlEncode(secret + encodedHeader + encodedPayload);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const verify = <T>(token: string, secret: string): T => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const [header, payload, signature] = parts;

  // Verify signature (simplified)
  const expectedSignature = base64UrlEncode(secret + header + payload);
  if (signature !== expectedSignature) {
    throw new Error('Invalid signature');
  }

  const decodedPayload = JSON.parse(base64UrlDecode(payload));

  // Check expiration
  if (
    decodedPayload.exp &&
    decodedPayload.exp < Math.floor(Date.now() / 1000)
  ) {
    throw new Error('Token expired');
  }

  return decodedPayload;
};
