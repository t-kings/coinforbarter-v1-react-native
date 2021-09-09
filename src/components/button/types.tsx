export interface Props {
  onClick: () => void;
  children?: JSX.Element;
  additionalStyling?: string;
  isValid?: boolean;
  isRed?: boolean;
}
