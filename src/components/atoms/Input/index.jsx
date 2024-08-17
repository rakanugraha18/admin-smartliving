import InputText from "./InputText";
import Label from "./Label";

const InputForm = (props) => {
  const { label, name, type, placeholder, onChange, value, id, htmlFor } =
    props;
  return (
    <div className="mb-3">
      <Label htmlFor={htmlFor}>{label}</Label>
      <InputText
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        id={id}
        name={name}
        type={type}
      />
    </div>
  );
};

export default InputForm;
