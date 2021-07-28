import React, { useContext } from "react";

export type Auth = {
    /**
     * Get the username of the authenticated user
     */
    getUsername: () => Promise<string>;
    getToken: () => Promise<string>;
};

/**
 * The AuthContext allows access to the Auth context
 */
export const AuthContext: React.Context<Auth | undefined> = React.createContext<Auth | undefined>(undefined);

/**
 * useAuth is a custom hook that is a shorthand for useContext(AuthContext)
 */
export const useAuth = (): Auth | undefined => useContext(AuthContext);