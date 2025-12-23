import { userModel } from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import { RegisterDto, LoginDto, AuthResponse } from '../types/auth.types';

export const authService = {
  async register(data: RegisterDto): Promise<AuthResponse> {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await userModel.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(data.password);

    // Créer l'utilisateur
    const user = await userModel.create({
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });

    // Générer le token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  },

  async login(data: LoginDto): Promise<AuthResponse> {
    // Trouver l'utilisateur
    const user = await userModel.findByEmail(data.email);
    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Générer le token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  },
};
