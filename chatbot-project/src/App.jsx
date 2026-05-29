import { useState } from 'react'
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';

import RobotProfileImage from './assets/robot.png';
import UserProfileImage from './assets/user.png';
import LoadingSpinner from './assets/loading-spinner.gif';

import './App.css'


      
      

function App() {
        
        const [chatMessages, setChatMessages] = useState([]);
        // const[chatMessages, setChatMessages] = array;
        // const chatMessages = array[0];  destructing in above line..
        // const setChatMessages = array[1];


        return (
          <div  className="app-container">
            {chatMessages.length === 0 && (
              <p className = "welcome-message">
                Welcome to the chatbot project! Send a message using the text below.
              </p>

            )}
            
            <ChatMessages 
              chatMessages={chatMessages} 
            />
            <ChatInput
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}  
            />  
          </div>
        )
      }

export default App
