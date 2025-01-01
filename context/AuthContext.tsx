"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authAPI from '../api/authAPI';
import { decodeToken } from '../util/decodeToken';
import { Role } from '../enum/RoleEnum';

interface AuthState {
    authenticated: boolean;
    id: number | null;
    role: Role | null;
}
  
interface AuthProps {
    authState: AuthState;
    onLogin: (username: string, password: string, remember: boolean) => Promise<AuthState>;
    onLogout: () => void;
}
  
const AuthContext = createContext<AuthProps | null>(null);
  
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
  
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
      authenticated: false,
      id: null,
      role: null,
    });
  
    const restoreAuthState = () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const decodedToken = decodeToken(accessToken);
  
          if (decodedToken) {
            let userRole: Role | null = null;
  
            switch (decodedToken.role) {
              case 'MANAGER':
                userRole = Role.MANAGER;
                break;
              case 'STUDENT':
                userRole = Role.STUDENT;
                break;
              case 'TEACHER':
                userRole = Role.TEACHER;
                break;
            }
  
            setAuthState({
              authenticated: true,
              id: Number(decodedToken.id),
              role: userRole,
            });
          } else {
            console.log('Error while decoding token.');
          }
        }
      } catch (error) {
        console.error('Error restoring auth state from localStorage:', error);
      }
    };
  
    useEffect(() => {
      restoreAuthState();
    }, []);
  
    const onLogin = async (username: string, password: string, remember: boolean): Promise<AuthState> => {
      try {
        const response = await authAPI.login(username, password);
        const accessToken = response.data.accToken;
        const refreshToken = response.data.refreshToken;
  
        if (remember) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        }
  
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
  
        const decodedToken = decodeToken(accessToken);
  
        if (decodedToken) {
          let userRole: Role | null = null;
  
          switch (decodedToken.role) {
            case 'MANAGER':
              userRole = Role.MANAGER;
              break;
            case 'STUDENT':
              userRole = Role.STUDENT;
              break;
            case 'TEACHER':
              userRole = Role.TEACHER;
              break;
          }
  
          const newAuthState: AuthState = {
            authenticated: true,
            id: Number(decodedToken.id),
            role: userRole,
          };
  
          setAuthState(newAuthState);
          return newAuthState;
        } else {
          console.log('Error while decoding token.');
          return {
            authenticated: false,
            id: null,
            role: null,
          };
        }
      } catch (error) {
        console.error('Unexpected error occurred during login:', error);
        return {
          authenticated: false,
          id: null,
          role: null,
        };
      }
    };
  
    const onLogout = () => {
      setAuthState({
        authenticated: false,
        id: null,
        role: null,
      });
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    };
  
    return (
      <AuthContext.Provider value={{ authState, onLogin, onLogout }}>
        {children}
      </AuthContext.Provider>
    );
};
  
export default AuthProvider;