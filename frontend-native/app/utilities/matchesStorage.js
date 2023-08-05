import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultMatches = [
    {
      id: 1,
      name: 'Test Room 1',
      messages: [
        {
          id: '1a',
          text: 'This is a test message!',
          user: 'Thomas',
          time: '7:30',
        },
        {
          id: '1b',
          text: 'This is also a test message!',
          user: 'Jerry',
          time: '7:31',
        },
      ]
    },
    {
      id: 2,
      name: 'Test Room 2',
      messages: [
        {
          id: '2a',
          text: 'Spaighetteyi!',
          user: 'Greggary',
          time: '12:06',
        },
        {
          id: '2b',
          text: 'Indeed!',
          user: 'JThomas',
          time: '1:57',
        },
        
      ]
    }, 
    {
      id: 3,
      name: 'Test Room 3',
      messages: [
        {
          id: '2a',
          text: 'Spaighetteyi!',
          user: 'Greggary',
          time: '12:06',
        },
        {
          id: '2b',
          text: 'Indeed!',
          user: 'JThomas',
          time: '1:57',
        },
        
      ]
    }, 
  ]

  export async function getMatches() {
    try {
      const jsonValue = await AsyncStorage.getItem('matches');
      return jsonValue != null ? JSON.parse(jsonValue) : defaultMatches;
    }
    catch (e) {
      console.log("Loading Matches Failed");
      console.log(e);
    }
    return [];
  }
  
  export async function saveMatches(matches) {
    try {
      const jsonValue = JSON.stringify(matches);
      await AsyncStorage.setItem('matches', jsonValue);
    } 
    catch (e) {
      console.log("Saving Matches Failed");
      console.log(e);
    }
  }

  export async function addMatch(newMatch) {
    let matches = await getMatches();
    matches.unshift(newMatch);
    saveMatches(matches);
  }

  export async function removeMatch(id) {
    let matches = await getMatches();
    matches.splice[id, 1];
    saveMatches(matches);
  }