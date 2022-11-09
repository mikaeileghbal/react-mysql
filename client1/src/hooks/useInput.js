import { useState } from "react";

export default function useInput(initial) {
  const [fields, setFields] = useState(initial);

  const handleInputChange = (e) => {
    console.log(e.target.type);
    const name = e.target.name;
    const value = e.target.value;
    setFields((state) => ({ ...state, [name]: value }));
  };

  const resetFields = () => {
    setFields(getFieldsObject());
  };

  const getFieldsObject = () => {
    const newFields = {};
    for (const key of Object.keys(fields)) {
      newFields[key] = "";
    }
    return newFields;
  };

  return [fields, handleInputChange, setFields, resetFields];
}
