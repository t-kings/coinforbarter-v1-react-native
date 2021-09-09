export interface NotificationType {
  success: (message: string) => void;
  error: (message: string) => void;
  setExpiryTime: (expiryTime: number) => void;
}
export interface Props {
  children: JSX.Element;
}
