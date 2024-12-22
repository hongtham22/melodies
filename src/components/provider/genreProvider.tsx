'use client';

import { fetchApiData } from '@/app/api/appService';
import { useAppContext } from '@/app/AppProvider';
import { GenreData } from '@/types/interfaces';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface GenreContextType {
  listGenres: GenreData[];
  setListGenres: (artists: GenreData[]) => void;
}

const GenreContext = createContext<GenreContextType | undefined>(undefined);

// Hook để sử dụng context
export const useGenreContext = () => {
  const context = useContext(GenreContext);
  if (!context) {
    throw new Error('useGenreContext must be used within an GenreProvider');
  }
  return context;
};

export const GenreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [listGenres, setListGenres] = useState<GenreData[]>([]);
  const { accessToken } = useAppContext();

  useEffect(() => {
    const fetchGenres = async () => {
    try{
        const response = await fetchApiData(
         "/api/admin/allGenre", "GET", null, accessToken
        );
        if(response.success) {
            setListGenres(response.data.genres);
        }

    } catch (error) {
        console.error("Error fetching genres:", error);
    }
    };

    fetchGenres();
  }, [accessToken]);

  return (
    <GenreContext.Provider value={{ listGenres, setListGenres }}>
      {children}
    </GenreContext.Provider>
  );
};
