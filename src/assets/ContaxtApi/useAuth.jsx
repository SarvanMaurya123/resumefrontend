import { useContext } from 'react';
import { AuthContext } from '../ContaxtApi/Context';

export const useAuth = () => useContext(AuthContext);
