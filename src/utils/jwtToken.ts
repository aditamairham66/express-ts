import jwt, { SignOptions } from 'jsonwebtoken';

class JwtToken {
  private static readonly secretKey: string = 'your-secret-key';

  public static generateToken(payload: object, expiresIn: string = '1h'): string {
    // Periksa apakah payload sudah memiliki properti exp
    if ('exp' in payload) {
      delete payload['exp']; // Hapus properti exp jika sudah ada
    }

    const options: SignOptions = { expiresIn, noTimestamp: true };
    return jwt.sign(payload, this.secretKey, options);
  }

  public static verifyToken(token: string): object | string {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return 'Invalid token';
    }
  }

  public static updateToken(currentToken: string): string {
    const decoded = this.verifyToken(currentToken);

    if (typeof decoded === 'object') {
      const updatedToken = this.generateToken(decoded);
      return updatedToken;
    }

    return currentToken;
  }
}

export default JwtToken;
