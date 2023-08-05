import AsyncStorage from "@react-native-async-storage/async-storage";

const sampleMessages = [
    {
      id: 3,
      text: "Where are my arms?",
      time: "07:50",
      user: "Johnathan White",
    },
    {
      id: 2,
      text: "Idk bro",
      time: "9:16",
      user: "Alexander Pollard",
      
    },
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id ornare arcu odio ut sem nulla pharetra diam. Egestas diam in arcu cursus euismod. Metus aliquam eleifend mi in. Pulvinar pellentesque habitant morbi tristique senectus. Netus et malesuada fames ac turpis. Et netus et malesuada fames ac. Praesent semper feugiat nibh sed pulvinar. Mattis ullamcorper velit sed ullamcorper. Diam phasellus vestibulum lorem sed risus. Tempus imperdiet nulla malesuada pellentesque. Tempor nec feugiat nisl pretium fusce id velit. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Sit amet nulla facilisi morbi tempus. Est velit egestas dui id.",
      time: "3:12",
      user: "Brendan Wilson",
    }
  ];

export async function getMessages(room) {
    try {
      const jsonValue = await AsyncStorage.getItem("messages_" + room);
      return jsonValue != null ? JSON.parse(jsonValue) : sampleMessages;
    }
    catch (e) {
      console.log("Loading Messages Failed");
      console.log(e);
    }
    return [];
  }
  
  export async function saveMessages(messages, room) {
    try {
      const jsonValue = JSON.stringify(messages);
      await AsyncStorage.setItem('messages_' + room, jsonValue);
    }
    catch (e) {
      console.log("Saving Messages Failed");
      console.log(e);
    }
  }

  export async function addMessage(newMessage, room) {
    let messages = await getMessages(room);
    messages.unshift(newMessage);
    saveMessages(messages, room);
  }

  export async function removeMessage(id, room) {
    let messages = await getMessages(room);
    messages.splice[id, 1];
    saveMessages(messages);
  }