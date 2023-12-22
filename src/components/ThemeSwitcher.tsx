'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { LuMonitor, LuMoon, LuSun } from 'react-icons/lu';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      <Tabs defaultValue={theme}>
        <TabsList className='border'>
          <TabsTrigger value='light' onClick={() => setTheme('light')}>
            <LuSun className='h-[1.2rem] w-[1.2rem]' />
          </TabsTrigger>
          <TabsTrigger value='dark' onClick={() => setTheme('dark')}>
            <LuMoon className='h-[1.2rem] w-[1.2rem]' />
          </TabsTrigger>
          <TabsTrigger value='system' onClick={() => setTheme('system')}>
            <LuMonitor className='h-[1.2rem] w-[1.2rem]' />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}

export default ThemeSwitcher;
