export interface IFormButtonProps {
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    isLoading?: boolean;
  }

  export type TInputFormProps = {
    control: Control<any>;
    name: string;
    type?: string;
    error?: string;
    placeholder?: string;
    children?: React.ReactNode;
  };
  
  export interface ILabelProps {
    children: ReactNode;
    htmlFor?: string;
    className?: string;
  }
  
  export interface IEyeIconToggleProps {
    open?: boolean;
    onClick?: () => void;
  }
  
  export type ClassValue = string | { [key: string]: boolean };

  export interface ILikeToggleProps {
    isLiked?: boolean;
    onClick?: () => void;
}

export interface IDislikeToggleProps {
    isDisliked?: boolean;
    onClick?: () => void;
}