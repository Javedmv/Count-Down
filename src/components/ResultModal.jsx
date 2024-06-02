import { forwardRef, useImperativeHandle, useRef } from "react"

const ResultModal = forwardRef(function ResultModal({onReset,targetTime,remainingTime},ref){
    const dialog = useRef();

    const userLost = remainingTime  <= 0;
    const formattedRemaingTime = (remainingTime/1000).toFixed(2);

    useImperativeHandle(ref,()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        }
    }
    )

    return( 
        <dialog ref={dialog} className="result-modal">
            {userLost && <h2>You Lost</h2> }
            <p>The targeted time was <strong>{targetTime} seconds.</strong> </p>
            <p> you stoped the timer with <strong> {formattedRemaingTime} seconds left </strong> </p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>
    )
})
export default ResultModal;