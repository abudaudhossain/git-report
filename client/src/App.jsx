import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { useEffect } from 'react';
import { getAPI } from 'api/axios';


// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  
  useEffect(async () => {
   try {
    let res = await getAPI("/api/v1/auth/success")
    if(res.isSuccess){
      
    }
   } catch (error) {

   }

  }, []);
  return (
    <ThemeCustomization>
      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
    </ThemeCustomization>
  );
}
