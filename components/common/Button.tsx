type ButtonProps = {
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
} & typeof defaultProps;

const defaultProps = {
  type: 'button',
};

function Button({ type, onClick, children }: ButtonProps) {
  return (
    <button
      type={type}
      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer mt-1"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
Button.defaultProps = defaultProps;

export default Button;
