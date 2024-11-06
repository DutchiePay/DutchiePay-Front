import Cookies from 'universal-cookie';

const useClearUserData = () => {
  const clearUserData = () => {
    const cookies = new Cookies();
    cookies.remove('refresh', { path: '/' });
    localStorage.removeItem('dutchie-rememberMe');
    sessionStorage.removeItem('user');

    const channel = new BroadcastChannel('auth-channel');
    channel.postMessage({ type: 'logout-event' });
    channel.close();
  };

  return clearUserData;
};

export default useClearUserData;
