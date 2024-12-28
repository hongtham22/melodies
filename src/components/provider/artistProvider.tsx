'use client';

import { fetchApiData } from '@/app/api/appService';
import { useAppContext } from '@/app/AppProvider';
import { Cookie } from 'lucide-react';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Artist {
    id: string;
    name: string;
    avatar: string;
  }

interface ArtistContextType {
  listArtists: Artist[];
  setListArtists: (artists: Artist[]) => void;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

// Hook để sử dụng context
export const useArtistContext = () => {
  const context = useContext(ArtistContext);
  if (!context) {
    throw new Error('useArtistContext must be used within an ArtistProvider');
  }
  return context;
};

// ArtistProvider
export const ArtistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [listArtists, setListArtists] = useState<Artist[]>([]);
  const { role, accessToken } = useAppContext();



  useEffect(() => {
    if(accessToken && role === 'Admin') {

      const fetchArtists = async () => {
      try{
          const response = await fetchApiData(
            "/api/admin/allArtistName",
            "GET",
            null,
            accessToken
          );
          if(response.success) {
              setListArtists(response.data.artists);
          }
  
      } catch (error) {
          console.error("Error fetching artists:", error);
      }
      };
  
      fetchArtists();
    }
  }, [accessToken, role]);

  return (
    <ArtistContext.Provider value={{ listArtists, setListArtists }}>
      {children}
    </ArtistContext.Provider>
  );
};
