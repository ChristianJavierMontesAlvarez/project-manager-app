import { ErrorMessageBox } from "../../components"

export const TextField = ({ id, name, type, labelTitle, error, errorMessage, value, onChange }) => {
  return (
    <>
      <label htmlFor="displayName">{ labelTitle }</label>
      <input
        className="w-full block mt-2 border-l-[2px] border-b-[1px] border-l-violet border-b-violet focus:border-l-[6px] outline-none duration-75"
        id={ id }
        name={ name }
        type={ type }
        value={ value }
        onChange={ onChange }
      />

      {
        error && <ErrorMessageBox errorMessage={ errorMessage }/>
      }
    </>
  )
}