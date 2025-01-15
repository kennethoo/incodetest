//So this class is responsible of geeting data from the server the  add it to our react application
// so now we have a problem we n eed to add it to the react store but the problem is don't want to deal with closure we need to add data to the store
// can we do it whitout doing to much change ?
// Solution One
// we create more reducer to handle the new updating , one for adding , one for updating , one for deliting
// but he issues here is more complexitry right ? and that is more code
//Solution Two
// now pass a function and a data  now that funtion is going to take the state as argumatn then do whatever i write then  update the store
//now this could work but that will mean i need to change how the store get updating , we are goin g to test
// i like soilutiobn 2 better , let's try it !!
//
//
//
//
//
//
//
//
//
//
//

export class RealTimeApplicationEventService {
  socket?: null | any;
  constructor() {
    this.socket = null;
  }
  subscribe = (socket, handleNewMessage) => {
    this.socket = socket;
    this.socket.on("event:message", (data) => {
      handleNewMessage(data);
    });
  };
  unsubscribe = () => {
    this.socket.off("event:message");
  };
}

export const realTimeApplicationEventService =
  new RealTimeApplicationEventService();
