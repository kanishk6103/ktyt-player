import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const commentSlice = createSlice(
    {
        name: "comment",
        initialState: {
            comments: [],
        },
        reducers: {
            addComment: (state, action) => {
                state.comments.unshift(action.payload);
                console.log("Comment reached store (commentSlice)")

                const request = () => {
                    console.log("Sending comment to backend")
                    axios.post("http://localhost:4000/createComment",
                        {
                            name: action.payload.name,
                            text: action.payload.text,
                            replies: action.payload.replies,
                            id: action.payload.id,
                            parentTime: null,
                            dateCreated: action.payload.id,
                            dateEdited: null,
                            videoID: action.payload.videoID,
                            edited: action.payload.edited,
                            deleted: action.payload.deleted,
                            votes: action.payload.votes,
                        }
                    )
                }
                request();
            },
            removeComment: (state, action) => {
                console.log(action.payload)
                const searchComments = (comment) => {
                    if (!comment) { return; }
                    if (action.payload === comment.id) {
                        return ((comment.name = "[deleted]") && (comment.text = "[deleted]") && (comment.deleted = true))
                    }
                    for (let i = 0; i < comment.replies.length; i++) {
                        searchComments(comment.replies[i])
                    }
                }
                for (let i = 0; i < state.comments.length; i++) {
                    searchComments(state.comments[i]);
                }
                const request = () => {
                    axios.put(`http://localhost:4000/deleteComment/` + action.payload).then(response => {
                        console.log('Resource deleted successfully:', response.data);
                    }).catch(error => {
                        console.error('Error deleting resource:', error);
                    });
                }
                request();
            },
            addReply: (state, action) => {
                // state.comments[action.payload.parentIndex].replies.unshift(action.payload)
                // const parentComment = state.comments.find((comment) => comment.id === action.payload.parentTime)
                // This is inefficient for large scale, I need to use tree structure, gotta watch Xplodivity: https://www.youtube.com/watch?v=EGXnsGenlCg
                const searchComments = (comment) => {
                    if (!comment) { return; }
                    if (action.payload.parentTime === comment.id) {
                        // console.log("added")
                        console.log("Reply Inserted at the frontend")
                        return comment.replies.unshift(action.payload)
                    }
                    for (let i = 0; i < comment.replies.length; i++) {
                        searchComments(comment.replies[i])
                    }
                }
                for (let i = 0; i < state.comments.length; i++) {
                    searchComments(state.comments[i]);
                }
                const request = () => {
                    console.log("Sending reply to the backend")
                    axios.post("http://localhost:4000/addReply",
                        {
                            name: action.payload.name,
                            text: action.payload.text,
                            replies: action.payload.replies,
                            id: action.payload.id,
                            parentTime: action.payload.parentTime,
                            dateCreated: action.payload.id,
                            dateEdited: null,
                            videoID: action.payload.videoID,
                            edited: action.payload.edited,
                            deleted: action.payload.deleted,
                            votes: action.payload.votes,
                        })
                }
                request();
                // if (parentComment) {
                //     parentComment.replies.unshift(action.payload);
                // }
            },
            editComment: (state, action) => {
                const searchComments = (comment) => {
                    if (!comment) { return; }
                    if (action.payload[0] === comment.id) {
                        if (action.payload[2] === "Save") {
                            // console.log("edited")
                            return ((comment.text = action.payload[1]) && (comment.edited = true))
                        }
                        else {
                            // console.log("not edited")
                            return ((comment.text = action.payload[1]))
                        }
                    }
                    // console.log("searching")
                    for (let i = 0; i < comment.replies.length; i++) {
                        searchComments(comment.replies[i])
                    }
                }
                for (let i = 0; i < state.comments.length; i++) {
                    // console.log("entered the function")
                    searchComments(state.comments[i]);
                    // console.log(i)
                }
                const request = () => {
                    axios.put((`http://localhost:4000/api/editComment/` + action.payload[0]), {
                        editedComment: action.payload[1],
                    }).then(response => {
                        console.log('Resource edited successfully:', response.data);
                    }).catch(error => {
                        console.error('Error editing resource:', error);
                    });
                }
                request();
            },
            setComments: (state, action) => {
                state.comments = action.payload;
                // console.log(state.comments)
            },
            setVotes: (state, action) => {
                const searchComments = (comment) => {
                    if (!comment) { return; }
                    if (action.payload[0] === comment.id) {
                        // console.log("added")
                        return comment.votes = action.payload[1]
                    }
                    for (let i = 0; i < comment.replies.length; i++) {
                        searchComments(comment.replies[i])
                    }
                }
                for (let i = 0; i < state.comments.length; i++) {
                    searchComments(state.comments[i]);
                }
                const request = () => {
                    axios.put((`http://localhost:4000/api/updateVotes/` + action.payload[0]), { updatedVotes: action.payload[1], }).then(response => {
                        console.log('Votes updated: ', response.data);
                    }).catch(error => {
                        console.error('Error Updating Votes: ', error);
                    });
                }
                request();
            }
        },
    }
)

export const { addComment, addReply, removeComment, editComment, setComments, setVotes } = commentSlice.actions;
export default commentSlice.reducer;