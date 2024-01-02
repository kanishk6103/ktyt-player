import { useEffect, useState } from "react";
import LiveChatMessage from "./LiveChatMessage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, generateRandomSentence } from "../utils/helper";

const LiveChat = () => {
    const dispatch = useDispatch();
    const chatMessages = useSelector(store => store.chat.messages);
    const [liveText, setLiveText] = useState("");
    useEffect(() => {
        const interval = setInterval(() => {
            // console.log("polling begins")
            dispatch(
                addMessage({
                    name: generateRandomName(),
                    message: generateRandomSentence(),
                })
            )
        }, 1500)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="mx-2 w-full">
            <div className="mt-4 mr-5 border h-[550px] w-full overflow-y-scroll overflow-x-hidden flex flex-col-reverse rounded-lg">
                {chatMessages.map((c, i) => <LiveChatMessage name={c.name} message={c.message} key={i} />)}
            </div>
            <form className="w-full my-2 text-center" onSubmit={(e) => {
                e.preventDefault();
                if (liveText.length > 0) {
                    dispatch(addMessage({
                        name: "Kanishk",
                        message: liveText
                    }))
                    setLiveText("");
                }
            }}>
                <input placeholder="Type in a message..." className="border-b border-b-black border-1 w-80 p-1 rounded-md text-black px-4" type="text" value={liveText} onChange={e => { setLiveText(e.target.value) }} />
                <button className="mx-2 bg-blue-500 p-1 rounded-md px-4 text-white">Send</button>
            </form>
        </div>
    )
}
export default LiveChat;