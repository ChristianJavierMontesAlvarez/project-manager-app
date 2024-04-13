import { ErrorMessageBox } from "../../components"

export const TextField = ({ id, type, name, labelTitle, value, onChange, error, errorMessage }) => {
  return (
    <>
      <label htmlFor="" className="text-white text-base font-semibold md:text-xl">{ labelTitle }</label>
      <input
        className="bg-violet text-white outline-none border-b-[1px] border-l-[3px] text-base md:text-lg p-1 focus:rounded-tr-lg focus:border-l-[7px] px-1 duration-75"
        id={ id }
        type={ type }
        name={ name }
        value={ value }
        onChange={ onChange }
      />
      {
        error && <ErrorMessageBox errorMessage={ errorMessage }/>
      }
    </>
  )
}