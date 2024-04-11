import { useEffect, useState } from "react";

enum NetworkStatus {
  ONLINE = 'online',
  OFFLINE = 'offline'
}
export const useOnlineStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>(() => window.navigator.onLine ? NetworkStatus.ONLINE : NetworkStatus.OFFLINE);

  useEffect(() => {
    
    const handleNetworkStatusChanged = (status: NetworkStatus) => {
      setNetworkStatus(status);
    };

    window.addEventListener("offline", (e) => handleNetworkStatusChanged(NetworkStatus.OFFLINE));
    window.addEventListener("online", (e) => handleNetworkStatusChanged(NetworkStatus.ONLINE));

    return () => {
      window.removeEventListener("offline", (e) => handleNetworkStatusChanged(NetworkStatus.OFFLINE));
      window.removeEventListener("online", (e) => handleNetworkStatusChanged(NetworkStatus.ONLINE));
    };
  }, []);


  return {status: networkStatus};
};
