import React, { useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { addComment, addReply, setComments } from "../utils/commentSlice";
import Comment from "./Comment";


const CommentList = ({ allComments }) => {
    // We can dipatch the reply text to the store, append to the replies of the specific comment from here.
    // console.log(allComments)
    if (allComments && allComments.length > 0) {
        // console.log(allComments);
        return allComments.map((singleComment, index) => (
            <div key={index}>
                <Comment data={singleComment} commentIndex={index} commentTime={singleComment.id} commentDeleted={singleComment.deleted} commentEdited={singleComment.edited} />
                <div className="pl-5 border-l border-l-gray-100 ml-5">
                    <CommentList allComments={singleComment.replies} />
                </div>
            </div>
        ));
    }
}


const CommentSection = ({ commentCount, videoID }) => {
    // const CommentSection = ({ commentCount }) => {

    //Single Comment
    // const [commentData, setCommentData] = useState([
    //     {
    //         name: "kanishk6103",
    //         text: "This is what a sample comment would look like",
    //         replies: []
    //     },
    // ]
    // );
    //
    const [localCommentCount, setLocalCommentCount] = useState(0);
    const dispatch = useDispatch();
    const commentData = useSelector(store => store.comment.comments);
    // const [commentData, setCommentData] = (useSelector(store => store.comment.comments))
    //To be fixed
    const fetchComments = async () => {
        try {
            // dispatch(setComments([]));
            const response = await axios.get("http://localhost:4000/api/comments/" + videoID);
            // console.log(response)
            // console.log(response.data.data)
            dispatch(setComments(response.data.data));
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
    // console.log(commentData)
    useEffect(() => { fetchComments(); console.log("fetched!") }, [localCommentCount])

    //Comment Structure
    // const [commentData, setCommentData] = useState([
    //     {
    //         name: "kanishk6103",
    //         text: "This is what a sample comment would look like",
    //         replies: [
    //             {
    //                 name: "repleir1",
    //                 text: "This is what a sample reply would look like",
    //                 replies: [
    //                     {
    //                         name: "repleir2",
    //                         text: "This is what a sample reply to a reply would look like",
    //                         replies: []
    //                     },
    //                     {
    //                         name: "repleir2",
    //                         text: "This is what a sample reply to a reply would look like",
    //                         replies: [
    //                             {
    //                                 name: "repleir3",
    //                                 text: "This is what a sample reply to a reply to a reply would look like",
    //                                 replies: []
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: "repleir1",
    //                 text: "This is what a sample reply would look like",
    //                 replies: [
    //                     {
    //                         name: "repleir2",
    //                         text: "This is what a sample reply to a reply would look like",
    //                         replies: []
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: "repleir1",
    //                 text: "This is what a sample reply would look like",
    //                 replies: []
    //             },
    //         ]
    //     },
    //     {
    //         name: "kanishk6103",
    //         text: "This is what a sample comment would look like",
    //         replies: []
    //     },
    //     {
    //         name: "kanishk6103",
    //         text: "This is what a sample comment would look like",
    //         replies: []
    //     },
    //     {
    //         name: "kanishk6103",
    //         text: "This is what a sample comment would look like",
    //         replies: []
    //     },
    //     {
    //         name: "kanishk6103",
    //         text: "This is what a sample comment would look like",
    //         replies: []
    //     },
    //     {
    //         name: "kanishk6103",
    //         text: "This is what a sample comment would look like",
    //         replies: []
    //     },
    // ]
    // );
    //

    const [inputText, setInputText] = useState("");

    const handleInputChange = (text) => {
        setInputText(text)
    }

    const handleCommentAdd = (e) => {
        if (inputText.length > 0) {
            const timeStamp = Date.now()
            const newComment =
            {
                name: "RandomUser101",
                text: inputText,
                replies: [],
                id: timeStamp,
                parentTime: null,
                deleted: false,
                edited: false,
                videoID: videoID,
                votes: 0,
            };
            console.log("Initiated comment insertion (commentSection)")
            // console.log(timeStamp); //same as commentSlice timestamp
            // commentData.unshift(newComment);
            // setCommentData([...commentData]);
            dispatch(
                addComment(newComment)
            )
            setInputText("");
            setLocalCommentCount(localCommentCount + 1)
            e.preventDefault();
        }
    }

    // useEffect(() => { fetchComments() }, [localCommentCount])

    return (
        <div>
            <div className="flex flex-row space-x-3 items-baseline">
                <h1 className="text-xl font-semibold">Comments</h1>
                <span> ( {commentCount} ) </span>
            </div>
            <form className="my-5 flex space-x-4" onSubmit={(e) => { handleCommentAdd(e); e.preventDefault() }}>
                <input type="text" value={inputText} className="w-full bg-inherit border-b p-2 border-gray-500 active:border-none" placeholder="Enter Comment..." onChange={e => { handleInputChange(e.target.value) }} />
                <button type="submit" className="text-blue-500 font-bold shadow-lg rounded-xl px-2 hover:bg-green-200">COMMENT</button>
            </form>
            <CommentList allComments={commentData} />
        </div>
    )
}

export default CommentSection;




