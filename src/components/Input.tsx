import React from "react";

type Props = {
  type: string;
  placeholder?: string;
  name?: string;
  value?: any;
  onChange?: any;
};

function Input({ type, placeholder, name, value, onChange }: Props) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded"
    />
  );
}

export default Input;
