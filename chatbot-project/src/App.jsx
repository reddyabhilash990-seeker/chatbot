import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev';
import RobotProfileImage from './assets/robot.png';
import UserProfileImage from './assets/user.png';
import LoadingSpinner from './assets/loading-spinner.gif';


import './App.css'

function ChatInput({chatMessages, setChatMessages}) {

        const [inputText, setInputText] = useState('');
        function  saveInputText(event) {
          setInputText(event.target.value)

        }

        
          async function sendMessage() {



            setInputText(' ');
            const newChatMessages = [
              ...chatMessages ,                //spreadOperator
              {
                message: inputText ,
                sender: 'user' ,
                id: crypto.randomUUID() 
              }

            ];
              setChatMessages([
                ...newChatMessages,                //spreadOperator
                {
                  message: <img src={LoadingSpinner} className="loading-spinner" /> ,
                  sender: 'robot' ,
                  id: crypto.randomUUID() 
                }
              ]);
              const response = await Chatbot.getResponseAsync(inputText);
              setChatMessages([
                ...newChatMessages,
                {
                  message: response,
                  sender: 'robot' ,
                  id : crypto.randomUUID()
                }
              ])
            
            
          }



          

          

          
          
        


      
      
        


          return (
            <div className="chat-input-container">
              <input 
                placeholder="send a message to chatbox" 
                size = "30"
                onChange={saveInputText} 
                value={inputText}
                className="chat-input"
              />
              <button
                onClick = {sendMessage} 
                className="send-button"
              >Send</button>
            </div>
          );
      }
      function ChatMessage({message, sender}) {
        // const message = props.message;
        // const sender = props.sender;
        // const  {message,sender } = props; //destructring shortcut
        /*
        if (sender === 'robot') {
          return (
            <div>
              <img src = "robot.png" width = "50" />
              {message}
            </div> 

          );

        }
        */ 



        return(
          <div className={
            sender === 'user' 
              ? 'chat-message-user'
              :'chat-message-robot'    
          }>
            {sender === 'robot' && (
              <img src = {RobotProfileImage}
              className="chat-message-profile
              " />
            )}
            <div className="chat-text">
              {message}
            </div>
            {sender === 'user' && (
              <img src = {UserProfileImage}
              className="chat-message-profile
              " />
            )}
          </div> 
          
        );

      }
      function ChatMessages({ chatMessages }) {
        const chatMessagesRef = useRef(null);

        useEffect(() => {
          const containerElem = chatMessagesRef.current;
          if(containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight; 
          }
        }, [chatMessages]);
        return (
          <div className="chat-messages-container"
           ref ={chatMessagesRef}>
            {chatMessages.map((chatMessage) => {
              return (
                <ChatMessage
                  message={chatMessage.message}
                  sender={chatMessage.sender}
                  key={chatMessage.id}
                
                />
              )
            })}
          </div>
        ); 
      }

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
