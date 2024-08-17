const InputText = (props) => {
  const { type, name, value, onChange, placeholder, required, id } = props;
  return (
    <input
      type={type}
      name={name}
      id={id}
      className="border border-[#16697A] sm:text-sm focus:ring-[#16697A] focus:outline-none rounded-[15px] block w-full p-2.5 "
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default InputText;
