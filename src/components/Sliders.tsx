
interface SlidersProps {
    type: string,
    min: number,
    max: number,
    value: number
    onChange: () => void,
}
const Sliders = (props: SlidersProps) => {
  return (
    <div>
      <input type={props.type} min={props.min} max={props.max} value={props.value} onChange={props.onChange}/>
    </div>
  )
}

export default Sliders
