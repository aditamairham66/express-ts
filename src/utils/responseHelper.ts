// src/utils/responseHelper.ts
import { Response } from 'express';

class ResponseHelper {
  private static res: Response | null = null;

  static setResponseInstance(resInstance: Response): void {
    this.res = resInstance;
  }

  static send(type: 'success' | 'error', status: number, message: string, data?: any) {
    if (!this.res) {
      throw new Error('Response instance is not set. Call setResponseInstance before using send.');
    }

    const response = {
      type,
      status,
      message,
      data,
    };

    this.res.status(status).json(response);
    return response;
  }

  static sendData(data?: any, message: string = 'Success') {
    if (!this.res) {
      throw new Error('Response instance is not set. Call setResponseInstance before using sendSuccess.');
    }

    return this.send('success', 200, message, data);
  }

  static sendSuccess(message: string = 'Success') {
   if (!this.res) {
     throw new Error('Response instance is not set. Call setResponseInstance before using sendSuccess.');
   }

   return this.send('success', 200, message);
 }

  static sendError(status: number, message: string = 'Error') {
    if (!this.res) {
      throw new Error('Response instance is not set. Call setResponseInstance before using sendError.');
    }

    return this.send('error', status, message);
  }
}

export default ResponseHelper;
