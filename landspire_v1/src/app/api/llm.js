import { request } from '@/app/libs/constant'
import axios from 'axios'

export const StartConvertation = (user_input) => {
    return new Promise((resolve, reject) => {
      axios.post(`${request}/stream`, {
        input: {
            input: user_input,
            chat_history: []
        },
        config: {},
        kwargs: {},

      },{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {

        const rawData = response.data;

        // Pisahkan data berdasarkan event
        const events = rawData.split('\nevent: ');
  
        let parsedData = {};

        events.forEach(eventBlock => {
          
            // get objek data dalam setiap blok event

          const eventParts = eventBlock.split('\ndata: ');
          
          if (eventParts.length > 1) {
            try {
              const eventType = eventParts[0].trim();
              const eventData = eventParts[1].trim();

              if (eventType && eventData) {
                parsedData[eventType] = JSON.parse(eventData);
              }
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
          }
      });

        if(response.status == 200){

            resolve(parsedData.data.output);
        }
      
        }).catch(err => {
          console.log('error');
          return 'Terjadi masalah pada server, mohon hubungi support center kami'
      })
    })

    }