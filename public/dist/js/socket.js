/** initialize socket connection */
const socket = io("http://localhost:3000");

let namespaceSocket;

/** listen to socket connection event */
socket.on('connect', () => {
    /**
     * listen to socket `namespaces list` event for retrieving
     * support system namespaces on socket connection event.
     */
    socket.on('namespacesList', namespacesList => {
        /** select namespaces html list element */
        const namespacesElement = document.getElementById("namespaces");
        /** remove any data in namespace list element */
        namespacesElement.innerHTML = "";
        /** initialize namespace connection */
        createNamespaceConnection(namespacesList[0].endpoint);
        /** loop over retrieved namespaces */
        for (const namespace of namespacesList) {
            /** create a new `li` element */
            const li = document.createElement("li");
            /** create a new `p` element */
            const p = document.createElement("p")
            /** set `class` attribute for the `p` element */
            p.setAttribute("class", "namespaceTitle")
            /** set an `endpoint` attribute for the `p` element */
            p.setAttribute("endpoint", namespace.endpoint)
            /** set the namespace title as the `p` element inner text */
            p.innerText = namespace.title;
            /** append the p element to li element */
            li.appendChild(p)
            /** append the li element to the selected namespaces element */
            namespacesElement.appendChild(li)
        }
        /** Select all paragraph elements with class "namespaceTitle" within list items with id "namespaces" */
        const namespaceNodes = document.querySelectorAll("#namespaces li p.namespaceTitle");

        /** Iterate through each namespace title element and attach a click event listener */
        for (const namespace of namespaceNodes) {
            /**
             * Click event listener for a namespace title.
             * When a title is clicked, it retrieves the endpoint attribute and initializes a connection.
             *
             * @param {Event} event - The click event.
             */
            namespace.addEventListener("click", (event) => {
                /** Retrieve the endpoint attribute from the clicked namespace title */
                const endpoint = namespace.getAttribute("endpoint");

                /** Initialize a connection to the corresponding namespace */
                createNamespaceConnection(endpoint);
            });
        }
    });

    /** initialize socket error handler */
    socket.on('receive-error', (error) => {
        console.log(error)
    });

    /** add an event sot key down on enter key to send message */
    window.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
            sendMessage();
        }
    });

    /** add a click event for send message button to send message */
    document.querySelector("button.submit").addEventListener("click", () => {
        sendMessage();
    })
});

/**
 * creates a connection to a namespace using the provided endpoint
 * @param {string} endpoint - The endpoint to connect to
 */
function createNamespaceConnection(endpoint) {
    /** close namespace socket connection */
    if (namespaceSocket) namespaceSocket.close();

    /** Create a socket connection to the specified namespace endpoint */
    namespaceSocket = io(`http://localhost:3000/${endpoint}`);

    /** Event listener for when the socket connection is established */
    namespaceSocket.on('connect', () => {
        /** Event listener for receiving the list of rooms from the server */
        namespaceSocket.on('roomList', rooms => {
            /** join the first room */
            getRoomInfo(endpoint, rooms[0]?.name);
            /** Get the HTML element representing the list of contacts */
            const roomsElement = document.querySelector("#contacts ul");
            /** Clear the existing content of the contact list */
            roomsElement.innerHTML = "";
            /** Iterate through the received rooms and dynamically create HTML elements for each */
            for (const room of rooms) {
                /** Convert a string representation of HTML to actual HTML elements */
                const html = stringToHTML(`
                    <li class="contact" roomName="${room.name}">
                        <div class="wrap">
                            <img src="${room.image}" height="40" alt=""/>
                            <div class="meta">
                                <p class="name">${room.name}</p>
                                <p class="preview">${room.description}</p>
                            </div>
                        </div>
                    </li>`);
                /** Append the newly created HTML element to the contact list */
                roomsElement.appendChild(html);
            }
            const roomNodes = document.querySelectorAll("ul li.contact");
            for (const room of roomNodes) {
                room.addEventListener("click", function () {
                    const roomName = this.getAttribute("roomName");
                    getRoomInfo(endpoint, roomName);
                })
            }
        });
    });

    /** initialize namespace socket handler */
    namespaceSocket.on('receive-error', (error) => {
        console.log('namespace connection error', error)
    });
}

