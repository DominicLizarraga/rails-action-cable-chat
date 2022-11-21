import { Controller } from "@hotwired/stimulus"
// this is to create subscription 👇
import { createConsumer } from "@rails/actioncable"


// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static targets = ["messages"]

  connect() {
    // this allows us to connect to rails websocket, it creates an instance
    // it needs one argument (the channel), in this case is the chatroom_channel
    createConsumer().subscriptions.create("ChatroomChannel")

  }

}
