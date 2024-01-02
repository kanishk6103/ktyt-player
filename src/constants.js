export const YOUTUBE_API_KEY = "ENTER YOUR OWN API KEY"
export const YOUTUBE_URL = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + YOUTUBE_API_KEY;
export const CHANNEL_INFO = (channelID) => "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=" + channelID + "&key=" + YOUTUBE_API_KEY;
// export const YT_SEARCH_URL = (searchTerm) => { "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + searchTerm + "&key=" + YOUTUBE_API_KEY; }
// export const YT_SEARCH = () => { }
export const YOUTUBE_SUGGESTIONS = "http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&q=";
export const GOOGLE_IMAGE_RESULTS = "https://serpapi.com/search.json?q=Apple&engine=google_images&ijn=0";
export const SERPAPI_API_KEY = "ENTER YOUR OWN API KEY"
export const MAX_LIVE_MESSAGES = 20;
export const menuItems = [
    {
        name: "Home",
        logo: `<svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="m12 4.44 7 6.09V20h-4v-6H9v6H5v-9.47l7-6.09m0-1.32-8 6.96V21h6v-6h4v6h6V10.08l-8-6.96z"></path></svg>`,
    },
    {
        name: "Shorts",
        logo: `<svg height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"></path></svg>`,
    },
    {
        name: "Subscriptions",
        logo: `<svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"></path></svg>`,
    },
    {
        name: "Library",
        logo: `<svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="m11 7 6 3.5-6 3.5V7zm7 13H4V6H3v15h15v-1zm3-2H6V3h15v15zM7 17h13V4H7v13z"></path></svg>`,
    },
    {
        name: "History",
        logo: `<svg height="24" style="pointer-events: none; display: block; width: 100%; height: 100%;" viewBox="0 0 24 24" width="24" focusable="false"><g><path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L3.94 8H8v1H1.96V3h1v4.74c.04-.09.07-.17.11-.25.11-.22.23-.42.35-.63C5.22 3.86 8.51 2 12 2c5.51 0 10 4.49 10 10z"></path></g></svg>`,
    },
]


export const buttonList = [
    {
        name: "All",
        id: 1
    },
    {
        name: "Gaming",
        id: 2
    },
    {
        name: "Live",
        id: 3
    },
    {
        name: "Cooking",
        id: 4
    },
    {
        name: "Football",
        id: 5
    },
    {
        name: "News",
        id: 6
    },
    {
        name: "SomeOrdinaryGamers",
        id: 7
    },
    {
        name: "PewDiePie",
        id: 8
    },
    {
        name: "Parked Up Anywhere",
        id: 9
    },
    {
        name: "Dhruv Rathee",
        id: 10
    },
    {
        name: "Trending",
        id: 11
    },
    {
        name: "New",
        id: 12
    },
    {
        name: "For You",
        id: 13
    },
    {
        name: "Anime",
        id: 14
    },
]

export const thumbsUpIcon = "https://icon-library.com/images/thumbs-up-icon-png/thumbs-up-icon-png-4.jpg"
export const commentIcon = "https://www.citypng.com/public/uploads/preview/free-speech-comment-chat-black-icon-png-11641399344t8td3bkz3f.png"

export const convertISO = (duration) => {
    var day, day_duration, day_list, day_time, hour, hour_list, minute, minute_list, second, second_list;
    day_time = duration.split("T");
    day_duration = day_time[0].replace("P", "");
    day_list = day_duration.split("D");

    if (day_list.length === 2) {
        day = Number.parseInt(day_list[0]) * 60 * 60 * 24;
        day_list = day_list[1];
    } else {
        day = 0;
        day_list = day_list[0];
    }

    hour_list = day_time[1].split("H");

    if (hour_list.length === 2) {
        hour = Number.parseInt(hour_list[0]) * 60 * 60;
        hour_list = hour_list[1];
    } else {
        hour = 0;
        hour_list = hour_list[0];
    }

    minute_list = hour_list.split("M");

    if (minute_list.length === 2) {
        minute = Number.parseInt(minute_list[0]) * 60;
        minute_list = minute_list[1];
    } else {
        minute = 0;
        minute_list = minute_list[0];
    }

    second_list = minute_list.split("S");

    if (second_list.length === 2) {
        second = Number.parseInt(second_list[0]);
    } else {
        second = 0;
    }
    return { day, hour, minute, second }
}

export let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}