/**
 * Retrieves and displays information about a room.
 * @param {string} endpoint - The endpoint of the namespace.
 * @param {string} roomName - The name of the room to get information about.
 */
function getRoomInfo(endpoint, roomName) {
    /** Set attributes in the roomName h3 element to store endpoint and roomName */
    document.querySelector("#roomName h3").setAttribute("roomName", roomName);
    document.querySelector("#roomName h3").setAttribute("endpoint", endpoint);

    /** Emit a "joinRoom" event to the namespaceSocket with the specified roomName */
    namespaceSocket.emit("joinRoom", roomName);

    /** Remove any existing event listener for "roomInfo" to avoid duplication */
    namespaceSocket.off("roomInfo");

    /** Event listener for receiving room information */
    namespaceSocket.on("roomInfo", roomInfo => {
        /** Clear the existing content of the messages list */
        // document.querySelector(".messages ul").innerHTML = "";

        /** Set the room description in the #roomName h3 element */
        document.querySelector("#roomName h3").innerText = roomInfo.description;

        // /** Combine messages and locations, then sort them by dateTime */
        // const data = [...roomInfo.messages].sort((con1, con2) => con1.dateTime - con2.dateTime);

        /** Get the user ID from the input field */
        const userID = document.getElementById("userID").value;

        /** Iterate through messages and create HTML elements for each */
        for (const message of roomInfo.messages) {
            /** Determine the message class based on the sender (sent or replies) */
            const messageClass = (userID.toString() === message.sender.toString()) ? 'sent' : 'replies';

            /** Create a li element using stringToHTML function */
            const li = stringToHTML(`
                <li class="${messageClass}">
                    <img src="https://gravatar.com/userimage/167077484/12be96bff78613a12cabc7963ba03248.jpeg?size=256" alt="" />
                    <p>${message.message}</p>
                </li>
            `);

            /** Append the created li element to the messages list */
            document.querySelector(".messages ul").appendChild(li);
        }
    });

    /** Event listener for receiving the count of online users */
    namespaceSocket.on("countOfOnlineUsers", count => {
        /** Display the count of online users in the designated element */
        document.getElementById("onlineCount").innerHTML = count;
    });
}

function sendMessage() {
    /** Get attributes in the roomName h3 element to store endpoint and roomName */
    const roomName = document.querySelector("#roomName h3").getAttribute("roomName");
    const endpoint = document.querySelector("#roomName h3").getAttribute("endpoint");

    /** get message input value (message text) */
    let message = document.querySelector(".message-input input#messageInput").value;

    /** show error if the input is empty */
    if (message.trim() === "") {
        return alert("input message can not be empty");
    }

    /** retrieve user id */
    const userID = document.getElementById("userID").value;

    /** emit the message on the socket using `newMessage` event */
    namespaceSocket.emit("newMessage", {
        message,
        roomName,
        endpoint,
        sender: userID
    });

    namespaceSocket.off("confirmMessage");

    /** listen for socket `confirmMessage` event */
    namespaceSocket.on("confirmMessage", data => {
        /** Determine the message class based on the sender (sent or replies) */
        const messageClass = (userID.toString() === data.sender.toString()) ? 'sent' : 'replies';

        /** Convert a string representation of HTML to actual HTML elements */
        const li = stringToHTML(`
                <li class="${messageClass}">
                    <img src="https://gravatar.com/userimage/167077484/12be96bff78613a12cabc7963ba03248.jpeg?size=256" alt="" />
                    <p>${data.message}</p>
                </li>
        `);

        /** Append the newly created HTML element to the contact list */
        document.querySelector(".messages ul").appendChild(li);

        /** reset send message input */
        document.querySelector(".message-input input#messageInput").value = ""

        /** select message section */
        const messagesElement = document.querySelector("div.messages");
        /** auto scroll to the bottom of the messages section */
        messagesElement.scrollTo(0, messagesElement.scrollHeight);
    })
}


/**
 * Converts a string representation of HTML into actual HTML elements
 * @param {string} str - The string containing HTML markup
 * @returns {HTMLElement} - The HTML element created from the provided string
 */
function stringToHTML(str) {
    /** Create a new DOMParser instance */
    const parser = new DOMParser();
    /** Parse the input string as HTML and create a document */
    const doc = parser.parseFromString(str, "text/html");
    /** Return the first child of the body, which is the parsed HTML element */
    return doc.body.firstChild;
}