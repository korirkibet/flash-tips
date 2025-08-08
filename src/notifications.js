import Logo from './assets/logo.png'
import Logo128 from './assets/logo128.png'

export async function requestNotificationPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.error('Notification permission denied.');
      }
    } else {
      console.error('This browser does not support notifications.');
    }
  }


  export async function showNotification() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification('Flash VIP TIPS', {
        body: 'Welcome To FLASH VIP TIPS New! Subscribe To Our Premium VIP TIPS',
        icon: Logo,
        badge: Logo128,
      });
    } else {
      console.error('Service worker is not ready.');
    }
  }
  export function triggerLocalNotification() {
    if ('Notification' in window) {
      new Notification('Flash VIP Tips', {
        body: 'New VIP tips available!',
        icon: '/logo512.png',
      });
    }
  }
  