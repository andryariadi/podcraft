type InputFieldProps = {
  icon: React.ReactNode;
  passIcon?: React.ReactNode;
  openPass?: boolean;
  setOpenPass?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  propData?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({ icon, passIcon, openPass, setOpenPass, type, propData, ...props }: InputFieldProps) => {
  return (
    <div className="relative">
      {/* Left icon */}
      <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none text-orange-1">{icon}</div>

      {/* Password visibility toggle (for password fields only) */}
      {type === "password" || type === "text" ? (
        <div className="absolute inset-y-0 right-0 px-3 flex items-center text-orange-1 cursor-pointer" onClick={() => setOpenPass && setOpenPass(!openPass)}>
          {passIcon}
        </div>
      ) : null}

      {/* Input field */}
      <input
        {...propData}
        {...props}
        type={type}
        className="w-full py-3 pl-11 pr-11 bg-black-1 rounded-lg outline-none border border-gray-800 focus:border-orange-1 text-white-2 placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300"
      />
    </div>
  );
};

export default InputField;
