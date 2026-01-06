// models/User.ts
import mongoose, { Schema, Document, model, models } from 'mongoose';

// 1. The Shape of the Data
export interface IUser extends Document {
  name?: string; 
  language: 'en' | 'hi' | 'kn'; // App Interface Language
  
  subscription: {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  };

  // ✅ UPGRADED: Now stores Enabled + Language for each
  preferences: {
    dailyQuote: { enabled: boolean; lang: 'en' | 'hi' | 'kn' };
    tithi:      { enabled: boolean; lang: 'en' | 'hi' | 'kn' };
    updates:    { enabled: boolean; lang: 'en' | 'hi' | 'kn' };
  };

  createdAt: Date;
}

// 2. The Mongoose Schema
const UserSchema = new Schema<IUser>({
  name: { type: String, required: false },
  language: { type: String, enum: ['en', 'hi', 'kn'], default: 'en' },
  
  subscription: {
    endpoint: { type: String, required: true, unique: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
  },

  preferences: {
    dailyQuote: { 
      enabled: { type: Boolean, default: true },
      lang: { type: String, default: 'en' }
    },
    tithi: { 
      enabled: { type: Boolean, default: true },
      lang: { type: String, default: 'hi' } // Defaults to Hindi for Tithi (makes sense!)
    },
    updates: { 
      enabled: { type: Boolean, default: true },
      lang: { type: String, default: 'en' }
    },
  },

  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>('User', UserSchema);
export default User;