import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addReply, editComment, removeComment, setVotes } from "../utils/commentSlice";
import { useRef } from "react";
const Comment = ({ data, commentIndex, commentTime, commentDeleted, commentEdited }) => {
    // console.log(commentTime);
    const { name, text, replies, id, videoID, votes } = data;
    const inputRef = useRef(null)
    const [voteCounter, setVoteCounter] = useState(votes);
    const [firstUpvote, setFirstUpvote] = useState(true);
    const [firstDonwvote, setFirstDownvote] = useState(true);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [reply, setReply] = useState("");
    const dispatch = useDispatch();
    const saveButtonRef = useRef(null);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && isContentEditable) {
            event.preventDefault(); // Prevent Enter from creating a new line
            saveButtonRef?.current?.click(); // Simulate a click on the Save button
        }
    };

    const handleReply = () => {
        // As soon as this function triggers, I want the commentSection component to re-render so that we can see the added reply.
        if (reply.length > 0) {
            const timeStamp = Date.now()
            const newReply =
            {
                name: "RandomUser101",
                text: reply,
                replies: [],
                id: timeStamp,
                parentTime: commentTime,
                deleted: false,
                edited: false,
                videoID: videoID,
                votes: 0,
            };
            // replies.unshift(newReply);
            console.log("Initiated reply insertion (Comment)")
            dispatch(
                addReply(newReply)
            )
            setReply("");
            /*
            Rough Plan:
                - Make a copy or replies in a state variable
                - Dispatch that state variable to the store after adding our reply to it, for that we need the index of the comment we want to reply to.
                - useSelector to bring the data from the store
            */
        }

    }

    const handleDelete = () => {
        dispatch(
            removeComment(commentTime)
        )
    }

    const [replyVisible, setReplyVisible] = useState(false);
    const [isContentEditable, setIsContentEditable] = useState(false);  // For Edit
    const [originalComment, setOriginalComment] = useState(text)
    // const [isEdited, setIsEdited] = useState(false)

    const handleCommentEdit = (e) => {
        // console.log(e.target.innerText)
        if (e.target.innerText === "Save") {
            // console.log("save")
            dispatch(
                editComment([commentTime, inputRef?.current?.innerText, e.target.innerText])
            )
            console.log(inputRef?.current?.innerText)
            setIsContentEditable(false);
            setOriginalComment(inputRef?.current?.innerText);
        }
        else {
            // console.log("cancel")
            // console.log(inputRef.current.innerText) //comment 2 edited
            // console.log(originalComment)    // comment 1
            // console.log(text)    // comment 2
            setOriginalComment(text);
            inputRef.current.innerText = text;
            console.log(inputRef?.current?.innerText)       // comment 1
            setIsContentEditable(false);
            setOriginalComment(inputRef?.current?.innerText);
        }
    }

    return (
        <div className="">
            <div className="flex space-x-5 shadow-lg rounded-lg py-2 px-5 my-4 bg-gray-400">
                <img className="h-12 w-12" alt="user-icon" src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png" />
                <div className="flex flex-wrap justify-between items-center w-full">
                    <div className="w-full">
                        <p className="font-bold">{name}</p>
                        <p className="max-w-[75%] break-words" ref={inputRef} contentEditable={isContentEditable} suppressContentEditableWarning={isContentEditable} onKeyDown={(e) => { handleKeyPress(e) }}>{text}</p>
                    </div>
                    {/* Exprimental Feature */}
                    {/* <div>
                    <button className="p-2 bg-red-300 rounded-xl">DELETE</button>
                </div> */}
                    {!commentDeleted && <div className="flex flex-row space-x-2 bg-gray-300 p-1 px-1 mt-3 mx-1 rounded-lg items-center justify-evenly">
                        <button className={"text-black px-2 text-lg " + (upvoted ? "text-red-600" : "")} onClick={() => {
                            if (firstUpvote && !downvoted) {
                                setVoteCounter(voteCounter + 1); setFirstUpvote(false); setFirstDownvote(true); setUpvoted(true); setDownvoted(false)
                                dispatch(
                                    setVotes([commentTime, voteCounter + 1])
                                )
                            }
                            else if (downvoted) {
                                setVoteCounter(voteCounter + 2); setFirstUpvote(false); setFirstDownvote(true); setUpvoted(true); setDownvoted(false)
                                dispatch(
                                    setVotes([commentTime, voteCounter + 2])
                                )
                            }
                            else if (upvoted) {
                                setVoteCounter(voteCounter - 1); setFirstUpvote(true); setFirstDownvote(true); setUpvoted(false); setDownvoted(false)
                                dispatch(
                                    setVotes([commentTime, voteCounter - 1])
                                )
                            }
                            // console.log(voteCounter)
                            // dispatch(
                            //     setVotes([commentTime, voteCounter])
                            // )
                        }}>⬆</button>
                        <span className={"w-5 rounded-full text-md text-black " + (upvoted ? "text-red-600" : "") + (downvoted ? "text-blue-600" : "")}>{voteCounter}</span>
                        <button className={"text-black pr-2 text-lg " + (downvoted ? "text-blue-600" : "")} onClick={() => {
                            if (firstDonwvote && !upvoted) {
                                setVoteCounter(voteCounter - 1); setFirstDownvote(false); setFirstUpvote(true); setUpvoted(false); setDownvoted(true)
                                dispatch(
                                    setVotes([commentTime, voteCounter - 1])
                                )
                            }
                            else if (upvoted) {
                                setVoteCounter(voteCounter - 2); setFirstDownvote(false); setFirstUpvote(true); setUpvoted(false); setDownvoted(true)
                                dispatch(
                                    setVotes([commentTime, voteCounter - 2])
                                )
                            }
                            else if (downvoted) {
                                setVoteCounter(voteCounter + 1); setFirstUpvote(true); setFirstDownvote(true); setUpvoted(false); setDownvoted(false)
                                dispatch(
                                    setVotes([commentTime, voteCounter + 1])
                                )
                            }
                            // dispatch(
                            //     setVotes([commentTime, voteCounter])
                            // )
                        }}>⬇</button>
                    </div>}
                </div>
                {commentEdited && !commentDeleted && <span className="italic">Edited</span>}
            </div>
            {/* {console.log("is deleted? : " + commentDeleted)} */}
            {/* {console.log("is edited? : " + commentEdited)} */}
            {/* {console.log(Date.now())} */}
            {!replyVisible && !isContentEditable && !commentDeleted && <div className="flex flex-row space-x-5">
                <button onClick={() => { setIsContentEditable(true); }}>Edit</button>
                <button onClick={() => { setReplyVisible(true) }}>Reply</button>
                <button onClick={() => { handleDelete() }}>Delete</button>
            </div>}
            {isContentEditable && <div className="flex flex-row space-x-5">
                <button onClick={(e) => { handleCommentEdit(e); }} ref={saveButtonRef}>Save</button>
                <button onClick={(e) => { handleCommentEdit(e); }}>Cancel</button>
            </div>}
            {replyVisible && <form className="flex space-x-2 items-center " onSubmit={(e) => { handleReply(); e.preventDefault(); if (reply.length > 0) { setReplyVisible(false) } }}>
                <input type="text" className="text-black rounded-md my-3" value={reply} onChange={(e) => { setReply(e.target.value) }} autoFocus />
                <button type="submit" className="p-[1.5px] px-4 bg-blue-500 rounded-lg">Reply</button>
                <button className="p-[1.5px] px-4 bg-red-500 rounded-lg" onClick={() => { setReplyVisible(false); setReply("") }}>Cancel</button>
            </form>}
        </div>
    )
}

export default Comment;