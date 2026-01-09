import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile from profiles table
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return null;
      }
      return data;
    } catch (err) {
      console.error('Error in fetchProfile:', err);
      return null;
    }
  };

  // Fetch user role from user_roles table using security definer function
  const fetchUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .rpc('get_user_role', { _user_id: userId });

      if (error) {
        console.error('Error fetching user role:', error);
        return 'customer'; // Default to customer if role fetch fails
      }
      return data || 'customer';
    } catch (err) {
      console.error('Error in fetchUserRole:', err);
      return 'customer';
    }
  };

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Defer profile and role fetching with setTimeout to prevent deadlock
        if (currentSession?.user) {
          setTimeout(async () => {
            const [profileData, role] = await Promise.all([
              fetchProfile(currentSession.user.id),
              fetchUserRole(currentSession.user.id)
            ]);
            setProfile(profileData);
            setUserRole(role);
            setIsLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setUserRole(null);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: existingSession } }) => {
      setSession(existingSession);
      setUser(existingSession?.user ?? null);

      if (existingSession?.user) {
        const [profileData, role] = await Promise.all([
          fetchProfile(existingSession.user.id),
          fetchUserRole(existingSession.user.id)
        ]);
        setProfile(profileData);
        setUserRole(role);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      // Profile and role will be fetched by onAuthStateChange listener
      return { success: true, user: data.user };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: name,
          },
        },
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      // Profile and role will be created by database trigger and fetched by onAuthStateChange
      return { success: true, user: data.user };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
      setUser(null);
      setSession(null);
      setProfile(null);
      setUserRole(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      setProfile(data);
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Build user object with profile data for backwards compatibility
  const userWithProfile = user ? {
    id: user.id,
    email: user.email,
    name: profile?.name || user.email?.split('@')[0] || '',
    avatar: profile?.avatar_url,
    phone: profile?.phone || '',
    address: profile?.address || '',
    createdAt: profile?.created_at || user.created_at,
    role: userRole || 'customer',
  } : null;

  const value = {
    user: userWithProfile,
    session,
    profile,
    isLoading,
    isAuthenticated: !!session,
    isAdmin: userRole === 'admin',
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
