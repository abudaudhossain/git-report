import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { useEffect } from 'react';
import { getAPI } from 'api/axios';
import { useStore } from 'contexts/StoreContext';
import { useNavigate } from 'react-router-dom';


// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  const { user, setUser } = useStore()
  useEffect(async () => {
    const fetchUser = async () => {
      try {
        let res = await getAPI("/api/v1/auth/success");
        if (res.isSuccess) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);


  return (
    <ThemeCustomization>
      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
    </ThemeCustomization>
  );
}
