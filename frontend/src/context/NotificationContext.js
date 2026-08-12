import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { notificationService } from "../services/notificationService";

const NotificationContext =
  createContext(null);

export function NotificationProvider({
  children,
}) {
  const [notifications,
    setNotifications] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications =
    async () => {
      try {
        const data =
          await notificationService.list();

        setNotifications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  const markAllRead =
    async () => {
      try {
        const updated =
          notifications.map(
            (item) => ({
              ...item,
              read_status: true,
            })
          );

        setNotifications(
          updated
        );

        await Promise.all(
          notifications.map(
            (item) =>
              notificationService.update(
                item.id,
                {
                  ...item,
                  readStatus:
                    true,
                }
              )
          )
        );
      } catch (err) {
        console.error(err);
      }
    };

  const unreadCount =
    notifications.filter(
      (item) =>
        !item.read_status
    ).length;

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      loading,
      markAllRead,
      refresh:
        loadNotifications,
    }),
    [
      notifications,
      unreadCount,
      loading,
    ]
  );

  return (
    <NotificationContext.Provider
      value={value}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context =
    useContext(
      NotificationContext
    );

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return context;
}