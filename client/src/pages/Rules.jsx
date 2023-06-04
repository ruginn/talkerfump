import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {setTopBarTrue} from '../features/general/generalSlice'

export default function Rules() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTopBarTrue())
  }, )

  return (
    <div>
        <h1>75 Hard Program</h1>
        <h2>This is a program to transform your life</h2>
        <h3>The rules are simple. You must complete each of the following tasks everyday:</h3>
        <ol>
            <li>Follow a diet. Any diet: Keto, if it fits your macros, Atkins, Paleo, Whole30. But absolutely no alcohol and no cheat meals</li>
            <li>You must exercise twice a day for 45 minutes each session. One must be outside</li>
            <li>Drink a one gallon (~3.8L) of water.</li>
            <li>Read 10 pages of a non-fiction book.</li>
            <li>Lastly, take a progress photo.</li>
        </ol>
        <h3>Fail any task and start over</h3>
        <h4>Good luck and have fun</h4>
    </div>
  )
}
